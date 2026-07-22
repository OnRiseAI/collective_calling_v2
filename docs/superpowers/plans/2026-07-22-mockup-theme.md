# Mockup-Theme Redesign Implementation Plan (v2)

> **For agentic workers:** REQUIRED SUB-SKILL: superpowers:executing-plans. Compact plan — the
> section-by-section source of truth is the spec (2026-07-22-mockup-theme-redesign.md) and the
> client mockup; component/test patterns follow the v1 build already on main.

**Goal:** Re-skin the site to the client's design-theme mockup (charcoal/cream/gold, Playfair
Display) and rebuild the homepage to mirror the mockup's sections and copy verbatim.

**Global constraints:** unchanged from v1 plan (verbatim mockup copy incl. em dashes; real
photos only; reduced-motion safe; noOrphan+text-balance on headings; pnpm test green per task).

### Task 1: Theme tokens + display font
- `app/globals.css`: new palette values (cream #f3efe6 page, charcoal #0f1620 dark, footer
  #0b1119, gold #c9a45c accent, ink #1a2029, muted #5d6470); `--font-display` (Playfair).
- `app/[locale]/layout.tsx`: load Playfair_Display via next/font as `--font-playfair`.
- Commit: `feat(theme): mockup palette + Playfair display font`.

### Task 2: Nav + Header + Footer + ticker removal
- `lib/nav.ts`: mockup IA (Impact, Values in Action, Stories, Events, Charity Shops, About,
  Contact; CTA Get Involved). Keep NavSection shape; footer columns per mockup mapped to real
  routes.
- Header: flat dark bar, existing logo, Get Involved gold button; remove MegaMenu usage and
  AppealTicker from layout. MobileNav follows flat sections.
- Footer: dark columns + Stay Connected (socials + no-op newsletter form, honest no-backend
  comment as before) + legal bar.
- Update `__tests__/header.test.tsx`, `__tests__/footer.test.tsx`, e2e nav spec.

### Task 3: HomeContent v3 + seed (mockup copy verbatim)
- `lib/content/home.types.ts` + `home.seed.ts` rewritten: hero, ways (3 cards), via band,
  storiesIntro, snapshot (5 stats), partners, getInvolved (3 actions + shops panel).
- `__tests__/home/chapters-content.test.ts` rewritten to the new seed.

### Task 4: Homepage sections
- `components/home/`: HeroSection, WaysSection, ViaBand, StoriesSection, SnapshotBand,
  PartnersSection, GetInvolvedBand (replacing the six chapter components + JourneyRail).
- `app/[locale]/page.tsx` composes them; stories via getStories().
- Component tests per v1 patterns.

### Task 5: /charity-shops page
- `app/[locale]/charity-shops/page.tsx` + `lib/content/pages/charityShops.ts`; sitemap entry.

### Task 6: Sanity schema v3 + query + reseed
- homeChapters.ts → homeSections.ts objects; homePage doc; HOME_QUERY + mapSanityHome
  per-field fallbacks; scripts/seed-sanity.ts; `pnpm typegen`; re-seed dataset.

### Task 7: Verification
- Full vitest, lint, build, Playwright (update home/locale/pages specs to mockup copy),
  screenshots at 1512/390 compared to mockup proportions.
