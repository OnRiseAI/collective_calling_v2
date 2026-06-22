# Collective Calling — Plan 1: Foundation, Brand System & Site Shell

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Stand up a deployable, branded Next.js site shell for Collective Calling — approved brand system, design tokens, header/nav, footer, and a placeholder home — on a Vercel preview.

**Architecture:** Next.js (App Router) + TypeScript + Tailwind on Vercel, with next-intl i18n from day one (English live, Spanish scaffolded). This plan builds the foundation that all later content plans consume: design tokens, layout primitives, the global header (Tearfund-style mega-menu) and footer. No CMS or page content yet — those are Plans 2–6.

**Tech Stack:** Next.js 15+ (App Router), TypeScript, Tailwind CSS, next-intl, Vitest + @testing-library/react (component tests), Playwright (e2e), Vercel.

## Global Constraints

- Account context: **OnRise** — repo under **OnRiseAI** GitHub, deploy on the **OnRise Vercel team**. Never use VisQuanta accounts. (Push to OnRiseAI may require `gh auth switch --user OnRiseAI`.)
- Design fidelity: copy **Tearfund's structure/UX patterns**, use **Collective Calling's own brand**. Do not reproduce Tearfund's blue/white palette.
- Copy: faith-forward, dignified; adapt Tearfund copy to CC. Do not invent factual figures about the charity — unknown numbers are clearly-marked placeholders.
- Security: the current WordPress site is malware-infected. Only fetch rendered content and download static assets; never execute existing PHP/WP locally.
- i18n: English at `/`, Spanish at `/es`. All routes locale-aware from day one; Spanish content is phase 2 (structure only now).
- Real CC facts to use verbatim: Reg. no. **611.510**, CIF **G93524130**; **€58/mo** child sponsorship; **83%** programs / **17%** admin (2025); programs **Spain** (mobile shower unit) + **Tanzania** (Centre of Hope, family reunification); socials Facebook / YouTube / Instagram.
- No production indexing until SEO is complete (Plan 6): `robots` blocks indexing on preview.
- Working directory: `D:\Projects\collective-calling`.

---

## File Structure (created in this plan)

- `assets-source/` — harvested logo + photography from the current site (not shipped; reference/originals).
- `brand/brand-board.md` — the approved brand direction (palette, type, photography, components).
- `brand/design-tokens.json` — machine-readable tokens consumed by Tailwind config.
- `app/[locale]/layout.tsx` — root locale layout (fonts, header, footer, providers).
- `app/[locale]/page.tsx` — placeholder home.
- `components/layout/Header.tsx`, `MegaMenu.tsx`, `MobileNav.tsx`, `Footer.tsx`.
- `components/ui/Button.tsx`, `Container.tsx`, `Section.tsx`.
- `lib/nav.ts` — nav data model (sections, items) used by Header/Footer.
- `i18n/routing.ts`, `i18n/request.ts`, `messages/en.json`, `messages/es.json` (es scaffold).
- `tailwind.config.ts`, `app/globals.css` — tokens wired into Tailwind theme.
- Tests under `__tests__/` (Vitest) and `e2e/` (Playwright).

---

## Task 1: Harvest brand assets & derive the brand board (APPROVAL GATE)

**Files:**
- Create: `assets-source/` (downloaded originals), `brand/brand-board.md`, `brand/design-tokens.json`

**Interfaces:**
- Produces: `brand/design-tokens.json` with keys `color.{brand,brandDark,accent,ink,paper,muted}`, `font.{heading,body}`, `radius.base` — exact values determined here and consumed by Task 4 (Tailwind theme). The CC logo file at `assets-source/logo/cc-logo.(svg|png)`.

