import type { MapNode } from "./types";

const projectCase = (name: string) => ({
  problem: `Placeholder problem for ${name} — what pain existed before this existed?`,
  approach: `Placeholder approach — key architecture or insight in 1–2 sentences.`,
  impact: `Placeholder impact — measurable or qualitative outcome.`,
});

/**
 * Positions are in SVG viewBox units (900 × 2800).
 * unlockOrder: 0 = start (always unlocked); higher = unlocks in sequence.
 */
export const nodes: MapNode[] = [
  {
    id: "start",
    type: "start",
    title: "Spawn Point",
    x: 450,
    y: 70,
    unlockOrder: 0,
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
    y: 220,
    unlockOrder: 1,
    summary:
      "Placeholder project summary. Replace with what it does and why it matters.",
    tech: ["TypeScript", "React", "Node"],
    links: { github: "#", live: "#" },
    media: [
      {
        src: "/media/placeholder-project.svg",
        alt: "Project Alpha preview placeholder",
        type: "image",
      },
    ],
    caseStudy: projectCase("Project Alpha"),
  },
  {
    id: "project-2",
    type: "project",
    title: "Project Beta",
    x: 680,
    y: 370,
    unlockOrder: 2,
    summary:
      "Placeholder project summary. Replace with what it does and why it matters.",
    tech: ["Python", "FastAPI", "Postgres"],
    links: { github: "#", live: "#" },
    media: [
      {
        src: "/media/placeholder-project.svg",
        alt: "Project Beta preview placeholder",
        type: "image",
      },
    ],
    caseStudy: projectCase("Project Beta"),
  },
  {
    id: "boss-1",
    type: "boss",
    title: "Internship I",
    company: "Company One",
    period: "Summer 20XX",
    x: 280,
    y: 520,
    unlockOrder: 3,
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
    y: 670,
    unlockOrder: 4,
    summary:
      "Placeholder project summary. Replace with what it does and why it matters.",
    tech: ["Next.js", "Tailwind", "Vercel"],
    links: { github: "#", live: "#" },
    media: [
      {
        src: "/media/placeholder-project.svg",
        alt: "Project Gamma preview placeholder",
        type: "image",
      },
    ],
    caseStudy: projectCase("Project Gamma"),
  },
  {
    id: "project-4",
    type: "project",
    title: "Project Delta",
    x: 200,
    y: 820,
    unlockOrder: 5,
    summary:
      "Placeholder project summary. Replace with what it does and why it matters.",
    tech: ["Go", "gRPC", "Redis"],
    links: { github: "#" },
    media: [
      {
        src: "/media/placeholder-project.svg",
        alt: "Project Delta preview placeholder",
        type: "image",
      },
    ],
    caseStudy: projectCase("Project Delta"),
  },
  {
    id: "boss-2",
    type: "boss",
    title: "Internship II",
    company: "Company Two",
    period: "Fall 20XX",
    x: 650,
    y: 970,
    unlockOrder: 6,
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
    y: 1120,
    unlockOrder: 7,
    summary:
      "Placeholder project summary. Replace with what it does and why it matters.",
    tech: ["Rust", "WASM", "WebGL"],
    links: { github: "#", live: "#" },
    media: [
      {
        src: "/media/placeholder-project.svg",
        alt: "Project Epsilon preview placeholder",
        type: "image",
      },
    ],
    caseStudy: projectCase("Project Epsilon"),
  },
  {
    id: "boss-3",
    type: "boss",
    title: "Internship III",
    company: "Company Three",
    period: "Spring 20XX",
    x: 700,
    y: 1270,
    unlockOrder: 8,
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
    y: 1420,
    unlockOrder: 9,
    summary:
      "Placeholder project summary. Replace with what it does and why it matters.",
    tech: ["C++", "OpenCV", "CUDA"],
    links: { github: "#" },
    media: [
      {
        src: "/media/placeholder-project.svg",
        alt: "Project Zeta preview placeholder",
        type: "image",
      },
    ],
    caseStudy: projectCase("Project Zeta"),
  },
  {
    id: "project-7",
    type: "project",
    title: "Project Eta",
    x: 680,
    y: 1570,
    unlockOrder: 10,
    summary:
      "Placeholder project summary. Replace with what it does and why it matters.",
    tech: ["Kotlin", "Android", "Firebase"],
    links: { github: "#", live: "#" },
    media: [
      {
        src: "/media/placeholder-project.svg",
        alt: "Project Eta preview placeholder",
        type: "image",
      },
    ],
    caseStudy: projectCase("Project Eta"),
  },
  {
    id: "boss-4",
    type: "boss",
    title: "Internship IV",
    company: "Company Four",
    period: "Summer 20XX",
    x: 320,
    y: 1720,
    unlockOrder: 11,
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
    y: 1880,
    unlockOrder: 12,
    summary:
      "Competitive programming stats — live feed when handles are set, placeholders otherwise.",
    tech: [],
    links: {},
  },
  {
    id: "secret",
    type: "secret",
    title: "Secret Level",
    x: 620,
    y: 2060,
    unlockOrder: 13,
    summary:
      "You found the hidden node. Konami (↑↑↓↓←→←→BA) or clear the whole path to open it.",
    tech: ["curiosity", "persistence"],
    links: {},
    impact: "Easter egg unlocked — thanks for exploring.",
  },
];

/** Nodes on the default scroll path (excludes secret until unlocked) */
export function pathNodes(unlockedIds?: Set<string>): MapNode[] {
  return nodes.filter(
    (n) => n.type !== "secret" || (unlockedIds?.has(n.id) ?? false),
  );
}

export const SECRET_ID = "secret";
export const CHECKPOINT_ORDER = 12;

export const nodesByUnlock = [...nodes].sort(
  (a, b) => a.unlockOrder - b.unlockOrder,
);

export function getNextUnlockId(unlockedIds: Set<string>): string | null {
  for (const node of nodesByUnlock) {
    if (node.type === "secret") continue;
    if (!unlockedIds.has(node.id)) return node.id;
  }
  if (!unlockedIds.has(SECRET_ID)) return SECRET_ID;
  return null;
}

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

export const MAP_VIEWBOX = { width: 900, height: 2180 } as const;

export const PROGRESS_STORAGE_KEY = "portfolio-progress";
