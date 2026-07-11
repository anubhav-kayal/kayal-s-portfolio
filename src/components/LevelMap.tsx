"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { buildPathD, MAP_VIEWBOX, nodes } from "@/data/nodes";
import { useMapStore } from "@/store/map-store";
import { MapNodeMarker } from "./MapNodeMarker";

const pathD = buildPathD(nodes);

export function LevelMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.7", "end 0.35"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 28,
    restDelta: 0.001,
  });
  const pathLength = useTransform(smoothProgress, [0, 1], [0, 1]);

  const openNode = useMapStore((s) => s.openNode);
  const viewedIds = useMapStore((s) => s.viewedIds);
  const markViewed = useMapStore((s) => s.markViewed);

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Desktop / tablet winding map */}
      <div className="hidden md:block">
        <svg
          viewBox={`0 0 ${MAP_VIEWBOX.width} ${MAP_VIEWBOX.height}`}
          className="h-auto w-full"
          role="img"
          aria-label="Career level map path"
        >
          <defs>
            <linearGradient id="path-glow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e3a857" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#4a9c8c" stopOpacity="0.7" />
            </linearGradient>
            <filter id="soft-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Track underlay */}
          <path
            d={pathD}
            fill="none"
            stroke="rgba(243,237,224,0.12)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Drawn path */}
          <motion.path
            d={pathD}
            fill="none"
            stroke="url(#path-glow)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ pathLength }}
            filter="url(#soft-glow)"
          />

          {nodes.map((node, index) => (
            <MapNodeMarker
              key={node.id}
              node={node}
              index={index}
              viewed={viewedIds.has(node.id)}
              onSelect={() => openNode(node.id)}
              onEnterView={() => markViewed(node.id)}
              progress={smoothProgress}
              total={nodes.length}
            />
          ))}
        </svg>
      </div>

      {/* Mobile vertical fallback */}
      <div className="md:hidden">
        <ol className="relative mx-auto max-w-md space-y-0 pl-2">
          <div
            className="absolute top-3 bottom-3 left-[19px] w-px bg-[repeating-linear-gradient(to_bottom,rgba(243,237,224,0.28)_0_6px,transparent_6px_12px)]"
            aria-hidden
          />
          {nodes.map((node, index) => (
            <li key={node.id} className="relative flex gap-4 pb-10 last:pb-0">
              <button
                type="button"
                onClick={() => openNode(node.id)}
                className={`relative z-10 mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-[11px] font-mono transition ${
                  node.type === "boss"
                    ? "border-[var(--coral)] bg-[var(--ink)] text-[var(--coral)]"
                    : node.type === "start" || node.type === "checkpoint"
                      ? "border-[var(--teal)] bg-[var(--ink)] text-[var(--teal)]"
                      : "border-[var(--amber)] bg-[var(--ink)] text-[var(--amber)]"
                }`}
                aria-label={`Open ${node.title}`}
              >
                {index + 1}
              </button>
              <button
                type="button"
                onClick={() => openNode(node.id)}
                className="flex-1 rounded-md border border-[var(--line)] bg-[var(--ink-2)] px-4 py-3 text-left transition hover:border-[var(--line-strong)]"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--amber-dim)]">
                  {node.type}
                </span>
                <span className="mt-1 block font-[family-name:var(--font-display)] text-lg text-[var(--parchment)]">
                  {node.title}
                </span>
                <span className="mt-1 block text-sm text-[var(--parchment-dim)] line-clamp-2">
                  {node.summary}
                </span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
