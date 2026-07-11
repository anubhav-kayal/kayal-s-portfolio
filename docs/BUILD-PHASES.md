# Level-map portfolio — 3-phase build plan

Goal: go from “scaffolded tabs + SVG path” to a recruiter-sticky game portfolio, including **Academics / Achievements**, a **light-mode visual pass**, and the full feature list below.

---

## Guiding rules (all phases)

- Content stays data-driven (`src/data/*`) so placeholders can be swapped later without refactors.
- Sound stays **off by default**.
- Map tab owns the “game” chrome (cursor, parallax, juice); other tabs stay cleaner.
- Ship each phase fully working before starting the next.

### New tab / data (include from Phase 1)

| Addition | Purpose |
|---|---|
| **Academics** tab | Degrees, coursework highlights, GPA (optional), relevant coursework |
| **Achievements** section (same tab or Stats) | Awards, hackathons, scholarships, contest ranks, publications |
| Types in `src/data/types.ts` | `AcademicEntry`, `Achievement` |
| Files | `src/data/academics.ts`, `src/data/achievements.ts` |

---

## Phase 1 — Foundation that feels intentional

**Theme:** Fix the “PDF / scaffold” feel. Content structure, light mode, unlock loop, command palette, academics.

### 1A. Light mode redesign (do first)

Current light mode is flat cream + weak grid. Target: same *system* as dark, not an afterthought.

| Task | Detail |
|---|---|
| Atmosphere layers | Full-viewport parchment paper texture (subtle noise SVG/CSS), stronger grid, soft amber/teal radial washes |
| Depth | `--ink` / `--ink-2` separation clearer; cards get hairline + soft inset, not muddy beige blocks |
| Map-specific light | Path stroke darker amber; terrain fills use warm wash + cool shadow so SVG doesn’t disappear |
| Theme tokens | Add `--surface`, `--surface-elevated`, `--glow`, `--path-stroke`, `--terrain-a/b` for both themes |
| Toggle polish | Brief crossfade of background layers on switch (not just color swap) |

**Done when:** light mode looks designed on Home + Map, not “inverted dark.”

### 1B. Data model expansion

Extend `MapNode` and add academics:

```ts
// projects
media?: { src: string; alt: string; type: "image" | "gif" }[];
caseStudy?: { problem: string; approach: string; impact: string };

// progression
unlockOrder: number; // sequential unlock index

// academics / achievements (separate arrays)
AcademicEntry { id, school, degree, field, period, gpa?, highlights[] }
Achievement { id, title, org?, year, kind: "award"|"hackathon"|"contest"|"scholarship"|"other", summary, link? }
```

Placeholder media: `/public/media/project-*.svg` or solid color frames until real assets land.

### 1C. Academics tab

- New tab: **Academics** (after Experience).
- Layout: timeline of degrees + grid/list of achievements.
- Command palette + status bar aware of the new tab.
- Placeholder entries so the UI is real before copy arrives.

### 1D. Unlock progression + localStorage

| Behavior | Detail |
|---|---|
| Start | Only `start` unlocked; rest locked (dimmed, no modal) |
| Unlock | Scroll path progress *or* click previous unlocked node’s “continue” / reach node in view |
| Persist | `localStorage` key `portfolio-progress` → `{ unlockedIds, viewedIds }` |
| Reset | Status bar or Home: “New Game+” / Reset progress |
| Juice hook | Emit `onUnlock(id)` for Phase 2 particles/SFX |

Update Zustand: `unlockedIds`, `unlock(id)`, `hydrate()`, `resetProgress()`.

### 1E. Command palette (`⌘K` / `Ctrl+K`)

- Fuzzy list: tabs, projects, bosses, academics, achievements, socials.
- Enter → switch tab and/or open node modal.
- Esc closes; arrow keys navigate.
- Works on all tabs; styled with existing ink/amber tokens (both themes).

### 1F. Case-study modal v1 (structure only)

- Project modal sections: **Problem → Approach → Impact → Links**.
- Boss modal stays Outcome + Loadout.
- Placeholder copy in `nodes.ts`; media slot empty or placeholder frame.

### 1G. Resume + OG baseline

- `/public/resume.pdf` placeholder page or real PDF when available.
- `opengraph-image.tsx` (Next.js) — name + “level map” mark so Slack/Twitter previews aren’t empty.
- Basic `metadata` / Twitter card fields in `layout.tsx`.

**Phase 1 exit criteria**

- Light mode feels intentional.
- Academics tab live with placeholders.
- Unlock + persist works.
- ⌘K jumps anywhere.
- Modals have case-study structure.
- Share preview shows a real OG image.

---

## Phase 2 — Game feel (look + juice)

**Theme:** Map stops looking like a diagram; interactions feel like a small game.

### 2A. Real map art

| Layer | Implementation |
|---|---|
| Terrain fills | SVG blobs / noise under path (forest, plains, “boss arena” tint near internship nodes) |
| Path texture | Dashed + grainy stroke, or SVG `stroke` with pattern (`<pattern>` parchment scratch) |
| Node icons | Distinct glyphs: start = spawn, project = flag/chest, boss = skull/crest, checkpoint = star, easter = `?` |
| Labels | Better hierarchy; boss labels in coral with “BOSS” chip |
| Mobile | Keep vertical list but reuse icons + unlock states |

