# Collective Calling — Plan 4: About cluster + Spain/Tanzania program pages

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the About cluster (hub + Who We Are, What We Do, Our Impact, Our Team, Financial Accountability, Partners), the Contact page, and the Spain + Tanzania program pages, populated with Collective Calling's real content and the project brand, so the homepage and nav links resolve to real pages.

**Architecture:** Each page is a server component under `app/[locale]/` that reads typed content from a `lib/content/pages/` module (the same Sanity-ready seam pattern as the homepage; these stay in code for now and can be moved to Sanity later). Pages are composed from a small reusable page toolkit under `components/page/` (PageHero, Prose, ValueCards, TeamGrid, PartnerList, ContactDetails, ProgramHelp) plus the existing Plan 1 primitives. No fabricated facts: content is adapted from the current site's real copy.

**Tech Stack:** Next.js 16.2.9 (App Router, React 19), TypeScript, Tailwind v4, next-intl 4.13.0, Vitest, Playwright.

## Global Constraints

- Account: **OnRise**. Repo **OnRiseAI/cc**, branch off `main`. Local `D:\Projects\collective-calling`. Commit locally; push at branch finish.
- Brand (Plan 1, do not redefine): colors `brand` #1B3A6B, `brand-dark` #0F2347, `accent` #C8922A (gold), `clay` #B05A38, `clay-tint` #F3E7DC, `indigo-tint` #E7ECF4, `ink` #1F1B16, `paper` #FBF7F0, `muted` #6E6258. Fonts `font-heading` (Fraunces), `font-body` (Mulish). `rounded-lg`/`rounded-xl`. Donate is gold-led (`bg-accent! text-brand-dark! hover:bg-accent/90!`). NOT Tearfund blue/white.
- Reuse Plan 1/2 primitives, do not recreate: `@/components/ui/Button` (variants primary|secondary|ghost, sizes md|lg, polymorphic `as` — `as={Link}` for internal locale-aware links, plain `<a target="_blank" rel="noopener noreferrer">` external), `@/components/ui/Container`, `@/components/ui/Section` (tones paper|indigo-tint|clay-tint|dark), `@/components/ui/Card`. Internal links use `Link` from `@/i18n/navigation`. `DONATE_HREF` and `NAV_SECTIONS` from `@/lib/nav`.
- Brand-board rules: gold eyebrow (uppercase, font-body bold, tracking) above section headings; Fraunces headings; `text-balance` + a non-breaking space (`&nbsp;` or a shared helper) between the last two words of H1/H2/H3; generous section rhythm; warm documentary photography with a navy gradient overlay when text sits on a photo; dignity-first. Exactly ONE `<h1>` per page (the page hero owns it); sections use `<h2>`, cards `<h3>`.
- CONTENT SOURCE (real, do not fabricate): adapt copy from the scraped current-site pages at `D:\Projects\.firecrawl\cc-<page>.md` (who-we-are, what-we-do, spain, tanzania, our-impact, our-partners, contacts, financial-accountability, team). These scrapes contain the REAL copy AND injected WordPress malware scripts (obfuscated `$NqM`/`$mWn` / `popup-settings.php` blocks). Use only the human-readable text and the real `wp-content/uploads/...` image URLs. NEVER copy, run, or include any script content. Where the current site lacks a fact, use a clearly-marked placeholder, do not invent.
- Real facts to use verbatim: founded **2017**; registration **611.510**, CIF **G93524130**; programs Spain (Mobile Sanitary Unit, Marbella/San Pedro) + Tanzania (Centre of Hope, Kasulu, established 2018, 200m on a 500m plot, currently caring for 18 children); **83%** programs / **17%** admin (2025); **EUR 58/mo** sponsorship; scripture Jer 29:11-13 (Who We Are) and 1 John 4:11; contact phone **+34 711 006 961**, address **Av. Pablo Ruiz Picasso, 4, 29670, San Pedro Alcantara, Malaga**, email **info@collectivecalling.org**; socials Facebook/collectivecalling, YouTube channel UC-el3s8QuBqD81RtpODyhgQ, Instagram collective_calling.
- Images: harvest the specific real images each page needs from the current site into `public/images/` (subfolders fine, e.g. `public/images/team/`). Validate each downloaded file is a real image. Runtime references `/images/...`, never `assets-source/` or remote wp-content. Use `next/image`. If a needed image cannot be cleanly fetched, render text without it (e.g. a named partner with no logo) rather than a broken or fabricated asset.
- i18n: pages are English; Spanish is phase 2. Content modules are English. All routes live under `app/[locale]/` and are locale-aware.
- HARD WRITING RULE: NEVER use em dashes (long dash) in any file (code, comments, JSX copy, JSON). Use periods, commas, colons, parentheses.
- Robots stays `noindex` (preview). Do not run `vercel`. Do not wire these pages into Sanity (a later increment); keep them on the typed content layer.
- Every task ends green: `pnpm test` (all) and `pnpm build` succeed; the final task keeps `pnpm test:e2e` green.

