"use client";

import { motion } from "framer-motion";
import { academics } from "@/data/academics";
import { achievements } from "@/data/achievements";
import type { AchievementKind } from "@/data/types";

const KIND_LABEL: Record<AchievementKind, string> = {
  award: "Award",
  hackathon: "Hackathon",
  contest: "Contest",
  scholarship: "Scholarship",
  other: "Other",
};

export function AcademicsTab() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-12 sm:px-10">
      <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-[var(--teal)]">
        Training grounds
      </p>
      <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl text-[var(--parchment)]">
        Academics
      </h2>
      <p className="mt-3 max-w-[52ch] text-[var(--parchment-dim)]">
        Degrees, coursework, and the wins that sit beside the map — placeholders
        until your details land.
      </p>

      <ol className="relative mt-10 space-y-0 pl-1">
        <div
          className="absolute top-2 bottom-2 left-[11px] w-px bg-[repeating-linear-gradient(to_bottom,var(--line-strong)_0_6px,transparent_6px_12px)]"
          aria-hidden
        />
        {academics.map((entry, i) => (
          <motion.li
            key={entry.id}
            className="relative flex gap-5 pb-10 last:pb-0"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 }}
          >
            <span className="relative z-10 mt-1.5 h-6 w-6 shrink-0 rounded-full border border-[var(--teal)] bg-[var(--ink)]" />
            <div className="flex-1 border border-[var(--line)] bg-[var(--surface)] px-5 py-4">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="font-[family-name:var(--font-display)] text-xl text-[var(--parchment)]">
                  {entry.school}
                </h3>
                <span className="font-mono text-[11px] text-[var(--parchment-dim)]">
                  {entry.period}
                </span>
              </div>
              <p className="mt-1 text-sm text-[var(--amber)]">
                {entry.degree} · {entry.field}
                {entry.gpa ? ` · GPA ${entry.gpa}` : ""}
              </p>
              <ul className="mt-3 space-y-1.5">
                {entry.highlights.map((h) => (
                  <li
                    key={h}
                    className="text-sm text-[var(--parchment-dim)] before:mr-2 before:text-[var(--teal)] before:content-['▸']"
                  >
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </motion.li>
        ))}
      </ol>

      <div className="mt-16">
        <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-[var(--amber)]">
          Achievements
        </p>
        <h3 className="mt-2 font-[family-name:var(--font-display)] text-2xl text-[var(--parchment)]">
          Unlocked elsewhere
        </h3>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {achievements.map((a, i) => (
            <motion.li
              key={a.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.05 }}
              className="border border-[var(--line)] bg-[var(--surface)] px-4 py-4"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--coral)]">
                {KIND_LABEL[a.kind]} · {a.year}
              </span>
              <p className="mt-2 font-[family-name:var(--font-display)] text-lg text-[var(--parchment)]">
                {a.title}
              </p>
              {a.org && (
                <p className="mt-0.5 font-mono text-[11px] text-[var(--parchment-dim)]">
                  {a.org}
                </p>
              )}
              <p className="mt-2 text-sm text-[var(--parchment-dim)]">
                {a.summary}
              </p>
              {a.link && a.link !== "#" && (
                <a
                  href={a.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--teal)] underline-offset-4 hover:underline"
                >
                  Link →
                </a>
              )}
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}
