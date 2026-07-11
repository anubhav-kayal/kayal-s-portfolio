import { NextResponse } from "next/server";
import { competitiveStats } from "@/data/socials";

export const revalidate = 3600;

type StatsResponse = {
  leetcode: {
    username: string;
    totalSolved: number;
    easy: number;
    medium: number;
    hard: number;
    ranking: number | null;
  };
  codeforces: {
    handle: string;
    rating: number;
    maxRating: number;
    rank: string;
  };
  source: { leetcode: "live" | "fallback"; codeforces: "live" | "fallback" };
  fetchedAt: string;
};

async function fetchLeetCode(username: string) {
  const query = `
    query userProfile($username: String!) {
      matchedUser(username: $username) {
        submitStats: submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
          }
        }
        profile {
          ranking
        }
      }
    }
  `;

  const res = await fetch("https://leetcode.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Referer: "https://leetcode.com",
    },
    body: JSON.stringify({ query, variables: { username } }),
    next: { revalidate: 3600 },
  });

  if (!res.ok) throw new Error(`leetcode ${res.status}`);
  const json = (await res.json()) as {
    data?: {
      matchedUser?: {
        submitStats?: { acSubmissionNum?: { difficulty: string; count: number }[] };
        profile?: { ranking?: number };
      };
    };
  };

  const user = json.data?.matchedUser;
  if (!user) throw new Error("leetcode user not found");

  const nums = user.submitStats?.acSubmissionNum ?? [];
  const byDiff = Object.fromEntries(nums.map((n) => [n.difficulty, n.count]));

  return {
    username,
    totalSolved: byDiff.All ?? 0,
    easy: byDiff.Easy ?? 0,
    medium: byDiff.Medium ?? 0,
    hard: byDiff.Hard ?? 0,
    ranking: user.profile?.ranking ?? null,
  };
}

async function fetchCodeforces(handle: string) {
  const res = await fetch(
    `https://codeforces.com/api/user.info?handles=${encodeURIComponent(handle)}`,
    { next: { revalidate: 3600 } },
  );
  if (!res.ok) throw new Error(`codeforces ${res.status}`);
  const json = (await res.json()) as {
    status: string;
    result?: {
      handle: string;
      rating?: number;
      maxRating?: number;
      rank?: string;
    }[];
  };
  if (json.status !== "OK" || !json.result?.[0]) {
    throw new Error("codeforces user not found");
  }
  const u = json.result[0];
  return {
    handle: u.handle,
    rating: u.rating ?? 0,
    maxRating: u.maxRating ?? 0,
    rank: u.rank ?? "unrated",
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lcUser =
    searchParams.get("leetcode") ||
    process.env.LEETCODE_USER ||
    competitiveStats.leetcode.username;
  const cfHandle =
    searchParams.get("codeforces") ||
    process.env.CF_HANDLE ||
    competitiveStats.codeforces.handle;

  const isPlaceholder = (h: string) => !h || h === "your-handle";

  let leetcode = { ...competitiveStats.leetcode, username: lcUser };
  let codeforces = { ...competitiveStats.codeforces, handle: cfHandle };
  const source: StatsResponse["source"] = {
    leetcode: "fallback",
    codeforces: "fallback",
  };

  if (!isPlaceholder(lcUser)) {
    try {
      leetcode = await fetchLeetCode(lcUser);
      source.leetcode = "live";
    } catch {
      // keep fallback
    }
  }

  if (!isPlaceholder(cfHandle)) {
    try {
      codeforces = await fetchCodeforces(cfHandle);
      source.codeforces = "live";
    } catch {
      // keep fallback
    }
  }

  const payload: StatsResponse = {
    leetcode,
    codeforces,
    source,
    fetchedAt: new Date().toISOString(),
  };

  return NextResponse.json(payload, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
