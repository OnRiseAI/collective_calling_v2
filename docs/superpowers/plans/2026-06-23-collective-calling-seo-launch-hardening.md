# Collective Calling — Plan 7: SEO + launch hardening (code)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.
>
> **READ FIRST (Next 16):** This repo runs Next.js 16.2.9 with breaking changes vs. your training data. Before writing route/metadata code, read the relevant guide in `node_modules/next/dist/docs/` (App Router Metadata API: `generateMetadata`, `metadataBase`, `alternates`, `MetadataRoute.Sitemap`, `MetadataRoute.Robots`). `params` is a `Promise` (await it). Follow the conventions already used by the existing pages under `app/[locale]/`.

**Goal:** Make the site technically launch-ready WITHOUT deploying or indexing it yet: real per-page metadata, Open Graph/Twitter cards, JSON-LD structured data, a sitemap, and an env-gated robots policy (so indexing is a deploy-time config flip, never a code change). Plus the standing DRY cleanups so the codebase is clean before launch. This plan is self-contained: it adds no external dependencies, no secrets, and no network calls.

**Explicitly OUT OF SCOPE (each is its own later plan/step, several blocked on external inputs):** Vercel deploy + domain cutover; the contact-form/email-signup backend (needs an email provider + API key); real client content (supporter testimonials, additional stories, event dates) which cannot be fabricated for a real charity; Spanish (`/es`) translated content; migrating the in-code typed pages into Sanity. Do NOT do any of these here.

**Architecture:** All SEO is the App Router Metadata API plus small server-rendered JSON-LD `<script>` tags. A single `lib/site.ts` holds the canonical site facts (name, base URL from env, description, default OG image, and the real Organization details). A `lib/seo.ts` helper builds per-page `Metadata` (title, description, canonical, openGraph, twitter) so every page stays consistent. `app/robots.ts` and `app/sitemap.ts` read the same site config. Indexability is gated by an env flag so previews never get indexed and launch is a config change. The DRY cleanups extract already-duplicated helpers (`cx`, `noOrphan`/paragraph-split) and a shared `<Eyebrow>` with NO behavior change.

**Tech Stack:** Next.js 16.2.9 (App Router, React 19), TypeScript, Tailwind v4, next-intl 4.13.0 (en at `/`, es at `/es` scaffolded), Sanity, Vitest 4, Playwright 1.61.

## Global Constraints

- Account: **OnRise** (`gh auth switch --hostname github.com --user OnRiseAI`). Repo **OnRiseAI/cc**, branch off `main`. Local `D:\Projects\collective-calling`. Commit locally per task; push at branch finish.
- Brand (do not redefine): `brand` #1B3A6B, `brand-dark` #0F2347, `accent` #C8922A (gold), `clay` #B05A38, `ink` #1F1B16, `paper` #FBF7F0, `muted` #6E6258. Fonts `font-heading` (Fraunces), `font-body` (Mulish). NOT Tearfund blue.
- CONTENT INTEGRITY (real charity): real facts only, NO fabrication. Use ONLY these verified Organization facts in JSON-LD/metadata: legal name **Collective Calling**, founded **2017**, registration **611.510**, CIF **G93524130**, address **Av. Pablo Ruiz Picasso 4, 29670 San Pedro Alcantara, Malaga, Spain**, phone **+34 711 006 961**, email **info@collectivecalling.org**, socials facebook.com/collectivecalling, youtube channel **UC-el3s8QuBqD81RtpODyhgQ**, instagram **collective_calling**. Do NOT invent founders, ratings, award names, or numbers beyond these and the already-seeded 83/17 split.
- Indexing is GATED: the site MUST remain non-indexable by default. Indexability is driven by an env flag (see Task 6). Do not allow crawling in the default/preview state.
- HARD WRITING RULE: NEVER use an em dash (the long dash) anywhere (code, comments, JSX copy, JSON, metadata strings). Use periods, commas, colons, parentheses. Provide `key` for every mapped list.
- i18n / hreflang: en is the active locale at `/`. Spanish content does NOT exist yet, so DO NOT advertise `es` hreflang alternates (that would point crawlers at English-fallback pages). Emit a per-page `canonical` for the current locale; build the alternates helper so adding `es` later is trivial, but only emit `en`/x-default for now.
- DRY refactors are BEHAVIOR-PRESERVING: rendered HTML/classes must be byte-for-byte equivalent after extraction. The existing unit + e2e suites are the safety net and must stay green; do not change any rendered output.
- Every task ends green: `pnpm test` (all) and `pnpm build` succeed. The final task keeps `pnpm test:e2e` green. Do NOT weaken `playwright.config` (`workers: 1`, `build && start`). Do NOT run `vercel`.