### 2B. Parallax on Map tab

- 2–3 background layers (far terrain, mid haze, path) moving at different rates vs scroll.
- `useScroll` + `useTransform` (already on path) — extend to layer `y` offsets.
- Disable or reduce on `prefers-reduced-motion`.

### 2C. Project media in modals

- Image/GIF carousel or single hero in modal top.
- Lazy-load; blur placeholder.
- Projects tab cards show thumbnail strip.
- Still works if `media` empty (graceful fallback).

### 2D. Sound + juice (optional, off by default)

| Piece | Detail |
|---|---|
| Settings | Top bar or status: Sound toggle (default off); persist preference |
| SFX | Unlock chime, UI click, boss open stinger (short Web Audio or tiny mp3s in `/public/sfx`) |
| Boss open | Modal + light screen shake (`motion` on shell, ~200ms) |
| Unlock | Particle burst at node coords (canvas or DOM particles, 12–20 dots) |
| A11y | Respect reduced motion → skip shake/particles; never auto-enable sound |

### 2E. Map-only custom cursor / trail

- Active only when `activeTab === "map"` and pointer is fine (not touch).
- Custom cursor (crosshair / boot print) + short fading trail.
- Hide default cursor on map container; restore on leave / other tabs.

### 2F. Light/dark map parity check

- Re-tune terrain/path/icons under both themes after art lands.
- Ensure light mode grid + terrain still read clearly.

**Phase 2 exit criteria**

- Map reads as a world, not a flowchart.
- Media in project modals.
- Sound off-by-default with unlock/boss juice.
- Custom cursor only on Map.
- Reduced-motion safe.

---

## Phase 3 — Recruiter wow + secrets

**Theme:** Live data, depth, shareability, one memorable secret.

### 3A. Live LeetCode + Codeforces

| Piece | Detail |
|---|---|
| API routes | `app/api/leetcode/route.ts`, `app/api/codeforces/route.ts` (or one `/api/stats`) |
| Caching | `revalidate: 3600` (hourly) |
| UI | Stats tab + checkpoint node; keep count-up; show “updated Xm ago” |
| Failure | Fall back to last known / placeholders; never blank the sheet |
| Config | Handles in `src/data/socials.ts` or env (`LEETCODE_USER`, `CF_HANDLE`) |

### 3B. Case-study depth (content pass)

- Fill real problem/approach/impact once copy is provided.
- Optional “Read full case” expand for 1–2 flagship projects.
- Boss nodes: impact-first writing pass.

### 3C. Hidden easter egg

Pick one primary secret (don’t ship three half-done):

| Option | Idea |
|---|---|
| **A (recommended)** | Extra map node past checkpoint — “Secret Level” — unlocks after all nodes viewed *or* Konami |
| **B** | Konami → mini Chrome-dino-style or tiny canvas game overlay |
| **C** | Konami → secret “patch notes” / fun about-me markdown |

Wire: `easter` node type or `id: "secret"`; not in default unlock chain until trigger.

### 3D. Resume + share polish

- Real PDF in `/public/resume.pdf`.
- Resume tab: preview embed + download.
- OG image refined (theme-aware or always dark for contrast).
- Optional: `/og` dynamic title per project later (nice-to-have).

### 3E. Academics / achievements polish

- Filter chips: Awards · Contests · Hackathons.
- Link achievements to Stats (e.g. CF peak) where relevant.
- Optional map “school” checkpoint if desired on the path (secondary).

### 3F. Performance / SEO pass (from original build plan)

- Lazy-load Framer-heavy map, particles, cursor only on Map tab.
- Lighthouse pass; per-tab titles via document title on tab change.
- `sitemap` / `robots` if custom domain.

**Phase 3 exit criteria**

- Live stats with hourly revalidate.
- Easter egg discoverable but not noisy.
- Real resume + strong OG.
- Academics/achievements feel complete.
- Map code-split; Lighthouse acceptable on mobile.

---

## Phase summary

| Phase | Focus | Main deliverables |
|---|---|---|
| **1** | Structure + trust | Light-mode atmosphere, Academics tab, unlock+persist, ⌘K, case-study schema, OG/resume stub |
| **2** | Feel + craft | Map art, parallax, media, SFX/juice, map cursor |
| **3** | Wow + share | Live LC/CF, easter egg, real resume, content depth, perf/SEO |

---

## Suggested file touch map

```
src/data/types.ts, nodes.ts, academics.ts, achievements.ts
src/store/map-store.ts          (+ unlock, sound, hydrate)
src/components/CommandPalette.tsx
src/components/tabs/AcademicsTab.tsx
src/components/map/Terrain.tsx, NodeIcon.tsx, ParallaxLayers.tsx
src/components/map/MapCursor.tsx, Particles.tsx
src/components/juice/SoundProvider.tsx
src/app/api/stats/route.ts
src/app/opengraph-image.tsx
public/media/*, public/sfx/*, public/resume.pdf
```

---

## Order inside each phase (strict)

**Phase 1:** Light mode → data/academics → unlock → ⌘K → case-study UI → OG/resume stub  
**Phase 2:** Node icons + terrain → parallax → media → juice/SFX → cursor  
**Phase 3:** Live stats → easter egg → resume/OG final → content polish → perf  
