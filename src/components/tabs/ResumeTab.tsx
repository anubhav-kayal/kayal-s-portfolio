"use client";

import { motion } from "framer-motion";

export function ResumeTab() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-start px-5 py-16 sm:px-10 sm:py-24">
      <motion.p
        className="font-mono text-[12px] uppercase tracking-[0.14em] text-[var(--teal)]"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Document
      </motion.p>
      <motion.h2
        className="mt-2 font-[family-name:var(--font-display)] text-3xl text-[var(--parchment)]"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
      >
        Resume
      </motion.h2>
      <motion.p
        className="mt-4 text-[var(--parchment-dim)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        Placeholder — drop a PDF in <code className="font-mono text-[var(--amber)]">/public</code> and
        wire the link when you have the file.
      </motion.p>
      <motion.a
        href="/resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 border border-[var(--teal)] bg-[rgba(74,156,140,0.12)] px-5 py-2.5 font-mono text-xs uppercase tracking-[0.12em] text-[var(--teal)] transition hover:bg-[rgba(74,156,140,0.22)]"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18 }}
      >
        Open resume.pdf →
      </motion.a>
    </div>
  );
}
