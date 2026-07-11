# Handoff — Kayal’s level-map portfolio

Last updated: 2026-07-11 (Phase 2 shipped + GitHub contributions on Stats)  
Owner content: **still placeholders** (projects, internships, academics, socials, stats handles).  
Plan source of truth: [`docs/BUILD-PHASES.md`](docs/BUILD-PHASES.md)

---

## Status snapshot

| Phase | Status |
|---|---|
| **Phase 1** — foundation | **Done** |
| **Phase 2** — map art, parallax, media, SFX/juice, map cursor | **Done** |
| **Extra** — GitHub contribution graph on Stats | **Done** (set `githubUsername`) |
| **Phase 3** — live LeetCode/CF, easter egg, real resume, content, perf/SEO | **Not started** |

**Next agent should start Phase 3**, or wire real `githubUsername` / project media if the user provides handles and assets.

---

## What this product is

Single-page **game-style developer portfolio**:

- Tabs: Home · Map · Experience · Academics · Projects · Stats · Contact · Resume  
- Map: SVG path + nodes (spawn, 7 projects, 4 boss internships, checkpoint)  
- Unlock progression persisted in `localStorage`  
- ⌘K command palette  
- Light/dark theme  
- Placeholder competitive stats (live API is Phase 3)

Stack: **Next.js 16 (App Router) + TypeScript + Tailwind 4 + Framer Motion + Zustand**.

---

## Run locally

```bash
npm install
npm run dev
# often http://localhost:3000 — if busy, try 3002
npm run lint
npm run build
```

---

## Architecture (where to edit)

### Shell / chrome
| File | Role |
|---|---|
| `src/components/PortfolioShell.tsx` | Tab router + atmosphere + modal + palette + status |
| `src/components/TopBar.tsx` | Tabs, clock, ⌘K, theme toggle |
| `src/components/StatusBar.tsx` | Unlock counts, reset, ⌘K |
| `src/components/Atmosphere.tsx` | Grid / noise / washes (light+dark) |
| `src/components/ThemeProvider.tsx` + `ThemeToggle.tsx` | `data-theme`, `localStorage` key `portfolio-theme` |
| `src/app/globals.css` | Design tokens (`--ink`, `--palette-*`, `--path-*`, etc.) |
| `src/app/layout.tsx` | Fonts (Fraunces / Inter / JetBrains Mono), metadata, theme FOUC script |
| `src/app/opengraph-image.tsx` | OG image for link previews |
| `src/app/page.tsx` | Renders `PortfolioShell` |

### Map (sensitive — recent bugs)
| File | Role |
|---|---|
| `src/components/LevelMap.tsx` | SVG path draw + scroll unlock; **measure SVG wrap only**, spacer is separate |
| `src/components/MapNodeMarker.tsx` | Static SVG markers (memoized; no per-node Framer) |
| `src/components/tabs/MapTab.tsx` | Map tab chrome |
| `src/data/nodes.ts` | All map nodes + `buildPathD` + `MAP_VIEWBOX` |
| `src/store/map-store.ts` | Tabs, unlock/viewed sets, hydrate/reset, palette |

### Content data (swap placeholders here)
| File | Content |
|---|---|
| `src/data/nodes.ts` | Projects + bosses + positions + `caseStudy` + `media` + `unlockOrder` |
| `src/data/academics.ts` | Degrees |
| `src/data/achievements.ts` | Awards / contests / etc. |
| `src/data/socials.ts` | Links + static LeetCode/CF placeholders |
| `src/data/types.ts` | Shared types |
| `public/media/placeholder-project.svg` | Modal media stub |
| `public/resume.pdf` | Stub PDF — replace with real resume |

### Other tabs
`src/components/tabs/*` — Home, Experience, Academics, Projects, Stats, Contact, Resume  
`src/components/NodeModal.tsx` — Project case study + boss outcome  
`src/components/CommandPalette.tsx` — ⌘K (solid `--palette-*` tokens; fixed light-mode readability)  
`src/components/StatsPanel.tsx` — Count-up character sheet (static data for now)

---

## Map behavior (read before changing)

**Current scroll → path contract:**

