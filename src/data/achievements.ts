import type { Achievement } from "./types";

export const achievements: Achievement[] = [
  {
    id: "ach-1",
    title: "Hackathon Winner — Placeholder",
    org: "Event Name",
    year: "20XX",
    kind: "hackathon",
    summary: "Built X in 24h. Replace with what you shipped and the result.",
    link: "#",
  },
  {
    id: "ach-2",
    title: "Contest Rank — Placeholder",
    org: "Codeforces / LeetCode",
    year: "20XX",
    kind: "contest",
    summary: "Peak rating / contest placement goes here.",
  },
  {
    id: "ach-3",
    title: "Scholarship / Award — Placeholder",
    org: "Org Name",
    year: "20XX",
    kind: "scholarship",
    summary: "One-line on why it was awarded.",
  },
  {
    id: "ach-4",
    title: "Open Source / Community — Placeholder",
    year: "20XX",
    kind: "other",
    summary: "Notable contribution, talk, or community role.",
    link: "#",
  },
];
