import { create } from "zustand";
import { getNextUnlockId, nodes, PROGRESS_STORAGE_KEY } from "@/data/nodes";

export type TabId =
  | "home"
  | "map"
  | "experience"
  | "academics"
  | "projects"
  | "stats"
  | "contact"
  | "resume";

export const TABS: { id: TabId; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "map", label: "Map" },
  { id: "experience", label: "Experience" },
  { id: "academics", label: "Academics" },
  { id: "projects", label: "Projects" },
  { id: "stats", label: "Stats" },
  { id: "contact", label: "Contact" },
  { id: "resume", label: "Resume" },
];

const START_ID = "start";

function initialUnlocked(): Set<string> {
  return new Set([START_ID]);
}

type PersistedProgress = {
  unlockedIds: string[];
  viewedIds: string[];
};

type MapStore = {
  viewedIds: Set<string>;
  unlockedIds: Set<string>;
  activeNodeId: string | null;
  activeTab: TabId;
  hydrated: boolean;
  paletteOpen: boolean;
  markViewed: (id: string) => void;
  unlock: (id: string) => void;
  unlockThroughOrder: (maxOrder: number) => void;
  unlockSecret: () => void;
  /** Unlock next node in sequence when current is reached */
  unlockNextFrom: (id: string) => void;
  openNode: (id: string) => void;
  closeNode: () => void;
  setTab: (tab: TabId) => void;
  setPaletteOpen: (open: boolean) => void;
  hydrate: () => void;
  resetProgress: () => void;
  persist: () => void;
};

function persistState(unlockedIds: Set<string>, viewedIds: Set<string>) {
  if (typeof window === "undefined") return;
  const payload: PersistedProgress = {
    unlockedIds: [...unlockedIds],
    viewedIds: [...viewedIds],
  };
  window.localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(payload));
}

export const useMapStore = create<MapStore>((set, get) => ({
  viewedIds: new Set<string>(),
  unlockedIds: initialUnlocked(),
  activeNodeId: null,
  activeTab: "home",
  hydrated: false,
  paletteOpen: false,

  persist: () => {
    const { unlockedIds, viewedIds } = get();
    persistState(unlockedIds, viewedIds);
  },

  markViewed: (id) =>
    set((state) => {
      if (state.viewedIds.has(id)) return state;
      const viewedIds = new Set(state.viewedIds);
      viewedIds.add(id);
      persistState(state.unlockedIds, viewedIds);
      return { viewedIds };
    }),

  unlock: (id) =>
    set((state) => {
      if (state.unlockedIds.has(id)) return state;
      const unlockedIds = new Set(state.unlockedIds);
      unlockedIds.add(id);
      persistState(unlockedIds, state.viewedIds);
      return { unlockedIds };
    }),

  /** Unlock every non-secret node with unlockOrder <= maxOrder (one persist) */
  unlockThroughOrder: (maxOrder: number) =>
    set((state) => {
      let changed = false;
      const unlockedIds = new Set(state.unlockedIds);
      const viewedIds = new Set(state.viewedIds);
      for (const n of nodes) {
        if (n.type === "secret") continue;
        if (n.unlockOrder <= maxOrder) {
          if (!unlockedIds.has(n.id)) {
            unlockedIds.add(n.id);
            changed = true;
          }
          if (!viewedIds.has(n.id)) {
            viewedIds.add(n.id);
            changed = true;
          }
        }
      }
      // Auto-reveal secret once the main path is fully cleared
      if (maxOrder >= 12 && !unlockedIds.has("secret")) {
        unlockedIds.add("secret");
        changed = true;
      }
      if (!changed) return state;
      persistState(unlockedIds, viewedIds);
      return { unlockedIds, viewedIds };
    }),

  unlockSecret: () =>
    set((state) => {
      if (state.unlockedIds.has("secret")) return state;
      const unlockedIds = new Set(state.unlockedIds);
      unlockedIds.add("secret");
      persistState(unlockedIds, state.viewedIds);
      return { unlockedIds, activeTab: "map" as TabId };
    }),

  unlockNextFrom: (id) => {
    const state = get();
    if (!state.unlockedIds.has(id)) return;
    const current = nodes.find((n) => n.id === id);
    if (!current || current.type === "secret") return;
    const next = nodes.find(
      (n) =>
        n.type !== "secret" && n.unlockOrder === current.unlockOrder + 1,
    );
    if (next) get().unlock(next.id);
  },

  openNode: (id) => {
    const state = get();
    if (!state.unlockedIds.has(id)) return;
    const viewedIds = new Set(state.viewedIds);
    viewedIds.add(id);
    persistState(state.unlockedIds, viewedIds);
    const current = nodes.find((n) => n.id === id);
    let unlockedIds = state.unlockedIds;
    if (current && current.type !== "secret") {
      const next = nodes.find(
        (n) =>
          n.type !== "secret" && n.unlockOrder === current.unlockOrder + 1,
      );
      if (next && !unlockedIds.has(next.id)) {
        unlockedIds = new Set(unlockedIds);
        unlockedIds.add(next.id);
        persistState(unlockedIds, viewedIds);
      }
      // Opening checkpoint also reveals secret
      if (current.id === "checkpoint" && !unlockedIds.has("secret")) {
        unlockedIds = new Set(unlockedIds);
        unlockedIds.add("secret");
        persistState(unlockedIds, viewedIds);
      }
    }
    set({ activeNodeId: id, viewedIds, unlockedIds });
  },

  closeNode: () => set({ activeNodeId: null }),

  setTab: (tab) => set({ activeTab: tab, activeNodeId: null }),

  setPaletteOpen: (open) => set({ paletteOpen: open }),

  hydrate: () => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(PROGRESS_STORAGE_KEY);
      if (!raw) {
        set({ hydrated: true });
        return;
      }
      const parsed = JSON.parse(raw) as PersistedProgress;
      const validIds = new Set(nodes.map((n) => n.id));
      const hadSecret = (parsed.unlockedIds ?? []).includes("secret");
      const unlockedIds = new Set(
        (parsed.unlockedIds ?? []).filter(
          (id) => validIds.has(id) && id !== "secret",
        ),
      );
      unlockedIds.add(START_ID);
      // Contiguous unlock for main path only — secret is opt-in
      const maxOrder = Math.max(
        0,
        ...[...unlockedIds].map(
          (id) => nodes.find((n) => n.id === id)?.unlockOrder ?? 0,
        ),
      );
      for (const n of nodes) {
        if (n.type === "secret") continue;
        if (n.unlockOrder <= maxOrder) unlockedIds.add(n.id);
      }
      if (hadSecret || maxOrder >= 12) unlockedIds.add("secret");
      const viewedIds = new Set(
        (parsed.viewedIds ?? []).filter((id) => validIds.has(id)),
      );
      set({ unlockedIds, viewedIds, hydrated: true });
    } catch {
      set({ hydrated: true });
    }
  },

  resetProgress: () => {
    const unlockedIds = initialUnlocked();
    const viewedIds = new Set<string>();
    persistState(unlockedIds, viewedIds);
    set({
      unlockedIds,
      viewedIds,
      activeNodeId: null,
    });
  },
}));

export function selectNextUnlockId(unlockedIds: Set<string>) {
  return getNextUnlockId(unlockedIds);
}
