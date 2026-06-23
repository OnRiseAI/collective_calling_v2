# Collective Calling — Plan 6: Stories, Appeals, Get Involved hub, Events

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.
>
> **READ FIRST (Next 16):** This repo runs Next.js 16.2.9 with breaking changes vs. your training data. Before writing any route/page code, read the relevant guide in `node_modules/next/dist/docs/`. In particular: `params` is a `Promise` (await it), and dynamic routes need `generateStaticParams` shaped for the `[locale]` segment. Follow the conventions already used by the existing pages under `app/[locale]/`.

**Goal:** Build the four content areas that still 404 from the global nav, with staff-editable Sanity collections where the spec requires them: a **Stories** hub + story detail pages, an **Appeals** hub + full appeal detail pages, an **Events** listing, and a **Get Involved** hub + its four informational sub-pages (Fundraise, Pray, Partner, Invite us to speak). After this plan, every link in `NAV_SECTIONS` resolves.

**Architecture:** Three new repeatable content types — **Stories**, **Appeals**, **Events** — follow the exact pattern the homepage already uses: a Sanity document schema, a typed mirror in `lib/content/types.ts`, an in-code seed (the source of truth until staff populate Sanity), a guarded read function that fetches from Sanity and falls back to the seed, and a GROQ query + mapper in `lib/sanity/`. Pages are server components under `app/[locale]/` that call the read functions. The four **Get Involved** sub-pages are evergreen informational pages on the **typed content layer** (`lib/content/pages/`), exactly like the existing About cluster (no Sanity, deferred to Plan 7 like the other static pages). The existing Sanity `appeal` OBJECT (homepage cards) is left untouched; the new appeals collection uses a distinct document type name **`appealEntry`** to avoid any collision with the working homepage.

**Tech Stack:** Next.js 16.2.9 (App Router, React 19), TypeScript, Tailwind v4, next-intl 4.13.0, Sanity (`sanity` 6, `@sanity/client` 7, `next-sanity` 13, `@sanity/image-url`), Vitest 4, Playwright 1.61.

## Global Constraints

- Account: **OnRise** (`gh auth switch --hostname github.com --user OnRiseAI`). Repo **OnRiseAI/cc**, branch off `main`. Local `D:\Projects\collective-calling`. Commit locally per task; push at branch finish.
- Brand (Plan 1, do not redefine): `brand` #1B3A6B, `brand-dark` #0F2347, `accent` #C8922A (gold), `clay` #B05A38, tints, `ink` #1F1B16, `paper` #FBF7F0, `muted` #6E6258. Fonts `font-heading` (Fraunces), `font-body` (Mulish). Donate is gold-led (`bg-accent! text-brand-dark! hover:bg-accent/90!`). NOT Tearfund blue/white.
- Reuse, do not recreate: `@/components/ui/{Button,Container,Section,Card}`, `@/components/page/{PageHero,Prose,SubNavCards,ValueCards}`, `@/components/donate/DonorboxEmbed`, `@/components/home/WhereMoneyGoes`. `Link` from `@/i18n/navigation`. `DONATE_HREF`, `NAV_SECTIONS` from `@/lib/nav`. `donorboxUrl`, `DONORBOX_FORM` (`'giving-41'`) from `@/lib/donate`. Sanity helpers: `sanityClient`, `isSanityConfigured` from `@/sanity/client`; `urlForImage` from `@/sanity/image`.
- Read-function pattern: mirror `lib/content/home.ts` `getHomeContent()` exactly. If `sanityClient` is `null` OR the fetch throws OR returns empty, return the in-code seed. The seed is the guaranteed render path; Sanity is an optional enhancement. Never let a missing/misconfigured CMS break a page.
- Brand-board rules: gold eyebrow above section headings; Fraunces headings with `text-balance` + a non-breaking space between the last two words; generous rhythm; **exactly one `<h1>` per page** (PageHero); sections `<h2>`, cards `<h3>`.
- CONTENT INTEGRITY (load-bearing, this is a real charity): real CC facts only. Sponsorship **EUR 58/month**. 83% programs / 17% admin. Reg. 611.510, CIF G93524130. Centre of Hope, Kasulu, 18 children. Events are really named **Annual Gala**, **Spring Fair**, **Lunch with Santa** but we have **no dates** — never invent dates, figures, named beneficiaries, or quotes. The ONE real story is **Caleb** (harvest from `lib/content/pages/tanzania.ts` and `D:\Projects\.firecrawl\cc-tanzania.md`). Anything not backed by a real fact must carry `placeholder: true` and render with a visible "Sample content" badge, never as a real claim.
- HARD WRITING RULE: NEVER use em dashes (the long dash) anywhere (code, comments, JSX copy, JSON, schema descriptions). Use periods, commas, colons, parentheses. Provide `key` for every mapped list.
- i18n: English content; Spanish phase 2. All routes under `app/[locale]/` with `setRequestLocale(locale)`. Internal links via `@/i18n/navigation` `Link`. Robots stays `noindex` (Plan 7 enables indexing). Do NOT run `vercel`. Do NOT add per-page metadata/OG/JSON-LD (Plan 7).
- Images: reuse existing assets under `public/images/` only (no AI/fabricated imagery). Where no real photo exists, use `PageHero` in its solid-navy mode. Available: `public/images/tanzania/caleb-{before,after,family}.jpg`, `centre-of-hope.jpg`, `hero.jpg`; `public/images/spain/{hero-mobile-shower,outreach}.jpg`; `public/images/gala-poster.jpeg`; `public/images/speaking-event.jpg`; `public/images/about/hero-group.jpg`.
- Every task ends green: `pnpm test` (all) and `pnpm build` succeed. The final task keeps `pnpm test:e2e` green. Do NOT weaken `playwright.config` (`workers: 1`, `build && start`).

