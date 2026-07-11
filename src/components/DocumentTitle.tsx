"use client";

import { useEffect } from "react";
import { TABS, useMapStore, type TabId } from "@/store/map-store";

const TITLES: Record<TabId, string> = {
  home: "Home",
  map: "Map",
  experience: "Experience",
  academics: "Academics",
  projects: "Projects",
  stats: "Stats",
  contact: "Contact",
  resume: "Resume",
};

const BASE = "Anubhav Kayal — Level Map Portfolio";

export function DocumentTitle() {
  const activeTab = useMapStore((s) => s.activeTab);

  useEffect(() => {
    const label =
      TITLES[activeTab] ??
      TABS.find((t) => t.id === activeTab)?.label ??
      "Home";
    document.title =
      activeTab === "home" ? BASE : `${label} · Anubhav Kayal`;
  }, [activeTab]);

  return null;
}
