# Collective Calling — Plan 5: Donate hub + Donorbox

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the giving destination: a `/donate` hub with the Collective Calling Donorbox form embedded on-site, a Ways to Give page, and a Sponsor a Child page, so every Donate CTA across the site resolves to a real, working giving experience.

**Architecture:** Each page is a server component under `app/[locale]/` reading typed content from `lib/content/pages/` (same seam as the other pages). A reusable `DonorboxEmbed` client component renders the Donorbox form (`giving-41`) as a responsive iframe with the Donorbox widget script. The homepage `DonateWidget` already deep-links to Donorbox; these pages host the actual form. The existing `WhereMoneyGoes` component and the `/about/financial-accountability` page are reused/linked for transparency rather than duplicated.

**Tech Stack:** Next.js 16.2.9 (App Router, React 19), TypeScript, Tailwind v4, next-intl 4.13.0, Vitest, Playwright.

## Global Constraints

- Account: **OnRise**. Repo **OnRiseAI/cc**, branch off `main`. Local `D:\Projects\collective-calling`. Commit locally; push at branch finish.
- Brand (Plan 1, do not redefine): `brand` #1B3A6B, `brand-dark` #0F2347, `accent` #C8922A (gold), `clay` #B05A38, tints, `ink` #1F1B16, `paper` #FBF7F0, `muted` #6E6258. Fonts `font-heading` (Fraunces), `font-body` (Mulish). Donate is gold-led (`bg-accent! text-brand-dark! hover:bg-accent/90!`). NOT Tearfund blue/white.
- Reuse, do not recreate: `@/components/ui/{Button,Container,Section,Card}`, `@/components/page/{PageHero,Prose,SubNavCards}`, `@/components/home/WhereMoneyGoes`. `Link` from `@/i18n/navigation`. `DONATE_HREF`, `NAV_SECTIONS` from `@/lib/nav`. `donorboxUrl`, `DONORBOX_FORM` (= `'giving-41'`) from `@/lib/donate`.
- Brand-board rules: gold eyebrow above section headings; Fraunces headings with `text-balance` + a non-breaking space between the last two words; generous rhythm; one `<h1>` per page (PageHero); sections `<h2>`, cards `<h3>`.
- DONORBOX: the live CC form id is **`giving-41`** (with on-form designations: Area of greatest need, Spain, Tanzania, Sponsor A Child). The embed URL is `https://donorbox.org/embed/giving-41`. External giving links and the iframe target `donorbox.org`. Payment/processing is entirely Donorbox (PCI handled there); we never collect card data.
- E2E + external iframe: the Donorbox iframe is a slow external resource. Routes that embed it must be navigated in e2e with `waitUntil: 'domcontentloaded'` (NOT the default `load`, which would wait on the external iframe and time out, the same class of issue as the Sanity-image load-event stall). The iframe must use `loading="lazy"`. Tests assert the iframe ELEMENT exists (presence + src), never its loaded contents. Do NOT change the existing `playwright.config` (`workers: 1`, `build && start`).
- CONTENT: use real CC facts. Sponsorship is **EUR 58/month** (gives a child food, shelter, education). 83% programs / 17% admin. Registration 611.510. No fabricated figures or testimonials.
- HARD WRITING RULE: NEVER use em dashes (long dash) in any file (code, comments, JSX copy, JSON). Use periods, commas, colons, parentheses. Index keys for mapped lists.
- i18n: English content; Spanish phase 2. All routes under `app/[locale]/`. Robots stays `noindex`. Do not run `vercel`. Do not wire these pages into Sanity (deferred).
- Every task ends green: `pnpm test` (all) and `pnpm build` succeed; the final task keeps `pnpm test:e2e` green.

---

## File Structure (created in this plan)