---

## Data model (typed mirrors in `lib/content/types.ts`)

These types are ALREADY IMPLEMENTED (Tasks 1 and 2). They are the source of truth for the pages below. Do not redefine them; import from `@/lib/content/types`.

```ts
// RichBlock is re-exported from lib/content/pages/types via lib/content/types.

export type Story = {
  slug: string
  title: string
  location: 'tanzania' | 'spain' | 'general'
  excerpt: string
  body: string            // plain text; render as paragraphs split on blank lines
  images?: string[]       // public paths; images[0] is the hero
  placeholder?: boolean
}

// AppealTheme = 'spain' | 'tanzania' | 'general' | 'seasonal'
export type AppealEntry = {
  slug: string
  title: string
  theme: AppealTheme
  blurb: string           // hub card description
  body: string            // plain text; render as paragraphs in Prose
  image?: string
  alt?: string
  relatedHref: string     // e.g. '/spain', '/tanzania', '/get-involved/sponsor-a-child'
  donationDesignation: string  // which Donorbox designation to choose on the form
  donorboxQuery?: { amount: number; recurring: boolean; default_interval: 'm' | 'y' | 'o' }
  placeholder?: boolean
}

export type EventItem = {
  slug: string
  title: string
  summary: string
  image?: string
  alt?: string
  dateLabel?: string      // when absent the UI shows "Date to be announced"
  placeholder?: boolean
}
```

## File Structure (created in this plan)

- `lib/content/seed.collections.ts` — `SEED_STORIES`, `SEED_APPEALS`, `SEED_EVENTS` (real-only + marked placeholders).
- `lib/content/stories.ts`, `lib/content/appeals.ts`, `lib/content/events.ts` — guarded read functions with seed fallback.
- `lib/sanity/stories.query.ts`, `lib/sanity/appeals.query.ts`, `lib/sanity/events.query.ts` — GROQ + mappers.
- `sanity/schemas/objects/richBlock.ts`; `sanity/schemas/documents/story.ts`, `appealEntry.ts`, `event.ts`; registration in `sanity/schemas/index.ts` + `sanity/structure.ts`.
- `components/collections/CollectionCard.tsx`, `components/collections/PlaceholderBadge.tsx`, `components/events/EventList.tsx` (minimal presentational helpers; reuse `Card`/`SubNavCards` where they already fit).
- `app/[locale]/stories/page.tsx`, `app/[locale]/stories/[slug]/page.tsx`.
- `app/[locale]/appeals/page.tsx`, `app/[locale]/appeals/[slug]/page.tsx`.
- `app/[locale]/events/page.tsx`.
- `app/[locale]/get-involved/page.tsx`, `app/[locale]/get-involved/fundraise/page.tsx`, `app/[locale]/get-involved/pray/page.tsx`, `app/[locale]/get-involved/partner/page.tsx`, `app/[locale]/get-involved/invite-us-to-speak/page.tsx`.
- `lib/content/pages/getInvolved.ts`, `fundraise.ts`, `pray.ts`, `partner.ts`, `inviteToSpeak.ts`.
- Tests under `__tests__/collections/`, `__tests__/getInvolved/`, and additions to `e2e/pages.spec.ts`.

