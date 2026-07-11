"use client";

import { useEffect, useRef, useState } from "react";
import { useMapStore } from "@/store/map-store";
import { useSound } from "@/components/juice/SoundProvider";

const SEQ = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

/** Konami code unlocks the Secret Level node and flashes a toast */
export function KonamiListener() {
  const index = useRef(0);
  const unlockSecret = useMapStore((s) => s.unlockSecret);
  const unlocked = useMapStore((s) => s.unlockedIds.has("secret"));
  const { play } = useSound();
  const [toast, setToast] = useState(false);

  useEffect(() => {
    if (unlocked) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      const expected = SEQ[index.current];
      if (key === expected || (expected.length === 1 && key === expected)) {
        index.current += 1;
        if (index.current >= SEQ.length) {
          index.current = 0;
          unlockSecret();
          play("unlock");
          setToast(true);
          window.setTimeout(() => setToast(false), 3200);
        }
      } else {
        index.current = key === SEQ[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [unlocked, unlockSecret, play]);

  if (!toast) return null;

  return (
    <div
      role="status"
      className="fixed bottom-12 left-1/2 z-[70] -translate-x-1/2 border border-[var(--amber)] bg-[var(--palette-bg)] px-4 py-2 font-mono text-xs uppercase tracking-[0.12em] text-[var(--amber)] shadow-lg"
    >
      Secret level unlocked — check the map
    </div>
  );
}
