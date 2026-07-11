import type { MapNode } from "./types";

/**
 * Positions are in SVG viewBox units (900 × 2800).
 * Path winds left/right as it descends — geometry first, motion later.
 */
export const nodes: MapNode[] = [
  {
    id: "start",
    type: "start",
    title: "Spawn Point",
    x: 450,
    y: 80,
    summary:
      "Placeholder intro — swap this for a one-liner about who you are and what you build.",
    tech: [],
    links: {},
  },
  {
    id: "project-1",
    type: "project",
    title: "Project Alpha",
    x: 220,
    y: 280,
    summary:
      "Placeholder project summary. Replace with what it does and why it matters.",
    tech: ["TypeScript", "React", "Node"],
    links: { github: "#", live: "#" },
  },
  {
    id: "project-2",
    type: "project",
    title: "Project Beta",
    x: 680,
    y: 460,
    summary:
      "Placeholder project summary. Replace with what it does and why it matters.",
    tech: ["Python", "FastAPI", "Postgres"],
    links: { github: "#", live: "#" },
  },
  {
    id: "boss-1",
    type: "boss",
    title: "Internship I",
    company: "Company One",
    period: "Summer 20XX",
    x: 280,
    y: 660,
    summary: "Placeholder role blurb — keep it short; impact carries the node.",
    tech: ["React", "TypeScript"],
    links: {},
    impact:
      "Placeholder battle outcome. Write the result first — what changed because you were there.",
  },
  {
    id: "project-3",
    type: "project",
    title: "Project Gamma",
    x: 720,
    y: 860,
    summary:
      "Placeholder project summary. Replace with what it does and why it matters.",
    tech: ["Next.js", "Tailwind", "Vercel"],
    links: { github: "#", live: "#" },
  },
  {
    id: "project-4",
    type: "project",
    title: "Project Delta",
    x: 200,
    y: 1060,
    summary:
      "Placeholder project summary. Replace with what it does and why it matters.",
    tech: ["Go", "gRPC", "Redis"],
    links: { github: "#" },
  },
  {
    id: "boss-2",
    type: "boss",
    title: "Internship II",
    company: "Company Two",
    period: "Fall 20XX",
    x: 650,
    y: 1260,
    summary: "Placeholder role blurb — keep it short; impact carries the node.",
    tech: ["Java", "Spring", "AWS"],
    links: {},
    impact:
      "Placeholder battle outcome. Write the result first — what changed because you were there.",
  },
  {
    id: "project-5",
    type: "project",
    title: "Project Epsilon",
    x: 260,
    y: 1460,
    summary:
      "Placeholder project summary. Replace with what it does and why it matters.",
    tech: ["Rust", "WASM", "WebGL"],
    links: { github: "#", live: "#" },
  },
  {
    id: "boss-3",
    type: "boss",
    title: "Internship III",
    company: "Company Three",
    period: "Spring 20XX",
    x: 700,
    y: 1660,
    summary: "Placeholder role blurb — keep it short; impact carries the node.",
    tech: ["Python", "PyTorch", "Docker"],
    links: {},
    impact:
      "Placeholder battle outcome. Write the result first — what changed because you were there.",
  },
  {
    id: "project-6",
    type: "project",
    title: "Project Zeta",
    x: 240,
    y: 1860,
    summary:
      "Placeholder project summary. Replace with what it does and why it matters.",
    tech: ["C++", "OpenCV", "CUDA"],
    links: { github: "#" },
  },
  {
    id: "project-7",
    type: "project",
    title: "Project Eta",
    x: 680,
    y: 2060,
    summary:
      "Placeholder project summary. Replace with what it does and why it matters.",
    tech: ["Kotlin", "Android", "Firebase"],
    links: { github: "#", live: "#" },
  },
  {
    id: "boss-4",
    type: "boss",
    title: "Internship IV",
    company: "Company Four",
    period: "Summer 20XX",
    x: 320,
    y: 2260,
    summary: "Placeholder role blurb — keep it short; impact carries the node.",
    tech: ["TypeScript", "GraphQL", "Kubernetes"],
    links: {},
    impact:
      "Placeholder battle outcome. Write the result first — what changed because you were there.",
  },
  {
    id: "checkpoint",
    type: "checkpoint",
    title: "Character Sheet",
    x: 450,
    y: 2480,
    summary:
      "Live competitive programming stats land here — LeetCode + Codeforces placeholders for now.",
    tech: [],
    links: {},
  },
];

/** Smooth path through every node, in order */
export function buildPathD(mapNodes: MapNode[]): string {
  if (mapNodes.length === 0) return "";
  const [first, ...rest] = mapNodes;
  let d = `M ${first.x} ${first.y}`;
  for (let i = 0; i < rest.length; i++) {
    const prev = i === 0 ? first : rest[i - 1];
    const curr = rest[i];
    const midY = (prev.y + curr.y) / 2;
    d += ` C ${prev.x} ${midY}, ${curr.x} ${midY}, ${curr.x} ${curr.y}`;
  }
  return d;
}

export const MAP_VIEWBOX = { width: 900, height: 2680 } as const;
