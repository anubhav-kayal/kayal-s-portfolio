"use client";

import { nodes } from "@/data/nodes";
import { TABS, useMapStore } from "@/store/map-store";
import { useTheme } from "./ThemeProvider";

export function StatusBar() {
  const activeTab = useMapStore((s) => s.activeTab);
  const viewed = useMapStore((s) => s.viewedIds.size);
  const label = TABS.find((t) => t.id === activeTab)?.label ?? activeTab;
  const { theme } = useTheme();

  return (
    <footer className="fixed inset-x-0 bottom-0 z-40 flex h-7 items-center justify-between gap-3 border-t border-[var(--line)] bg-[var(--ink-2)] px-3 font-mono text-[10px] text-[var(--parchment-dim)]">
      <div className="flex min-w-0 items-center gap-3 overflow-hidden">
        <span className="text-[var(--teal)]">main*</span>
        <span className="hidden truncate sm:inline">
          portfolio / {label.toLowerCase()}
        </span>
        <span className="tabular-nums">
          <span className="text-[var(--amber)]">{viewed}</span>/{nodes.length}{" "}
          nodes
        </span>
      </div>
      <div className="flex shrink-0 items-center gap-3">
        <span className="hidden sm:inline">UTF-8</span>
        <span className="hidden md:inline">TypeScript</span>
        <span className="hidden capitalize sm:inline">{theme}</span>
        <span className="text-[var(--amber)]">level-map</span>
      </div>
    </footer>
  );
}
