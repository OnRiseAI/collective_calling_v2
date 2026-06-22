# Collective Calling — Plan 3: Sanity CMS

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the homepage content editable in Sanity, reading live CMS content when configured and falling back to the existing typed seed otherwise, with an embedded Studio at `/studio`.

**Architecture:** The existing `lib/content/` is the seam. We add a guarded Sanity client (null when env is unset), schemas mirroring `HomeContent`, a read layer that fetches a `homePage` singleton and maps it back to the exact `HomeContent` shape, and an embedded Studio. `getHomeContent()` tries Sanity when configured and falls back to the seed on unconfigured-or-error, so the site always renders. Provisioning the actual Sanity project (interactive auth) and seeding content is one human-gated task; all other tasks build and test green with no project.

**Tech Stack:** Next.js 16.2.9 (App Router, React 19), TypeScript, next-sanity, sanity, @sanity/vision, @sanity/image-url, next-intl 4.13.0, Vitest, Playwright.

## Global Constraints

- Account: **OnRise**. Repo **OnRiseAI/cc**, branch off `main`. Local `D:\Projects\collective-calling`. Commit locally; push at branch finish.
- The site MUST build and all tests MUST pass with NO Sanity project configured (env vars unset): the guarded client is null, Studio renders a safe "not configured" state, and `getHomeContent()` returns the seed. Never let an unset `NEXT_PUBLIC_SANITY_PROJECT_ID` crash the build or a page render.
- The content contract is fixed: `HomeContent` and its sub-types in `lib/content/types.ts` do NOT change. The Sanity read maps INTO that exact shape (e.g. Sanity image assets resolve to a URL `string` so `image: string` stays true; `donate` tier `interval` stays `'monthly'|'once'`; `money` percentages stay numbers; testimonial `placeholder` stays optional boolean).
- Env var names (NEXT_PUBLIC so the client can read at runtime): `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET` (default `production`), `NEXT_PUBLIC_SANITY_API_VERSION` (date string, e.g. `2025-01-01`). Optional server-only `SANITY_API_READ_TOKEN` only if a private dataset is used (default dataset is public-read, so no token needed for reads).
- Studio lives at top-level `/studio`, OUTSIDE the `[locale]` i18n routing. The next-intl middleware matcher MUST be updated to exclude `studio` (and keep excluding `_next`, `_vercel`, files). Studio is noindex.
- HARD WRITING RULE: no em dashes (long dash) in any file (code, comments, JSON, schema titles/descriptions). Use periods, commas, colons, parentheses.
- Brand: Studio is internal tooling; no brand work needed. Do not touch homepage section components or their styling. Keep `app/robots.ts` noindex. Do not run `vercel`.
- Reuse, do not duplicate: the seed object already lives in `lib/content/home.ts`. Refactor it so the seed is reusable by both the fallback and the Sanity seeding script.

---

## File Structure (created/modified in this plan)

- `sanity/env.ts` — reads + validates env, exports `projectId`, `dataset`, `apiVersion`, `isSanityConfigured`.
- `sanity/client.ts` — exports `sanityClient` (a configured client) or `null` when unconfigured.
- `sanity/image.ts` — `urlForImage(source)` via `@sanity/image-url` (guarded).
- `sanity/schemas/homePage.ts`, `sanity/schemas/objects/*.ts`, `sanity/schemas/index.ts` — schemas mirroring `HomeContent`.
- `sanity/structure.ts` — Studio desk structure pinning the `homePage` singleton.
- `sanity.config.ts`, `sanity.cli.ts` — Studio + CLI config (projectId/dataset from env).
- `app/studio/[[...tool]]/page.tsx` (+ `layout.tsx`) — embedded Studio route (guarded).
- `lib/content/seed.ts` — the seed `HomeContent` object (moved out of `home.ts`).
- `lib/content/home.ts` — `getHomeContent()` now tries Sanity then falls back to seed.
- `lib/sanity/home.query.ts` — GROQ query + `mapSanityHome(raw): HomeContent`.
- `scripts/seed-sanity.ts` — one-off seeding script (used in the gated task).
- `.env.example` — documents the env vars.
- `middleware.ts` — matcher updated to exclude `studio`.
- Tests under `__tests__/sanity/`.

