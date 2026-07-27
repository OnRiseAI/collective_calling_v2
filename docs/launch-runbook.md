# Collective Calling — Launch Runbook (Plan 8: deploy + domain + indexing)

Owner split: steps marked **[YOU]** need the OnRise Vercel dashboard / Sanity dashboard / domain DNS access (the agent cannot reach the OnRise Vercel team; this is a VisQuanta-authenticated session and Collective Calling is an OnRise project, kept separate). Steps marked **[AGENT]** the assistant can do/verify.

Account: **OnRise** (repo `OnRiseAI/cc`, OnRise Vercel team, e.g. `jon-onriseais-projects`). Do NOT deploy this under VisQuanta.

## Exact environment variables

Set these in the Vercel project Settings -> Environment Variables.

| Variable | Value | Environments |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `cpkoqe2k` | Production, Preview, Development |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` | Production, Preview, Development |
| `NEXT_PUBLIC_SANITY_API_VERSION` | `2025-01-01` | Production, Preview, Development |
| `NEXT_PUBLIC_SITE_URL` | `https://collectivecalling.org` | Production, Preview, Development |
| `NEXT_PUBLIC_SITE_INDEXABLE` | `false` (initially, EVERYWHERE) | Production, Preview, Development |
| `SANITY_API_READ_TOKEN` | leave UNSET | n/a (code does not use it; public reads only) |

The site stays non-indexable while `NEXT_PUBLIC_SITE_INDEXABLE` is anything other than the exact string `true`. You flip it to `true` for Production ONLY as the final launch step (Step 6), after the domain is verified.

## Steps

### 1. [YOU] Connect the repo to Vercel
- In the OnRise Vercel team, "Add New... Project" -> Import `OnRiseAI/cc`.
- Framework preset: Next.js (auto-detected). Root directory: repo root. Build command/output: defaults.
- Do NOT deploy yet if it prompts before env vars are set; otherwise the first deploy will run noindex anyway (safe).

### 2. [YOU] Set the env vars
- Add all rows from the table above. Keep `NEXT_PUBLIC_SITE_INDEXABLE=false` for now in every environment.

### 3. [YOU] Add Sanity CORS origins (so the embedded /studio works in the browser)
- sanity.io/manage -> project `cpkoqe2k` -> API -> CORS origins -> add:
  - the Vercel preview URL (e.g. `https://cc-<hash>-<team>.vercel.app`), and later
  - `https://collectivecalling.org` and `https://www.collectivecalling.org`
- Allow credentials: yes (needed for the Studio login). Server-side page reads do not need CORS; this is only for the browser Studio.

### 4. [YOU] Trigger a preview deploy
- Push/redeploy. Vercel builds `main`. Give the agent the resulting preview URL.

### 5. [AGENT] Verify the preview deployment
The agent will fetch the preview URL and confirm:
- pages render (home, /stories, /appeals, /events, /get-involved/*, /donate, /about/*);
- `/robots.txt` shows `Disallow: /` (because INDEXABLE=false) and NO sitemap line yet;
- `/sitemap.xml` exists and lists real routes + the Caleb story + real appeals, with NO `/es` and NO placeholder slugs;
- `<head>` has per-page title/description, Open Graph, Twitter, canonical (absolute, en);
- Organization JSON-LD sitewide + Article JSON-LD on a story page;
- `/studio` loads (after the CORS origin is added).

### 6. [YOU] Domain cutover (moves off the malware WordPress host)
- In the Vercel project: Settings -> Domains -> add `collectivecalling.org` and `www.collectivecalling.org`.
- At the domain's DNS host, set the records Vercel shows (apex A / ALIAS + `www` CNAME). This replaces the old infected WordPress host as the live origin.
- Wait for SSL to issue and the domain to show "Valid Configuration".
- Decommission / secure the old WordPress host afterward so the malware origin is gone.

### 7. [YOU] Flip indexing ON (production only) — the actual launch
- Set `NEXT_PUBLIC_SITE_INDEXABLE=true` for the PRODUCTION environment only.
- Redeploy production.

### 8. [AGENT] Post-launch verification
- Confirm `https://collectivecalling.org/robots.txt` now `Allow: /` with the `Sitemap:` line, `/studio` and `/api` disallowed.
- Confirm production page `<head>` has `robots: index,follow` (no noindex), canonicals point at the apex domain.
- Confirm `/sitemap.xml` resolves on the real domain.

### 9. [YOU] Search Console
- Add the property in Google Search Console, verify ownership, submit `https://collectivecalling.org/sitemap.xml`, and request indexing of the homepage + key pages.

## Notes / gotchas
- **The `homePage` document needs re-seeding for the v2 homepage.** The v2 content model is a different shape, and the document in `cpkoqe2k/production` is still the previous one. `mapSanityHome` only trusts a document stamped with the current `HOME_CONTENT_VERSION` (see `lib/content/home.types.ts`), so until it is re-seeded the homepage renders the in-code seed — correct copy, correct photography, but **not editable in Studio**. To hand editing back to staff, run the seed script per its header (`npx sanity exec scripts/seed-sanity.ts --with-user-token`, needs a Sanity login with write access), then `rm -rf .next` and redeploy. Skipping this is safe; it just leaves the homepage code-managed.
- Homepage content comes from Sanity (project `cpkoqe2k`). Stories/Appeals/Events render from the in-code seed unless/until staff add them in Studio (read layer prefers Sanity, falls back to seed). No content blocker for launch.
- The flagged placeholders (3 homepage testimonials, the `your-story-here` story, Spring Fair + Lunch with Santa dates) are still placeholders. They are excluded from the sitemap. Replacing them with real CC content is Plan 10, not a launch blocker, but the homepage testimonials render as flagged placeholders publicly until then. Decide whether to hide them before flipping indexing.
- `NEXT_PUBLIC_SITE_URL` is baked at build time (it is a `NEXT_PUBLIC_*` var); changing it requires a redeploy.
- If a real branded logo / 1200x630 OG image becomes available, drop it in and update `SITE.ogImage` / the org `logo` (currently the hero group photo) before heavy social sharing.
