"use client";

import { motion } from "framer-motion";
import { nodes } from "@/data/nodes";
import { useMapStore } from "@/store/map-store";
import { Typewriter } from "@/components/Typewriter";

const PHRASES = [
  "build systems that ship.",
  "turn internships into boss fights.",
  "map projects as waypoints.",
  "keep a live character sheet.",
];

export function HomeTab() {
  const setTab = useMapStore((s) => s.setTab);
  const setPaletteOpen = useMapStore((s) => s.setPaletteOpen);
  const viewedCount = useMapStore((s) => s.viewedIds.size);
  const unlockedCount = useMapStore((s) => s.unlockedIds.size);
  const resetProgress = useMapStore((s) => s.resetProgress);
  const projectCount = nodes.filter((n) => n.type === "project").length;
  const bossCount = nodes.filter((n) => n.type === "boss").length;

  return (
    <div className="relative overflow-hidden px-5 py-16 sm:px-10 sm:py-24">
      <div className="relative mx-auto max-w-3xl">
        <motion.p
          className="mb-4 font-mono text-[12px] uppercase tracking-[0.14em] text-[var(--amber)]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          player_one · online
        </motion.p>

        <motion.h1
          className="font-[family-name:var(--font-display)] text-[clamp(2.6rem,8vw,4.6rem)] font-semibold leading-[1.02] tracking-[-0.02em] text-[var(--parchment)]"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.06 }}
        >
          Anubhav Kayal
        </motion.h1>

        <motion.p
          className="mt-5 min-h-[2.5rem] text-xl text-[var(--parchment-dim)] sm:text-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
        >
          <span className="text-[var(--parchment)]">I </span>
          <Typewriter
            phrases={PHRASES}
            className="font-[family-name:var(--font-display)] italic text-[var(--amber)]"
          />
        </motion.p>

        <motion.p
          className="mt-6 max-w-[42ch] text-[15px] leading-relaxed text-[var(--parchment-dim)]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22 }}
        >
          A scroll-through level map of work so far — projects as waypoints,
          internships as boss encounters, academics on the side path. Press{" "}
          <button
            type="button"
            onClick={() => setPaletteOpen(true)}
            className="font-mono text-[var(--amber)] underline-offset-2 hover:underline"
          >
            ⌘K
          </button>{" "}
          to jump anywhere.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <button
            type="button"
            onClick={() => setTab("map")}
            className="border border-[var(--amber)] bg-[var(--glow)] px-5 py-2.5 font-mono text-xs uppercase tracking-[0.12em] text-[var(--amber)] transition hover:brightness-110"
          >
            Enter the map →
          </button>
          <button
            type="button"
            onClick={() => setTab("academics")}
            className="border border-[var(--line-strong)] bg-[var(--surface)] px-5 py-2.5 font-mono text-xs uppercase tracking-[0.12em] text-[var(--parchment-dim)] transition hover:border-[var(--parchment-dim)] hover:text-[var(--parchment)]"
          >
            Academics
          </button>
          <button
            type="button"
            onClick={() => {
              if (
                window.confirm(
                  "Reset map progress? All nodes except Spawn will lock again.",
                )
              ) {
                resetProgress();
              }
            }}
            className="border border-[var(--line)] px-5 py-2.5 font-mono text-xs uppercase tracking-[0.12em] text-[var(--parchment-dim)] transition hover:text-[var(--coral)]"
          >
            New Game+
          </button>
        </motion.div>

        <motion.div
          className="mt-14 grid grid-cols-2 border-y border-[var(--line-strong)] bg-[var(--surface)]/40 sm:grid-cols-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.38 }}
        >
          {[
            { num: String(projectCount), label: "projects" },
            { num: String(bossCount), label: "internships" },
            {
              num: `${unlockedCount}/${nodes.length}`,
              label: "unlocked",
            },
            { num: `${viewedCount}`, label: "viewed" },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className={`px-3 py-4 ${i % 2 === 0 ? "border-r border-[var(--line)]" : ""} sm:border-r sm:border-[var(--line)] sm:last:border-r-0`}
            >
              <span className="block font-[family-name:var(--font-display)] text-2xl text-[var(--amber)]">
                {stat.num}
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-[var(--parchment-dim)]">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
