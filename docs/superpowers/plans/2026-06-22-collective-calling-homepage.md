# Collective Calling — Plan 2: Homepage

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the complete, production-quality Collective Calling homepage (Tearfund section structure, CC brand and content) on a typed content layer that is ready for Sanity to plug into later.

**Architecture:** The homepage is a server component that calls `getHomeContent()` from a typed content layer in `lib/content/`. Every section is a focused component under `components/home/` consuming a slice of that typed content. The content layer returns hand-authored seed content now; in Plan 3 the same function reads Sanity when configured and falls back to this seed otherwise. Two sections are client components (Testimonials carousel, Donate widget); the rest are server components. All visuals use the Plan 1 brand tokens and primitives.

**Tech Stack:** Next.js 16.2.9 (App Router, React 19), TypeScript, Tailwind v4 (tokens in `app/globals.css` `@theme`), next-intl 4.13.0, Vitest + @testing-library/react, Playwright.

## Global Constraints

- Account context: **OnRise**. Repo **OnRiseAI/cc**, branch off `main`. Local: `D:\Projects\collective-calling`. Commit locally; push is handled at branch finish.
- Brand (Plan 1, do not redefine): colors `brand` #1B3A6B, `brand-dark` #0F2347, `accent` #C8922A (gold), `clay` #B05A38, `clay-tint` #F3E7DC, `indigo-tint` #E7ECF4, `ink` #1F1B16, `paper` #FBF7F0, `muted` #6E6258. Fonts `font-heading` (Fraunces), `font-body` (Mulish). Radius `rounded-lg`. **Donate is gold-led** (`bg-accent! text-brand-dark! hover:bg-accent/90!`). NOT Tearfund's blue/white.
- Reuse Plan 1 primitives, do not recreate: `@/components/ui/Button` (variants `primary|secondary|ghost`, sizes `md|lg`; polymorphic `as` — pass `as={Link}` for internal locale-aware links, renders plain `<a>` for external, plain `<button>` otherwise), `@/components/ui/Container` (sizes `prose|default|wide`), `@/components/ui/Section` (tones `paper|indigo-tint|clay-tint|dark`, `container` bool, `containerSize`). Internal links use `Link` from `@/i18n/navigation`; external links use plain `<a target="_blank" rel="noopener noreferrer">`.
- Brand board rules: eyebrow label (uppercase, gold or clay, `font-body` bold, tracking) above section headings; headings in Fraunces; `text-balance` + a non-breaking space between the last two words of every H1/H2/H3 (no orphans); generous section rhythm (Section already encodes it); warm documentary photography with a navy gradient overlay when text sits on a photo; dignity-first (no pity framing).
- HARD WRITING RULE: NEVER use em dashes (long dash) in any file (code, comments, JSX copy, JSON, content). Use periods, commas, colons, parentheses, or the middot (·) for the registration line.
- Content integrity (spec §8): use real CC facts as-is; for facts CC has not supplied (supporter testimonials), use clearly-marked placeholders flagged in the content module with a `placeholder: true` field and a `// PLACEHOLDER: replace with real data before launch` comment. Do NOT fabricate specific impact numbers; the impact stats use real, verifiable framings only.
- Images: copy needed photos from `assets-source/photos/` into `public/images/` (runtime never references `assets-source/`). Available: `tanzania-children.jpg`, `spain-homelessness.jpg`, `spain-mobile-shower.jpg`, `speaking-event.jpg`, `gala-poster.jpeg`, `transform-3.png`..`transform-6.png`. Use `next/image`.
- Locale: homepage content is English; Spanish is phase 2. The content module is English only.
- Robots stays `noindex` (preview). Do not run `vercel`. Do not provision Sanity (Plan 3).
- Every task ends green: `pnpm test` (all), and `pnpm build` succeeds; tasks that touch rendered routes also keep `pnpm test:e2e` green.

---

## File Structure (created in this plan)

