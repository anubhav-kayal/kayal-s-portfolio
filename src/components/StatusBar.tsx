"use client";

import { nodes } from "@/data/nodes";
import { TABS, useMapStore } from "@/store/map-store";
import { useTheme } from "./ThemeProvider";

export function StatusBar() {
  const activeTab = useMapStore((s) => s.activeTab);
  const viewed = useMapStore((s) => s.viewedIds.size);
  const unlocked = useMapStore((s) => s.unlockedIds.size);
  const resetProgress = useMapStore((s) => s.resetProgress);
  const setPaletteOpen = useMapStore((s) => s.setPaletteOpen);
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
          <span className="text-[var(--amber)]">{unlocked}</span>/{nodes.length}{" "}
          unlocked
        </span>
        <span className="hidden tabular-nums md:inline">
          {viewed} viewed
        </span>
      </div>
      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <button
          type="button"
          onClick={() => setPaletteOpen(true)}
          className="hidden text-[var(--parchment-dim)] transition hover:text-[var(--amber)] sm:inline"
        >
          ⌘K
        </button>
        <button
          type="button"
          onClick={() => {
            if (
              window.confirm(
                "Reset map progress? All nodes except Spawn will lock again.",
              )
            ) {
              resetProgress();
            }
          }}
          className="text-[var(--parchment-dim)] transition hover:text-[var(--coral)]"
          title="New Game+"
        >
          reset
        </button>
        <span className="hidden capitalize sm:inline">{theme}</span>
        <span className="text-[var(--amber)]">level-map</span>
      </div>
    </footer>
  );
}
