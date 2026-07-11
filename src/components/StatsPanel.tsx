"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { GitHubContributions } from "@/components/GitHubContributions";
import { competitiveStats, githubUsername } from "@/data/socials";

function CountUp({
  value,
  active,
  duration = 900,
}: {
  value: number;
  active: boolean;
  duration?: number;
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!active) return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(value * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, value, duration]);

  return <>{display}</>;
}

export function StatsPanel() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const { leetcode, codeforces } = competitiveStats;

  return (
    <section
      ref={ref}
      id="character-sheet"
      className="mx-auto max-w-3xl px-6 py-20 sm:px-10"
    >
      <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-[var(--teal)]">
        Character sheet
      </p>
      <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl text-[var(--parchment)]">
        Competitive stats
      </h2>
      <p className="mt-3 max-w-[52ch] text-[var(--parchment-dim)]">
        LeetCode / Codeforces placeholders for now. GitHub contributions load
        live (or placeholder until you set your username).
      </p>

      <div className="mt-10 grid gap-px overflow-hidden border border-[var(--line)] bg-[var(--line)] sm:grid-cols-2">
        <motion.div
          className="bg-[var(--surface)] p-6"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45 }}
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--amber)]">
            LeetCode · {leetcode.username}
          </p>
          <p className="mt-3 font-[family-name:var(--font-display)] text-4xl text-[var(--parchment)]">
            <CountUp value={leetcode.totalSolved} active={inView} />
            <span className="ml-2 text-base text-[var(--parchment-dim)]">
              solved
            </span>
          </p>
          <dl className="mt-5 grid grid-cols-3 gap-3 font-mono text-xs">
            <div>
              <dt className="text-[var(--parchment-dim)]">Easy</dt>
              <dd className="mt-1 text-[var(--teal)]">
                <CountUp value={leetcode.easy} active={inView} />
              </dd>
            </div>
            <div>
              <dt className="text-[var(--parchment-dim)]">Medium</dt>
              <dd className="mt-1 text-[var(--amber)]">
                <CountUp value={leetcode.medium} active={inView} />
              </dd>
            </div>
            <div>
              <dt className="text-[var(--parchment-dim)]">Hard</dt>
              <dd className="mt-1 text-[var(--coral)]">
                <CountUp value={leetcode.hard} active={inView} />
              </dd>
            </div>
          </dl>
        </motion.div>

        <motion.div
          className="bg-[var(--surface)] p-6"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: 0.08 }}
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--coral)]">
            Codeforces · {codeforces.handle}
          </p>
          <p className="mt-3 font-[family-name:var(--font-display)] text-4xl text-[var(--parchment)]">
            <CountUp value={codeforces.rating} active={inView} />
            <span className="ml-2 text-base text-[var(--parchment-dim)]">
              rating
            </span>
          </p>
          <dl className="mt-5 grid grid-cols-2 gap-3 font-mono text-xs">
            <div>
              <dt className="text-[var(--parchment-dim)]">Max</dt>
              <dd className="mt-1 text-[var(--amber)]">
                <CountUp value={codeforces.maxRating} active={inView} />
              </dd>
            </div>
            <div>
              <dt className="text-[var(--parchment-dim)]">Rank</dt>
              <dd className="mt-1 capitalize text-[var(--parchment)]">
                {codeforces.rank}
              </dd>
            </div>
          </dl>
        </motion.div>
      </div>

      <motion.div
        className="mt-6"
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.45, delay: 0.12 }}
      >
        <GitHubContributions username={githubUsername} />
      </motion.div>
    </section>
  );
}