- `lib/content/types.ts` — all homepage content types (the data contract).
- `lib/content/home.ts` — `getHomeContent(): Promise<HomeContent>` returning the seed content (Sanity seam for Plan 3).
- `lib/donate.ts` — `donorboxUrl(amount, interval)` helper (shared by Donate widget and later Donate page).
- `components/ui/Card.tsx` — shared card primitive (brand board card spec).
- `components/home/Hero.tsx`, `ImpactStats.tsx`, `AppealsCards.tsx`, `MissionBlurb.tsx`, `ScriptureBanner.tsx`, `Testimonials.tsx` (client), `ExploreCards.tsx`, `WhereMoneyGoes.tsx`, `DonateWidget.tsx` (client), `TrustSignals.tsx`.
- `public/images/*` — copied photography.
- `app/[locale]/page.tsx` — rebuilt to assemble the sections.
- Tests under `__tests__/home/` (Vitest) and an updated `e2e/home.spec.ts`.

---

## Task 1: Content layer, images, and the Card primitive

**Files:**
- Create: `lib/content/types.ts`, `lib/content/home.ts`, `lib/donate.ts`, `components/ui/Card.tsx`, `public/images/` (copied photos)
- Test: `__tests__/home/content.test.ts`, `__tests__/home/card.test.tsx`

**Interfaces:**
- Produces (consumed by every later task):

```ts
// lib/content/types.ts
export type ImpactStat = { icon: 'shower' | 'home' | 'heart'; value: string; label: string }
export type AppealTheme = 'spain' | 'tanzania' | 'general'
export type Appeal = { slug: string; title: string; blurb: string; image: string; alt: string; href: string; theme: AppealTheme }
export type Testimonial = { quote: string; attribution: string; placeholder?: boolean }
export type ExploreCard = { title: string; blurb: string; image: string; alt: string; href: string }
export type DonateTier = { amount: number; interval: 'monthly' | 'once'; impact: string }
export type HomeContent = {
  hero: { eyebrow: string; headline: string; lede: string; image: string; alt: string }
  impactStats: ImpactStat[]
  appeals: Appeal[]
  mission: { eyebrow: string; heading: string; body: string }
  scripture: { quote: string; reference: string }
  testimonials: Testimonial[]
  exploreCards: ExploreCard[]
  money: { programsPct: number; adminPct: number; programsLabel: string; adminLabel: string; note: string }
  donate: { monthlyTiers: DonateTier[]; onceTiers: DonateTier[] }
  trust: { registration: string; statement: string; partners: string[] }
}
export async function getHomeContent(): Promise<HomeContent>
```
- `lib/donate.ts`: `export const DONORBOX_FORM = 'giving-41'` and `export function donorboxUrl(amount?: number, interval?: 'monthly' | 'once'): string` returning `https://donorbox.org/giving-41` with `?amount=` and `?recurring=true|false` appended when args are given.
- `components/ui/Card.tsx`: `export function Card(props: { image?: string; alt?: string; theme?: 'general'|'spain'|'tanzania'; href?: string; eyebrow?: string; title: string; children?: ReactNode; className?: string }): JSX.Element` — white/paper surface, warm `border-muted/20`, `rounded-xl` (0.75rem), soft warm shadow, optional top image (`next/image`, 16:9), a top rule colored by theme (general=accent gold, spain=brand indigo, tanzania=clay), Fraunces H3/H4 title, body in Mulish. When `href` is set the whole card is a locale-aware `Link` (internal) and the title carries a hover treatment.

- [ ] **Step 1: Copy images.** Copy the eight photos plus `gala-poster.jpeg` from `assets-source/photos/` to `public/images/` (keep names). Verify each is a valid image.

- [ ] **Step 2: Write `lib/content/types.ts`** with the types above.

- [ ] **Step 3: Write `lib/content/home.ts`** returning this EXACT seed content (real facts as-is; testimonials flagged placeholder):