---

## File Structure (created in this plan)

- `lib/content/pages/types.ts` — shared page content types (PageHero, ValueItem, TeamMember, TeamGroup, Partner, ContactInfo, ProgramHelpItem, RichBlock).
- `lib/content/pages/{about,whoWeAre,whatWeDo,ourImpact,ourTeam,financials,partners,contact,spain,tanzania}.ts` — one typed content module per page.
- `components/page/PageHero.tsx`, `Prose.tsx`, `ValueCards.tsx`, `TeamGrid.tsx`, `PartnerList.tsx`, `ContactDetails.tsx`, `ProgramHelp.tsx`, `SubNavCards.tsx`.
- `app/[locale]/about/page.tsx`, `about/who-we-are/page.tsx`, `about/what-we-do/page.tsx`, `about/our-impact/page.tsx`, `about/our-team/page.tsx`, `about/financial-accountability/page.tsx`, `about/partners/page.tsx`, `contact/page.tsx`, `spain/page.tsx`, `tanzania/page.tsx`.
- `public/images/...` harvested page imagery.
- Tests under `__tests__/page/` and `e2e/pages.spec.ts`.

---

## Task 1: Page toolkit and shared page primitives

**Files:**
- Create: `lib/content/pages/types.ts`, `components/page/PageHero.tsx`, `components/page/Prose.tsx`, `components/page/SubNavCards.tsx`, `__tests__/page/toolkit.test.tsx`

**Interfaces:**
- Produces:
```ts
// lib/content/pages/types.ts
export type PageHero = { eyebrow: string; title: string; lede?: string; image?: string; alt?: string }
export type ValueItem = { title: string; body: string }
export type TeamMember = { name: string; role: string; bio: string; image?: string }
export type TeamGroup = { label: string; members: TeamMember[] }
export type Partner = { name: string; blurb?: string; href?: string; logo?: string }
export type ContactInfo = { phone: string; phoneHref: string; address: string; email: string }
export type ProgramHelpItem = { title: string; body: string }
export type RichBlock = { heading?: string; body: string }
```
- `PageHero({ content }: { content: PageHero }): JSX.Element` — a page header band. When `image` is set, a photographic hero with a brand-dark navy gradient overlay; otherwise a solid `brand-dark` or `indigo-tint` band. Gold eyebrow, Fraunces `<h1>` (text-balance + non-breaking last two words), optional Mulish lede. This is the page's single `<h1>`.
- `Prose({ children, className? }): JSX.Element` — a constrained (`max-w-prose`) Mulish body wrapper with comfortable measure and spacing for paragraphs and `<h2>`/`<h3>` headings.
- `SubNavCards({ cards }: { cards: { title: string; blurb: string; href: string; image?: string }[] }): JSX.Element` — a responsive grid of `Card`s (reuse `@/components/ui/Card`) for hub pages linking to sub-pages.