- `components/donate/DonorboxEmbed.tsx` — client iframe embed of the Donorbox form + widget script.
- `lib/content/pages/donateHub.ts`, `lib/content/pages/waysToGive.ts`, `lib/content/pages/sponsorChild.ts` — typed page content.
- `app/[locale]/donate/page.tsx`, `app/[locale]/donate/ways-to-give/page.tsx`, `app/[locale]/get-involved/sponsor-a-child/page.tsx`.
- Tests under `__tests__/donate/` and additions to `e2e/pages.spec.ts`.

---

## Task 1: DonorboxEmbed component

**Files:** Create `components/donate/DonorboxEmbed.tsx`, `__tests__/donate/embed.test.tsx`.

**Interfaces:**
- Consumes: `DONORBOX_FORM`, `donorboxUrl` from `@/lib/donate`.
- Produces: `DonorboxEmbed(props: { formId?: string; title?: string; query?: Record<string, string | number | boolean>; height?: number; className?: string }): JSX.Element` (a `'use client'` component). Renders a responsive `<iframe>` to `https://donorbox.org/embed/${formId ?? DONORBOX_FORM}` (appending `query` as a query string when provided), with `loading="lazy"`, an accessible `title` (default "Collective Calling donation form"), `seamless`, `scrolling="no"`, sensible default height (around 900), max-width ~500px centered, and the responsive attributes Donorbox recommends (`name="donorbox"`, `allow="payment"`). Load the Donorbox widget script `https://donorbox.org/widget.js` once via `next/script` (strategy `afterInteractive`) so the iframe auto-resizes. Provide a `<noscript>` fallback link to `donorbox.org/giving-41`.

- [ ] **Step 1: Write failing test** `__tests__/donate/embed.test.tsx`: render `<DonorboxEmbed />`; assert an `<iframe>` (by `title`/role) exists whose `src` contains `donorbox.org/embed/giving-41` and that it has `loading="lazy"`. Render `<DonorboxEmbed query={{ amount: 58, recurring: true }} />` and assert the src contains `amount=58` and `recurring=true`.
- [ ] **Step 2: Run → FAIL.** `pnpm test donate/embed` → FAIL.
- [ ] **Step 3: Implement `DonorboxEmbed.tsx`** per the interface.
- [ ] **Step 4: Run → PASS.** Then `pnpm build` → succeeds.
- [ ] **Step 5: Commit.** `git add -A && git commit -m "feat(donate): DonorboxEmbed component"`

---

## Task 2: Donate hub (/donate)

**Files:** Create `lib/content/pages/donateHub.ts`, `app/[locale]/donate/page.tsx`, `__tests__/donate/donateHub.test.tsx`.

**Content:** A giving hub. Hero (gold eyebrow "Give today", a Fraunces title such as "Your gift restores dignity", a short lede). The embedded Donorbox form is the centerpiece. A short "what your gift does" framing (reuse the homepage donate tier impact lines from `getHomeContent().donate` is optional; or a few concise lines, real and non-guaranteeing). A "where your money goes" section reusing `@/components/home/WhereMoneyGoes` (with the 83/17 split) plus a `Link` to `/about/financial-accountability` for the full detail. A reassurance block (secure giving through Donorbox, one-time or monthly, choose a designation: Area of greatest need, Spain, Tanzania, or Sponsor a Child). A link to `/donate/ways-to-give` and `/get-involved/sponsor-a-child`.

**Interfaces:** Consumes `PageHero`, `Prose`, `Section`, `Button`, `WhereMoneyGoes`, `DonorboxEmbed`, `Link`.

