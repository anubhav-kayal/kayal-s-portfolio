"use client";

import { motion } from "framer-motion";
import { nodes } from "@/data/nodes";
import { useMapStore } from "@/store/map-store";

export function ExperienceTab() {
  const bosses = nodes.filter((n) => n.type === "boss");
  const openNode = useMapStore((s) => s.openNode);

  return (
    <div className="mx-auto max-w-3xl px-5 py-12 sm:px-10">
      <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-[var(--coral)]">
        Boss encounters
      </p>
      <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl text-[var(--parchment)]">
        Experience
      </h2>
      <p className="mt-3 max-w-[52ch] text-[var(--parchment-dim)]">
        Internships as fights — company is the boss, impact is the outcome,
        stack is the loadout.
      </p>

      <ol className="mt-10 space-y-3">
        {bosses.map((boss, i) => (
          <motion.li
            key={boss.id}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.07 }}
          >
            <button
              type="button"
              onClick={() => openNode(boss.id)}
              className="group flex w-full items-start gap-4 border border-[var(--line)] bg-[var(--ink-2)] px-4 py-4 text-left transition hover:border-[var(--coral)]/50"
            >
              <span className="mt-1 font-mono text-xs text-[var(--coral)]">
                0{i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="font-[family-name:var(--font-display)] text-xl text-[var(--parchment)] group-hover:text-[var(--coral)]">
                    {boss.company ?? boss.title}
                  </span>
                  {boss.period && (
                    <span className="font-mono text-[11px] text-[var(--parchment-dim)]">
                      {boss.period}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-[var(--parchment-dim)]">
                  {boss.impact ?? boss.summary}
                </p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {boss.tech.map((t) => (
                    <li
                      key={t}
                      className="border border-[var(--line)] px-2 py-0.5 font-mono text-[10px] text-[var(--parchment-dim)]"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--parchment-dim)] opacity-0 transition group-hover:opacity-100">
                open
              </span>
            </button>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