```ts
export async function getHomeContent(): Promise<HomeContent> {
  return {
    hero: {
      eyebrow: 'Collective Calling',
      headline: 'Answer the call to restore dignity and rebuild families.',
      lede: 'A Christian charity walking with people sleeping rough in Spain and street-connected children in Tanzania, restoring dignity and bringing families back together.',
      image: '/images/tanzania-children.jpg',
      alt: 'Children smiling outside the Centre of Hope in Tanzania.',
    },
    impactStats: [
      { icon: 'shower', value: "Spain's first", label: 'mobile shower unit, restoring dignity to people sleeping rough in Marbella.' },
      { icon: 'home', value: 'Centre of Hope', label: 'a safe haven that rescues and reunites street-connected children in Tanzania.' },
      { icon: 'heart', value: '83%', label: 'of every euro goes directly to our programs.' },
    ],
    appeals: [
      { slug: 'spain', title: 'Restoring dignity in Spain', blurb: 'Our mobile shower unit and outreach bring hygiene, warmth, and human connection to people sleeping rough.', image: '/images/spain-mobile-shower.jpg', alt: 'The Collective Calling mobile shower unit serving people in Spain.', href: '/spain', theme: 'spain' },
      { slug: 'tanzania', title: 'Rebuilding families in Tanzania', blurb: 'Through our Centre of Hope we rescue, restore, and reunite street-connected children with safe, loving homes.', image: '/images/tanzania-children.jpg', alt: 'Children at the Centre of Hope in Tanzania.', href: '/tanzania', theme: 'tanzania' },
      { slug: 'sponsor', title: 'Sponsor a child', blurb: 'For 58 euros a month you can give a child food, shelter, education, and the chance of a future.', image: '/images/speaking-event.jpg', alt: 'A Collective Calling gathering.', href: '/get-involved/sponsor-a-child', theme: 'general' },
    ],
    mission: {
      eyebrow: 'Our mission',
      heading: 'When people are pushed to the margins, we walk with them.',
      body: 'Collective Calling restores dignity and strengthens families. We support people experiencing homelessness in Spain through our mobile shower service, and we work toward family reunification for vulnerable street children in Tanzania, helping children return to safe, loving homes. Every person we serve is treated as exactly that: a person, made and loved.',
    },
    scripture: {
      quote: 'Beloved, if God so loved us, we also ought to love one another.',
      reference: '1 John 4:11',
    },
    // PLACEHOLDER: replace these with real supporter quotes before launch (spec section 10).
    testimonials: [
      { quote: 'Through Collective Calling I can love my neighbour in places I could never reach on my own.', attribution: 'Supporter', placeholder: true },
      { quote: 'I give because they treat every person with dignity, and because nearly every euro reaches the people who need it.', attribution: 'Monthly giver', placeholder: true },
      { quote: 'Seeing a child go from the street back to a loving home is the most hopeful thing I know.', attribution: 'Supporter', placeholder: true },
    ],
    exploreCards: [
      { title: 'Appeals', blurb: 'Stand with families in Spain and Tanzania through our current appeals.', image: '/images/spain-homelessness.jpg', alt: 'Outreach in Spain.', href: '/appeals' },
      { title: 'Stories', blurb: 'Read how lives are being reclaimed, one person and one family at a time.', image: '/images/transform-5.png', alt: 'A life reclaimed.', href: '/stories' },
      { title: 'Get involved', blurb: 'Sponsor a child, fundraise, pray, or invite us to speak.', image: '/images/speaking-event.jpg', alt: 'A Collective Calling speaking event.', href: '/get-involved' },
      { title: 'About us', blurb: 'Who we are, what we do, and how we stay accountable.', image: '/images/tanzania-children.jpg', alt: 'Children in Tanzania.', href: '/about' },
    ],
    money: {
      programsPct: 83,
      adminPct: 17,
      programsLabel: 'funds our programs',
      adminLabel: 'keeps us running and growing',
      note: 'In 2025, 83% of our total operating expenses went directly to programs supporting children and parents living in poverty, including the logistics of running them.',
    },
    donate: {
      monthlyTiers: [
        { amount: 15, interval: 'monthly', impact: 'could help provide hot meals and hygiene for people sleeping rough.' },
        { amount: 30, interval: 'monthly', impact: 'could help keep the mobile shower unit on the road each week.' },
        { amount: 58, interval: 'monthly', impact: 'sponsors a child in Tanzania with food, shelter, and education.' },
      ],
      onceTiers: [
        { amount: 25, interval: 'once', impact: 'could provide hygiene kits for several people sleeping rough.' },
        { amount: 50, interval: 'once', impact: 'could help a child settle back into a safe home.' },
        { amount: 100, interval: 'once', impact: 'could help fund a family reunification.' },
      ],
    },
    trust: {
      registration: 'Registered nonprofit · Reg. 611.510 · CIF G93524130',
      statement: 'We are transparent and accountable. No donation is too small, and we are glad to be reviewed by third parties.',
      partners: ['Rotary Club Guadalmina Marbella', 'Ayuntamiento de Marbella'],
    },
  }
}
```