1. Progress is computed from a **viewport focus line (~45% height)** against the **SVG wrapper’s** `getBoundingClientRect()` — **not** the padded outer container.
2. Path progress maps SVG Y from **first node → last node (Character Sheet)**.
3. A separate `h-[45vh]` spacer **below** the SVG lets the checkpoint scroll up to the focus line.
4. Unlock uses `unlockThroughOrder(order)` when focus Y passes each node.
5. Markers are **static SVG** (Framer removed from markers for performance).

**Bugs already fixed (don’t reintroduce):**

- Per-node Framer springs + `useMotionValueEvent` → severe lag  
- Path progress tied to unlock count → path jumped ahead of scroll  
- Padding included in measured height → path stalled ~Project Delta; Character Sheet never reached  
- ⌘K palette used translucent `--surface-elevated` → unreadable in light mode  

**If path breaks again:** first check that scroll math uses `svgWrapRef`, and spacer is **sibling**, not inside the measured box.

**Node count:** 13 total = spawn + 7 projects + 4 bosses + checkpoint.

**Progress storage:** `localStorage` key `portfolio-progress` → `{ unlockedIds, viewedIds }`.  
Reset via status bar **reset** or Home **New Game+**.

---

## Design system notes

- Dark default; light via `data-theme="light"` on `<html>`.
- Tokens in `globals.css`: surfaces, path, terrain, palette panel colors.
- Atmosphere: `.app-atmosphere*` layers (grid, noise, wash, vignette).
- Avoid purple/glow-AI clichés; keep ink / parchment / amber / coral / teal from the build plan.
- User frontend rules: brand-forward, no card spam in heroes; **exception:** this project’s established game-map language wins.

---

## Phase 2 — completed notes

| Item | Where |
|---|---|
| Terrain + path grain | `src/components/map/MapTerrain.tsx`, `LevelMap.tsx` defs |
| Node icons | `MapNodeMarker.tsx` (spawn / flag / crest / star) |
| Parallax | `LevelMap.tsx` (disabled under `prefers-reduced-motion`) |
| Project thumbnails | `ProjectsTab.tsx` + modal media |
| Sound (off by default) | `SoundProvider` + top-bar `SoundToggle` — Web Audio beeps |
| Unlock particles | `map/UnlockParticles.tsx` |
| Boss shake | `.boss-shake` in `globals.css` + `NodeModal` |
| Map cursor | `map/MapCursor.tsx` — Map tab + fine pointer only |
| GitHub graph | `GitHubContributions.tsx` + `GET /api/github-contributions` |

**GitHub username:** set `githubUsername` in `src/data/socials.ts` (or `GITHUB_USERNAME` env). Until then the graph uses a placeholder heat map.

## Phase 3 — do next

From `docs/BUILD-PHASES.md`: live LeetCode/CF APIs, easter egg, real resume PDF, real copy, perf/SEO.  

---

## User intent / constraints

- Content details (real projects, internships, handles) **will come later** — keep placeholders structured.  
- Single scrollable page + tabs (not click-to-travel multi-route game).  
- Sound **off by default**.  
- Don’t commit unless asked.  
- Prefer editing existing files; don’t expand scope beyond the active phase.

---

## Quick verification checklist

- [ ] `npm run build` + `npm run lint` clean  
- [ ] Light + dark: Home, Map, ⌘K readable  
- [ ] Map: reset progress → scroll path from Spawn through **Character Sheet** without stalling after Delta  
- [ ] Unlock persists across refresh; reset clears  
- [ ] Project modal shows Problem / Approach / Impact + media stub  
- [ ] Academics tab renders placeholders  

---

## Open polish / known soft spots

- Map still looks like a diagram (Phase 2 art not done).  
- Stats are static zeros/placeholders.  
- Resume PDF is a minimal stub.  
- `metadataBase` in layout uses `https://anubhavkayal.dev` — update when real domain is known.  
- Mobile map is a vertical list (by design); desktop is the SVG path.

---

## Suggested first message for next session

> Continue from `HANDOFF.md`. Phase 1–2 are done (incl. GitHub graph). Start **Phase 3** (live LC/CF, easter egg, real content) or set `githubUsername` in `src/data/socials.ts` if provided.
