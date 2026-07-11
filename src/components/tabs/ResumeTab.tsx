"use client";

import { motion } from "framer-motion";

export function ResumeTab() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-12 sm:px-10">
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
        className="mt-4 max-w-[52ch] text-[var(--parchment-dim)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        Preview below, or download a copy. Replace{" "}
        <code className="font-mono text-[var(--amber)]">public/resume.pdf</code>{" "}
        with your real file when ready.
      </motion.p>
      <motion.div
        className="mt-6 flex flex-wrap gap-3"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <a
          href="/resume.pdf"
          download="Anubhav-Kayal-Resume.pdf"
          className="border border-[var(--teal)] bg-[var(--glow-teal)] px-5 py-2.5 font-mono text-xs uppercase tracking-[0.12em] text-[var(--teal)] transition hover:brightness-110"
        >
          Download PDF
        </a>
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="border border-[var(--line-strong)] px-5 py-2.5 font-mono text-xs uppercase tracking-[0.12em] text-[var(--parchment-dim)] transition hover:text-[var(--parchment)]"
        >
          Open in new tab →
        </a>
      </motion.div>

      <motion.div
        className="mt-10 overflow-hidden border border-[var(--line)] bg-[var(--surface)]"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center justify-between border-b border-[var(--line)] px-4 py-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--parchment-dim)]">
            resume.pdf
          </span>
          <span className="font-mono text-[10px] text-[var(--amber-dim)]">
            preview
          </span>
        </div>
        <iframe
          title="Resume PDF preview"
          src="/resume.pdf#view=FitH"
          className="h-[min(72vh,820px)] w-full bg-[var(--ink)]"
        />
      </motion.div>
    </div>
  );
}