- [ ] **Step 4: Write `lib/donate.ts`** per the interface (compose the Donorbox URL; `recurring=true` when interval is `monthly`).

- [ ] **Step 5: Write failing tests** `__tests__/home/content.test.ts` (asserts `getHomeContent()` returns 3 impact stats, 3 appeals with themes spain/tanzania/general, `money.programsPct + money.adminPct === 100`, every testimonial flagged `placeholder: true`, and `donorboxUrl(58,'monthly')` contains `amount=58` and `recurring=true`) and `__tests__/home/card.test.tsx` (renders a `Card` with `title` + `href`, asserts the title text shows and the card is a link to the href).

- [ ] **Step 6: Run tests → FAIL.** `pnpm test home` → Expected FAIL (modules missing).

- [ ] **Step 7: Implement `components/ui/Card.tsx`** per its interface and the brand board card spec.

- [ ] **Step 8: Run tests → PASS.** `pnpm test home` → Expected PASS. Then `pnpm build` → succeeds.

- [ ] **Step 9: Commit.** `git add -A && git commit -m "feat(home): content layer, donate helper, images, Card primitive"`

---

## Task 2: Hero

**Files:** Create `components/home/Hero.tsx`, `__tests__/home/hero.test.tsx`

**Interfaces:**
- Consumes: `HomeContent['hero']`, `Button`, `Section`, `Link` from `@/i18n/navigation`, `DONATE_HREF` from `@/lib/nav`, `next/image`.
- Produces: `export function Hero(props: { content: HomeContent['hero'] }): JSX.Element`.

- [ ] **Step 1: Write failing test** `__tests__/home/hero.test.tsx`: render `<Hero content={...}/>` with sample hero content; assert the headline text renders in an `<h1>` and a Donate link (role link, name `/donate/i`) is present.

- [ ] **Step 2: Run → FAIL.** `pnpm test hero` → FAIL.

- [ ] **Step 3: Implement `Hero.tsx`:** full-bleed photographic hero. `next/image` (priority) of `content.image` with a `brand-dark` navy gradient overlay (bottom-up, ~35-60%) so text is legible. Content block (left-aligned, max-w): gold eyebrow, Fraunces display headline (`text-balance`, non-breaking space between last two words), Mulish lede in `text-paper/85`, then the gold-led Donate `Button` (`as={Link} href={DONATE_HREF}`) plus a secondary ghost link to `/appeals` ("See our appeals"). Generous min-height (about 80vh). No invented stats.

- [ ] **Step 4: Run → PASS.** `pnpm test hero` → PASS.

- [ ] **Step 5: Commit.** `git add -A && git commit -m "feat(home): photographic hero section"`

---

## Task 3: Impact stats band

**Files:** Create `components/home/ImpactStats.tsx`, `__tests__/home/impact.test.tsx`

**Interfaces:**
- Consumes: `HomeContent['impactStats']`, `Section`.
- Produces: `export function ImpactStats(props: { stats: ImpactStat[] }): JSX.Element`. Include a small local icon map for the three `icon` keys (`shower`, `home`, `heart`) rendering inline SVGs in gold.

- [ ] **Step 1: Write failing test** `__tests__/home/impact.test.tsx`: render with the three stats; assert all three `value` strings and all three `label` strings appear, and that there are three list items (`role="listitem"` or equivalent).

- [ ] **Step 2: Run → FAIL.**

- [ ] **Step 3: Implement `ImpactStats.tsx`:** an `indigo-tint` or `paper` Section with an eyebrow ("Our impact") and a 3-up responsive grid (`<ul>`/`<li>`). Each tile: gold inline-SVG icon (from the icon map), a large Fraunces `value`, and a Mulish `label` in `muted`/ink. Calm, premium spacing. These are real framings, not fabricated numbers.

- [ ] **Step 4: Run → PASS.**

- [ ] **Step 5: Commit.** `git commit -m "feat(home): impact stats band"`

---

## Task 4: Appeals cards

**Files:** Create `components/home/AppealsCards.tsx`, `__tests__/home/appeals.test.tsx`

**Interfaces:**
- Consumes: `HomeContent['appeals']`, `Card` (Task 1), `Section`.
- Produces: `export function AppealsCards(props: { appeals: Appeal[] }): JSX.Element`.

