# Visual website editor — implementation progress

Phase 1 isolated proof of concept for website editing infrastructure.
This is not a multi-tenant builder and not a second CMS.

## Repository / content identity warning

The repository `OnRiseAI/collective_calling_v2` is the **Collective Calling** charity site (Christian charity, Spain + Tanzania programmes, cream/navy/gold v3 design). It is **not** an OnRiseAI marketing site.

- Live pages, charity branding, routes, and existing Sanity documents are left untouched in Phase 1.
- Editor infrastructure is built on an isolated `visualPage` document and `/editor-test` route.
- No rebrand, no homepage migration, no deletion of existing schemas.

Local checkout: `D:\Projects\collective-calling` (remote `v2` = `OnRiseAI/collective_calling_v2`, currently at `cfc8977` on `main`). Work branch: `feat/visual-website-editor`.

## Repo assessment

| Item | Finding |
| --- | --- |
| Next.js | 16.2.9 (App Router). Bundled docs in `node_modules/next/dist/docs/`. Middleware still named `middleware.ts` (Next 16 prefers `proxy.ts`; not renamed in Phase 1). |
| React | 19.2.4 |
| Package manager | pnpm (`pnpm-lock.yaml`). Scripts: `dev`, `build`, `lint`, `test` (vitest), `test:e2e` (Playwright), `typegen`. |
| TypeScript | strict, `any` avoided |
| App Router | `app/[locale]/...` plus top-level `app/studio/[[...tool]]`. No root `app/layout.tsx` (locale layout and studio layout each provide html/body). |
| Route groups | `(site)` wraps homepage + leftover inner pages with SiteHeader/SiteFooter. Editorial pages sit outside that group. |
| Locales | next-intl v4.13.0. `en` at `/`, `es` at `/es`. `i18n/routing.ts`, `i18n/request.ts`, plugin in `next.config.ts`. |
| Sanity | `next-sanity` 13.1.1, `sanity` 6.1.0. Project id from env (`cpkoqe2k` in launch runbook). Dataset `production` (public-read). API version `2025-01-01`. |
| Homepage schema | Singleton `homePage` with **fixed object fields** (hero, philosophy, expressions, via, impact, stories, impactCta, partners, closing). Not a safe freeform block array. |
| Other documents | `story`, `appealEntry`, `eventItem` |
| Query layer | `lib/content/home.ts` → GROQ `lib/sanity/home.query.ts` with per-field seed fallback. `useCdn: false`. No draft perspective. |
| Draft / preview | **None** before Phase 1. No Presentation tool. No `draftMode`. `SANITY_API_READ_TOKEN` unset by design in the launch runbook. |
| Studio | Embedded at `/studio` via `next-sanity/studio`. Auth is Sanity login. Plugins: structure + Vision. |
| Images | Sanity assets + `@sanity/image-url`. `next/image` allowlists `cdn.sanity.io`. |
| Roles | Sanity project members. No custom role schema in-repo. |
| Animations | Framer Motion (`FadeIn`, `Reveal`) |
| Forms | Newsletter/contact are mailto / existing embeds (Donorbox). Not editable. |
| Analytics | None wired in app code reviewed. |
| SEO | `lib/seo.ts`, JSON-LD, env-gated robots (`NEXT_PUBLIC_SITE_INDEXABLE`). |
| Tests | Vitest + Testing Library under `__tests__/`. Playwright under `e2e/` (prod server on 3100, workers:1). |
| Middleware | next-intl + welcome-gate cookie. Excludes `api`, `studio`, static files. |
| Caching | Homepage is static at build. No on-demand revalidation yet. |
| Env | `.env.example`: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_SITE_INDEXABLE`, `NEXT_PUBLIC_SANITY_*`, `SANITY_API_READ_TOKEN`. Local `.env.local` has the three public Sanity keys only. |

## Architecture decisions (frozen)

1. **Sanity remains source of truth.** New document type `visualPage`. Existing `homePage` and live documents are not migrated.
2. **Stored data is data only.** Allowlisted section objects with copy, images, CTAs, order, and controlled variants. No JS/HTML/scripts/className/raw CSS.
3. **Mapper is mandatory.** Sanity `visualPage` ↔ Puck UI state, and Sanity `visualPage` → production props. Puck internals are never persisted as the source of truth.
4. **Production renderer reads Sanity** (or the isolated seed when Sanity is missing). It never reads raw Puck documents.
5. **Users never edit source, schemas, env, Git, or Vercel** for routine content changes.
6. **Public visitors see published content only.** Drafts require authorised Studio session and/or Next.js draft mode plus a read token.

## Canonical data contract — `visualPage`

Minimum fields: `title`, `slug`, `locale`, `seo`, `sections[]`.

```json
{
  "_id": "visualPage-en-editor-test",
  "_type": "visualPage",
  "title": "Visual editor test",
  "slug": { "current": "editor-test" },
  "locale": "en",
  "seo": { "title": "Visual editor test", "description": "Isolated editor proof of concept." },
  "sections": [
    {
      "_key": "hero-1",
      "_type": "heroSection",
      "eyebrow": "EDITOR TEST",
      "headline": { "lead": "Editor test", "accent": "page." },
      "description": "Isolated proof of the visual editor. This is not a live Collective Calling page.",
      "alt": "Placeholder photograph",
      "primaryCta": { "label": "Start your journey", "href": "/journey" },
      "secondaryCta": { "label": "See what's possible", "href": "/stories" }
    }
  ]
}
```

Not acceptable: `component` functions, `className`, raw HTML, env access, fetch calls, or any executable expression.

Identity: one document per `(locale, slug)`. Phase 1 slug is locked to `editor-test`.

## Section allowlist

Only types that already have a real production component, plus the minimum for the test page:

| `_type` | Production component | Editable |
| --- | --- | --- |
| `heroSection` | `HeroSection` | eyebrow, headline, description, image, alt, primary/secondary CTA |
| `statsSection` | `ImpactStats` | eyebrow, heading, intro, stats (value, suffix, label) |
| `imageTextSection` | `ViaBand` (thin position wrapper) | eyebrow, heading, body, image, alt, CTA, `imagePosition` left\|right |
| `ctaSection` | `ClosingBand` | eyebrow, heading, body, primary/secondary CTA, `theme` default\|dark |

Not editable: form endpoints, tracking, className, raw CSS/HTML, React source, queries.

## Puck vs Presentation

**Decision: use `@puckeditor/core` as a custom Sanity Studio tool named Website Editor.**

- Puck 0.23 lists React 19 as a peer and Next.js 16 recipes exist. Installed React is 19.2.4; Next is 16.2.9. No downgrade.
- Embed path: `/studio` tool, same Sanity login. No second admin app, no second auth.
- Puck is UI only. Save writes Sanity-shaped `visualPage` after validation.
- Presentation is the fallback if embedding proves unsafe. Not needed at decision time.
- Studio nav: Content (structure, including Visual pages for history) \| Website Editor \| Vision (existing). Native Sanity asset picker covers assets. No extra media plugin in Phase 1.

## Preview / publish / cache

- Drafts: Sanity `drafts.{id}` via the authenticated Studio client. No second draft database.
- Studio canvas is the authorised visual preview (Puck). Desktop / tablet / mobile via Puck viewports.
- Next.js `draftMode` route is implemented for site preview. Enabling it requires `SANITY_PREVIEW_SECRET`. Reading drafts on the Next server requires `SANITY_API_READ_TOKEN`.
- Local `.env.local` currently has **neither**. Site-level draft preview is therefore **blocked** until those credentials exist. Public published rendering and Studio editing still work (dataset is public-read; Studio writes use the logged-in Sanity session).
- Publish: Sanity publish action from the Website Editor, then `revalidatePath` for `/editor-test` and `/es/editor-test` only.
- Version history: native Sanity document history on `visualPage` (exposed under Content → Visual pages). No extra version database.

## Security notes

- No write token in the browser. Studio uses the editor's Sanity session.
- `SANITY_API_READ_TOKEN`, preview secret, and any later model keys stay server-side.
- Allowlist + URL policy: `/`, relative site paths, `https://`, `http://`, `mailto:`, `tel:`. Block `javascript:`, `data:`, `vbscript:`, `file:`, `blob:`.
- Unknown section types rejected at save, preview, publish, and render.
- `/editor-test` is noindex and omitted from the sitemap.
- `dangerouslySetInnerHTML` is not used.