- [ ] **Step 1: Write `lib/content/pages/types.ts`** with the types above.
- [ ] **Step 2: Write failing test** `__tests__/page/toolkit.test.tsx`: render `PageHero` with `{ eyebrow, title }` and assert the title renders in an `<h1>`; render `SubNavCards` with two cards and assert both titles render and each links to its href.
- [ ] **Step 3: Run → FAIL.** `pnpm test page/toolkit` → FAIL.
- [ ] **Step 4: Implement `PageHero.tsx`, `Prose.tsx`, `SubNavCards.tsx`** per the interfaces and brand board.
- [ ] **Step 5: Run → PASS.** Then `pnpm build` → succeeds.
- [ ] **Step 6: Commit.** `git add -A && git commit -m "feat(pages): shared page toolkit (PageHero, Prose, SubNavCards)"`

---

## Task 2: Who We Are (/about/who-we-are)

**Files:** Create `lib/content/pages/whoWeAre.ts`, `components/page/ValueCards.tsx`, `app/[locale]/about/who-we-are/page.tsx`, `__tests__/page/whoWeAre.test.tsx`. Harvest the values/mission images.

**Content source:** `D:\Projects\.firecrawl\cc-who-we-are.md` (Mission, Vision with Jer 29:11-13, and the four values: "We are Christian", "We value people", "We are stewards", "We are partners"). Adapt to CC brand voice; keep the scripture and the four values faithful.

**Interfaces:**
- Consumes: `PageHero`, `Prose`, `Section`, `ValueItem`.
- Produces: `ValueCards({ items, tone? }: { items: ValueItem[]; tone?: SectionTone }): JSX.Element` (a responsive grid of value cards: Fraunces `<h3>` title + Mulish body, eyebrow optional). `whoWeAreContent` object of the page content.

- [ ] **Step 1: Write `lib/content/pages/whoWeAre.ts`** with the page hero, mission paragraph(s), vision quote + Jer 29:11-13 reference, and the four values (title + body adapted from the source).
- [ ] **Step 2: Write failing test** `__tests__/page/whoWeAre.test.tsx`: render the page (or a `ValueCards` with the four values) and assert the four value titles render and the page `<h1>` contains "Who We Are"; assert the scripture reference "Jeremiah 29" or "Jer 29" appears.
- [ ] **Step 3: Run → FAIL.**
- [ ] **Step 4: Implement `ValueCards.tsx` and the page** `app/[locale]/about/who-we-are/page.tsx`: PageHero, a mission/vision Prose section (vision as a Fraunces blockquote with the scripture reference in gold), and a ValueCards section for the four values. Harvest 1 to 4 real images from the source for the hero/values into `public/images/about/`.
- [ ] **Step 5: Run → PASS.** Then `pnpm build`.
- [ ] **Step 6: Commit.** `git commit -m "feat(pages): Who We Are"`

---

## Task 3: Our Team (/about/our-team)

**Files:** Create `lib/content/pages/ourTeam.ts`, `components/page/TeamGrid.tsx`, `app/[locale]/about/our-team/page.tsx`, `__tests__/page/team.test.tsx`. Harvest team headshots into `public/images/team/`.

**Content source:** `D:\Projects\.firecrawl\cc-who-we-are.md` ("Meet the Team", "The Board", "Ambassadors"). Real people, real bios. Three groups:
- Leadership: **Paul Carr** (President & Co-founder), **Gemma Carr** (Secretary & Co-founder), **Rebecka Rocky** (Executive Director, Tanzania).
- Board: **Patrick Murphy** (Chair of the Board), **Kurt Kettner-Borough** (Director), **Sarah Wood** (Director), **Barrie Tyler** (Director), **Andrew Chubb** (Director).
- Ambassadors: **Veronika Tye**, **Helena Chevalley-Levy**, **Yuliya Azuelos**.
Use the bios from the source (adapt lightly for tone, keep facts). Harvest each person's real headshot where available; if a headshot cannot be fetched, render the card without an image (initials avatar) rather than a wrong/placeholder face.

