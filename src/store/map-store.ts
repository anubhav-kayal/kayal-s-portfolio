import { create } from "zustand";

export type TabId =
  | "home"
  | "map"
  | "experience"
  | "projects"
  | "stats"
  | "contact"
  | "resume";

export const TABS: { id: TabId; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "map", label: "Map" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "stats", label: "Stats" },
  { id: "contact", label: "Contact" },
  { id: "resume", label: "Resume" },
];

type MapStore = {
  viewedIds: Set<string>;
  activeNodeId: string | null;
  activeTab: TabId;
  markViewed: (id: string) => void;
  openNode: (id: string) => void;
  closeNode: () => void;
  setTab: (tab: TabId) => void;
};

export const useMapStore = create<MapStore>((set) => ({
  viewedIds: new Set<string>(),
  activeNodeId: null,
  activeTab: "home",
  markViewed: (id) =>
    set((state) => {
      if (state.viewedIds.has(id)) return state;
      const next = new Set(state.viewedIds);
      next.add(id);
      return { viewedIds: next };
    }),
  openNode: (id) =>
    set((state) => {
      const next = new Set(state.viewedIds);
      next.add(id);
      return { activeNodeId: id, viewedIds: next };
    }),
  closeNode: () => set({ activeNodeId: null }),
  setTab: (tab) => set({ activeTab: tab, activeNodeId: null }),
}));