## Tests / build

- `pnpm lint`: pass (pre-existing unused-var warnings only)
- `pnpm test`: 286 passed, including new visual-page coverage
- `pnpm build`: pass. Isolated route `/[locale]/editor-test` is present. Studio and draft/revalidate APIs compile.
- Playwright `e2e/editor-test.spec.ts`: pass. Public `/editor-test` renders one h1 and does not show a draft banner.

## Credentials / external blockers

- [x] Sanity public project id/dataset present in local `.env.local` (public reads).
- [ ] `SANITY_API_READ_TOKEN` missing: Next.js cannot fetch draft documents. Studio still can, because it is authenticated.
- [ ] `SANITY_PREVIEW_SECRET` missing: `/api/draft` fails closed. Studio canvas preview still works.
- [ ] Seed of the isolated document requires `pnpm exec sanity exec scripts/seed-visual-page.ts --with-user-token` (interactive Sanity login). Until that runs, `/editor-test` renders the in-code seed.
- [ ] AI key: not used. Phase 2 only.

Without the two missing env vars, this is what still works: schemas, mapper, registry, Website Editor UI, public renderer, validation, tests, build. Studio save/publish works for a logged-in Sanity user. Next.js site-level draft preview of unpublished documents does not.

## Checkboxes

### Audit and contract
- [x] Inspect repo, AGENTS.md, stack, Sanity, routes
- [x] Record charity-site identity warning
- [x] Freeze `visualPage` contract, mapper, allowlist
- [x] Decide Puck (compatible) over Presentation

