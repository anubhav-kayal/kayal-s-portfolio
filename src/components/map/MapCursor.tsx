"use client";

import { useEffect, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

type TrailDot = { x: number; y: number; life: number };

/** Custom crosshair + trail — Map tab, fine pointer only */
export function MapCursor({ enabled }: { enabled: boolean }) {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [trail, setTrail] = useState<TrailDot[]>([]);
  const fine = useMediaQuery("(pointer: fine)");
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  useEffect(() => {
    if (!enabled || !fine) return;

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (reducedMotion) return;
      setTrail((prev) =>
        [...prev, { x: e.clientX, y: e.clientY, life: 1 }].slice(-12),
      );
    };
    const onLeave = () => {
      setPos(null);
      setTrail([]);
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);

    const decay = window.setInterval(() => {
      setTrail((prev) =>
        prev
          .map((d) => ({ ...d, life: d.life * 0.82 }))
          .filter((d) => d.life > 0.08),
      );
    }, 40);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      window.clearInterval(decay);
    };
  }, [enabled, fine, reducedMotion]);

  if (!enabled || !fine || !pos) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[55]" aria-hidden>
      {trail.map((d, i) => (
        <span
          key={`${d.x}-${d.y}-${i}`}
          className="absolute h-1 w-1 rounded-full bg-[var(--amber)]"
          style={{
            left: d.x,
            top: d.y,
            opacity: d.life * 0.45,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
      <span
        className="absolute block"
        style={{ left: pos.x, top: pos.y, transform: "translate(-50%, -50%)" }}
      >
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <circle cx="11" cy="11" r="3" stroke="var(--amber)" strokeWidth="1.4" />
          <path d="M11 1v4M11 17v4M1 11h4M17 11h4" stroke="var(--amber)" strokeWidth="1.4" />
        </svg>
      </span>
    </div>
  );
}