- [ ] **Step 1: Write failing test** `__tests__/home/appeals.test.tsx`: render with the three appeals; assert each appeal `title` renders and each card links to its `href` (`/spain`, `/tanzania`, `/get-involved/sponsor-a-child`).

- [ ] **Step 2: Run → FAIL.**

- [ ] **Step 3: Implement `AppealsCards.tsx`:** a `paper` Section with eyebrow ("How you can help") and a Fraunces heading (e.g. "Answer the call of love"), then a responsive 3-up grid of `Card` components, one per appeal, passing `image`, `alt`, `title`, `theme` (drives the top rule color), `blurb` as children, and `href`. text-balance on the heading.

- [ ] **Step 4: Run → PASS.**

- [ ] **Step 5: Commit.** `git commit -m "feat(home): appeals cards"`

---

## Task 5: Mission blurb and Scripture banner

**Files:** Create `components/home/MissionBlurb.tsx`, `components/home/ScriptureBanner.tsx`, `__tests__/home/editorial.test.tsx`

**Interfaces:**
- Consumes: `HomeContent['mission']`, `HomeContent['scripture']`, `Section`, `Button`, `Link`.
- Produces: `export function MissionBlurb(props: { content: HomeContent['mission'] }): JSX.Element` and `export function ScriptureBanner(props: { content: HomeContent['scripture'] }): JSX.Element`.

- [ ] **Step 1: Write failing test** `__tests__/home/editorial.test.tsx`: render both; assert the mission `heading` text appears and a link to `/about` ("About us") is present; assert the scripture `quote` and `reference` (`1 John 4:11`) appear and the quote is inside a `<blockquote>`.

- [ ] **Step 2: Run → FAIL.**

- [ ] **Step 3: Implement both.** `MissionBlurb`: a `paper` Section, prose width, eyebrow + Fraunces heading (text-balance) + Mulish body + a secondary `Button as={Link} href="/about"` ("About us"). `ScriptureBanner`: a `dark` (brand-dark) Section, centered, a large Fraunces `<blockquote>` of the verse with a gold reference line beneath. Calm and reverent.

- [ ] **Step 4: Run → PASS.**

- [ ] **Step 5: Commit.** `git commit -m "feat(home): mission blurb and scripture banner"`

---

## Task 6: Testimonials carousel (client)

**Files:** Create `components/home/Testimonials.tsx`, `__tests__/home/testimonials.test.tsx`

**Interfaces:**
- Consumes: `HomeContent['testimonials']`, `Section`.
- Produces: `export function Testimonials(props: { testimonials: Testimonial[] }): JSX.Element` (a `'use client'` component).

- [ ] **Step 1: Write failing test** `__tests__/home/testimonials.test.tsx`: render with the three placeholder testimonials; assert at least the first `quote` renders inside a `<blockquote>`, the attribution renders, and there are accessible controls (prev/next buttons by role with labels) when more than one testimonial exists.

- [ ] **Step 2: Run → FAIL.**

- [ ] **Step 3: Implement `Testimonials.tsx`:** a client carousel on a `clay-tint` Section, eyebrow ("Why our supporters give"). One quote visible at a time with accessible Previous/Next buttons (`aria-label`), a gold quote mark, Fraunces quote, attribution in `muted`. Keyboard operable, `aria-live="polite"` region for the active quote. Reduced-motion friendly. The placeholder flag does not need to render visibly, but keep the component honest (no fabricated named people; attributions stay generic as in the content).

- [ ] **Step 4: Run → PASS.**

- [ ] **Step 5: Commit.** `git commit -m "feat(home): supporter testimonials carousel"`

---

## Task 7: Explore cards ("See your impact in action")

**Files:** Create `components/home/ExploreCards.tsx`, `__tests__/home/explore.test.tsx`

**Interfaces:**
- Consumes: `HomeContent['exploreCards']`, `Card`, `Section`.
- Produces: `export function ExploreCards(props: { cards: ExploreCard[] }): JSX.Element`.

- [ ] **Step 1: Write failing test** `__tests__/home/explore.test.tsx`: render with the four cards; assert all four titles appear and each links to its `href` (`/appeals`, `/stories`, `/get-involved`, `/about`).

