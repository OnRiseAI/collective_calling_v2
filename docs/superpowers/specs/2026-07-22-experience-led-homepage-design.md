# Experience-led homepage redesign — design spec

Date: 2026-07-22
Status: approved in brainstorming; pending user review of this document
Scope decision: **Homepage + narrative layer** (inner pages keep their structure; tone edits only where listed)

## 1. Vision (client brief, summarised)

Move away from the traditional charity-website feel toward an experience-led journey:
**Understanding → Connection → Possibility → Participation.**
Roots before branches: communicate the philosophy first; the projects (Children & Families,
Community, Values In Action) are expressions of one purpose. The visitor should leave asking
"Where do I fit into this?" — not "They need something from me."

Tone: inspirational not transactional, invitational not demanding, human not institutional,
purpose-driven not charity-driven.

## 2. Decisions made

- **Scope:** homepage rebuilt around the client's six-section copy; narrative-layer tone edits
  on a short list of inner pages (§7). Everything else untouched.
- **Concept:** *Editorial chapters* — each section a full-viewport chapter with its own pacing,
  plus a fixed journey rail on desktop tracking the four stages.
- **Faith expression:** follow the client's new copy as written. No scripture or explicit faith
  references on the homepage; faith content continues to live on the about and pray pages.
  (FaithBand and ScriptureBanner are removed from the homepage.)
- **Values In Action CTA target:** `/get-involved/partner`, with that page's copy reframed
  around Values In Action. No new page in this phase.
- **Copy:** the client's homepage content is used **verbatim** as the seed. We do not rewrite it.

## 3. Journey mapping and page structure

| Stage | Chapters |
|---|---|
| Understanding | 1 Hero, 2 Our Philosophy |
| Connection | 3 How It Comes To Life |
| Possibility | 4 See What's Possible, 5 Impact |
| Participation | 6 Start Your Journey |

**Journey rail:** slim fixed element, left edge, desktop only (hidden below `lg`). Shows the
four stage names with a dot that fills as the viewport crosses into each stage
(IntersectionObserver). Clicking a stage smooth-scrolls to its first chapter. It is wayfinding,
not navigation; it must never overlap content (reserved gutter at `lg+`).

### Chapter treatments

1. **Hero — "A Life Beyond Ourselves".** `min-h-dvh` (dvh, not vh — mobile viewport-bar lesson
   already in the repo). One hero-grade photograph, warm-dark scrim, headline set very large.
   CTAs: primary **Start Your Journey** → smooth-scroll to Chapter 6; secondary
   **See What's Possible** → smooth-scroll to Chapter 4. Subtle scroll cue. Hero remains the
   page `h1` and the LCP element (renders immediately, no reveal animation).
2. **Our Philosophy — "Everyone Has Something To Give".** Image-free, light, quiet. Copy at
   reading width (~65ch). The line "stories are changed — including our own" pulled out as
   large accent-underlined text.
3. **How It Comes To Life — "Different Expressions. One Shared Purpose."** Opens with the
   shared-belief credo lines, then the three expressions as full-width alternating rows
   (photo one side, copy the other — explicitly NOT a 3-card grid):
   - Children & Families (Tanzania imagery) — button **See Their Stories** → `/stories`
   - Community (Spain / Mobile Shower Unit imagery) — button **Explore Community Impact** → `/spain`
   - Business (Values In Action) — button **Explore Values In Action** → `/get-involved/partner`
4. **See What's Possible — "Every Story Begins With Someone Choosing To Respond".** The three
   "Someone…" lines as a slow sequential reveal, then 2–3 story pulls from Sanity (image +
   one-line quote + link to the story) presented as moments, not cards. Reuses the existing
   stories query; excludes placeholder stories.
5. **Impact — "What Happens When We Come Together".** The five "A person shares… " lines as a
   rhythmic stacked sequence revealing on scroll. Typography is the visual: no stat counters,
   no donut chart. Button **See The Impact** → `/about/our-impact`.