- [ ] **Step 1: Write `lib/content/pages/donateHub.ts`** exporting `donateHubContent` (hero, intro, the where-your-money-goes `money` object matching WhereMoneyGoes props {programsPct:83, adminPct:17, programsLabel, adminLabel, note}, reassurance copy, the designation list).
- [ ] **Step 2: Write failing test** `__tests__/donate/donateHub.test.tsx`: render the page (mock `setRequestLocale`, wrap in NextIntlClientProvider); assert exactly one `<h1>` containing a giving headline, the Donorbox `<iframe>` (src contains `donorbox.org/embed/giving-41`) is present, `83%` and `17%` render, and a link to `/about/financial-accountability` exists.
- [ ] **Step 3: Run → FAIL.**
- [ ] **Step 4: Implement `app/[locale]/donate/page.tsx`** (async server component, `setRequestLocale`, PageHero h1, DonorboxEmbed, WhereMoneyGoes + financials link, reassurance, links to ways-to-give + sponsor).
- [ ] **Step 5: Run → PASS.** Then `pnpm build` (the page prerenders; the iframe is client/lazy).
- [ ] **Step 6: Commit.** `git commit -m "feat(donate): Donate hub with Donorbox embed"`

---

## Task 3: Ways to Give (/donate/ways-to-give)

**Files:** Create `lib/content/pages/waysToGive.ts`, `app/[locale]/donate/ways-to-give/page.tsx`, `__tests__/donate/waysToGive.test.tsx`.

**Content:** An informational page of the ways to support CC, each a card/section with a short description and a CTA:
- Give once or monthly (CTA to `/donate`).
- Sponsor a child, EUR 58/month (CTA to `/get-involved/sponsor-a-child`).
- Fundraise for Collective Calling (CTA to `/get-involved/fundraise`, which is a later plan and may 404 for now, acceptable).
- Give in memory or leave a gift in your will (CTA: `mailto:info@collectivecalling.org` or `/contact`).
- Bank transfer or another way (CTA: `/contact`).
- Invite us to speak (CTA: `/contact`).
Use real, non-fabricated framing. Reuse `SubNavCards` or `Card` for the grid.

**Interfaces:** Consumes `PageHero`, `Prose`, `Section`, `Card` (or `SubNavCards`), `Button`, `Link`, `DONATE_HREF`.

- [ ] **Step 1: Write `lib/content/pages/waysToGive.ts`** exporting `waysToGiveContent` (hero + the ways as typed items with title, body, ctaLabel, ctaHref).
- [ ] **Step 2: Write failing test** `__tests__/donate/waysToGive.test.tsx`: assert the page `<h1>` contains "Ways to Give", and that the "Sponsor a child" item links to `/get-involved/sponsor-a-child` and a "Give once or monthly" item links to `/donate`.
- [ ] **Step 3: Run → FAIL.**
- [ ] **Step 4: Implement the page.**
- [ ] **Step 5: Run → PASS.** Then `pnpm build`.
- [ ] **Step 6: Commit.** `git commit -m "feat(donate): Ways to Give"`

---

## Task 4: Sponsor a Child (/get-involved/sponsor-a-child)

**Files:** Create `lib/content/pages/sponsorChild.ts`, `app/[locale]/get-involved/sponsor-a-child/page.tsx`, `__tests__/donate/sponsorChild.test.tsx`. Optionally harvest a relevant image into `public/images/sponsor/` (validate; else reuse an existing Tanzania image).

**Content:** The EUR 58/month sponsorship. Hero. The story: for EUR 58 a month you give a child in Tanzania food, shelter, education, and the chance of a future, within the Centre of Hope and family-reunification context (real facts: Centre of Hope, Kasulu, 18 children). A short "what your sponsorship provides" list (food, shelter, education, trauma care, the path home). Then the DonorboxEmbed preset for sponsorship via `query={{ amount: 58, recurring: true, default_interval: 'm' }}` with a note to choose the "Sponsor a Child" designation on the form. A closing CTA.

**Interfaces:** Consumes `PageHero`, `Prose`, `Section`, `Button`, `DonorboxEmbed`, `Link`.