- [ ] **Step 1: Download the CC logo and representative photography** from the current site (static assets only — never run WP). Known URLs from the site scrape:
  - Logo: `https://collectivecalling.org/wp-content/uploads/2026/04/CC-logo-white-e1611139777306.png`
  - Photos: `.../2023/07/IMG_3345-1024x683.jpg` (Tanzania), `.../2025/04/IMG_4771-1024x848.jpg` (mobile shower), `.../2024/10/C620126D-...jpg` (Spain), before/after `.../2024/09/{3,4,5,6}.png`, gala `.../2026/05/Gala-Poster.jpeg`.
  - Save under `assets-source/logo/` and `assets-source/photos/`. Verify each downloaded file opens as a valid image before use.

- [ ] **Step 2: Extract the palette.** Sample dominant colors from the logo and site photography (the logo is white-on-transparent; identify the brand color used behind it on the live site by fetching the rendered homepage CSS). Produce a candidate palette: one primary brand color, a darker shade, one accent, ink (text), paper (background), muted. Pick a heading + body typeface pairing that reads dignified and warm (humanist sans for body; a friendly serif or strong sans for headings).

- [ ] **Step 3: Write `brand/brand-board.md`** documenting: palette with hex values + usage, type scale (font families, sizes for h1–h6/body/caption), logo treatment + clear-space, photography style (real people, warm, documentary), and component look (buttons, cards, sections). Include a short rationale tying it to CC's identity.

- [ ] **Step 4: Write `brand/design-tokens.json`** with the final chosen values, e.g.:

```json
{
  "color": { "brand": "#RRGGBB", "brandDark": "#RRGGBB", "accent": "#RRGGBB",
             "ink": "#1a1a1a", "paper": "#ffffff", "muted": "#6b6b6b" },
  "font": { "heading": "<Heading Font>", "body": "<Body Font>" },
  "radius": { "base": "0.5rem" }
}
```
(Values are produced here from Steps 2–3, not left blank.)

- [ ] **Step 5: Commit.**

```bash
git add assets-source brand
git commit -m "design: harvest CC assets and derive brand board + tokens"
```

- [ ] **Step 6: STOP — present `brand-board.md` to the user for approval.** Do not proceed to Task 2 until the user approves the brand direction. If the user requests changes, update `brand-board.md` + `design-tokens.json` and re-present.

---

## Task 2: Scaffold the Next.js app and deploy a bare preview

**Files:**
- Create: project scaffold (`package.json`, `tsconfig.json`, `next.config.ts`, `app/`, etc.), `.gitignore`, `app/robots.ts`

**Interfaces:**
- Produces: a running Next.js App Router app with TypeScript + Tailwind; `pnpm dev`, `pnpm build`, `pnpm test`, `pnpm test:e2e` scripts.

- [ ] **Step 1: Scaffold** in the existing repo (keep `docs/`, `brand/`, `assets-source/`):

```bash
cd "D:/Projects/collective-calling"
pnpm dlx create-next-app@latest . --ts --app --tailwind --eslint --src-dir=false --import-alias "@/*" --use-pnpm --no-git
```
Resolve the "directory not empty" prompt by allowing it to proceed (docs/brand are untouched by the generator).

- [ ] **Step 2: Add test tooling.**

```bash
pnpm add -D vitest @testing-library/react @testing-library/jest-dom jsdom @vitejs/plugin-react
pnpm add -D @playwright/test && pnpm exec playwright install --with-deps chromium
```
Create `vitest.config.ts` (jsdom environment, React plugin, setup file importing `@testing-library/jest-dom`) and add scripts to `package.json`: `"test": "vitest run"`, `"test:watch": "vitest"`, `"test:e2e": "playwright test"`.

- [ ] **Step 3: Add `app/robots.ts`** blocking indexing (preview is non-indexable until Plan 6):

```ts
import type { MetadataRoute } from 'next'
export default function robots(): MetadataRoute.Robots {
  return { rules: [{ userAgent: '*', disallow: '/' }] }
}
```

- [ ] **Step 4: Write a smoke test** `__tests__/smoke.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
function Hello() { return <h1>Collective Calling</h1> }
test('renders', () => {
  render(<Hello />)
  expect(screen.getByRole('heading', { name: /collective calling/i })).toBeInTheDocument()
})
```

- [ ] **Step 5: Run tests and build.**