6. **Start Your Journey — "Find Your Place In The Story".** Warm accent-toned closing chapter,
   the four "Some people bring…" lines, single CTA **Start Your Journey** → `/get-involved`.

### Removed from the homepage

AppealsCards, FaithBand, Testimonials, ExploreCards, ImpactStatBand, WhereMoneyGoes,
ScriptureBanner, DonateWidget, TrustSignals, EmailSignup — the charity-template stack.
Donate remains reachable via header nav (unchanged) and footer. Trust/financial content
continues to live on `/donate` and `/about/financial-accountability`.

## 4. Visual language

- **Type:** Lexend for headings and body with the Caveat script accent — the site's
  established token system (`--font-heading`/`--font-body` in `app/globals.css`); we do not
  introduce new fonts. Chapter headlines clamp
  ~2.5–4.5rem, sentence case, generous line-height, large inter-chapter whitespace.
  No caps font-black, no gradient text, no glows, no icon pills.
- **Colour:** existing CC palette; tonal arc across the page — warm-dark hero → light
  chapters 2–5 → warm accent-washed closing chapter. `#f3b007` reserved for pulled lines
  and CTAs (~6 uses total on the page).
- **Imagery:** full-bleed or half-width only; never thumbnail grids. Faces and moments over
  buildings and groups. Curation pass over `public/images` + Sanity story images to select a
  hero-grade shot; if none holds up at full viewport, flag to client rather than ship weak.
- **Headlines:** no orphan words — `text-balance` + NBSP on last two words (existing rule).

## 5. Motion

Extend the existing `Reveal` component; no animation library. Per-chapter fade/translate
reveals; staggered line reveals (~120 ms apart) in chapters 4–5; rail dot transitions.
All CSS/IntersectionObserver, `prefers-reduced-motion` safe, no scroll-jacking — native
scroll feel throughout.

## 6. Technical architecture

- **Components:** new `components/home/` chapter set — `HeroChapter`, `PhilosophyChapter`,
  `ExpressionsChapter`, `PossibleChapter`, `ImpactChapter`, `InvitationChapter`,
  `JourneyRail`. Old homepage section components and their content types deleted.
- **Content layer:** new `HomeContent` shape in `lib/content/` with the client's copy as
  `SEED_HOME` (source of truth, verbatim). Sanity `home` singleton schema updated to match
  the six-section shape; `HOME_QUERY` + `mapSanityHome` rewritten; seeding script updated;
  Sanity typegen re-run. Fallback behaviour unchanged: any CMS failure renders the seed.
- **i18n:** EN only, matching current state; ES remains phase 2 scaffolding.
- **SEO:** `h1` = hero headline; one `h2` per chapter; metadata continues to pull the hero
  headline; no sitemap/robots/JSON-LD changes.
- **Tests:** homepage unit tests rewritten against the new chapters; e2e smoke updated for
  new section landmarks and CTA scroll targets.
- **Deployment:** no change — lands on `main` pre-launch; the Plan 8 Vercel runbook is
  unaffected.

## 7. Narrative layer (inner-page edits)

- `/get-involved` — intro reframed from "ways to support us" to "find your place in the
  story"; becomes the Participation landing.
- `/get-involved/partner` — reframed around Values In Action as the business expression.
- `/donate` — intro line softened to invitation language; donation mechanics untouched.
- Footer — gains the one-line philosophy statement ("A life lived beyond ourselves creates
  lasting change."). Header nav labels unchanged.
- All other pages untouched.

## 8. Out of scope

- Dedicated `/values-in-action` page (possible later phase).
- ES locale content.
- Full-site IA restructure.
- Deployment/launch steps (Plan 8 runbook, unchanged).
- Rewriting client copy.

## 9. Open items to flag to client (non-blocking)

- Hero photography: if the curation pass finds no image strong enough for a full-viewport
  hero, request new photography.
- Email signup was removed from the homepage; confirm whether it should reappear elsewhere
  (e.g. footer) before launch.
