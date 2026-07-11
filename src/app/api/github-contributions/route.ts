import { NextResponse } from "next/server";

export const revalidate = 3600;

type Day = { date: string; count: number; level: number };

type ApiPayload = {
  username: string;
  total: number;
  contributions: Day[];
  source: "live" | "placeholder";
};

function placeholderYear(): Day[] {
  const days: Day[] = [];
  const end = new Date();
  const start = new Date();
  start.setFullYear(end.getFullYear() - 1);
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const seed = (d.getMonth() * 31 + d.getDate()) % 7;
    const count = seed === 0 ? 0 : seed - 1;
    days.push({
      date: d.toISOString().slice(0, 10),
      count,
      level: Math.min(4, count),
    });
  }
  return days;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username =
    searchParams.get("username") ||
    process.env.GITHUB_USERNAME ||
    "your-handle";

  if (!username || username === "your-handle") {
    const contributions = placeholderYear();
    const payload: ApiPayload = {
      username,
      total: contributions.reduce((s, d) => s + d.count, 0),
      contributions,
      source: "placeholder",
    };
    return NextResponse.json(payload);
  }

  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}?y=last`,
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) throw new Error(`upstream ${res.status}`);
    const data = (await res.json()) as {
      total?: Record<string, number> | number;
      contributions?: Day[];
    };
    const contributions = data.contributions ?? [];
    const total =
      typeof data.total === "number"
        ? data.total
        : data.total
          ? Object.values(data.total).reduce((a, b) => a + b, 0)
          : contributions.reduce((s, d) => s + d.count, 0);

    const payload: ApiPayload = {
      username,
      total,
      contributions,
      source: "live",
    };
    return NextResponse.json(payload);
  } catch {
    const contributions = placeholderYear();
    const payload: ApiPayload = {
      username,
      total: contributions.reduce((s, d) => s + d.count, 0),
      contributions,
      source: "placeholder",
    };
    return NextResponse.json(payload);
  }
}
