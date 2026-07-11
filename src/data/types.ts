export type NodeType = "project" | "boss" | "start" | "checkpoint" | "secret";

export type NodeMedia = {
  src: string;
  alt: string;
  type: "image" | "gif";
};

export type CaseStudy = {
  problem: string;
  approach: string;
  impact: string;
};

export type MapNode = {
  id: string;
  type: NodeType;
  title: string;
  x: number;
  y: number;
  summary: string;
  tech: string[];
  links: { github?: string; live?: string };
  /** Sequential unlock index — 0 unlocks first */
  unlockOrder: number;
  /** Boss nodes — outcome, not a task list */
  impact?: string;
  company?: string;
  period?: string;
  media?: NodeMedia[];
  caseStudy?: CaseStudy;
};

export type SocialLink = {
  id: string;
  label: string;
  href: string;
  handle: string;
};

export type CompetitiveStats = {
  leetcode: {
    username: string;
    totalSolved: number;
    easy: number;
    medium: number;
    hard: number;
    ranking: number | null;
  };
  codeforces: {
    handle: string;
    rating: number;
    maxRating: number;
    rank: string;
  };
};

export type AcademicEntry = {
  id: string;
  school: string;
  degree: string;
  field: string;
  period: string;
  gpa?: string;
  highlights: string[];
};

export type AchievementKind =
  | "award"
  | "hackathon"
  | "contest"
  | "scholarship"
  | "other";

export type Achievement = {
  id: string;
  title: string;
  org?: string;
  year: string;
  kind: AchievementKind;
  summary: string;
  link?: string;
};