**Interfaces:**
- Consumes: `PageHero`, `Section`, `TeamMember`, `TeamGroup`.
- Produces: `TeamGrid({ groups }: { groups: TeamGroup[] }): JSX.Element` (grouped responsive grid; each member: headshot or initials avatar, Fraunces `<h3>` name, gold role label, Mulish bio).

- [ ] **Step 1: Write `lib/content/pages/ourTeam.ts`** with the three groups and members (name, role, bio, image path).
- [ ] **Step 2: Write failing test** `__tests__/page/team.test.tsx`: render `TeamGrid` with the groups; assert Paul Carr, Gemma Carr, and Patrick Murphy render with their roles, and the three group labels (Leadership/Board/Ambassadors) render.
- [ ] **Step 3: Run → FAIL.**
- [ ] **Step 4: Implement `TeamGrid.tsx` and the page.** Harvest headshots into `public/images/team/`.
- [ ] **Step 5: Run → PASS.** Then `pnpm build`.
- [ ] **Step 6: Commit.** `git commit -m "feat(pages): Our Team"`

---

## Task 4: What We Do (/about/what-we-do)

**Files:** Create `lib/content/pages/whatWeDo.ts`, `app/[locale]/about/what-we-do/page.tsx`, `__tests__/page/whatWeDo.test.tsx`.

**Content source:** `D:\Projects\.firecrawl\cc-what-we-do.md` (four principles: "Compassion Centred", "Child Focused", "Love for the Homeless", "Measurable"; plus an overview of the two-country model). Reuse `ValueCards` (Task 2) for the four principles.

**Interfaces:** Consumes `PageHero`, `Prose`, `ValueCards`, `Section`, `Button`, `Link`, `DONATE_HREF`.

- [ ] **Step 1: Write `lib/content/pages/whatWeDo.ts`** (hero, overview of Spain + Tanzania work with links to `/spain` and `/tanzania`, the four principles, a closing donate CTA).
- [ ] **Step 2: Write failing test** `__tests__/page/whatWeDo.test.tsx`: assert the four principle titles render, links to `/spain` and `/tanzania` exist, and the page `<h1>` contains "What We Do".
- [ ] **Step 3: Run → FAIL.**
- [ ] **Step 4: Implement the page** (PageHero, Prose overview with the two program links, ValueCards for the four principles, gold-led Donate CTA).
- [ ] **Step 5: Run → PASS.** Then `pnpm build`.
- [ ] **Step 6: Commit.** `git commit -m "feat(pages): What We Do"`

---

## Task 5: Spain program page (/spain)

**Files:** Create `lib/content/pages/spain.ts`, `components/page/ProgramHelp.tsx`, `app/[locale]/spain/page.tsx`, `__tests__/page/spain.test.tsx`. Harvest Spain images (mobile shower unit, outreach) into `public/images/spain/`.

**Content source:** `D:\Projects\.firecrawl\cc-spain.md` ("How we help": Access to Hygiene, Building Trust & Connection, Taking Help to the Streets; the Mobile Sanitary Unit; "How you can help"). Real.

**Interfaces:**
- Consumes: `PageHero`, `Prose`, `Section`, `Button`, `Link`, `DONATE_HREF`, `ProgramHelpItem`.
- Produces: `ProgramHelp({ eyebrow, heading, items }: { eyebrow: string; heading: string; items: ProgramHelpItem[] }): JSX.Element` (a "how we help" section: gold eyebrow, Fraunces `<h2>`, and the items as a clean list/grid with `<h3>` titles + body). Reused by Tanzania (Task 6).

- [ ] **Step 1: Write `lib/content/pages/spain.ts`** (hero on a Spain photo, intro to the homelessness response + mobile shower unit, the three "how we help" items, a "how you can help" block, gold-led Donate CTA into Donorbox/`DONATE_HREF`).
- [ ] **Step 2: Write failing test** `__tests__/page/spain.test.tsx`: assert the page `<h1>` mentions Spain, the three "how we help" item titles render, and a Donate link is present.
- [ ] **Step 3: Run → FAIL.**
- [ ] **Step 4: Implement `ProgramHelp.tsx` and the page.** Harvest real Spain images.
- [ ] **Step 5: Run → PASS.** Then `pnpm build`.
- [ ] **Step 6: Commit.** `git commit -m "feat(pages): Spain program page"`