---

## Task 1: Typed mirrors + seed data

**Files:** Edit `lib/content/types.ts` (add `Story`, `AppealEntry`, `EventItem`, extend `AppealTheme` with `'seasonal'`, re-export `RichBlock`). Create `lib/content/seed.collections.ts`. Create `__tests__/collections/seed.test.ts`.

**Seed content (real-only):**
- `SEED_STORIES`: one REAL story `caleb` (location `tanzania`, excerpt + body harvested from `lib/content/pages/tanzania.ts` Caleb section, images `caleb-before/after/family.jpg`, `placeholder: false`). Plus exactly one clearly-labeled `placeholder: true` sample story whose title and body announce that real supporter stories are coming (no invented person, no claims).
- `SEED_APPEALS`: REAL entries keyed to the live Donorbox designations: `spain-homelessness` (theme spain, related `/spain`, donationNote points to the "Spain" designation), `tanzania-children` (theme tanzania, related `/tanzania`, "Tanzania" designation), `sponsor-a-child` (theme general, related `/get-involved/sponsor-a-child`, donorboxQuery `{ amount: 58, recurring: true, default_interval: 'm' }`, "Sponsor A Child" designation, EUR 58/mo), `greatest-need` (theme general, "Area of greatest need" designation). All real. Bodies adapt facts from `spain.ts`/`tanzania.ts`/seed; no fabricated figures.
- `SEED_EVENTS`: the three real events `annual-gala` (image `gala-poster.jpeg`), `spring-fair`, `lunch-with-santa`. `dateLabel` omitted (UI shows "Date to be announced"). Short factual summaries only; mark `placeholder: true` on any whose description we cannot source, so the UI badges them.

- [ ] **Step 1: Write failing test** `__tests__/collections/seed.test.ts`: assert `SEED_STORIES` includes a `caleb` story with `placeholder` falsy and a non-empty `body`; assert `SEED_APPEALS` includes `spain-homelessness`, `tanzania-children`, `sponsor-a-child` (with `donorboxQuery.amount === 58`), and `greatest-need`; assert `SEED_EVENTS` includes `annual-gala`, `spring-fair`, `lunch-with-santa`; assert no seed string contains an em dash.
- [ ] **Step 2: Run → FAIL.** `pnpm test collections/seed`.
- [ ] **Step 3: Implement** the types and `seed.collections.ts` with real content.
- [ ] **Step 4: Run → PASS.** Then `pnpm build`.
- [ ] **Step 5: Commit.** `git commit -m "feat(collections): typed models + real seed for stories, appeals, events"`

---

## Task 2: Guarded read layer (Sanity seam + seed fallback)

**Files:** Create `lib/sanity/stories.query.ts`, `appeals.query.ts`, `events.query.ts`; `lib/content/stories.ts`, `appeals.ts`, `events.ts`. Create `__tests__/collections/read.test.ts`.

