# Collective Calling — Homepage faith expression (heart-cross motifs)

Date: 2026-06-24
Status: Approved design, in implementation

## Context

Collective Calling is a Christian charity (homelessness response in Spain; reuniting
street-connected children in Tanzania). The homepage's faith signal is currently thin and
sits mostly at the bottom (the rotating `ScriptureBanner`). The client wants the Christian
motivation expressed more clearly but tastefully — "like Tearfund names Jesus" — and has
supplied two real brush-stroke **heart + cross** motifs in CC's exact palette (one navy/teal,
one gold) to use sparingly on the page.

This supersedes an earlier draft that planned an AI-generated atmospheric background image;
that image was never created and is dropped in favour of the real heart assets (more subtle,
on-brand, no generation/slop risk).

## Goals

1. State the Christian motivation plainly, high on the page, naming Jesus (Tearfund-style).
2. Use the supplied heart-cross motifs as the faith touch — sparingly (two placements).

## Non-goals

- No CMS/Sanity plumbing — copy is inline, like `ImpactStatBand`/`ScriptureBanner`.
- No fabricated photos of people praying/worshipping.
- Not excessive: the hearts appear in exactly two reverent bands, one heart each.
- Commits stay scoped to this feature; the in-progress retheme tree is committed separately.

## Assets

- Sources (cream background `~#D8D9BA`, 2000×2000): `D:\Downloads\Collective Calling\
  yellow_heart.png` (gold) and `blue_heart.png` (navy/teal).
- Processed with PIL: cream background keyed to transparent, trimmed to the motif's alpha
  bounding box, resized to ~800px on the long edge, original brush colours kept.
- Saved to: `public/images/heart-cross-gold.png` and `public/images/heart-cross-navy.png`.

## Design

### 1. `FaithBand` component (new)

- **File:** `components/home/FaithBand.tsx` — server component, no props, copy inline.
- **Placement:** `app/[locale]/page.tsx`, immediately after `<MissionBlurb />`, before
  `<Testimonials />`.
- **Visual:** solid midnight-navy band (`Section tone="dark"`), white text, centered
  `Container size="prose"`. The **gold** heart-cross (`/images/heart-cross-gold.png`) sits
  as a centered focal motif at the top (decorative, `alt=""`, ~`h-20`/`h-24`, via
  `next/image` with explicit width/height). Then: gold eyebrow + short rule, `h2` (white,
  `text-balance` + `noOrphan`), body paragraph, scripture `<cite>` line, ghost "Who we
  are →" link to `/about/who-we-are`.
- **Copy (inline):**
  - Eyebrow: `WHY WE DO THIS`
  - Heading: `Because he first loved us`
  - Body: `Collective Calling is a Christian charity. We restore dignity and rebuild
    families because we follow Jesus — who met people in their need and taught us to love
    our neighbour as ourselves. Every shower, every meal, every child brought home is that
    love made visible.` (MUST contain "Christian" and "Jesus".)
  - Scripture: `"We love because he first loved us." — 1 John 4:19`
  - Link: `Who we are →` → `/about/who-we-are`

### 2. Scripture band watermark

- **File:** `components/home/ScriptureBanner.tsx` — light edit.
- Replace the faint decorative quote glyph's role with the **navy** heart-cross
  (`/images/heart-cross-navy.png`) as a large, faint (`opacity ~8–12%`), `aria-hidden`
  watermark behind the verse (`z-0`, verse stays `z-10`). Keep verses, motion, dots
  unchanged. (Keep or remove the existing big quote glyph — prefer replacing it so the band
  isn't busy.)

## Accessibility

- Heart images are decorative: `alt=""` / `aria-hidden`.
- White-on-navy copy ≈ 15.5:1 (AA). Gold used only for eyebrow/rule/label/focus ring.
- Hero owns the page `h1`; the faith band heading is an `h2`.

## Testing (TDD)

- `__tests__/home/faith.test.tsx` (rendered in `NextIntlClientProvider`): asserts the
  heading "Because he first loved us"; body names "Christian" and "Jesus"; scripture
  reference "1 John 4:19"; a link named /who we are/i → `/about/who-we-are`.
- ScriptureBanner change is `aria-hidden`/decorative — existing scripture tests must still
  pass unchanged.
- Pre-existing unrelated baseline failure `__tests__/home/testimonials.test.tsx` stays out
  of scope.

## Done when

- `FaithBand` renders after the mission section on a navy band, gold heart-cross centerpiece,
  naming Jesus + the 1 John 4:19 line.
- The scripture band shows the faint navy heart-cross watermark, verses/motion unchanged.
- Two transparent heart PNGs exist in `public/images/`; faith tests pass; rest of home suite
  green except the known testimonials baseline.