---

## Task 1: Shared utilities (cx + text helpers), adopt across the codebase

**Files:** Create `lib/cx.ts`, `lib/text.ts`. Edit every file that currently defines a local `cx`, a local `noOrphan`/`balanceTitle`, or the inline paragraph-split. Create `__tests__/lib/text.test.ts`.

**Interfaces:**
- `lib/cx.ts`: `export function cx(...parts: Array<string | undefined | false | null>): string` returning the truthy parts joined by a single space. Identical to the existing local copies.
- `lib/text.ts`: `export function noOrphan(text: string): string` (joins the last two whitespace-separated words with a non-breaking space, returns the input unchanged when it has fewer than two words) and `export function toParagraphs(body: string): string[]` (`body.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean)`).
- Replace the local `cx` in all 12 components (Button, Container, Prose, PageHero, Card, Section, TeamGrid, ValueCards, ProgramHelp, PartnerList, ContactDetails, DonateWidget) with `import { cx } from '@/lib/cx'`. Replace the local orphan helpers in `components/page/PageHero.tsx` (`balanceTitle`), `components/home/Hero.tsx`, `components/home/MissionBlurb.tsx`, `components/home/WhereMoneyGoes.tsx` with `noOrphan` from `@/lib/text` (preserving the exact NBSP behavior; if `PageHero.balanceTitle` differs in output, match the shared `noOrphan` to it so PageHero's rendered title is unchanged). Replace the inline paragraph-split in `app/[locale]/stories/[slug]/page.tsx` and `app/[locale]/appeals/[slug]/page.tsx` with `toParagraphs` from `@/lib/text`.

- [ ] **Step 1: Write failing test** `__tests__/lib/text.test.ts`: `cx('a', false, undefined, 'b')` === `'a b'`; `noOrphan('one two three')` ends with `two three` (non-breaking space between the last two words) and `noOrphan('single')` === `'single'`; `toParagraphs('a\n\nb\n  \nc')` deep-equals `['a','b','c']`.
- [ ] **Step 2: Run → FAIL.** `pnpm test lib/text`.
- [ ] **Step 3: Implement** the two util files, then adopt them everywhere the local copies live (grep for `function cx`, `noOrphan`, `balanceTitle`, `split(/\\n\\s*\\n/)`). Remove the now-dead local definitions.
- [ ] **Step 4: Run → PASS.** `pnpm test` (the FULL suite must stay green, proving no behavior changed) and `pnpm build`.
- [ ] **Step 5: Commit.** `git commit -m "refactor(dry): shared cx + text helpers (noOrphan, toParagraphs)"`

---

## Task 2: Shared `<Eyebrow>` component, adopt the matching usages

**Files:** Create `components/ui/Eyebrow.tsx`. Edit the components that render the inline gold eyebrow with the leading rule. Create `__tests__/ui/eyebrow.test.tsx`.

**Interface:** `export function Eyebrow(props: { children: React.ReactNode; align?: 'left' | 'center'; className?: string }): JSX.Element`. It renders the EXACT current markup of the dominant inline eyebrow (the one with the leading rule span), so adopting it changes no rendered output:
```tsx
<p className={cx('flex items-center gap-3 font-body text-sm font-bold uppercase tracking-[0.18em] text-accent', align === 'center' && 'justify-center', className)}>
  <span aria-hidden="true" className="h-px w-8 bg-accent" />
  {children}
</p>
```
Adopt it ONLY where the existing inline markup matches this pattern exactly: `components/home/Hero.tsx`, `MissionBlurb.tsx`, `AppealsCards.tsx`, `Testimonials.tsx`, `components/page/TeamGrid.tsx`, `ContactDetails.tsx`, `app/[locale]/appeals/[slug]/page.tsx`, `app/[locale]/stories/[slug]/page.tsx` (grep for `h-px w-8 bg-accent` to find every site). Do NOT change `components/page/PageHero.tsx`'s eyebrow if its markup differs (PageHero's eyebrow has no leading rule); leave divergent eyebrows alone and note them. Verify each adopted call site renders identical classes (use the `align` prop for the centered variants).

