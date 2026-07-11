"use client";

import { useEffect, useState } from "react";

function formatParts(date: Date) {
  const time = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  }).format(date);

  return { time, zone: "GMT+5:30" };
}

export function LiveClock({ className = "" }: { className?: string }) {
  const [now, setNow] = useState(() => formatParts(new Date()));

  useEffect(() => {
    const id = window.setInterval(() => {
      setNow(formatParts(new Date()));
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      className={`font-mono text-[11px] leading-tight tracking-wide text-[var(--parchment-dim)] ${className}`}
      aria-live="polite"
      aria-atomic="true"
    >
      <span className="block text-[var(--parchment)] tabular-nums">
        {now.time}
      </span>
      <span className="block text-[10px] opacity-70">{now.zone} (IST)</span>
    </div>
  );
}