Run: `pnpm test` → Expected: PASS. Then `pnpm build` → Expected: build succeeds.

- [ ] **Step 6: Commit and deploy a preview.**

```bash
git add -A && git commit -m "chore: scaffold Next.js app with test tooling + noindex robots"
# Ensure OnRise Vercel context, then:
pnpm dlx vercel link --scope <onrise-team> && pnpm dlx vercel deploy
```
Expected: a preview URL that loads the default page. Record the URL.

---

## Task 3: Wire i18n routing (English live, Spanish scaffolded)

**Files:**
- Create: `i18n/routing.ts`, `i18n/request.ts`, `i18n/navigation.ts`, `messages/en.json`, `messages/es.json`, `middleware.ts`
- Modify: `next.config.ts`, move root `app/layout.tsx`/`app/page.tsx` under `app/[locale]/`

**Interfaces:**
- Consumes: nothing prior.
- Produces: `Link`, `useRouter`, `usePathname` from `@/i18n/navigation`; locales `['en','es']`, defaultLocale `'en'`; `getMessages()` available in layout. All later tasks import navigation helpers from `@/i18n/navigation`.

- [ ] **Step 1: Install next-intl.** `pnpm add next-intl`

- [ ] **Step 2: Write `i18n/routing.ts`:**

```ts
import { defineRouting } from 'next-intl/routing'
export const routing = defineRouting({
  locales: ['en', 'es'],
  defaultLocale: 'en',
})
```

- [ ] **Step 3: Write `i18n/navigation.ts` and `i18n/request.ts`:**

```ts
// i18n/navigation.ts
import { createNavigation } from 'next-intl/navigation'
import { routing } from './routing'
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing)
```
```ts
// i18n/request.ts
import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'
export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale
  if (!locale || !routing.locales.includes(locale as 'en' | 'es')) locale = routing.defaultLocale
  return { locale, messages: (await import(`../messages/${locale}.json`)).default }
})
```

- [ ] **Step 4: Add `middleware.ts`** and wire the plugin in `next.config.ts`:

```ts
// middleware.ts
import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'
export default createMiddleware(routing)
export const config = { matcher: ['/', '/(en|es)/:path*', '/((?!_next|_vercel|.*\\..*).*)'] }
```
```ts
// next.config.ts
import createNextIntlPlugin from 'next-intl/plugin'
const withNextIntl = createNextIntlPlugin('./i18n/request.ts')
export default withNextIntl({})
```

- [ ] **Step 5: Move pages under `app/[locale]/`.** Create `app/[locale]/layout.tsx` calling `setRequestLocale`, wrapping children in `NextIntlClientProvider` with `getMessages()`; `app/[locale]/page.tsx` renders an `<h1>` from messages. Seed `messages/en.json` with `{ "home": { "title": "Collective Calling" } }` and copy to `messages/es.json` (English placeholders, marked for translation).

- [ ] **Step 6: Write e2e routing test** `e2e/locale.spec.ts`:

```ts
import { test, expect } from '@playwright/test'
test('en home loads at /', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Collective Calling')
})
test('es route resolves', async ({ page }) => {
  const res = await page.goto('/es')
  expect(res?.status()).toBeLessThan(400)
})
```

- [ ] **Step 7: Run build + e2e.** `pnpm build` → PASS; `pnpm test:e2e` → PASS.

- [ ] **Step 8: Commit.** `git add -A && git commit -m "feat: add next-intl i18n routing (en live, es scaffolded)"`

---

## Task 4: Apply design tokens and build layout primitives

**Files:**
- Modify: `tailwind.config.ts`, `app/globals.css`, `app/[locale]/layout.tsx` (fonts)
- Create: `components/ui/Button.tsx`, `Container.tsx`, `Section.tsx`, `__tests__/ui.test.tsx`

**Interfaces:**
- Consumes: `brand/design-tokens.json` (Task 1).
- Produces: Tailwind theme colors `brand`, `brand-dark`, `accent`, `ink`, `paper`, `muted`; components `<Button variant="primary|secondary|ghost" as?>`, `<Container>`, `<Section>` consumed by all later tasks.