- [ ] **Step 1: Write failing test** `__tests__/ui/eyebrow.test.tsx`: render `<Eyebrow>Give today</Eyebrow>` → asserts the text renders, the element is a `<p>` with the `text-accent` and `uppercase` classes, and contains an `aria-hidden` rule span; render `<Eyebrow align="center">x</Eyebrow>` → asserts `justify-center` is present.
- [ ] **Step 2: Run → FAIL.**
- [ ] **Step 3: Implement** `Eyebrow.tsx` (using `cx` from Task 1) and adopt it at the exact-match call sites, removing the inline duplicated markup.
- [ ] **Step 4: Run → PASS.** Full `pnpm test` green (no rendered-output change) and `pnpm build`.
- [ ] **Step 5: Commit.** `git commit -m "refactor(dry): shared Eyebrow component"`

---

## Task 3: Site config + root metadata + Organization JSON-LD

**Files:** Create `lib/site.ts`, `lib/jsonld.ts`, `components/seo/JsonLd.tsx`. Edit `app/[locale]/layout.tsx`. Create `__tests__/seo/site-and-jsonld.test.ts(x)`.

**Interfaces:**
- `lib/site.ts`: `export const SITE` with `name: 'Collective Calling'`, `url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://collectivecalling.org'`, `description` (a real one-paragraph charity description: restoring dignity and strengthening families in Spain and Tanzania), `ogImage: '/images/about/hero-group.jpg'` (an existing real photo used as the default share image; a dedicated 1200x630 branded OG image is a noted follow-up), and an `org` object with the verified facts (legalName, foundingDate '2017', registration '611.510', taxId 'G93524130', address fields, telephone, email, sameAs: the three socials). `export const isIndexable = process.env.NEXT_PUBLIC_SITE_INDEXABLE === 'true'`.
- `lib/jsonld.ts`: `export function organizationJsonLd(): object` returning a schema.org `NGO` (or `Organization`) object built from `SITE` (name, url, logo, description, address as `PostalAddress`, telephone, email, foundingDate, sameAs, and an `identifier` for the registration). Real facts only.
- `components/seo/JsonLd.tsx`: a tiny server component `JsonLd({ data }: { data: object })` rendering `<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />`.
- `app/[locale]/layout.tsx`: replace the minimal `metadata` with a richer default export: `metadataBase: new URL(SITE.url)`, `title: { default: SITE.name, template: \`%s | ${SITE.name}\` }`, `description: SITE.description`, `openGraph` (type website, siteName, title, description, url, images: [SITE.ogImage]), `twitter` (summary_large_image, title, description, images), `icons`, and `robots: { index: isIndexable, follow: isIndexable }` (so previews are noindex at the meta level too). Render `<JsonLd data={organizationJsonLd()} />` once in the layout body.

- [ ] **Step 1: Write failing test** `__tests__/seo/site-and-jsonld.test.tsx`: `organizationJsonLd()` has `@context` `https://schema.org`, a name `Collective Calling`, the registration `611.510` somewhere in its fields, and `sameAs` including the facebook URL; assert the function does NOT contain a fabricated founder name (sanity check: no `founder` key with a person, unless real). Render `<JsonLd data={{a:1}} />` and assert a `script[type="application/ld+json"]` with the serialized JSON is produced. Assert `SITE.url` falls back to the default when the env is unset.
- [ ] **Step 2: Run → FAIL.**
- [ ] **Step 3: Implement** `lib/site.ts`, `lib/jsonld.ts`, `components/seo/JsonLd.tsx`, and the root layout metadata + JSON-LD injection.
- [ ] **Step 4: Run → PASS.** Then `pnpm build` (the layout still renders; metadataBase is valid).
- [ ] **Step 5: Commit.** `git commit -m "feat(seo): site config, root metadata, Organization JSON-LD"`

---

## Task 4: Per-page metadata for all static pages

**Files:** Create `lib/seo.ts`. Edit each static page under `app/[locale]/` to add `generateMetadata`. Create `__tests__/seo/page-metadata.test.ts`.

**Interface:** `lib/seo.ts`: `export function pageMetadata(opts: { locale: string; path: string; title: string; description: string; image?: string }): Metadata`. It returns `{ title, description, alternates: { canonical: <SITE.url + localized path> }, openGraph: { title, description, url, images: [image ?? SITE.ogImage], type: 'website' }, twitter: {...} }`. For the canonical/url, build the absolute URL for the CURRENT locale only (en at `/path`). Do NOT emit `es` language alternates (Spanish content does not exist yet); leave a clearly-commented seam for adding `alternates.languages` later.

