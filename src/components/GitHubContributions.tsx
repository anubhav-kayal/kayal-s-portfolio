"use client";

import { useEffect, useMemo, useState } from "react";

type Day = { date: string; count: number; level: number };

type Payload = {
  username: string;
  total: number;
  contributions: Day[];
  source: "live" | "placeholder";
};

const LEVEL_COLORS = [
  "var(--gh-0, #171b26)",
  "var(--gh-1, #2f5c4a)",
  "var(--gh-2, #3d8a68)",
  "var(--gh-3, #4a9c8c)",
  "var(--gh-4, #e3a857)",
];

export function GitHubContributions({ username }: { username: string }) {
  const [data, setData] = useState<Payload | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(
          `/api/github-contributions?username=${encodeURIComponent(username)}`,
        );
        if (!res.ok) throw new Error("Failed to load");
        const json = (await res.json()) as Payload;
        if (!cancelled) setData(json);
      } catch {
        if (!cancelled) setError("Could not load contributions");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [username]);

  const weeks = useMemo(() => {
    if (!data?.contributions?.length) return [] as Day[][];
    const days = [...data.contributions];
    // Align to weeks (Sun-start like GitHub)
    const first = new Date(days[0].date + "T12:00:00");
    const pad = first.getDay();
    const cells: (Day | null)[] = [
      ...Array.from({ length: pad }, () => null),
      ...days,
    ];
    const out: Day[][] = [];
    for (let i = 0; i < cells.length; i += 7) {
      out.push(
        cells.slice(i, i + 7).map((c) => c ?? { date: "", count: 0, level: 0 }),
      );
    }
    return out;
  }, [data]);

  return (
    <div className="border border-[var(--line)] bg-[var(--surface)] p-5 sm:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--teal)]">
            GitHub · {username}
          </p>
          <h3 className="mt-1 font-[family-name:var(--font-display)] text-xl text-[var(--parchment)]">
            Contribution graph
          </h3>
        </div>
        {data && (
          <p className="font-mono text-xs text-[var(--parchment-dim)]">
            <span className="text-[var(--amber)]">{data.total}</span> in last year
            {data.source === "placeholder" ? " · placeholder" : ""}
          </p>
        )}
      </div>

      {error && (
        <p className="mt-4 font-mono text-xs text-[var(--coral)]">{error}</p>
      )}

      {!data && !error && (
        <p className="mt-6 font-mono text-xs text-[var(--parchment-dim)]">
          Loading graph…
        </p>
      )}

      {data && (
        <>
          <div className="mt-5 overflow-x-auto pb-1">
            <div className="inline-flex gap-[3px]">
              {weeks.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-[3px]">
                  {week.map((day, di) => (
                    <div
                      key={`${wi}-${di}-${day.date}`}
                      title={
                        day.date
                          ? `${day.date}: ${day.count} contribution${day.count === 1 ? "" : "s"}`
                          : undefined
                      }
                      className="h-[11px] w-[11px] rounded-[2px]"
                      style={{
                        background:
                          LEVEL_COLORS[Math.min(4, Math.max(0, day.level))] ??
                          LEVEL_COLORS[0],
                        opacity: day.date ? 1 : 0,
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-3 flex items-center justify-end gap-1.5 font-mono text-[10px] text-[var(--parchment-dim)]">
            <span>Less</span>
            {LEVEL_COLORS.map((c, i) => (
              <span
                key={c}
                className="inline-block h-[11px] w-[11px] rounded-[2px]"
                style={{ background: c }}
                title={`Level ${i}`}
              />
            ))}
            <span>More</span>
          </div>
          <p className="mt-3 font-mono text-[10px] text-[var(--parchment-dim)]">
            Set your handle in{" "}
            <code className="text-[var(--amber)]">src/data/socials.ts</code>{" "}
            (<code className="text-[var(--amber)]">githubUsername</code>) or{" "}
            <code className="text-[var(--amber)]">GITHUB_USERNAME</code> env.
          </p>
        </>
      )}
    </div>
  );
}