- [ ] **Step 1: Map tokens into `tailwind.config.ts`** `theme.extend.colors` and `fontFamily`, reading the exact hex/font values from `brand/design-tokens.json`. Load the chosen fonts via `next/font` in the locale layout and expose CSS variables used by Tailwind.

- [ ] **Step 2: Write failing test** `__tests__/ui.test.tsx` for the Button:

```tsx
import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import { Button } from '@/components/ui/Button'
test('renders primary button with label', () => {
  render(<Button variant="primary">Donate</Button>)
  const btn = screen.getByRole('button', { name: /donate/i })
  expect(btn).toBeInTheDocument()
  expect(btn.className).toContain('bg-brand')
})
```

- [ ] **Step 3: Run test → FAIL** (`Button` not found). `pnpm test ui` → Expected FAIL.

- [ ] **Step 4: Implement `Button.tsx`, `Container.tsx`, `Section.tsx`** with variant classes using the brand tokens (`bg-brand text-paper`, etc.); `Button` supports rendering as a link via an `as`/`href` prop for CTAs.

- [ ] **Step 5: Run test → PASS.** `pnpm test ui` → Expected PASS.

- [ ] **Step 6: Commit.** `git add -A && git commit -m "feat: wire brand tokens into Tailwind + add UI primitives"`

---

## Task 5: Build the global Header with Tearfund-style mega-menu + mobile nav

**Files:**
- Create: `lib/nav.ts`, `components/layout/Header.tsx`, `MegaMenu.tsx`, `MobileNav.tsx`, `__tests__/header.test.tsx`, `e2e/nav.spec.ts`
- Modify: `app/[locale]/layout.tsx` (mount Header)

**Interfaces:**
- Consumes: `Button`, `Container` (Task 4); `Link` from `@/i18n/navigation` (Task 3).
- Produces: `NAV_SECTIONS: { key: string; label: string; items: { label: string; href: string }[] }[]` from `lib/nav.ts`, consumed by Footer (Task 6) and later content tasks for link targets.

- [ ] **Step 1: Define `lib/nav.ts`** with the CC IA (English labels, hrefs as future routes): sections **Appeals** (`/appeals`, + Spain `/spain`, Tanzania `/tanzania`), **Stories** (`/stories`), **Get Involved** (`/get-involved`, + Sponsor a child, Fundraise, Events, Invite us to speak, Pray, Partner), **About Us** (`/about`, + Who we are, What we do, Our impact, Our team, Financial accountability, Partners, Contact). Persistent **Donate** (`/donate`).

- [ ] **Step 2: Write failing test** `__tests__/header.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import { Header } from '@/components/layout/Header'
test('header shows top-level nav and a Donate CTA', () => {
  render(<Header />)
  expect(screen.getByRole('link', { name: /about us/i })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /^donate$/i })).toBeInTheDocument()
})
```

- [ ] **Step 3: Run test → FAIL.** `pnpm test header` → Expected FAIL.

- [ ] **Step 4: Implement `Header.tsx`** (logo left, top-level items from `NAV_SECTIONS`, persistent Donate button, search affordance), `MegaMenu.tsx` (hover/focus dropdown per section with featured card slot — Tearfund pattern), `MobileNav.tsx` (accessible toggle, `aria-expanded`, Escape-to-close, focus trap). Use the CC logo from `assets-source/logo`.

- [ ] **Step 5: Run test → PASS.** `pnpm test header` → Expected PASS.

- [ ] **Step 6: Write e2e** `e2e/nav.spec.ts`: mobile menu opens/closes via button and sets `aria-expanded`; a mega-menu item is reachable. Run `pnpm test:e2e nav` → Expected PASS.

- [ ] **Step 7: Mount Header** in the locale layout. `pnpm build` → PASS.

- [ ] **Step 8: Commit.** `git add -A && git commit -m "feat: global header with mega-menu + accessible mobile nav"`