---

## Task 6: Tanzania program page (/tanzania)

**Files:** Create `lib/content/pages/tanzania.ts`, `app/[locale]/tanzania/page.tsx`, `__tests__/page/tanzania.test.tsx`. Harvest Tanzania images (Centre of Hope, children, a "Caleb" story image) into `public/images/tanzania/`.

**Content source:** `D:\Projects\.firecrawl\cc-tanzania.md`. Real facts: the orphanage statistic (4 out of 5 children in orphanages are not orphans and have a surviving parent), the **Centre of Hope** (Kasulu, established 2018, 200m home on a 500m plot, currently caring for **18 children**), family reunification mission, and the "Meet Caleb" story.

**Interfaces:** Consumes `PageHero`, `Prose`, `ProgramHelp` (Task 5), `Section`, `Button`, `Link`, `DONATE_HREF`.

- [ ] **Step 1: Write `lib/content/pages/tanzania.ts`** (hero, the orphanage-statistic framing, the Centre of Hope facts, family reunification approach, a "Meet Caleb" story block, sponsor-a-child (EUR 58/mo) + Donate CTA).
- [ ] **Step 2: Write failing test** `__tests__/page/tanzania.test.tsx`: assert the page `<h1>` mentions Tanzania, the text "Centre of Hope" and "18" (children) appear, and a Donate/Sponsor link is present.
- [ ] **Step 3: Run → FAIL.**
- [ ] **Step 4: Implement the page.** Harvest real Tanzania images.
- [ ] **Step 5: Run → PASS.** Then `pnpm build`.
- [ ] **Step 6: Commit.** `git commit -m "feat(pages): Tanzania program page"`

---

## Task 7: Our Impact (/about/our-impact)

**Files:** Create `lib/content/pages/ourImpact.ts`, `app/[locale]/about/our-impact/page.tsx`, `__tests__/page/ourImpact.test.tsx`.

**Content source:** `D:\Projects\.firecrawl\cc-our-impact.md` (read the full file). Use real impact narrative; do NOT fabricate numbers. Where the source gives concrete figures (e.g. 18 children at the Centre of Hope, the mobile shower unit), use them; otherwise use qualitative impact framing.

**Interfaces:** Consumes `PageHero`, `Prose`, `Section`, the homepage `ImpactStats` pattern is NOT reused here (different content); build an impact narrative with `Prose` + a small stat row of REAL figures only.

- [ ] **Step 1: Write `lib/content/pages/ourImpact.ts`** from the source (real figures only; clearly-marked placeholder for any unknown).
- [ ] **Step 2: Write failing test** `__tests__/page/ourImpact.test.tsx`: assert the page `<h1>` contains "Impact" and at least one real figure or program reference (e.g. "Centre of Hope" or "18") renders.
- [ ] **Step 3: Run → FAIL.**
- [ ] **Step 4: Implement the page.**
- [ ] **Step 5: Run → PASS.** Then `pnpm build`.
- [ ] **Step 6: Commit.** `git commit -m "feat(pages): Our Impact"`

---

## Task 8: Financial Accountability (/about/financial-accountability)

**Files:** Create `lib/content/pages/financials.ts`, `app/[locale]/about/financial-accountability/page.tsx`, `__tests__/page/financials.test.tsx`.

**Content source:** `D:\Projects\.firecrawl\cc-financial-accountability.md`. Real: in 2025, **83%** of donation-based operating expenses went to program services (incl. logistics), the remaining **17%** to marketing, communication, and fundraising; transparency and third-party accountability.

