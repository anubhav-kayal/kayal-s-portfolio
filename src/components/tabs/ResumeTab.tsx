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
        Stub PDF is live at{" "}
        <code className="font-mono text-[var(--amber)]">/public/resume.pdf</code>.
        Replace that file with your real resume when ready.
      </motion.p>
      <motion.div
        className="mt-8 flex flex-wrap gap-3"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18 }}
      >
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="border border-[var(--teal)] bg-[var(--glow-teal)] px-5 py-2.5 font-mono text-xs uppercase tracking-[0.12em] text-[var(--teal)] transition hover:brightness-110"
        >
          Open resume.pdf →
        </a>
        <a
          href="/resume.pdf"
          download="Anubhav-Kayal-Resume.pdf"
          className="border border-[var(--line-strong)] px-5 py-2.5 font-mono text-xs uppercase tracking-[0.12em] text-[var(--parchment-dim)] transition hover:text-[var(--parchment)]"
        >
          Download
        </a>
      </motion.div>
    </div>
  );
}