**Interfaces:**
- `lib/content/stories.ts`: `getStories(): Promise<Story[]>`, `getStory(slug: string): Promise<Story | undefined>`.
- `lib/content/appeals.ts`: `getAppeals(): Promise<AppealEntry[]>`, `getAppeal(slug: string): Promise<AppealEntry | undefined>`.
- `lib/content/events.ts`: `getEvents(): Promise<EventItem[]>`.
- Each mirrors `getHomeContent`: when `sanityClient` is null, return the seed; otherwise fetch the GROQ query, map via the `lib/sanity/*.query.ts` mapper (`urlForImage` for images), and fall back to the seed on error or empty result. `getStory`/`getAppeal` resolve against the result of the list getter.

- [ ] **Step 1: Write failing test** `__tests__/collections/read.test.ts`: mock `@/sanity/client` so `sanityClient` is `null`; assert `getStories()` resolves to `SEED_STORIES`, `getStory('caleb')` resolves to the Caleb story, `getStory('nope')` resolves to `undefined`, `getAppeals()` includes `sponsor-a-child`, `getAppeal('greatest-need')` is defined, and `getEvents()` length is 3.
- [ ] **Step 2: Run → FAIL.**
- [ ] **Step 3: Implement** the query files (GROQ + mapper) and the read functions.
- [ ] **Step 4: Run → PASS.** Then `pnpm build`.
- [ ] **Step 5: Commit.** `git commit -m "feat(collections): guarded read layer with seed fallback"`

---

## Task 3: Sanity schemas + Studio (so staff can add/edit)

**Files:** Create `sanity/schemas/objects/richBlock.ts`; `sanity/schemas/documents/{story,appealEntry,event}.ts`. Edit `sanity/schemas/index.ts` (register the four) and `sanity/structure.ts` (add Stories, Appeals, Events as document lists in the desk; homepage stays the pinned singleton). Run `pnpm typegen`. Create `__tests__/collections/schemas.test.ts`.

**Schemas** (mirror the field names of the typed models so mapping is 1:1):
- `richBlock` (object): `heading` (string, optional), `body` (text, required).
- `story` (document): `title`, `slug` (from title), `location` (string list spain/tanzania/general), `excerpt` (text), `image` (image) + `alt` (string), `body` (array of `richBlock`), `placeholder` (boolean, initialValue false). Preview shows title + placeholder flag.
- `appealEntry` (document): `title`, `slug`, `theme` (spain/tanzania/general/seasonal), `summary` (text), `image` + `alt`, `body` (array of `richBlock`), `donationNote` (text), `donorboxQuery` (object: `amount` number, `recurring` boolean, `default_interval` string list m/o), `relatedHref` (string), `placeholder` (boolean).
- `event` (document): `title`, `slug`, `summary` (text), `dateLabel` (string, optional), `location` (string, optional), `image` + `alt`, `placeholder` (boolean).
- Do NOT touch `sanity/schemas/objects/appeal.ts` or `homePage.ts`.

- [ ] **Step 1: Write failing test** `__tests__/collections/schemas.test.ts`: import the schema index; assert it includes type definitions named `story`, `appealEntry`, `event`, and `richBlock`, and that it STILL includes `homePage` and `appeal` (regression guard). Assert each new document defines a `slug` field and a `title` field.
- [ ] **Step 2: Run → FAIL.**
- [ ] **Step 3: Implement** the schema files, register them, add the desk-structure entries.
- [ ] **Step 4: Run → PASS.** Then `pnpm typegen` (regenerate types) and `pnpm build` (Studio at `/studio` must compile). Verify the homepage read still works (no change to `homePage`/`appeal`).
- [ ] **Step 5: Commit.** `git commit -m "feat(sanity): story, appealEntry, event collections + Studio structure"`

---

## Task 4: Stories hub + detail

**Files:** Create `components/collections/PlaceholderBadge.tsx`, `components/collections/CollectionCard.tsx`; `app/[locale]/stories/page.tsx`, `app/[locale]/stories/[slug]/page.tsx`; `__tests__/collections/stories.test.tsx`.

