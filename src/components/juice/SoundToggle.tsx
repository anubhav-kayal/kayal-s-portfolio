"use client";

import { useSound } from "@/components/juice/SoundProvider";

export function SoundToggle() {
  const { enabled, ready, toggle } = useSound();

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={!ready}
      aria-label={enabled ? "Mute sound" : "Enable sound"}
      title={enabled ? "Sound on" : "Sound off (default)"}
      className="relative flex h-8 w-8 items-center justify-center rounded border border-[var(--line)] text-[var(--parchment-dim)] transition hover:border-[var(--line-strong)] hover:text-[var(--amber)] disabled:opacity-50"
    >
      {enabled ? <SpeakerOn /> : <SpeakerOff />}
    </button>
  );
}

function SpeakerOn() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 10v4h4l5 4V6L8 10H4z" strokeLinejoin="round" />
      <path d="M16 9a3.5 3.5 0 0 1 0 6" strokeLinecap="round" />
    </svg>
  );
}

function SpeakerOff() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 10v4h4l5 4V6L8 10H4z" strokeLinejoin="round" />
      <path d="M17 10l4 4M21 10l-4 4" strokeLinecap="round" />
    </svg>
  );
}