Add `export async function generateMetadata({ params })` to each static page, pulling `title`/`description` from that page's existing content const (use the hero title and the lede/intro as the description, truncated sensibly; real copy, no fabrication). Pages to cover: `/` (home), `/about` and the six about sub-pages, `/contact`, `/spain`, `/tanzania`, `/donate`, `/donate/ways-to-give`, `/get-involved/sponsor-a-child`, `/stories` (hub), `/appeals` (hub), `/events`, `/get-involved` (hub), `/get-involved/fundraise`, `/get-involved/pray`, `/get-involved/partner`, `/get-involved/invite-us-to-speak`. (The dynamic detail routes are Task 5.)

- [ ] **Step 1: Write failing test** `__tests__/seo/page-metadata.test.ts`: import `generateMetadata` from two representative pages (e.g. `/spain` and `/get-involved/fundraise`), call with `{ params: Promise.resolve({ locale: 'en' }) }`, and assert each returns a non-generic `title` (not just "Collective Calling"), a non-empty `description`, and an `alternates.canonical` absolute URL ending in the right path. Also unit-test `pageMetadata` directly: canonical is absolute, no `languages.es` key is emitted.
- [ ] **Step 2: Run → FAIL.**
- [ ] **Step 3: Implement** `lib/seo.ts` and add `generateMetadata` to every listed static page (reuse the page's content const; keep `setRequestLocale` usage intact).
- [ ] **Step 4: Run → PASS.** Then `pnpm build` (every page builds with its metadata).
- [ ] **Step 5: Commit.** `git commit -m "feat(seo): per-page metadata for all static pages"`

---

## Task 5: Dynamic-page metadata + Article JSON-LD

**Files:** Edit `app/[locale]/stories/[slug]/page.tsx` and `app/[locale]/appeals/[slug]/page.tsx`. Add `lib/jsonld.ts` `articleJsonLd(...)`. Create `__tests__/seo/dynamic-metadata.test.ts`.

**Interfaces:**
- `app/[locale]/stories/[slug]/page.tsx`: add `export async function generateMetadata({ params })` that awaits params, `getStory(slug)`, and returns `pageMetadata({ locale, path: \`/stories/${slug}\`, title: story.title, description: story.excerpt, image: story.images?.[0] })`. If the story is missing, return a minimal safe fallback metadata (title `SITE.name`), NEVER throw (the page itself still calls `notFound()`).
- `app/[locale]/appeals/[slug]/page.tsx`: same pattern with `getAppeal(slug)`, `description: appeal.blurb`, `image: appeal.image`.
- `lib/jsonld.ts`: add `export function articleJsonLd(opts: { title: string; description: string; url: string; image?: string }): object` returning a schema.org `Article` (headline, description, image, mainEntityOfPage url, publisher = the Organization name/url). Render `<JsonLd data={articleJsonLd(...)} />` on the STORY detail page (stories are editorial). Do not add Article to appeals (they are giving pages, not articles).

- [ ] **Step 1: Write failing test** `__tests__/seo/dynamic-metadata.test.ts`: mock the read layer; call the story `generateMetadata` for `caleb` → title contains the Caleb title, description is the excerpt, canonical ends `/stories/caleb`, og image is the story image; call it for an unknown slug → returns the safe fallback title without throwing. Call the appeal `generateMetadata` for `sponsor-a-child` → title + description present, canonical ends `/appeals/sponsor-a-child`. `articleJsonLd({...})` has `@type` `Article` and a `publisher`.
- [ ] **Step 2: Run → FAIL.**
- [ ] **Step 3: Implement** both `generateMetadata` functions, `articleJsonLd`, and inject the Article JSON-LD on the story detail page.
- [ ] **Step 4: Run → PASS.** Then `pnpm build`.
- [ ] **Step 5: Commit.** `git commit -m "feat(seo): dynamic page metadata + Article JSON-LD for stories"`

---

## Task 6: Sitemap + env-gated robots

**Files:** Create `app/sitemap.ts`. Edit `app/robots.ts`. Edit `.env.example`. Create `__tests__/seo/sitemap-robots.test.ts`.

**Interfaces:**
- `app/sitemap.ts`: `export default async function sitemap(): Promise<MetadataRoute.Sitemap>`. Enumerate all static routes (the same list as Task 4 plus `/`) and the dynamic slugs from `await getStories()` (`/stories/[slug]`) and `await getAppeals()` (`/appeals/[slug]`). Build absolute URLs from `SITE.url`. Emit only the active locale (en) URLs for now (no `/es` entries until Spanish content exists). Reasonable `changeFrequency`/`priority`. The sitemap is generated regardless of indexability (robots controls crawling).
- `app/robots.ts`: replace the hardcoded `disallow: '/'` with env-gated logic using `isIndexable` from `@/lib/site`. When `isIndexable` is true: `{ rules: [{ userAgent: '*', allow: '/', disallow: ['/studio', '/api'] }], sitemap: \`${SITE.url}/sitemap.xml\` }`. When false (default/preview): `{ rules: [{ userAgent: '*', disallow: '/' }] }`. Fix the stale "Plan 6" comment.
- `.env.example`: add `NEXT_PUBLIC_SITE_URL=` and `NEXT_PUBLIC_SITE_INDEXABLE=false` with a one-line comment each (set INDEXABLE to `true` only on the production domain at launch).

- [ ] **Step 1: Write failing test** `__tests__/seo/sitemap-robots.test.ts`: mock the read layer; `sitemap()` includes `/`, `/stories/caleb`, `/appeals/spain-homelessness`, `/get-involved`, and contains NO `/es` URL and NO `/studio` URL; all entries are absolute URLs under `SITE.url`. For robots: with `NEXT_PUBLIC_SITE_INDEXABLE` unset → the rule disallows `/` (noindex default); when set to `'true'` (re-import with the env set) → allow `/` with `/studio` disallowed and a `sitemap` field present. (Use `vi.stubEnv` / module re-import to toggle the flag.)
- [ ] **Step 2: Run → FAIL.**
- [ ] **Step 3: Implement** `app/sitemap.ts`, the env-gated `app/robots.ts`, and the `.env.example` additions.
- [ ] **Step 4: Run full check.** `pnpm test` (all) PASS, `pnpm build` succeeds, `pnpm test:e2e` PASS (the existing e2e must stay green; note the site is still noindex by default so no behavior change for the suite).
- [ ] **Step 5: Commit.** `git commit -m "feat(seo): sitemap + env-gated robots"`

---

## Self-Review (against the scope)

- **Per-page metadata** → root defaults + `metadataBase` + title template (T3); `generateMetadata` on every static page (T4) and both dynamic detail routes (T5). ✓
- **Open Graph / Twitter** → defaults in root (T3); per-page in the `pageMetadata` helper using each page's real title/description and hero image (T4, T5). ✓
- **JSON-LD** → Organization/NGO sitewide (T3); Article on story detail (T5). Real facts only. ✓
- **Sitemap** → `app/sitemap.ts` enumerating static + dynamic (story/appeal) routes, en-only, absolute URLs (T6). ✓
- **Enable-indexing infra without premature indexing** → env-gated `robots.ts` + `robots: { index: isIndexable }` meta; default stays noindex so previews are safe; launch is flipping `NEXT_PUBLIC_SITE_INDEXABLE=true` on the production domain (T3, T6). ✓
- **hreflang correctness** → en/x-default only; no `es` alternates emitted while Spanish content is absent; helper seam left for later (T4). ✓
- **DRY cleanups** → shared `cx` + `noOrphan`/`toParagraphs` (T1), shared `<Eyebrow>` (T2); behavior-preserving, guarded by the full existing suite. ✓
- **Out of scope respected** → no Vercel/deploy commands, no email/contact backend, no email library added, no Spanish content, no Sanity page migration, no fabricated client content. ✓
- **Content integrity** → only the verified Organization facts and existing real page copy are used in metadata/JSON-LD; no invented founders/ratings/numbers. ✓
- Placeholder scan: no plan-level TODOs; each task has concrete content + a concrete failing-first test.

## Roadmap — work after this plan (each its own plan/step)

8. **Deploy + launch:** set `NEXT_PUBLIC_SANITY_*`, `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_SITE_INDEXABLE=true` on Vercel (OnRise team, git integration under jon-onriseais-projects); deploy a preview; verify SEO with the live URL; domain cutover for collectivecalling.org; flip indexing on the production domain only.
9. **Contact-form + email-signup backend:** choose a provider (e.g. Resend), add the API key + domain verification, build a real form + server action (the contact page currently offers working mailto/tel details).
10. **Real client content:** replace the flagged placeholders (3 homepage testimonials, the `your-story-here` story, Spring Fair + Lunch with Santa event details/dates) with CC-supplied real content; optional Sanity seeding script for the collections.
11. **Spanish content (`/es`):** translate the typed content layer + seeds; then emit `es`/x-default hreflang alternates (the helper seam from Task 4) and add `/es` sitemap entries.
12. **Sanity migration:** move the in-code typed pages (About cluster, programs, donate, get-involved) into Sanity so staff can edit them.
13. **Misc:** dedicated 1200x630 branded OG image; revisit the `middleware.ts` -> `proxy.ts` rename only if Next 16 actually emits the deprecation (none observed as of this plan).