---

## Task 1: Install Sanity, env module, and the guarded client

**Files:**
- Create: `sanity/env.ts`, `sanity/client.ts`, `sanity/image.ts`, `.env.example`, `__tests__/sanity/client.test.ts`
- Modify: `package.json` (deps)

**Interfaces:**
- Produces: `sanity/env.ts` exports `projectId: string | undefined`, `dataset: string`, `apiVersion: string`, `isSanityConfigured(): boolean` (true only when `projectId` is a non-empty string). `sanity/client.ts` exports `sanityClient: SanityClient | null` (null when not configured). `sanity/image.ts` exports `urlForImage(source: SanityImageSource | undefined): string | undefined` (undefined when unconfigured or no source).

- [ ] **Step 1: Install deps.** `pnpm add sanity next-sanity @sanity/vision @sanity/image-url`

- [ ] **Step 2: Write `sanity/env.ts`** reading `process.env.NEXT_PUBLIC_SANITY_PROJECT_ID` (no throw if missing), `NEXT_PUBLIC_SANITY_DATASET` (default `'production'`), `NEXT_PUBLIC_SANITY_API_VERSION` (default `'2025-01-01'`), and `isSanityConfigured = () => typeof projectId === 'string' && projectId.length > 0`.

- [ ] **Step 3: Write failing test** `__tests__/sanity/client.test.ts`:

```ts
import { expect, test } from 'vitest'
import { isSanityConfigured } from '@/sanity/env'
import { sanityClient } from '@/sanity/client'
test('sanity is not configured and client is null when env is unset', () => {
  // env vars are unset in the test environment
  expect(isSanityConfigured()).toBe(false)
  expect(sanityClient).toBeNull()
})
```

- [ ] **Step 4: Run → FAIL.** `pnpm test sanity` → FAIL (modules missing).

- [ ] **Step 5: Implement `sanity/client.ts`** (`createClient({ projectId, dataset, apiVersion, useCdn: true })` only when `isSanityConfigured()`, else `null`) and `sanity/image.ts` (guarded `imageUrlBuilder`). Write `.env.example` documenting the four env vars with comments.

- [ ] **Step 6: Run → PASS.** `pnpm test sanity` → PASS. Then `pnpm build` → succeeds (no project configured, nothing crashes).

- [ ] **Step 7: Commit.** `git add -A && git commit -m "feat(sanity): install Sanity, env module, guarded client"`

---

## Task 2: Schemas mirroring HomeContent

**Files:**
- Create: `sanity/schemas/objects/{impactStat,appeal,testimonial,exploreCard,donateTier,moneySplit,scripture,heroBlock,mission,trust}.ts`, `sanity/schemas/homePage.ts`, `sanity/schemas/index.ts`, `__tests__/sanity/schema.test.ts`

**Interfaces:**
- Produces: `schemaTypes` array exported from `sanity/schemas/index.ts` (consumed by `sanity.config.ts` in Task 4). A `homePage` singleton document type whose fields mirror `HomeContent`: `hero` (object: eyebrow, headline, lede, image[image], alt), `impactStats` (array of `impactStat` {icon: string list shower|home|heart, value, label}), `appeals` (array of `appeal` {slug, title, blurb, image[image], alt, href, theme: list spain|tanzania|general}), `mission` (object eyebrow/heading/body), `scripture` (object quote/reference), `testimonials` (array of `testimonial` {quote, attribution, placeholder: boolean}), `exploreCards` (array of `exploreCard` {title, blurb, image[image], alt, href}), `money` (object programsPct/adminPct[number], programsLabel/adminLabel/note), `donate` (object monthlyTiers/onceTiers: array of `donateTier` {amount: number, interval: list monthly|once, impact}), `trust` (object registration/statement/partners[array of string]).

- [ ] **Step 1: Write failing test** `__tests__/sanity/schema.test.ts`:

```ts
import { expect, test } from 'vitest'
import { schemaTypes } from '@/sanity/schemas'
test('schema includes a homePage singleton mirroring HomeContent', () => {
  const names = schemaTypes.map((t: { name: string }) => t.name)
  expect(names).toContain('homePage')
  const home = schemaTypes.find((t: { name: string }) => t.name === 'homePage') as { fields: { name: string }[] }
  const fieldNames = home.fields.map((f) => f.name)
  for (const f of ['hero','impactStats','appeals','mission','scripture','testimonials','exploreCards','money','donate','trust']) {
    expect(fieldNames).toContain(f)
  }
})
```

- [ ] **Step 2: Run → FAIL.** `pnpm test sanity/schema` → FAIL.

- [ ] **Step 3: Implement the object schemas and `homePage` document** using `defineType`/`defineField` from `sanity`. Image fields use `type: 'image'` with `options: { hotspot: true }` and a sibling required `alt` where the content has alt. Use `list` options for `icon`, `theme`, `interval`. Add concise titles/descriptions (no em dashes). Export `schemaTypes` from `index.ts`.

- [ ] **Step 4: Run → PASS.** `pnpm test sanity/schema` → PASS. Then `pnpm build` → succeeds.

- [ ] **Step 5: Commit.** `git add -A && git commit -m "feat(sanity): homePage schema mirroring HomeContent"`

---

## Task 3: Read layer with seed fallback

**Files:**
- Create: `lib/content/seed.ts`, `lib/sanity/home.query.ts`, `__tests__/sanity/home-read.test.ts`
- Modify: `lib/content/home.ts`

**Interfaces:**
- Consumes: `sanityClient` (Task 1), `urlForImage` (Task 1), `HomeContent` types.
- Produces: `lib/content/seed.ts` exports `SEED_HOME: HomeContent` (the object currently inline in `home.ts`). `lib/sanity/home.query.ts` exports `HOME_QUERY` (GROQ string for the `homePage` singleton) and `mapSanityHome(raw: unknown): HomeContent` (maps a raw Sanity doc to `HomeContent`, resolving image objects to URL strings via `urlForImage`, defaulting missing arrays to `[]`). `lib/content/home.ts` `getHomeContent()` now: if `sanityClient` is null, return `SEED_HOME`; else `try { const raw = await sanityClient.fetch(HOME_QUERY); return raw ? mapSanityHome(raw) : SEED_HOME } catch { return SEED_HOME }`.

- [ ] **Step 1: Move the seed.** Cut the literal object returned by `getHomeContent()` in `lib/content/home.ts` into `lib/content/seed.ts` as `export const SEED_HOME: HomeContent = { ... }` (verbatim, unchanged). Import it back into `home.ts`.

- [ ] **Step 2: Write failing test** `__tests__/sanity/home-read.test.ts`:

```ts
import { expect, test, vi } from 'vitest'
import { mapSanityHome } from '@/lib/sanity/home.query'
import { getHomeContent } from '@/lib/content/home'
import { SEED_HOME } from '@/lib/content/seed'

test('getHomeContent falls back to the seed when Sanity is unconfigured', async () => {
  const home = await getHomeContent()
  expect(home).toEqual(SEED_HOME) // env unset in tests => client null
})

test('mapSanityHome maps a raw doc into the HomeContent shape', () => {
  const raw = {
    hero: { eyebrow: 'CC', headline: 'H', lede: 'L', image: null, alt: 'A' },
    impactStats: [{ icon: 'heart', value: '83%', label: 'x' }],
    appeals: [], mission: { eyebrow: 'm', heading: 'h', body: 'b' },
    scripture: { quote: 'q', reference: '1 John 4:11' },
    testimonials: [{ quote: 't', attribution: 'Supporter', placeholder: true }],
    exploreCards: [],
    money: { programsPct: 83, adminPct: 17, programsLabel: 'a', adminLabel: 'b', note: 'n' },
    donate: { monthlyTiers: [], onceTiers: [] },
    trust: { registration: 'r', statement: 's', partners: ['p'] },
  }
  const mapped = mapSanityHome(raw)
  expect(mapped.impactStats[0].value).toBe('83%')
  expect(mapped.money.programsPct + mapped.money.adminPct).toBe(100)
  expect(mapped.trust.partners).toEqual(['p'])
})
```

