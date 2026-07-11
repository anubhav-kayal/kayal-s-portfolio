import type { CompetitiveStats, SocialLink } from "./types";

/** Swap these for live Stats — also overridable via LEETCODE_USER / CF_HANDLE / GITHUB_USERNAME */
export const githubUsername = "your-handle";
export const leetcodeUsername = "your-handle";
export const codeforcesHandle = "your-handle";

export const socials: SocialLink[] = [
  {
    id: "github",
    label: "GitHub",
    href: `https://github.com/${githubUsername}`,
    handle: `@${githubUsername}`,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://linkedin.com/in/your-handle",
    handle: "/in/your-handle",
  },
  {
    id: "twitter",
    label: "X / Twitter",
    href: "https://x.com/your-handle",
    handle: "@your-handle",
  },
  {
    id: "email",
    label: "Email",
    href: "mailto:you@example.com",
    handle: "you@example.com",
  },
  {
    id: "leetcode",
    label: "LeetCode",
    href: `https://leetcode.com/u/${leetcodeUsername}`,
    handle: leetcodeUsername,
  },
  {
    id: "codeforces",
    label: "Codeforces",
    href: `https://codeforces.com/profile/${codeforcesHandle}`,
    handle: codeforcesHandle,
  },
];

export const competitiveStats: CompetitiveStats = {
  leetcode: {
    username: leetcodeUsername,
    totalSolved: 0,
    easy: 0,
    medium: 0,
    hard: 0,
    ranking: null,
  },
  codeforces: {
    handle: codeforcesHandle,
    rating: 0,
    maxRating: 0,
    rank: "unrated",
  },
};