### Implementation
- [x] `visualPage` schema + section objects
- [x] Validation, URL policy, mapper, registry
- [x] Isolated `/editor-test` (locale-aware) renderer
- [x] Website Editor Studio tool (Puck)
- [x] Draft save via Sanity drafts
- [x] Publish via Sanity + targeted revalidation
- [x] Sanity image field (upload / replace / alt)
- [x] Draft mode API (fails closed without secret/token)
- [x] Seed script for isolated test documents
- [x] Typegen
- [x] Tests: allowlist, dangerous URLs, mapper round-trip, draft vs published, publish validation
- [x] `pnpm lint`
- [x] `pnpm test`
- [x] `pnpm build`

### Explicitly out of Phase 1
- [ ] Live homepage / page migration
- [ ] SEO expansion beyond the test page
- [ ] Nav/footer editing
- [ ] AI editing
- [ ] Multi-site / tenants / Supabase

## Errors fixed

- Sanity schema extract cannot parse JSX in `.ts`. Plugin entry is JSX-free and lazy-loads the editor.
- Sanity v6 does not export `useToast`. Editor uses an inline notice instead.
- Puck `Config` generics rejected typed `render` params. Render functions accept Puck props and narrow locally.
- `createOrReplace` required an explicit `_type` on the write payload.
- `@next/next/no-html-link-for-pages` on the draft-exit control: use a button that assigns `/api/draft/disable`.
- Pre-existing `react-hooks/set-state-in-effect` on `SiteHeader` blocked `pnpm lint`. Solid state is now derived from tone + scroll.

## Remaining work

Phase 1 code is in `feat/visual-website-editor`. Manual Studio proof still needed after:

1. Set `SANITY_PREVIEW_SECRET` (and `SANITY_API_READ_TOKEN` for Next.js draft reads).
2. Run `pnpm exec sanity exec scripts/seed-visual-page.ts --with-user-token`.
3. Open `/studio` → Website Editor, edit the isolated page, save draft, refresh, publish, confirm `/editor-test` updates.

Do not migrate live Collective Calling pages until that proof is done.
