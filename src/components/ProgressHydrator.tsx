"use client";

import { useEffect } from "react";
import { useMapStore } from "@/store/map-store";

/** Hydrates unlock/view progress from localStorage once on mount */
export function ProgressHydrator() {
  const hydrate = useMapStore((s) => s.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return null;
}