- [ ] **Step 3: Run → FAIL.** `pnpm test sanity/home-read` → FAIL.

- [ ] **Step 4: Implement** `lib/sanity/home.query.ts` (GROQ `*[_type == "homePage"][0]{...}` selecting every field; `mapSanityHome` building the `HomeContent` with safe defaults and image-URL resolution) and update `home.ts` per the Produces contract.

- [ ] **Step 5: Run → PASS.** `pnpm test sanity/home-read` → PASS, and the FULL suite `pnpm test` → PASS (the homepage still renders the seed unchanged). Then `pnpm build` → succeeds.

- [ ] **Step 6: Commit.** `git add -A && git commit -m "feat(sanity): read layer with seed fallback"`

---

## Task 4: Embedded Studio at /studio (guarded) + middleware exclusion

**Files:**
- Create: `sanity.config.ts`, `sanity.cli.ts`, `sanity/structure.ts`, `app/studio/[[...tool]]/page.tsx`, `app/studio/[[...tool]]/layout.tsx`
- Modify: `middleware.ts`, `app/robots.ts` (ensure `/studio` noindex), `next.config.ts` if needed

**Interfaces:**
- Consumes: `schemaTypes` (Task 2), env (Task 1).
- Produces: a working `/studio` route when configured; a safe non-crashing state when not.

- [ ] **Step 1: Write `sanity.config.ts`** with `defineConfig({ projectId: projectId ?? 'placeholder', dataset, plugins: [structureTool({ structure }), visionTool()], schema: { types: schemaTypes } })`. Using a `'placeholder'` projectId when unset keeps the build from crashing; the Studio simply will not connect until real env is set. `sanity.cli.ts` exports the project/dataset for the CLI.

- [ ] **Step 2: Write `sanity/structure.ts`** pinning `homePage` as a single editable document (singleton list item), not a create-many list.

- [ ] **Step 3: Implement the Studio route** `app/studio/[[...tool]]/page.tsx` using `next-sanity/studio`'s `NextStudio` with the config; add a minimal `layout.tsx` for the segment (Studio manages its own html/styles). Export `dynamic = 'force-static'` per next-sanity guidance, and `metadata`/viewport export with `robots: { index: false }`.

- [ ] **Step 4: Update `middleware.ts`** matcher so the i18n middleware does NOT run on `/studio` (add `studio` to the negative lookahead alongside `_next`, `_vercel`, and the file pattern). Confirm `/studio` is not redirected to `/en/studio`.

- [ ] **Step 5: Verify build + a guard test.** `pnpm build` → succeeds with env unset (Studio compiles, no crash). Add `__tests__/sanity/config.test.ts` asserting `sanity.config`'s schema includes `homePage` (import the config and check `config.schema.types` contains it) so the config stays wired to the schema.

- [ ] **Step 6: Run tests.** `pnpm test` → PASS.

- [ ] **Step 7: Commit.** `git add -A && git commit -m "feat(sanity): embedded Studio at /studio, exclude from i18n middleware"`

---

## Task 5: PROVISION + SEED (HUMAN-GATED)

**Files:** Create `scripts/seed-sanity.ts`; create local `.env.local` (gitignored, not committed)

**This task requires the user. A subagent cannot run interactive `sanity login`.** The controller drives it WITH the user.

- [ ] **Step 1: Authenticate.** The user runs `sanity login` (or provides a Sanity personal token as `SANITY_AUTH_TOKEN`). Confirm with `npx sanity debug --secrets` that a user is logged in.

- [ ] **Step 2: Create the project + dataset.** Run `npx sanity projects create "Collective Calling"` (or `sanity init --project` flow) under the OnRise Sanity account, dataset `production`, set to public read (so no read token is needed). Record the `projectId`.