- [ ] **Step 2: Run → FAIL.**

- [ ] **Step 3: Implement `ExploreCards.tsx`:** an `indigo-tint` Section, eyebrow ("Explore") + Fraunces heading ("See your impact in action", text-balance) + a responsive grid of `Card`s (theme `general`), each with image/alt/title/blurb/href.

- [ ] **Step 4: Run → PASS.**

- [ ] **Step 5: Commit.** `git commit -m "feat(home): explore cards"`

---

## Task 8: Where your money goes

**Files:** Create `components/home/WhereMoneyGoes.tsx`, `__tests__/home/money.test.tsx`

**Interfaces:**
- Consumes: `HomeContent['money']`, `Section`, `Button`, `Link`, `DONATE_HREF`.
- Produces: `export function WhereMoneyGoes(props: { content: HomeContent['money'] }): JSX.Element`.

- [ ] **Step 1: Write failing test** `__tests__/home/money.test.tsx`: render with the money content; assert `83%` and `17%` both appear, the `note` text appears, and a Donate link (`/donate`) is present. Assert the split bar has `role="img"` with an `aria-label` describing the 83/17 split.

- [ ] **Step 2: Run → FAIL.**

- [ ] **Step 3: Implement `WhereMoneyGoes.tsx`:** a `paper` Section, eyebrow ("Where your money goes") + Fraunces heading. A horizontal split bar (83% in `brand` indigo, 17% in `accent` gold or `muted`) with `role="img"` and an aria-label like "83 percent funds programs, 17 percent keeps us running". Two labeled figures using percentages: "83% funds our programs" and "17% keeps us running and growing", then the `note` paragraph and a gold-led Donate `Button as={Link} href={DONATE_HREF}`. Use percentages, not pence (Tearfund uses pence; CC is euro-based).

- [ ] **Step 4: Run → PASS.**

- [ ] **Step 5: Commit.** `git commit -m "feat(home): where your money goes split"`

---

## Task 9: Donate widget (client, tiered, Donorbox deep-link)

**Files:** Create `components/home/DonateWidget.tsx`, `__tests__/home/donate.test.tsx`

**Interfaces:**
- Consumes: `HomeContent['donate']`, `donorboxUrl` from `@/lib/donate`, `Section`.
- Produces: `export function DonateWidget(props: { content: HomeContent['donate'] }): JSX.Element` (a `'use client'` component).

- [ ] **Step 1: Write failing test** `__tests__/home/donate.test.tsx`: render the widget. Assert a Monthly/Once toggle exists (two controls by role with accessible names). Assert the monthly tier amounts render with their impact lines. Assert the primary Donate action is a link whose `href` points at `donorbox.org/giving-41` and includes `amount=` for the selected tier and `recurring=true` while Monthly is selected. After activating "Once", assert the once-tiers render and `recurring=false` (or absent recurring) in the donate href.

- [ ] **Step 2: Run → FAIL.**

- [ ] **Step 3: Implement `DonateWidget.tsx`:** a `dark` (brand-dark) Section so it reads as the warm donate moment. Eyebrow ("Give today") + Fraunces heading. A Monthly/Once segmented toggle (accessible, `aria-pressed` or radio group). For the active interval, render its three tiers as selectable options (radio semantics, default to the middle/higher tier) each showing the euro amount and its impact line. A gold-led primary Donate action rendered as an external `<a target="_blank" rel="noopener noreferrer" href={donorboxUrl(selectedAmount, interval)}>` that updates as the selection changes. Keyboard accessible. No payment logic here (Plan 4 owns the full Donate page); this widget just routes to Donorbox with the chosen amount/interval.

- [ ] **Step 4: Run → PASS.**

- [ ] **Step 5: Commit.** `git commit -m "feat(home): tiered donate widget deep-linking Donorbox"`

---

## Task 10: Trust signals band

**Files:** Create `components/home/TrustSignals.tsx`, `__tests__/home/trust.test.tsx`

**Interfaces:**
- Consumes: `HomeContent['trust']`, `Section`.
- Produces: `export function TrustSignals(props: { content: HomeContent['trust'] }): JSX.Element`.

- [ ] **Step 1: Write failing test** `__tests__/home/trust.test.tsx`: render; assert the registration string containing `611.510` appears, the `statement` appears, and both partner names appear.