**Interfaces:** Consumes `PageHero`, `Prose`, `Section`. Reuse the homepage `WhereMoneyGoes` 83/17 split visual IF cleanly importable (`@/components/home/WhereMoneyGoes`); otherwise build a simple split bar inline with `role="img"` + aria-label.

- [ ] **Step 1: Write `lib/content/pages/financials.ts`** (hero, the 83/17 explanation, transparency commitments, registration line, third-party accountability note).
- [ ] **Step 2: Write failing test** `__tests__/page/financials.test.tsx`: assert `83%` and `17%` both render and the registration string containing `611.510` appears.
- [ ] **Step 3: Run → FAIL.**
- [ ] **Step 4: Implement the page.**
- [ ] **Step 5: Run → PASS.** Then `pnpm build`.
- [ ] **Step 6: Commit.** `git commit -m "feat(pages): Financial Accountability"`

---

## Task 9: Our Partners (/about/partners)

**Files:** Create `lib/content/pages/partners.ts`, `components/page/PartnerList.tsx`, `app/[locale]/about/partners/page.tsx`, `__tests__/page/partners.test.tsx`. Optionally harvest partner logos into `public/images/partners/`.

**Content source:** `D:\Projects\.firecrawl\cc-our-partners.md`. Real partners: **Drumelia Real Estate**, **Manifesto**, **Sana Catering**, **Spence Clarke**, **Elena Gaite Fundacion**, **Mariposa Energia**, **Golf In The Sun** (plus the accountability bodies Rotary Club Guadalmina Marbella and Ayuntamiento de Marbella). Use the source blurbs where present.

**Interfaces:**
- Consumes: `PageHero`, `Prose`, `Section`, `Partner`.
- Produces: `PartnerList({ partners }: { partners: Partner[] }): JSX.Element` (a tidy grid; each partner: logo if available else a name plate, Fraunces `<h3>` name, optional blurb, optional external link with `rel="noopener noreferrer"`).

- [ ] **Step 1: Write `lib/content/pages/partners.ts`** with the partner list (names + blurbs from source; logos optional).
- [ ] **Step 2: Write failing test** `__tests__/page/partners.test.tsx`: assert the page `<h1>` contains "Partners" and at least three named partners (Drumelia, Sana Catering, Spence Clarke) render.
- [ ] **Step 3: Run → FAIL.**
- [ ] **Step 4: Implement `PartnerList.tsx` and the page.** Only include logos that download cleanly as real images; otherwise name plates.
- [ ] **Step 5: Run → PASS.** Then `pnpm build`.
- [ ] **Step 6: Commit.** `git commit -m "feat(pages): Our Partners"`

---

## Task 10: Contact (/contact)

**Files:** Create `lib/content/pages/contact.ts`, `components/page/ContactDetails.tsx`, `app/[locale]/contact/page.tsx`, `__tests__/page/contact.test.tsx`.

**Content source:** `D:\Projects\.firecrawl\cc-contacts.md`. Real: phone **+34 711 006 961**, address **Av. Pablo Ruiz Picasso, 4, 29670, San Pedro Alcantara, Malaga**, email **info@collectivecalling.org**, socials. There is no email-form backend yet, so this page uses real contact details with working `tel:` and `mailto:` links plus social links. Do NOT build a fake submitting form (a real form is deferred to a later plan).

**Interfaces:**
- Consumes: `PageHero`, `Section`, `ContactInfo`, `Button`.
- Produces: `ContactDetails({ info }: { info: ContactInfo }): JSX.Element` (phone as `tel:` link, address, email as `mailto:` link, with icons; a gold-led "Email us" mailto button and social links as external anchors).

- [ ] **Step 1: Write `lib/content/pages/contact.ts`** with the contact info and a short invitation to get in touch (incl. "invite us to speak" mention, mailto).
- [ ] **Step 2: Write failing test** `__tests__/page/contact.test.tsx`: assert the email `mailto:info@collectivecalling.org` link, the phone `tel:` link, and the address text all render.
- [ ] **Step 3: Run → FAIL.**
- [ ] **Step 4: Implement `ContactDetails.tsx` and the page.**
- [ ] **Step 5: Run → PASS.** Then `pnpm build`.
- [ ] **Step 6: Commit.** `git commit -m "feat(pages): Contact"`

