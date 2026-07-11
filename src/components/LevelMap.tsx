"use client";

import { useEffect, useRef } from "react";
import { buildPathD, MAP_VIEWBOX, nodes } from "@/data/nodes";
import { useMapStore } from "@/store/map-store";
import { MapNodeMarker } from "./MapNodeMarker";

const pathD = buildPathD(nodes);
const START_Y = nodes[0]?.y ?? 0;
const END_Y = nodes[nodes.length - 1]?.y ?? MAP_VIEWBOX.height;
const Y_SPAN = Math.max(END_Y - START_Y, 1);

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export function LevelMap() {
  const svgWrapRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const lengthRef = useRef(0);
  const lastOrderRef = useRef(-1);

  const openNode = useMapStore((s) => s.openNode);
  const unlockThroughOrder = useMapStore((s) => s.unlockThroughOrder);
  const viewedIds = useMapStore((s) => s.viewedIds);
  const unlockedIds = useMapStore((s) => s.unlockedIds);

  useEffect(() => {
    const wrap = svgWrapRef.current;
    const path = pathRef.current;
    if (!wrap || !path) return;

    const measure = () => {
      const len = path.getTotalLength();
      if (len > 0) {
        lengthRef.current = len;
        path.style.strokeDasharray = `${len}`;
      }
    };

    measure();

    let frame = 0;

    const update = () => {
      frame = 0;
      measure();
      const length = lengthRef.current;
      if (length <= 0) return;

      // Measure the SVG only — never include scroll spacer padding
      const rect = wrap.getBoundingClientRect();
      const viewH = window.innerHeight || 1;
      const focusLine = viewH * 0.45;
      const mapHeight = Math.max(rect.height, 1);

      const focusSvgY =
        ((focusLine - rect.top) / mapHeight) * MAP_VIEWBOX.height;

      const pathProgress = clamp((focusSvgY - START_Y) / Y_SPAN, 0, 1);
      path.style.strokeDashoffset = `${length * (1 - pathProgress)}`;

      let order = 0;
      for (const node of nodes) {
        if (node.y <= focusSvgY + 30) {
          order = Math.max(order, node.unlockOrder);
        }
      }
      if (pathProgress >= 0.995) {
        order = nodes[nodes.length - 1]?.unlockOrder ?? order;
      }

      if (order > lastOrderRef.current) {
        lastOrderRef.current = order;
        unlockThroughOrder(order);
      }
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [unlockThroughOrder]);

  return (
    <div className="relative w-full">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 bottom-[45vh] opacity-50"
        style={{
          background:
            "radial-gradient(ellipse 50% 18% at 30% 12%, var(--terrain-a), transparent), radial-gradient(ellipse 40% 16% at 70% 48%, var(--terrain-b), transparent)",
        }}
        aria-hidden
      />

      {/* Desktop map — ref is SVG bounds only */}
      <div ref={svgWrapRef} className="relative hidden md:block">
        <svg
          viewBox={`0 0 ${MAP_VIEWBOX.width} ${MAP_VIEWBOX.height}`}
          className="h-auto w-full"
          role="img"
          aria-label="Career level map path"
        >
          <defs>
            <linearGradient id="path-glow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--path-stroke)" stopOpacity="0.95" />
              <stop offset="100%" stopColor="var(--teal)" stopOpacity="0.85" />
            </linearGradient>
          </defs>

          <path
            d={pathD}
            fill="none"
            stroke="var(--path-track)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            ref={pathRef}
            d={pathD}
            fill="none"
            stroke="url(#path-glow)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {nodes.map((node) => (
            <MapNodeMarker
              key={node.id}
              node={node}
              viewed={viewedIds.has(node.id)}
              locked={!unlockedIds.has(node.id)}
              onSelect={() => openNode(node.id)}
            />
          ))}
        </svg>
      </div>

      {/* Lets Character Sheet scroll up to the focus line */}
      <div className="hidden h-[45vh] md:block" aria-hidden />

      <div className="relative md:hidden">
        <ol className="relative mx-auto max-w-md space-y-0 pl-2">
          <div
            className="absolute top-3 bottom-3 left-[19px] w-px"
            style={{
              background:
                "repeating-linear-gradient(to bottom, var(--line-strong) 0 6px, transparent 6px 12px)",
            }}
            aria-hidden
          />
          {nodes.map((node, index) => {
            const locked = !unlockedIds.has(node.id);
            return (
              <li key={node.id} className="relative flex gap-4 pb-8 last:pb-0">
                <button
                  type="button"
                  disabled={locked}
                  onClick={() => openNode(node.id)}
                  className={`relative z-10 mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-[11px] font-mono transition disabled:opacity-40 ${
                    node.type === "boss"
                      ? "border-[var(--coral)] bg-[var(--ink)] text-[var(--coral)]"
                      : node.type === "start" || node.type === "checkpoint"
                        ? "border-[var(--teal)] bg-[var(--ink)] text-[var(--teal)]"
                        : "border-[var(--amber)] bg-[var(--ink)] text-[var(--amber)]"
                  }`}
                  aria-label={locked ? `Locked ${node.title}` : `Open ${node.title}`}
                >
                  {locked ? "·" : index + 1}
                </button>
                <button
                  type="button"
                  disabled={locked}
                  onClick={() => openNode(node.id)}
                  className="flex-1 border border-[var(--line)] bg-[var(--surface)] px-4 py-3 text-left transition hover:border-[var(--line-strong)] disabled:opacity-45"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--amber-dim)]">
                    {locked ? "locked" : node.type}
                  </span>
                  <span className="mt-1 block font-[family-name:var(--font-display)] text-lg text-[var(--parchment)]">
                    {node.title}
                  </span>
                  <span className="mt-1 block text-sm text-[var(--parchment-dim)] line-clamp-2">
                    {locked
                      ? "Unlock previous nodes on the path to reveal this one."
                      : node.summary}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
