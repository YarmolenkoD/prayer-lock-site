# Landing Page Variants — Design

## Context

Prayer Lock's single homepage targets one keyword cluster and one visual style.
To reach audiences with different search intent (secular focus users, general
Christians, liturgical/traditional Christians, habit/self-improvement users), we add
four alternate landing pages — each with its own keywords, copy, and distinct design —
all linking to the same App Store listing. Goal: rank for more query clusters and let
more user types see a version that speaks to them.

The homepage (`index.html`) stays the canonical `/` and primary page.

## Routing

Static GitHub Pages, no framework. Clean URLs via directory-index files:

- `/lp/focus/` → `lp/focus/index.html`
- `/lp/quiet-time/` → `lp/quiet-time/index.html`
- `/lp/catholic/` → `lp/catholic/index.html`
- `/lp/morning-routine/` → `lp/morning-routine/index.html`

GitHub Pages serves `.../slug/` from `slug/index.html` automatically — this is the "router."
Each page self-canonicals to its own `/lp/<slug>/`.

## The four variants

| Slug | Audience | Keyword cluster | Visual direction |
|------|----------|-----------------|------------------|
| focus | Secular / digital detox | dopamine detox, screen-time blocker, doomscrolling, focus | Cool minimal, slate accent, whitespace |
| quiet-time | Christian | daily devotional, quiet time, morning prayer, time with God | Warm cream/gold, soft, devotional serif |
| catholic | Catholic/Orthodox | prayer rule, rosary, examen, Liturgy of the Hours | Burgundy/gold parchment, traditional serif |
| morning-routine | Habit / self-improvement | morning routine, habit tracker, prayer streak, 5am | Bright gradient, bold modern |

Each page: unique title/description/keywords/OG/canonical/hreflang, tuned `<h1>` + body
copy + 5–6 Q&A FAQ, `SoftwareApplication` + `FAQPage` JSON-LD, reused screenshots,
distinct inline CSS. ~450–700 words visible each.

## Shared constraints (identical across variants)

- **App Store link (live):** `https://apps.apple.com/ro/app/prayer-lock-quiet-time/id6758918601`
  — real `<a>` around `apple.svg`, new tab.
- **Android (not shipped):** small "Android coming soon — join the waitlist" text link → `/`.
  No functional Google Play button, no JS (keeps variants dependency-free, fast, no
  duplicated Formspree code).
- Assets referenced by absolute root path (`/app-icon.png`, `/screenshot-N.png`, `/apple.svg`).
- `<html lang="en">`, hreflang en + x-default self-referencing (Russian later).
- No JavaScript, no external fonts/CDNs, all CSS inline.

## SEO — avoiding doorway-page penalty

Doorway pages (near-duplicate pages made only to funnel search traffic) are penalized.
Mitigations:
1. Genuinely distinct content **and** design per page — different audience, copy, FAQ, layout.
2. Cross-linking: homepage footer gets a subtle "More ways to use Prayer Lock →" row linking
   all four variants (removes orphan pages, passes link equity). Each variant links back to
   `/` and `/blog/`.
3. All four added to `sitemap.xml`.
4. `robots.txt` already allows all crawlers (incl. AI bots).

## Build

Four parallel agents, one per variant (independent files, distinct designs), against this
shared spec. Then: wire sitemap + homepage cross-link row, validate JSON-LD + HTML tag
balance for each, and visual-check each rendered page.

## Verification

- All 8 new JSON-LD blocks parse (4× SoftwareApplication + 4× FAQPage).
- All 4 pages tag-balanced, serve 200 at `/lp/<slug>/` via local server.
- Visual check: each design clearly distinct from the others and from the homepage.
- App Store link present and correct on all four; Android waitlist link → `/`.
- sitemap.xml valid; homepage cross-link row renders and links resolve.
