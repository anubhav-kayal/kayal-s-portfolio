"use client";

import { useEffect, useState } from "react";

type Props = {
  phrases: string[];
  className?: string;
  typingMs?: number;
  holdMs?: number;
  deletingMs?: number;
};

export function Typewriter({
  phrases,
  className = "",
  typingMs = 55,
  holdMs = 1800,
  deletingMs = 28,
}: Props) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [phase, setPhase] = useState<"typing" | "holding" | "deleting">(
    "typing",
  );

  const phrase = phrases[phraseIndex] ?? "";
  const text = phrase.slice(0, charCount);

  useEffect(() => {
    let timer: number;

    if (phase === "typing") {
      if (charCount >= phrase.length) {
        timer = window.setTimeout(() => setPhase("holding"), 0);
      } else {
        timer = window.setTimeout(
          () => setCharCount((c) => c + 1),
          typingMs,
        );
      }
    } else if (phase === "holding") {
      timer = window.setTimeout(() => setPhase("deleting"), holdMs);
    } else if (charCount <= 0) {
      timer = window.setTimeout(() => {
        setPhraseIndex((i) => (i + 1) % phrases.length);
        setPhase("typing");
      }, deletingMs);
    } else {
      timer = window.setTimeout(
        () => setCharCount((c) => c - 1),
        deletingMs,
      );
    }

    return () => window.clearTimeout(timer);
  }, [phase, charCount, phrase.length, phrases.length, typingMs, holdMs, deletingMs]);

  return (
    <span className={`inline-flex items-baseline ${className}`}>
      <span className="whitespace-pre">{text}</span>
      <span
        className="ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[0.08em] animate-pulse bg-[var(--amber)]"
        aria-hidden
      />
    </span>
  );
}
