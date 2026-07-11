"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { academics } from "@/data/academics";
import { achievements } from "@/data/achievements";
import { nodes } from "@/data/nodes";
import { socials } from "@/data/socials";
import { TABS, useMapStore, type TabId } from "@/store/map-store";

type PaletteItem = {
  id: string;
  label: string;
  hint: string;
  group: string;
  run: () => void;
};

export function CommandPalette() {
  const open = useMapStore((s) => s.paletteOpen);
  const setPaletteOpen = useMapStore((s) => s.setPaletteOpen);
  const setTab = useMapStore((s) => s.setTab);
  const openNode = useMapStore((s) => s.openNode);
  const unlockedIds = useMapStore((s) => s.unlockedIds);

  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const items = useMemo<PaletteItem[]>(() => {
    const list: PaletteItem[] = [];

    for (const tab of TABS) {
      list.push({
        id: `tab-${tab.id}`,
        label: tab.label,
        hint: "Tab",
        group: "Navigate",
        run: () => setTab(tab.id),
      });
    }

    for (const node of nodes) {
      if (node.type === "secret" && !unlockedIds.has(node.id)) continue;
      const locked = !unlockedIds.has(node.id);
      list.push({
        id: `node-${node.id}`,
        label: locked ? `${node.title} (locked)` : node.title,
        hint: node.type,
        group:
          node.type === "boss"
            ? "Experience"
            : node.type === "secret"
              ? "Secret"
              : "Map nodes",
        run: () => {
          if (locked) {
            setTab("map");
            return;
          }
          setTab("map");
          openNode(node.id);
        },
      });
    }

    for (const a of academics) {
      list.push({
        id: `acad-${a.id}`,
        label: a.school,
        hint: a.degree,
        group: "Academics",
        run: () => setTab("academics"),
      });
    }

    for (const a of achievements) {
      list.push({
        id: `ach-${a.id}`,
        label: a.title,
        hint: a.kind,
        group: "Achievements",
        run: () => setTab("academics"),
      });
    }

    for (const s of socials) {
      list.push({
        id: `social-${s.id}`,
        label: s.label,
        hint: s.handle,
        group: "Socials",
        run: () => {
          window.open(s.href, "_blank", "noopener,noreferrer");
        },
      });
    }

    return list;
  }, [unlockedIds, setTab, openNode]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items.slice(0, 40);
    return items
      .filter(
        (item) =>
          item.label.toLowerCase().includes(q) ||
          item.hint.toLowerCase().includes(q) ||
          item.group.toLowerCase().includes(q),
      )
      .slice(0, 40);
  }, [items, query]);

  const rows = useMemo(() => {
    const out: { kind: "group" | "item"; key: string; item?: PaletteItem; index?: number; label?: string }[] = [];
    let last = "";
    filtered.forEach((item, index) => {
      if (item.group !== last) {
        last = item.group;
        out.push({ kind: "group", key: `g-${item.group}-${index}`, label: item.group });
      }
      out.push({ kind: "item", key: item.id, item, index });
    });
    return out;
  }, [filtered]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen(!useMapStore.getState().paletteOpen);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setPaletteOpen]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const id = window.requestAnimationFrame(() => {
      setQuery("");
      setActive(0);
      inputRef.current?.focus();
    });
    return () => {
      document.body.style.overflow = prev;
      window.cancelAnimationFrame(id);
    };
  }, [open]);

  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(
      `[data-palette-index="${active}"]`,
    );
    el?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const closePalette = () => {
    setPaletteOpen(false);
  };

  const runItem = (item: PaletteItem) => {
    closePalette();
    item.run();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-start justify-center px-4 pt-[10vh] sm:pt-[14vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-[var(--overlay)] backdrop-blur-sm"
            aria-label="Close command palette"
            onClick={closePalette}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 420, damping: 32 }}
            className="relative z-10 flex w-full max-w-xl flex-col overflow-hidden rounded-lg border border-[var(--palette-border)] bg-[var(--palette-bg)] shadow-[0_24px_80px_rgba(0,0,0,0.35)]"
          >
            <div className="flex items-center gap-3 border-b border-[var(--palette-border)] px-4">
              <span className="shrink-0 rounded border border-[var(--palette-border)] bg-[var(--palette-row)] px-1.5 py-0.5 font-mono text-[10px] font-medium text-[var(--amber)]">
                ⌘K
              </span>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    closePalette();
                  } else if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setActive((i) =>
                      Math.min(i + 1, Math.max(filtered.length - 1, 0)),
                    );
                  } else if (e.key === "ArrowUp") {
                    e.preventDefault();
                    setActive((i) => Math.max(i - 1, 0));
                  } else if (e.key === "Enter" && filtered[active]) {
                    e.preventDefault();
                    runItem(filtered[active]);
                  }
                }}
                placeholder="Search tabs, projects, internships, academics…"
                className="h-14 w-full bg-transparent text-[15px] text-[var(--parchment)] outline-none placeholder:text-[var(--parchment-dim)]"
                autoComplete="off"
                spellCheck={false}
              />
            </div>

            <ul
              ref={listRef}
              className="max-h-[min(52vh,420px)] overflow-y-auto overscroll-contain py-2"
            >
              {filtered.length === 0 && (
                <li className="px-5 py-10 text-center font-mono text-xs text-[var(--parchment-dim)]">
                  No matches for “{query}”
                </li>
              )}
              {rows.map((row) => {
                if (row.kind === "group") {
                  return (
                    <li
                      key={row.key}
                      className="px-5 pb-1 pt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--amber-dim)]"
                    >
                      {row.label}
                    </li>
                  );
                }
                const item = row.item!;
                const i = row.index!;
                const isActive = i === active;
                return (
                  <li key={row.key}>
                    <button
                      type="button"
                      data-palette-index={i}
                      onMouseEnter={() => setActive(i)}
                      onClick={() => runItem(item)}
                      className={`mx-2 flex w-[calc(100%-1rem)] items-center justify-between gap-3 rounded-md px-3 py-2.5 text-left transition-colors ${
                        isActive
                          ? "bg-[var(--palette-row-active)]"
                          : "bg-transparent hover:bg-[var(--palette-row)]"
                      }`}
                    >
                      <span className="min-w-0 truncate text-[14px] text-[var(--parchment)]">
                        {item.label}
                      </span>
                      <span
                        className={`shrink-0 rounded border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.06em] ${
                          isActive
                            ? "border-[var(--amber)]/40 text-[var(--amber)]"
                            : "border-[var(--palette-border)] text-[var(--parchment-dim)]"
                        }`}
                      >
                        {item.hint}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center justify-between gap-3 border-t border-[var(--palette-border)] bg-[var(--palette-row)] px-4 py-2.5 font-mono text-[10px] text-[var(--parchment-dim)]">
              <span>
                <kbd className="text-[var(--parchment)]">↑↓</kbd> move{" "}
                <span className="mx-1 opacity-40">·</span>
                <kbd className="text-[var(--parchment)]">↵</kbd> open{" "}
                <span className="mx-1 opacity-40">·</span>
                <kbd className="text-[var(--parchment)]">esc</kbd> close
              </span>
              <span className="tabular-nums text-[var(--amber-dim)]">
                {filtered.length} results
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function paletteShortcutLabel() {
  return "⌘K";
}

export type { TabId };