- [ ] **Step 3: Set env.** Write `.env.local` (gitignored) with `NEXT_PUBLIC_SANITY_PROJECT_ID=<id>`, `NEXT_PUBLIC_SANITY_DATASET=production`, `NEXT_PUBLIC_SANITY_API_VERSION=2025-01-01`. (Vercel env vars are set later with the deploy step; not in this plan.) Add `<projectId>` and `http://localhost:3000` / the future domain to the Studio CORS origins via `npx sanity cors add`.

- [ ] **Step 4: Write `scripts/seed-sanity.ts`** that, using `@sanity/client` with a write token (`SANITY_AUTH_TOKEN`), uploads the homepage images from `public/images/` as Sanity image assets and creates/replaces the single `homePage` document from `SEED_HOME` (mapping seed string image paths to the uploaded asset references; testimonials keep `placeholder: true`). Run it once: `npx tsx scripts/seed-sanity.ts`. Verify the `homePage` document exists in the dataset.

- [ ] **Step 5: Verify live read.** With `.env.local` set, run `pnpm dev` and confirm the homepage renders content fetched from Sanity (edit a value in `/studio`, reload `/`, see it change). Confirm `pnpm build` still succeeds.

- [ ] **Step 6: Commit** the seed script (not `.env.local`). `git add scripts/seed-sanity.ts && git commit -m "feat(sanity): seed script for the homePage document"`

---

## Task 6: TypeGen + typed query + final verification

**Files:** Create `sanity-typegen.json`, `sanity.types.ts` (generated); Modify `lib/sanity/home.query.ts` (typed), `package.json` (typegen script)

**Interfaces:**
- Consumes: a provisioned project (Task 5) for `sanity schema extract`.

- [ ] **Step 1: Add typegen config + script.** Add `package.json` script `"typegen": "sanity schema extract && sanity typegen generate"` and `sanity-typegen.json` pointing at the schema + query files.

- [ ] **Step 2: Generate types.** Run `pnpm typegen` to produce `sanity.types.ts` (commit it). Type the `HOME_QUERY` result and ensure `mapSanityHome` accepts that generated type (tighten the `unknown` param if clean).

- [ ] **Step 3: Verify.** `pnpm test` → PASS, `pnpm build` → succeeds, `pnpm test:e2e` → PASS (homepage still renders; now Sanity-backed when env present, seed otherwise).

- [ ] **Step 4: Commit.** `git add -A && git commit -m "feat(sanity): typegen + typed home query"`

---

## Self-Review (against the spec)

- **Spec §4 CMS = Sanity** → Tasks 1-6 deliver schemas, Studio, read layer, provisioning. ✓
- **Staff-editable homepage content** → `homePage` singleton in Studio (Task 2/4). Stories/Appeals/Events collections are later plans (this plan covers the homepage content type; the spec's broader collections come with their pages). ✓
- **Seam / graceful fallback** → `getHomeContent()` tries Sanity, falls back to seed; build never crashes unconfigured (Tasks 1, 3, global constraint). ✓
- **i18n** → Studio excluded from locale middleware (Task 4). ✓
- Placeholder scan: Task 5 is explicitly human-gated (auth cannot be automated), not a vague placeholder; every other task has concrete code + tests. The `homePage` content equals the existing seed (no fabricated data); testimonials stay flagged.
- Type consistency: `HomeContent` unchanged; `mapSanityHome` returns it; `SEED_HOME` is the moved seed; `schemaTypes`/`isSanityConfigured`/`sanityClient` names consistent across tasks.

## Roadmap — plans after this one

4. About cluster + Spain/Tanzania program pages (add their content types to Sanity as needed).
5. Donate hub + Donorbox.
6. Stories / Appeals / Get Involved / Events (Sanity collections + pages).
7. SEO/i18n hardening + launch (metadata/OG/JSON-LD, sitemap, indexing, email signup provider, real testimonials, Spanish content, Vercel env + domain cutover, middleware->proxy rename, noOrphan/cx/Eyebrow DRY cleanups).
