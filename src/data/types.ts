export type NodeType = "project" | "boss" | "start" | "checkpoint";

export type MapNode = {
  id: string;
  type: NodeType;
  title: string;
  x: number;
  y: number;
  summary: string;
  tech: string[];
  links: { github?: string; live?: string };
  /** Boss nodes only — outcome, not a task list */
  impact?: string;
  company?: string;
  period?: string;
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
