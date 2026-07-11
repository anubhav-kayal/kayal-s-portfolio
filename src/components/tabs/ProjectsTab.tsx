"use client";

import { motion } from "framer-motion";
import { nodes } from "@/data/nodes";
import { useMapStore } from "@/store/map-store";

export function ProjectsTab() {
  const projects = nodes.filter((n) => n.type === "project");
  const openNode = useMapStore((s) => s.openNode);

  return (
    <div className="mx-auto max-w-4xl px-5 py-12 sm:px-10">
      <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-[var(--amber)]">
        Waypoints
      </p>
      <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl text-[var(--parchment)]">
        Projects
      </h2>
      <p className="mt-3 max-w-[52ch] text-[var(--parchment-dim)]">
        Seven nodes on the path. Click any to open the full card.
      </p>

      <ul className="mt-10 grid gap-3 sm:grid-cols-2">
        {projects.map((project, i) => (
          <motion.li
            key={project.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <button
              type="button"
              onClick={() => openNode(project.id)}
              className="group flex h-full w-full flex-col border border-[var(--line)] bg-[var(--ink-2)] px-5 py-5 text-left transition hover:border-[var(--amber)]/45"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--amber-dim)]">
                node_0{i + 1}
              </span>
              <span className="mt-2 font-[family-name:var(--font-display)] text-xl text-[var(--parchment)] group-hover:text-[var(--amber)]">
                {project.title}
              </span>
              <span className="mt-2 flex-1 text-sm leading-relaxed text-[var(--parchment-dim)]">
                {project.summary}
              </span>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <li
                    key={t}
                    className="border border-[var(--line)] px-2 py-0.5 font-mono text-[10px] text-[var(--parchment-dim)]"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </button>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
