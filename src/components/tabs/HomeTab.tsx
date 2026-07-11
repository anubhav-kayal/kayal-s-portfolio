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
  const viewedCount = useMapStore((s) => s.viewedIds.size);
  const projectCount = nodes.filter((n) => n.type === "project").length;
  const bossCount = nodes.filter((n) => n.type === "boss").length;

  return (
    <div className="relative overflow-hidden px-5 py-16 sm:px-10 sm:py-24">
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% -10%, rgba(227,168,87,0.2), transparent 60%), radial-gradient(ellipse 40% 30% at 90% 20%, rgba(74,156,140,0.14), transparent 50%)",
        }}
      />

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
          internships as boss encounters, competitive stats as a live character
          sheet.
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
            className="border border-[var(--amber)] bg-[rgba(227,168,87,0.12)] px-5 py-2.5 font-mono text-xs uppercase tracking-[0.12em] text-[var(--amber)] transition hover:bg-[rgba(227,168,87,0.22)]"
          >
            Enter the map →
          </button>
          <button
            type="button"
            onClick={() => setTab("experience")}
            className="border border-[var(--line-strong)] px-5 py-2.5 font-mono text-xs uppercase tracking-[0.12em] text-[var(--parchment-dim)] transition hover:border-[var(--parchment-dim)] hover:text-[var(--parchment)]"
          >
            Boss fights
          </button>
        </motion.div>

        <motion.div
          className="mt-14 grid grid-cols-2 border-y border-[var(--line-strong)] sm:grid-cols-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.38 }}
        >
          {[
            { num: String(projectCount), label: "projects" },
            { num: String(bossCount), label: "internships" },
            { num: `${viewedCount}/${nodes.length}`, label: "explored" },
            { num: "7", label: "tabs" },
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
