"use client";

import { motion } from "framer-motion";
import { TABS, useMapStore, type TabId } from "@/store/map-store";
import { LiveClock } from "./LiveClock";
import { ThemeToggle } from "./ThemeToggle";

export function TopBar() {
  const activeTab = useMapStore((s) => s.activeTab);
  const setTab = useMapStore((s) => s.setTab);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[var(--ink)]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-3 py-2.5 sm:gap-4 sm:px-5">
        <LiveClock className="hidden min-w-[7.5rem] sm:block" />

        <nav
          className="flex min-w-0 flex-1 items-center justify-center gap-0.5 overflow-x-auto scrollbar-none sm:gap-1"
          aria-label="Primary"
        >
          {TABS.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setTab(tab.id)}
                className={`relative shrink-0 px-2.5 py-2 font-mono text-[11px] uppercase tracking-[0.1em] transition sm:px-3 sm:text-[12px] ${
                  active
                    ? "text-[var(--parchment)]"
                    : "text-[var(--parchment-dim)] hover:text-[var(--parchment)]"
                }`}
                aria-current={active ? "page" : undefined}
              >
                {tab.label}
                {active && (
                  <motion.span
                    layoutId="tab-underline"
                    className="absolute inset-x-2 -bottom-0.5 h-px bg-[var(--amber)]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        <div className="flex min-w-0 items-center justify-end gap-2 sm:min-w-[7.5rem]">
          <span className="hidden rounded border border-[var(--line)] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--teal)] sm:inline">
            live
          </span>
          <ThemeToggle />
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-[var(--line)] px-3 py-1.5 sm:hidden">
        <LiveClock />
        <TabHint tab={activeTab} />
      </div>
    </header>
  );
}

function TabHint({ tab }: { tab: TabId }) {
  return (
    <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--amber-dim)]">
      {tab}.tsx
    </span>
  );
}
