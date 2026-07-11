import type { CompetitiveStats, SocialLink } from "./types";

/** Swap this for your real GitHub username — powers Stats contribution graph */
export const githubUsername = "your-handle";

export const socials: SocialLink[] = [
  {
    id: "github",
    label: "GitHub",
    href: `https://github.com/${githubUsername}`,
    handle: `@${githubUsername}`,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://linkedin.com/in/your-handle",
    handle: "/in/your-handle",
  },
  {
    id: "twitter",
    label: "X / Twitter",
    href: "https://x.com/your-handle",
    handle: "@your-handle",
  },
  {
    id: "email",
    label: "Email",
    href: "mailto:you@example.com",
    handle: "you@example.com",
  },
  {
    id: "leetcode",
    label: "LeetCode",
    href: "https://leetcode.com/u/your-handle",
    handle: "your-handle",
  },
  {
    id: "codeforces",
    label: "Codeforces",
    href: "https://codeforces.com/profile/your-handle",
    handle: "your-handle",
  },
];

/** Static placeholders — Phase 3 will fetch live LeetCode / CF data */
export const competitiveStats: CompetitiveStats = {
  leetcode: {
    username: "your-handle",
    totalSolved: 0,
    easy: 0,
    medium: 0,
    hard: 0,
    ranking: null,
  },
  codeforces: {
    handle: "your-handle",
    rating: 0,
    maxRating: 0,
    rank: "unrated",
  },
};
