# Kayal's Portfolio — Level Map

Scroll-through game-style developer portfolio: projects as waypoints, internships as boss encounters, competitive stats as a character sheet.

## Stack

- **Next.js** + TypeScript (App Router)
- **Framer Motion** — path draw + node pop-ins + modals
- **Raw SVG** — level path (`stroke-dashoffset` via `pathLength`)
- **Zustand** — viewed / active node state

## Placeholders

Edit these files when real content is ready:

| Content | File |
|---|---|
| Projects + internships (nodes) | `src/data/nodes.ts` |
| Socials + LeetCode/CF handles | `src/data/socials.ts` |
| Types | `src/data/types.ts` |

Current map: **7 projects**, **4 boss (internship) nodes**, start + checkpoint.

## Dev

```bash
npm install
npm run dev
```

## Build phases (from plan)

1. ~~Static path, real positions~~
2. Content (waiting on your project / internship copy)
3. ~~Scroll-triggered motion~~
4. Live LeetCode / Codeforces fetch
5. Polish (sound toggle, easter egg, more juice)
6. SEO + performance pass
