"use client";

import { LevelMap } from "@/components/LevelMap";

export function MapTab() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-8">
      <div className="mb-8 flex flex-wrap items-baseline gap-3 px-1">
        <span className="rounded-[3px] border border-[rgba(227,168,87,0.3)] bg-[rgba(227,168,87,0.1)] px-2 py-0.5 font-mono text-[12px] text-[var(--amber-dim)]">
          map
        </span>
        <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--parchment)]">
          The path
        </h2>
        <p className="w-full text-sm text-[var(--parchment-dim)] sm:w-auto sm:ml-auto">
          Scroll to draw the route. Click a node to open it.
        </p>
      </div>
      <LevelMap />
    </div>
  );
}