---

## Task 6: Build the Footer and assemble the placeholder home; deploy preview

**Files:**
- Create: `components/layout/Footer.tsx`, `__tests__/footer.test.tsx`
- Modify: `app/[locale]/layout.tsx` (mount Footer), `app/[locale]/page.tsx` (placeholder home using primitives)

**Interfaces:**
- Consumes: `NAV_SECTIONS` (Task 5), `Button`, `Container`, `Section` (Task 4), `Link` (Task 3).
- Produces: completed site shell (header + footer + branded placeholder home).

- [ ] **Step 1: Write failing test** `__tests__/footer.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import { Footer } from '@/components/layout/Footer'
test('footer shows registration and a donate CTA', () => {
  render(<Footer />)
  expect(screen.getByText(/611\.510/)).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /^donate/i })).toBeInTheDocument()
})
```

- [ ] **Step 2: Run test → FAIL.** `pnpm test footer` → Expected FAIL.

- [ ] **Step 3: Implement `Footer.tsx`:** closing donate CTA band, Useful links + Policies columns (from `NAV_SECTIONS` + Privacy), social links (Facebook/YouTube/Instagram), charity registration line (`Registered nonprofit · Reg. 611.510 · CIF G93524130`).

- [ ] **Step 4: Run test → PASS.** `pnpm test footer` → Expected PASS.

- [ ] **Step 5: Assemble placeholder home** `app/[locale]/page.tsx`: a branded hero `<Section>` (headline + Donate `Button`) proving tokens/primitives/header/footer render together. Real homepage sections come in Plan 2.

- [ ] **Step 6: Full check + commit + deploy.**

```bash
pnpm test && pnpm build
git add -A && git commit -m "feat: footer + branded placeholder home (site shell complete)"
pnpm dlx vercel deploy
```
Expected: tests + build pass; preview URL renders the branded shell with working nav and footer.

---

## Self-Review (against the spec)

- **Spec §4 architecture** → Tasks 2 (Next/TS/Tailwind/tests), 3 (next-intl). ✓
- **Spec §5 IA** → Task 5 `lib/nav.ts` encodes the full IA. ✓ (pages themselves are Plans 2–6.)
- **Spec §6 homepage** → placeholder only here (Task 6); full sections in Plan 2. Intentional — noted in roadmap.
- **Spec §7 brand** → Task 1 brand board + approval gate; Task 4 tokens. ✓
- **Spec §8 content integrity / malware** → Task 1 Step 1 (assets-only, validate). ✓
- **Spec §10 SEO/preview** → Task 2 noindex robots; full SEO in Plan 6. ✓
- **Donorbox / CMS / page content** → out of scope for Plan 1; Plans 2–4. ✓
- Placeholder scan: brand token *values* are produced by Task 1 at execution (a data-producing task), not left as plan placeholders. No "TODO/handle edge cases" steps remain.
- Type consistency: `NAV_SECTIONS` shape defined in Task 5 and consumed in Task 6; navigation helpers and UI primitive props are named consistently across tasks.

## Roadmap — subsequent plans (written after Plan 1 lands)

2. **CMS + Homepage** — Sanity project, schemas (Story, Appeal, Event, Program, TeamMember, Partner, ImpactStat, Testimonial + singletons), data fetching, and the full Tearfund-pattern homepage (§6 sections 1–11).
3. **About cluster + program pages** — About hub, Who we are, What we do, Our impact, Our team, Financial accountability (83/17), Partners, Contact; Spain + Tanzania program pages.
4. **Donate + Donorbox** — Donate hub, Sponsor a Child (€58), Where your money goes, Ways to give; tiered impact widget deep-linking confirmed Donorbox forms.
5. **Stories / Appeals / Get Involved / Events** — hubs + detail templates, fed by CMS.
6. **SEO/i18n hardening + launch** — metadata/OG/JSON-LD, sitemap, enable indexing, a11y audit, placeholder-data replacement checklist, Spanish content switch-on plan, domain cutover.