- [ ] **Step 1: Write `lib/content/pages/sponsorChild.ts`** exporting `sponsorChildContent` (hero, story RichBlocks, the "what it provides" list, donate note). Real facts only (EUR 58/mo, Centre of Hope, 18 children).
- [ ] **Step 2: Write failing test** `__tests__/donate/sponsorChild.test.tsx`: assert the page `<h1>` mentions "Sponsor", the text "58" (EUR 58) and "Centre of Hope" render, and the DonorboxEmbed `<iframe>` src contains `amount=58` and `recurring=true`.
- [ ] **Step 3: Run → FAIL.**
- [ ] **Step 4: Implement the page** (PageHero h1, story Prose, what-it-provides list, DonorboxEmbed with the sponsor query, CTA).
- [ ] **Step 5: Run → PASS.** Then `pnpm build`.
- [ ] **Step 6: Commit.** `git commit -m "feat(donate): Sponsor a Child"`

---

## Task 5: Wiring + e2e

**Files:** Modify `e2e/pages.spec.ts` (add the donate routes); create `__tests__/donate/links.test.tsx` if useful.

- [ ] **Step 1: Extend `e2e/pages.spec.ts`** to cover `/donate`, `/donate/ways-to-give`, `/get-involved/sponsor-a-child`. For the two routes that embed Donorbox (`/donate`, `/get-involved/sponsor-a-child`), navigate with `{ waitUntil: 'domcontentloaded' }` (do NOT wait for the external iframe). For each new route assert the response is OK (status < 400) and exactly one `<h1>`. On `/donate`, additionally assert a Donorbox `<iframe>` element is present (by `[src*="donorbox.org/embed/giving-41"]`), without waiting for it to load. Keep all existing specs green.
- [ ] **Step 2: Assert the Donate CTA destination resolves.** Add an e2e check that navigates from `/` to the hero Donate CTA target and confirms `/donate` now returns one `<h1>` (the homepage gold Donate CTA, previously 404, now resolves).
- [ ] **Step 3: Run full check.** `pnpm test` (all) PASS, `pnpm build` succeeds, `pnpm test:e2e` PASS.
- [ ] **Step 4: Commit.** `git commit -m "feat(donate): donate routes e2e + Donate CTA reachability"`

---

## Self-Review (against the spec)

- **Spec §6 donate / §5 IA Donate** → Donate hub `/donate` (T2), Ways to Give (T3), Sponsor a Child (T4), Where your money goes (reused WhereMoneyGoes + link to the existing Financial Accountability page, T2, intentionally not a duplicate page). ✓
- **Donorbox integration (spec decision: keep Donorbox)** → `DonorboxEmbed` (T1) embeds `giving-41` on-site; the homepage widget already deep-links. ✓
- **Every Donate CTA resolves** → `/donate` now exists; T5 e2e verifies the homepage gold Donate CTA reaches it (previously 404). ✓
- **Content integrity** → EUR 58/mo, 83/17, Centre of Hope/18 children real; no fabricated figures/testimonials; no card data collected (Donorbox handles payment). ✓
- **Brand** → reuses Plan 1/2 primitives; gold-led; one h1 per page; eyebrow+Fraunces+text-balance. ✓
- **e2e external-iframe stability** → domcontentloaded + lazy iframe + element-presence assertions (T1, T5). ✓
- Placeholder scan: no plan-level TODOs; each task has concrete content + a concrete test. Donorbox form id `giving-41` is the established live value from `@/lib/donate`.
- Type consistency: pages consume `lib/content/pages` types; `DonorboxEmbed` and `WhereMoneyGoes` props are used by name as defined.

## Roadmap — plans after this one

6. Stories / Appeals / Get Involved / Events (Sanity collections + pages; the Get Involved hub picks up Fundraise/Pray/Partner/Events that Ways to Give links to).
7. SEO/i18n hardening + launch (per-page metadata/OG/JSON-LD, sitemap, indexing, email signup provider + real contact form, real testimonials, move in-code pages into Sanity, Spanish content, Vercel env + domain cutover, middleware->proxy rename, noOrphan/cx/Eyebrow DRY cleanups).
