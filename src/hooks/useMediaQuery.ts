"use client";

import { useSyncExternalStore } from "react";

function subscribeMedia(query: string, onStoreChange: () => void) {
  const mq = window.matchMedia(query);
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

export function useMediaQuery(query: string, serverFallback = false) {
  return useSyncExternalStore(
    (onChange) => subscribeMedia(query, onChange),
    () => window.matchMedia(query).matches,
    () => serverFallback,
  );
}
