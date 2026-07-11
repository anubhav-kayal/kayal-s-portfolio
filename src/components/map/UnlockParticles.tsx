"use client";

import { useEffect, useRef } from "react";
import { useMapStore } from "@/store/map-store";
import { useMediaQuery } from "@/hooks/useMediaQuery";

type Particle = {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
};

export function UnlockParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const unlockedIds = useMapStore((s) => s.unlockedIds);
  const prevCount = useRef(unlockedIds.size);
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");

  useEffect(() => {
    if (reduced) return;
    if (unlockedIds.size <= prevCount.current) {
      prevCount.current = unlockedIds.size;
      return;
    }
    prevCount.current = unlockedIds.size;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const cx = rect.width * 0.5;
    const cy = Math.min(rect.height * 0.35, 280);
    const colors = ["#e3a857", "#4a9c8c", "#e2704b", "#e3a857"];

    for (let i = 0; i < 18; i++) {
      const angle = (Math.PI * 2 * i) / 18 + Math.random() * 0.4;
      const speed = 1.2 + Math.random() * 2.4;
      particlesRef.current.push({
        id: Date.now() + i,
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1,
        life: 1,
        color: colors[i % colors.length],
      });
    }
  }, [unlockedIds, reduced]);

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const tick = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      ctx.clearRect(0, 0, w, h);
      particlesRef.current = particlesRef.current.filter((p) => p.life > 0.02);
      for (const p of particlesRef.current) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.04;
        p.life *= 0.96;
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-20"
      aria-hidden
    />
  );
}
