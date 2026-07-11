"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

const STORAGE_KEY = "portfolio-sound";

type SoundContextValue = {
  enabled: boolean;
  ready: boolean;
  setEnabled: (v: boolean) => void;
  toggle: () => void;
  play: (kind: "unlock" | "click" | "boss") => void;
};

const SoundContext = createContext<SoundContextValue | null>(null);

function readStored(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(STORAGE_KEY) === "on";
}

function beep(
  ctx: AudioContext,
  freq: number,
  duration: number,
  type: OscillatorType = "sine",
  gain = 0.04,
) {
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  g.gain.value = gain;
  osc.connect(g);
  g.connect(ctx.destination);
  const now = ctx.currentTime;
  g.gain.setValueAtTime(gain, now);
  g.gain.exponentialRampToValueAtTime(0.001, now + duration);
  osc.start(now);
  osc.stop(now + duration);
}

export function SoundProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabledState] = useState(false);
  const [ready, setReady] = useState(false);
  const audioRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => {
      setEnabledState(readStored());
      setReady(true);
    });
    return () => window.cancelAnimationFrame(id);
  }, []);

  const setEnabled = useCallback((v: boolean) => {
    setEnabledState(v);
    window.localStorage.setItem(STORAGE_KEY, v ? "on" : "off");
  }, []);

  const toggle = useCallback(() => {
    setEnabled(!enabled);
  }, [enabled, setEnabled]);

  const ensureCtx = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new AudioContext();
    }
    if (audioRef.current.state === "suspended") {
      void audioRef.current.resume();
    }
    return audioRef.current;
  }, []);

  const play = useCallback(
    (kind: "unlock" | "click" | "boss") => {
      if (!enabled) return;
      try {
        const ctx = ensureCtx();
        if (kind === "click") beep(ctx, 520, 0.05, "triangle", 0.03);
        else if (kind === "unlock") {
          beep(ctx, 440, 0.08, "sine", 0.045);
          window.setTimeout(() => beep(ctx, 660, 0.1, "sine", 0.04), 70);
        } else {
          beep(ctx, 180, 0.12, "sawtooth", 0.035);
          window.setTimeout(() => beep(ctx, 120, 0.18, "triangle", 0.04), 90);
        }
      } catch {
        // Audio unavailable
      }
    },
    [enabled, ensureCtx],
  );

  const value = useMemo(
    () => ({ enabled, ready, setEnabled, toggle, play }),
    [enabled, ready, setEnabled, toggle, play],
  );

  return (
    <SoundContext.Provider value={value}>{children}</SoundContext.Provider>
  );
}

export function useSound() {
  const ctx = useContext(SoundContext);
  if (!ctx) throw new Error("useSound must be used within SoundProvider");
  return ctx;
}
