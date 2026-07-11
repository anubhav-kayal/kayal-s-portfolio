"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSound } from "@/components/juice/SoundProvider";
import { nodes } from "@/data/nodes";
import { useMapStore } from "@/store/map-store";

export function NodeModal() {
  const activeNodeId = useMapStore((s) => s.activeNodeId);
  const closeNode = useMapStore((s) => s.closeNode);
  const node = nodes.find((n) => n.id === activeNodeId) ?? null;
  const isBoss = node?.type === "boss";
  const isProject = node?.type === "project";
  const { play } = useSound();
  const [shake, setShake] = useState(false);

  useEffect(() => {
    if (!activeNodeId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeNode();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const n = nodes.find((x) => x.id === activeNodeId);
    if (n?.type === "boss") {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      play("boss");
      if (!reduce) {
        const id = window.requestAnimationFrame(() => {
          setShake(true);
          window.setTimeout(() => setShake(false), 300);
        });
        return () => {
          window.cancelAnimationFrame(id);
          window.removeEventListener("keydown", onKey);
          document.body.style.overflow = prev;
        };
      }
    }

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [activeNodeId, closeNode, play]);

  const media = node?.media ?? [];

  return (
    <AnimatePresence>
      {node && (
        <motion.div
          className={`fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center ${shake ? "boss-shake" : ""}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            aria-label="Close modal"
            className="absolute inset-0 backdrop-blur-[2px]"
            style={{ background: "var(--overlay)" }}
            onClick={closeNode}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="node-modal-title"
            initial={isBoss ? { opacity: 0, scale: 0.88, y: 24 } : { opacity: 0, y: 40 }}
            animate={isBoss ? { opacity: 1, scale: 1, y: 0 } : { opacity: 1, y: 0 }}
            exit={isBoss ? { opacity: 0, scale: 0.92, y: 16 } : { opacity: 0, y: 24 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className={`relative z-10 max-h-[85vh] w-full max-w-lg overflow-y-auto border ${
              isBoss
                ? "border-[var(--coral)]/50 bg-[var(--surface-elevated)]"
                : "border-[var(--line-strong)] bg-[var(--surface-elevated)]"
            }`}
            style={{ borderRadius: 8 }}
          >
            <div
              className={`px-5 py-3 font-mono text-[11px] uppercase tracking-[0.14em] ${
                isBoss
                  ? "bg-[rgba(226,112,75,0.12)] text-[var(--coral)]"
                  : "bg-[rgba(227,168,87,0.1)] text-[var(--amber)]"
              }`}
            >
              {isBoss ? "Boss encounter" : node.type}
              {node.period ? ` · ${node.period}` : ""}
            </div>

            {isProject && media.length > 0 && (
              <div className="relative border-b border-[var(--line)] bg-[var(--ink)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={media[0]?.src}
                  alt={media[0]?.alt ?? node.title}
                  className="aspect-[16/9] w-full object-cover"
                  loading="lazy"
                />
              </div>
            )}

            <div className="px-5 py-5">
              {isBoss && node.company && (
                <p className="mb-1 font-mono text-xs uppercase tracking-[0.1em] text-[var(--parchment-dim)]">
                  {node.company}
                </p>
              )}
              <h2
                id="node-modal-title"
                className="font-[family-name:var(--font-display)] text-2xl text-[var(--parchment)]"
              >
                {node.title}
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-[var(--parchment-dim)]">
                {node.summary}
              </p>

              {isProject && node.caseStudy && (
                <div className="mt-6 space-y-4">
                  {(
                    [
                      ["Problem", node.caseStudy.problem],
                      ["Approach", node.caseStudy.approach],
                      ["Impact", node.caseStudy.impact],
                    ] as const
                  ).map(([label, body]) => (
                    <div key={label} className="border-l-2 border-[var(--amber)] pl-4">
                      <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--amber)]">
                        {label}
                      </span>
                      <p className="mt-1 text-[14px] leading-relaxed text-[var(--parchment)]">
                        {body}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {isBoss && node.impact && (
                <div className="mt-5 border-l-2 border-[var(--coral)] pl-4">
                  <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--coral)]">
                    Outcome
                  </span>
                  <p className="mt-1 text-[15px] text-[var(--parchment)]">
                    {node.impact}
                  </p>
                </div>
              )}

              {node.tech.length > 0 && (
                <div className="mt-5">
                  <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--amber-dim)]">
                    {isBoss ? "Loadout" : "Stack"}
                  </span>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {node.tech.map((t) => (
                      <li
                        key={t}
                        className="border border-[var(--line)] bg-[var(--surface)] px-2.5 py-1 font-mono text-[11px] text-[var(--parchment-dim)]"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {(node.links.github || node.links.live) && (
                <div className="mt-6 flex flex-wrap gap-3">
                  {node.links.github && (
                    <a
                      href={node.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs uppercase tracking-[0.1em] text-[var(--amber)] underline-offset-4 hover:underline"
                    >
                      GitHub →
                    </a>
                  )}
                  {node.links.live && (
                    <a
                      href={node.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs uppercase tracking-[0.1em] text-[var(--teal)] underline-offset-4 hover:underline"
                    >
                      Live →
                    </a>
                  )}
                </div>
              )}
            </div>

            <div className="flex justify-end border-t border-[var(--line)] px-5 py-3">
              <button
                type="button"
                onClick={closeNode}
                className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--parchment-dim)] transition hover:text-[var(--parchment)]"
              >
                Close [esc]
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