**Content/behavior:**
- `PlaceholderBadge`: a small gold-outlined pill reading "Sample content" rendered whenever an item has `placeholder` truthy. Reused by stories and events.
- `CollectionCard`: a linked card (image optional, h3 title, a description string, optional `PlaceholderBadge`). The caller passes the description (stories pass `excerpt`, appeals pass `blurb`). Reuse `@/components/ui/Card` internally. Used by the stories and appeals hubs.
- `/stories` (hub): `PageHero` (gold eyebrow, Fraunces h1 e.g. "Lives reclaimed"), intro lede, a grid of `CollectionCard` for `getStories()` (pass `excerpt` as the description) linking to `/stories/[slug]`. Gentle "More stories coming" note since the real set is small. One `<h1>`.
- `/stories/[slug]` (detail): `await params` for `{ locale, slug }`; `getStory(slug)`; if undefined call `notFound()`. `PageHero` (story title as the only h1, photographic mode using `images[0]` when present), `Prose` rendering the `body` string as paragraphs (split on blank lines), a `PlaceholderBadge` if placeholder, a back link to `/stories`, and a closing gold Donate CTA to `DONATE_HREF`. `generateStaticParams` returns `routing.locales.flatMap(l => slugs.map(slug => ({ locale: l, slug })))` from `getStories()` (leave `dynamicParams` at its default so Sanity-added slugs still render).

- [ ] **Step 1: Write failing test** `__tests__/collections/stories.test.tsx`: render the hub (mock `setRequestLocale`, wrap in `NextIntlClientProvider`, mock the read layer to return the seed); assert exactly one `<h1>`, a link to `/stories/caleb`, and a "Sample content" badge for the placeholder story. Render the detail for `caleb`; assert one `<h1>` with the Caleb title and that body text renders.
- [ ] **Step 2: Run → FAIL.**
- [ ] **Step 3: Implement** the components and pages.
- [ ] **Step 4: Run → PASS.** Then `pnpm build`.
- [ ] **Step 5: Commit.** `git commit -m "feat(stories): hub + story detail pages"`

---

## Task 5: Appeals hub + detail (full /appeals/[slug])

**Files:** `app/[locale]/appeals/page.tsx`, `app/[locale]/appeals/[slug]/page.tsx`; `__tests__/collections/appeals.test.tsx`.

**Content/behavior:**
- `/appeals` (hub): `PageHero` (h1 e.g. "Our appeals"), intro, a grid of `CollectionCard` for `getAppeals()` (pass `blurb` as the description) linking to `/appeals/[slug]`. One `<h1>`.
- `/appeals/[slug]` (detail): `await params`; `getAppeal(slug)`; `notFound()` if undefined. `PageHero` (appeal title h1, photographic mode using `image` when present), `Prose` rendering the `body` string as paragraphs, then a giving block: `DonorboxEmbed` preset with the appeal's `donorboxQuery` when present (e.g. sponsor-a-child uses `{ amount: 58, recurring: true, default_interval: 'm' }`), plus a note built from `donationDesignation` telling the donor which designation to choose on the form (Area of greatest need / Spain / Tanzania / Sponsor A Child). A `Link` to `relatedHref` (e.g. "Read more about our work in Spain" -> `/spain`); `relatedHref` is always present. `generateStaticParams` from `getAppeals()` as in Task 4.
- This is an appeal-framed, giving-focused page and is intentionally distinct from the `/spain` and `/tanzania` program pages (user-approved overlap).

- [ ] **Step 1: Write failing test** `__tests__/collections/appeals.test.tsx`: render the hub; assert one `<h1>` and links to `/appeals/spain-homelessness` and `/appeals/sponsor-a-child`. Render the `sponsor-a-child` detail; assert one `<h1>`, the Donorbox `<iframe>` whose `src` contains `donorbox.org/embed/giving-41` and `amount=58`, and a link to `/get-involved/sponsor-a-child` (or the configured related href). Render the `spain-homelessness` detail; assert a link to `/spain`.
- [ ] **Step 2: Run → FAIL.**
- [ ] **Step 3: Implement** the pages.
- [ ] **Step 4: Run → PASS.** Then `pnpm build`.
- [ ] **Step 5: Commit.** `git commit -m "feat(appeals): hub + appeal detail pages with Donorbox presets"`

---

## Task 6: Events listing

**Files:** Create `components/events/EventList.tsx`; `app/[locale]/events/page.tsx`; `__tests__/collections/events.test.tsx`.