---

## Task 11: About hub (/about) and final wiring + e2e

**Files:** Create `lib/content/pages/about.ts`, `app/[locale]/about/page.tsx`, `e2e/pages.spec.ts`, `__tests__/page/about.test.tsx`.

**Interfaces:** Consumes `PageHero`, `Prose`, `SubNavCards` (Task 1), `Section`, `Button`, `Link`.

- [ ] **Step 1: Write `lib/content/pages/about.ts`** (hero, a short "who we are" overview with mission/vision and founded-2017, then SubNavCards linking to Who We Are, What We Do, Our Impact, Our Team, Financial Accountability, Partners, Contact). Use real overview copy from `cc-who-we-are.md`.
- [ ] **Step 2: Write failing test** `__tests__/page/about.test.tsx`: render the about hub; assert the `<h1>` contains "About", and SubNavCards link to `/about/who-we-are`, `/about/our-team`, and `/contact`.
- [ ] **Step 3: Run → FAIL.**
- [ ] **Step 4: Implement `app/[locale]/about/page.tsx`.**
- [ ] **Step 5: Write e2e** `e2e/pages.spec.ts`: for each new route (`/about`, `/about/who-we-are`, `/about/what-we-do`, `/about/our-impact`, `/about/our-team`, `/about/financial-accountability`, `/about/partners`, `/contact`, `/spain`, `/tanzania`) assert it loads with HTTP < 400 and renders exactly one `<h1>`. Assert the homepage hero "See our appeals" / appeals cards now reach `/spain` and `/tanzania` without 404. Keep existing e2e specs green (run serially per the workers:1 config).
- [ ] **Step 6: Run full check.** `pnpm test` (all) PASS, `pnpm build` succeeds, `pnpm test:e2e` PASS.
- [ ] **Step 7: Commit.** `git commit -m "feat(pages): About hub + cross-page e2e"`

---

## Self-Review (against the spec)

- **Spec §5 IA — About cluster** → About hub (T11), Who We Are (T2), What We Do (T4), Our Impact (T7), Our Team (T3), Financial Accountability (T8), Partners (T9), Contact (T10). ✓
- **Spec §5 IA — program pages** → Spain (T5), Tanzania (T6). ✓ These resolve the homepage appeals links (previously 404), verified in T11 e2e.
- **Spec §8 content integrity** → all content adapted from the real current site (scraped sources named per task); real facts verbatim; malware scripts excluded; placeholders only where the source lacks a fact. ✓
- **Brand fidelity** → every task reuses Plan 1 primitives + brand-board rules; gold-led Donate; one h1 per page. ✓
- **Sanity** → these pages stay on the typed content layer (`lib/content/pages/`), the same seam as the homepage; wiring them into Sanity is a deferred later increment (noted). ✓
- Placeholder scan: no plan-level TODOs; each task names its real content source + key facts + a concrete test. Page copy is adapted by the implementer from the named scrape file (too large to inline verbatim), with the load-bearing facts enumerated here.
- Type consistency: all pages consume the `lib/content/pages/types.ts` types; toolkit component props (PageHero, ValueCards, TeamGrid, ProgramHelp, PartnerList, ContactDetails, SubNavCards) are defined in the task that creates them and consumed by name in later tasks.

## Roadmap — plans after this one

5. Donate hub + Donorbox (Sponsor a Child, Where your money goes, Ways to give).
6. Stories / Appeals / Get Involved / Events (Sanity collections + pages).
7. SEO/i18n hardening + launch (metadata/OG/JSON-LD, sitemap, indexing, email signup provider + real contact form, real testimonials, Spanish content, move About/program pages into Sanity, Vercel env + domain cutover, middleware->proxy rename, noOrphan/cx/Eyebrow DRY cleanups).
