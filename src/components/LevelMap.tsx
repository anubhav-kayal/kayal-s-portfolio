"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  buildPathD,
  CHECKPOINT_ORDER,
  MAP_VIEWBOX,
  nodes,
  pathNodes,
} from "@/data/nodes";
import { useMapStore } from "@/store/map-store";
import { useSound } from "@/components/juice/SoundProvider";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { MapNodeMarker } from "./MapNodeMarker";
import { MapTerrain } from "./map/MapTerrain";
import { UnlockParticles } from "./map/UnlockParticles";

const MAIN_PATH = pathNodes();
const START_Y = MAIN_PATH[0]?.y ?? 0;
const END_Y = MAIN_PATH[MAIN_PATH.length - 1]?.y ?? MAP_VIEWBOX.height;
const Y_SPAN = Math.max(END_Y - START_Y, 1);

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export function LevelMap() {
  const svgWrapRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const lengthRef = useRef(0);
  const lastOrderRef = useRef(-1);
  const [parallax, setParallax] = useState(0);
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  const openNode = useMapStore((s) => s.openNode);
  const unlockThroughOrder = useMapStore((s) => s.unlockThroughOrder);
  const viewedIds = useMapStore((s) => s.viewedIds);
  const unlockedIds = useMapStore((s) => s.unlockedIds);
  const { play } = useSound();
  const prevUnlock = useRef(unlockedIds.size);

  const secretUnlocked = unlockedIds.has("secret");
  const pathD = useMemo(() => buildPathD(MAIN_PATH), []);
  const secretNode = nodes.find((n) => n.type === "secret");
  const secretSpurD =
    secretUnlocked && secretNode
      ? (() => {
          const last = MAIN_PATH[MAIN_PATH.length - 1];
          if (!last) return "";
          const midY = (last.y + secretNode.y) / 2;
          return `M ${last.x} ${last.y} C ${last.x} ${midY}, ${secretNode.x} ${midY}, ${secretNode.x} ${secretNode.y}`;
        })()
      : "";
  const visibleNodes = useMemo(
    () => pathNodes(unlockedIds),
    [unlockedIds],
  );

  useEffect(() => {
    if (unlockedIds.size > prevUnlock.current) {
      play("unlock");
    }
    prevUnlock.current = unlockedIds.size;
  }, [unlockedIds, play]);

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

      const rect = wrap.getBoundingClientRect();
      const viewH = window.innerHeight || 1;
      const focusLine = viewH * 0.45;
      const mapHeight = Math.max(rect.height, 1);

      const focusSvgY =
        ((focusLine - rect.top) / mapHeight) * MAP_VIEWBOX.height;

      // Progress always measured against the main path (spawn → checkpoint)
      const pathProgress = clamp((focusSvgY - START_Y) / Y_SPAN, 0, 1);
      path.style.strokeDashoffset = `${length * (1 - pathProgress)}`;

      if (!reducedMotion) {
        setParallax(clamp((-rect.top / mapHeight) * 40, -30, 40));
      }

      let order = 0;
      for (const node of MAIN_PATH) {
        if (node.y <= focusSvgY + 30) {
          order = Math.max(order, node.unlockOrder);
        }
      }
      if (pathProgress >= 0.995) {
        order = CHECKPOINT_ORDER;
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
  }, [unlockThroughOrder, reducedMotion]);

  return (
    <div className={`relative w-full ${!reducedMotion ? "map-cursor-zone" : ""}`}>
      <UnlockParticles />

      <div
        className="pointer-events-none absolute inset-x-0 top-0 bottom-[45vh] opacity-60"
        style={{
          transform: reducedMotion ? undefined : `translateY(${parallax * 0.35}px)`,
          background:
            "radial-gradient(ellipse 55% 20% at 25% 10%, var(--terrain-a), transparent), radial-gradient(ellipse 45% 18% at 75% 40%, var(--terrain-b), transparent), radial-gradient(ellipse 50% 16% at 40% 70%, var(--terrain-a), transparent)",
        }}
        aria-hidden
      />

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
            <pattern
              id="path-grain"
              patternUnits="userSpaceOnUse"
              width="8"
              height="8"
            >
              <path
                d="M0 8 L8 0"
                stroke="var(--path-stroke)"
                strokeWidth="0.6"
                opacity="0.35"
              />
            </pattern>
          </defs>

          <g
            style={{
              transform: reducedMotion
                ? undefined
                : `translate(0px, ${parallax * 0.55}px)`,
            }}
          >
            <MapTerrain />
          </g>

          <path
            d={pathD}
            fill="none"
            stroke="var(--path-track)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d={pathD}
            fill="none"
            stroke="url(#path-grain)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.5"
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

          {secretSpurD && (
            <path
              d={secretSpurD}
              fill="none"
              stroke="var(--amber)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="6 5"
              opacity="0.85"
            />
          )}

          {visibleNodes.map((node) => (
            <MapNodeMarker
              key={node.id}
              node={node}
              viewed={viewedIds.has(node.id)}
              locked={!unlockedIds.has(node.id)}
              onSelect={() => {
                play("click");
                openNode(node.id);
              }}
            />
          ))}
        </svg>
      </div>

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
          {visibleNodes.map((node, index) => {
            const locked = !unlockedIds.has(node.id);
            return (
              <li key={node.id} className="relative flex gap-4 pb-8 last:pb-0">
                <button
                  type="button"
                  disabled={locked}
                  onClick={() => {
                    play("click");
                    openNode(node.id);
                  }}
                  className={`relative z-10 mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-[11px] font-mono transition disabled:opacity-40 ${
                    node.type === "boss"
                      ? "border-[var(--coral)] bg-[var(--ink)] text-[var(--coral)]"
                      : node.type === "secret"
                        ? "border-[var(--amber)] bg-[var(--ink)] text-[var(--amber)]"
                        : node.type === "start" || node.type === "checkpoint"
                          ? "border-[var(--teal)] bg-[var(--ink)] text-[var(--teal)]"
                          : "border-[var(--amber)] bg-[var(--ink)] text-[var(--amber)]"
                  }`}
                  aria-label={locked ? `Locked ${node.title}` : `Open ${node.title}`}
                >
                  {locked ? "·" : node.type === "secret" ? "?" : index + 1}
                </button>
                <button
                  type="button"
                  disabled={locked}
                  onClick={() => {
                    play("click");
                    openNode(node.id);
                  }}
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