**Content/behavior:**
- `EventList`: renders each `EventItem` as a row/card with the title (h3), summary, a date pill showing `dateLabel` or the literal "Date to be announced" when absent, optional image, and a `PlaceholderBadge` when `placeholder`.
- `/events`: `PageHero` (h1 "Events"), intro, `EventList` for `getEvents()`. Honest framing: these are CC's recurring events (Annual Gala, Spring Fair, Lunch with Santa); dates announced closer to the time. One `<h1>`.

- [ ] **Step 1: Write failing test** `__tests__/collections/events.test.tsx`: render the page; assert one `<h1>` containing "Events", the three event titles render, and "Date to be announced" appears for an event without a `dateLabel`.
- [ ] **Step 2: Run → FAIL.**
- [ ] **Step 3: Implement** the component and page.
- [ ] **Step 4: Run → PASS.** Then `pnpm build`.
- [ ] **Step 5: Commit.** `git commit -m "feat(events): events listing page"`

---

## Task 7: Get Involved hub + four informational sub-pages (typed content)

**Files:** Create `lib/content/pages/{getInvolved,fundraise,pray,partner,inviteToSpeak}.ts`; `app/[locale]/get-involved/page.tsx` and `app/[locale]/get-involved/{fundraise,pray,partner,invite-us-to-speak}/page.tsx`; `__tests__/getInvolved/getInvolved.test.tsx`.

**Content/behavior (typed content layer, About-cluster pattern):**
- `/get-involved` (hub): `PageHero` (h1 "Get involved") + `SubNavCards` linking to the ways to engage: Sponsor a child (`/get-involved/sponsor-a-child`, existing), Fundraise (`/get-involved/fundraise`), Events (`/events`), Invite us to speak (`/get-involved/invite-us-to-speak`), Pray (`/get-involved/pray`), Partner with us (`/get-involved/partner`). One `<h1>`.
- `/get-involved/fundraise`: `PageHero` + `Prose`/`ValueCards` with evergreen, non-fabricated guidance on fundraising for CC (ideas, how to start, contact to register a fundraiser). CTA to `/contact` and `DONATE_HREF`.
- `/get-involved/pray`: `PageHero` + `Prose`; faith-forward prayer points adapted from CC's voice (Spain homelessness, Tanzania children, the team). Scripture allowed (e.g. 1 John 4:11). No fabricated facts.
- `/get-involved/partner`: `PageHero` + `Prose`/`ValueCards`; partnering as a church, business, or organization. Reference real partner types (e.g. Rotary Club Guadalmina Marbella, Ayuntamiento de Marbella) and link to `/about/partners`. CTA to `/contact`.
- `/get-involved/invite-us-to-speak`: `PageHero` (photographic with `speaking-event.jpg`) + `Prose`; invite CC to speak at your church/event. CTA to `/contact`.
- All copy adapts Tearfund's structural patterns into CC's voice; real facts only; clearly-marked placeholders if anything is uncertain.

- [ ] **Step 1: Write the five typed content modules** under `lib/content/pages/` (hero + sections, exported consts), real content, no em dashes.
- [ ] **Step 2: Write failing test** `__tests__/getInvolved/getInvolved.test.tsx`: render the hub and each sub-page; assert each has exactly one `<h1>`; assert the hub links to all of `/get-involved/sponsor-a-child`, `/get-involved/fundraise`, `/events`, `/get-involved/invite-us-to-speak`, `/get-involved/pray`, `/get-involved/partner`.
- [ ] **Step 3: Run → FAIL.**
- [ ] **Step 4: Implement** the five pages (server components, `setRequestLocale`, `PageHero` h1, toolkit components).
- [ ] **Step 5: Run → PASS.** Then `pnpm build`.
- [ ] **Step 6: Commit.** `git commit -m "feat(get-involved): hub + fundraise, pray, partner, invite-to-speak"`

---

## Task 8: Wiring + e2e (every nav link resolves)

**Files:** Modify `e2e/pages.spec.ts`. Optionally `__tests__/collections/nav.test.tsx`.