- [ ] **Step 2: Run → FAIL.**

- [ ] **Step 3: Implement `TrustSignals.tsx`:** a compact `paper` Section: eyebrow ("Accountable to you"), the `statement`, the partner names rendered as a tidy text row (no fabricated logo images), and the exact registration line (middot separators, not dashes). Calm, understated, trustworthy.

- [ ] **Step 4: Run → PASS.**

- [ ] **Step 5: Commit.** `git commit -m "feat(home): trust signals band"`

---

## Task 11: Assemble the homepage and e2e

**Files:** Modify `app/[locale]/page.tsx`; Create `e2e/home.spec.ts`

**Interfaces:**
- Consumes: every `components/home/*` component, `getHomeContent()`.

- [ ] **Step 1: Rebuild `app/[locale]/page.tsx`** as an async server component: `setRequestLocale(locale)`, `const c = await getHomeContent()`, then render the sections in this order, passing the matching content slice: `Hero`, `ImpactStats`, `AppealsCards`, `MissionBlurb`, `Testimonials`, `ExploreCards`, `WhereMoneyGoes`, `ScriptureBanner`, `DonateWidget`, `TrustSignals`. Keep the page a server component (the two client sections are islands). Remove the Plan 1 placeholder hero markup.

- [ ] **Step 2: Run unit tests + build.** `pnpm test` → all PASS; `pnpm build` → succeeds (the page prerenders for `/en` and `/es`).

- [ ] **Step 3: Write e2e** `e2e/home.spec.ts`: load `/`; assert the `<h1>` hero headline is visible; assert the Donate CTA in the hero is visible and its href targets the donate route or Donorbox; assert the testimonials Next button advances the visible quote; assert the donate widget Monthly/Once toggle switches the rendered tiers. Keep the existing locale and nav e2e specs green.

- [ ] **Step 4: Run e2e.** `pnpm test:e2e` → PASS.

- [ ] **Step 5: Commit.** `git add -A && git commit -m "feat(home): assemble full homepage + e2e"`

---

## Self-Review (against the spec)

- **Spec §6 homepage sections 1-11** → Hero (T2), Impact tiles (T3), Appeals cards (T4), About/mission blurb (T5), Testimonials (T6), Explore/See-your-impact cards (T7), Where your money goes (T8), Scripture banner (T5), Donate widget (T9), Trust signals (T10). Email signup (§6 item 11) is intentionally deferred (no email provider chosen yet) and moves to a later plan. Footer already exists (Plan 1). ✓
- **Spec §4 CMS** → not in this plan by design; the content layer (`getHomeContent`) is the Sanity seam, wired in Plan 3. ✓
- **Spec §8 content integrity** → impact stats use real framings (no fabricated numbers); testimonials flagged `placeholder: true` with a comment; registration/83-17/€58/scripture/programs are real. ✓
- **Spec §6 donate widget → Donorbox** → T9 deep-links `giving-41` with amount/recurring. ✓
- **Brand fidelity** → all tasks reuse Plan 1 tokens/primitives; gold-led Donate; eyebrow+Fraunces+text-balance rules in each task. ✓
- Placeholder scan: the seed content's placeholder testimonials are real content with an explicit flag (spec-sanctioned), not plan placeholders; every task has concrete content + a concrete test. No "TODO/handle edge cases" steps.
- Type consistency: all section props consume slices of the `HomeContent` types defined in Task 1; `Card` and `Button`/`Section`/`Container` signatures match Plan 1 and Task 1.

## Roadmap — plans after this one

3. **Sanity CMS** — provision project (auth gate), embedded Studio at `/studio`, schemas mirroring the content types, wire `getHomeContent()` (and future collections) to read Sanity with the seed as fallback, typegen.
4. **About cluster + Spain/Tanzania program pages.**
5. **Donate hub + Donorbox** (Sponsor a Child, Where your money goes, Ways to give).
6. **Stories / Appeals / Get Involved / Events** (fed by Sanity).
7. **SEO/i18n hardening + launch** (metadata/OG/JSON-LD, sitemap, enable indexing, email signup with a chosen provider, a11y audit, replace placeholder testimonials, Spanish content, domain cutover, middleware→proxy rename, Plan-1 minor cleanups).
