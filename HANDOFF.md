# Handoff — Kayal’s level-map portfolio

Last updated: 2026-07-11 (Phase 3 structure complete; content still placeholders)  
Owner content: **still placeholders** (projects, internships, academics, socials, real stats handles).  
Plan source of truth: [`docs/BUILD-PHASES.md`](docs/BUILD-PHASES.md)

---

## Status snapshot

| Phase | Status |
|---|---|
| **Phase 1** — foundation | **Done** |
| **Phase 2** — map art, parallax, media, SFX/juice, map cursor | **Done** |
| **Extra** — GitHub contribution graph on Stats | **Done** (set `githubUsername`) |
| **Phase 3** — live LC/CF, easter egg, resume/OG, filters, perf/SEO | **Done** (structure; **3B real copy** awaits user) |

**Next:** swap placeholders — handles in `socials.ts`, real resume PDF, project/boss/case-study copy.

---

## What this product is

Single-page **game-style developer portfolio**:

- Tabs: Home · Map · Experience · Academics · Projects · Stats · Contact · Resume  
- Map: SVG path + nodes (spawn, 7 projects, 4 bosses, checkpoint, **secret**)  
- Unlock progression persisted in `localStorage`  
- ⌘K command palette  
- Light/dark theme  
- Live competitive stats via `/api/stats` (hourly revalidate; falls back to placeholders)

Stack: **Next.js 16 (App Router) + TypeScript + Tailwind 4 + Framer Motion + Zustand**.

---

## Run locally

```bash
npm install
npm run dev
npm run lint
npm run build
```

---

## Architecture (where to edit)

### Shell / chrome
| File | Role |
|---|---|
| `src/components/PortfolioShell.tsx` | Tab router; **lazy** Map tab + MapCursor; Konami + DocumentTitle |
| `src/components/TopBar.tsx` | Tabs, clock, ⌘K, theme/sound toggles |
| `src/components/StatusBar.tsx` | Unlock counts, reset, ⌘K |
| `src/components/Atmosphere.tsx` | Grid / noise / washes |
| `src/components/ThemeProvider.tsx` + `ThemeToggle.tsx` | `data-theme`, `localStorage` key `portfolio-theme` |
| `src/components/KonamiListener.tsx` | ↑↑↓↓←→←→BA → unlock secret + toast |
| `src/components/DocumentTitle.tsx` | Per-tab `document.title` |
| `src/app/globals.css` | Design tokens |
| `src/app/layout.tsx` | Fonts, metadata, theme FOUC script |
| `src/app/opengraph-image.tsx` | OG image (always dark for contrast) |
| `src/app/sitemap.ts` / `robots.ts` | SEO |
| `src/app/page.tsx` | Renders `PortfolioShell` |

### Map (sensitive)
| File | Role |
|---|---|
| `src/components/LevelMap.tsx` | SVG path + scroll unlock; **measure SVG wrap only**; main path spawn→checkpoint; secret is dashed spur when unlocked |
| `src/components/MapNodeMarker.tsx` | Static SVG markers (+ `?` secret glyph) |
| `src/data/nodes.ts` | Nodes + `pathNodes()` + `buildPathD` + `MAP_VIEWBOX` (2180) |
| `src/store/map-store.ts` | Tabs, unlock/viewed, `unlockSecret`, hydrate (secret opt-in) |

### APIs / stats
| File | Role |
|---|---|
| `src/app/api/stats/route.ts` | LeetCode GraphQL + Codeforces API, `revalidate: 3600` |
| `src/app/api/github-contributions/route.ts` | Contribution heat map |
| `src/components/StatsPanel.tsx` | Live count-up + source badge + GitHub graph |
| `src/data/socials.ts` | `githubUsername`, `leetcodeUsername`, `codeforcesHandle` |

Env overrides: `GITHUB_USERNAME`, `LEETCODE_USER`, `CF_HANDLE`.

### Content data
| File | Content |
|---|---|
| `src/data/nodes.ts` | Projects + bosses + secret + `caseStudy` + `media` |
| `src/data/academics.ts` / `achievements.ts` | Degrees + awards (filter chips on Academics) |
| `public/resume.pdf` | Stub — replace with real resume |
| `public/media/*` | Project thumbnails |

---

## Map behavior (read before changing)

1. Progress from viewport focus line (~45%) vs **SVG wrapper** rect — not padded outer box.  
2. Path progress Y: **first → checkpoint** (`MAIN_PATH` / `pathNodes()` without secret).  
3. Separate `h-[45vh]` spacer **sibling** below SVG.  
4. `unlockThroughOrder` skips secret; unlocks secret when `maxOrder >= 12`.  
5. Konami or opening checkpoint also unlocks secret.  
6. Markers are static SVG (no per-node Framer).

**Node count:** 14 = spawn + 7 projects + 4 bosses + checkpoint + secret.

**Storage:** `portfolio-progress` → `{ unlockedIds, viewedIds }`.

---

## Phase 3 — shipped notes

| Item | Where |
|---|---|
| Live LC + CF | `/api/stats` + `StatsPanel` |
| Secret / Konami | `nodes` secret + `KonamiListener` + store `unlockSecret` |
| Resume embed | `ResumeTab` iframe + download |
| OG polish | `opengraph-image.tsx` path motif |
| Achievement filters | `AcademicsTab` chips |
| Lazy map + titles | `PortfolioShell` dynamic import; `DocumentTitle` |
| sitemap / robots | `src/app/sitemap.ts`, `robots.ts` |
| **3B content** | Still placeholders — fill when user provides copy |

---

## User intent / constraints

- Real projects, internships, handles come later — keep structure.  
- Single page + tabs. Sound **off by default**.  
- Don’t commit unless asked.  
- Don’t break LevelMap scroll math.

---

## Quick verification checklist

- [x] `npm run build` + `npm run lint` clean  
- [ ] Light + dark: Home, Map, ⌘K readable  
- [ ] Map: reset → scroll through Character Sheet without stall  
- [ ] Konami unlocks Secret Level + toast; spur appears on map  
- [ ] Stats tab shows live/fallback badges when handles set  
- [ ] Academics filter chips work  
- [ ] Resume preview iframe loads `/resume.pdf`  

---

## Suggested first message for next session

> Continue from `HANDOFF.md`. Phases 1–3 structure are done. Wire real handles in `src/data/socials.ts`, replace `public/resume.pdf`, and fill project/boss/case-study copy (Phase 3B).