- [ ] **Step 1: Add the new routes to `e2e/pages.spec.ts`.** Plain routes (default load wait, assert status < 400 and exactly one `<h1>`): `/stories`, `/stories/caleb`, `/appeals`, `/appeals/spain-homelessness`, `/events`, `/get-involved`, `/get-involved/fundraise`, `/get-involved/pray`, `/get-involved/partner`, `/get-involved/invite-us-to-speak`. Donorbox-embedding route (use `{ waitUntil: 'domcontentloaded' }`, assert the iframe element is present by `[src*="donorbox.org/embed/giving-41"]` without waiting for it to load): `/appeals/sponsor-a-child`.
- [ ] **Step 2: Nav-resolution check.** Add a test (unit `nav.test.tsx`, or an e2e loop) that every internal `href` in `NAV_SECTIONS` (and `DONATE_HREF`) now maps to an existing route, i.e. none of the previously-404 nav targets (`/appeals`, `/stories`, `/get-involved`, `/events`, `/get-involved/fundraise`, `/get-involved/invite-us-to-speak`, `/get-involved/pray`, `/get-involved/partner`) 404 anymore.
- [ ] **Step 3: Full check.** `pnpm test` (all) PASS, `pnpm build` succeeds, `pnpm test:e2e` PASS (keep existing specs green; do not change `playwright.config`).
- [ ] **Step 4: Commit.** `git commit -m "test(plan6): e2e for stories, appeals, events, get-involved + nav resolution"`

---

## Self-Review (against the spec)

- **Spec §5 IA** → Appeals hub + `/appeals/[slug]` (T5), Stories hub + `/stories/[slug]` (T4), Get Involved hub + Fundraise/Pray/Partner/Invite-to-speak (T7), Events `/events` (T6). Sponsor-a-child and the program pages already exist and are linked, not duplicated. ✓
- **Spec §4 / §11 DoD: Sanity collections, staff can add/edit Stories, Appeals, Events** → document schemas + Studio structure (T3); read layer prefers Sanity, falls back to seed (T2). ✓
- **Content integrity** → real-only seed (Caleb real; Spain/Tanzania/Sponsor/Greatest-Need appeals real and keyed to the live Donorbox designations; three real event names with no invented dates). Everything unverified carries `placeholder: true` + a visible badge. No fabricated people, dates, figures, or quotes. ✓
- **Donorbox** → appeal detail pages reuse `DonorboxEmbed` (`giving-41`) with per-appeal presets and a designation note; no card data on-site. ✓
- **Brand** → reuses Plan 1/2/4 primitives; gold-led Donate; one h1 per page; eyebrow + Fraunces + text-balance. NOT Tearfund blue. ✓
- **Homepage safety** → new appeals collection uses document type `appealEntry`; the existing `appeal` object and `homePage` singleton are untouched; T3 regression test guards this. ✓
- **e2e external-iframe stability** → only `/appeals/sponsor-a-child` embeds Donorbox; tested with `domcontentloaded` + element-presence (T8). ✓
- **Out of scope (correctly deferred to Plan 7)** → per-page metadata/OG/JSON-LD, sitemap, enabling indexing, Spanish content, moving the typed Get Involved pages into Sanity, Vercel deploy. Robots stays noindex. ✓
- Placeholder scan: no plan-level TODOs; each task has concrete content + a concrete failing-first test. Donorbox id `giving-41` is the established live value.

## Roadmap — plan after this one

7. SEO/i18n hardening + launch: per-page metadata/OG/JSON-LD (Organization/NGO + Article for stories), sitemap, enable indexing, email-signup provider + real contact-form backend (currently mailto only), real supporter testimonials + real stories/event dates from CC, move in-code pages (About/programs/donate/get-involved) into Sanity, Spanish content, optional Sanity seeding script for the collections, Vercel env (`NEXT_PUBLIC_SANITY_*`) + domain cutover, `middleware.ts` -> `proxy.ts` rename (Next 16 deprecation), DRY cleanups (extract `cx`/`noOrphan` to lib, shared `<Eyebrow>` primitive).
