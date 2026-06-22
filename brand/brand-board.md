# Collective Calling Brand Board

A brand system for a Christian charity that restores dignity and strengthens families,
working in Spain (homelessness response, Spain's first mobile shower unit, based in Marbella)
and Tanzania (rescuing and reuniting street-connected children through their Centre of Hope).

The brand should feel warm, dignified, hopeful, human, and trustworthy. This board is the
single source of truth for every later page. It was derived directly from Collective Calling's
own assets, not invented from scratch.

---

## 1. Brand rationale: "Dignified warmth"

Three of Collective Calling's own assets set the direction:

1. **The logo mark.** The full logo (seen on the Marbella shower van) is a shower head and a
   heart formed by two embracing figures, one blue and one warm red, beneath a navy
   "COLLECTIVE CALLING" wordmark. So the authentic brand already pairs a blue with a warm,
   human red. The figures embracing is the whole idea: people restored to each other.
2. **The gala poster ("OLE, Step into the Extraordinary").** This is the charity's most
   polished, aspirational asset: a deep midnight-navy night sky lit with warm string lights
   and elegant gold display lettering. It shows where Collective Calling wants to sit: premium,
   warm, celebratory, never cold or clinical.
3. **The field photography.** Tanzania is all warm terracotta earth, dust, and bright smiles.
   Spain is sunlight on a yellow van and real faces. The colour story of the work itself is
   warm.

So instead of the bright primary blue the old WordPress site leaned on, we deepen their own blue
into a **dignified indigo-navy** (premium, trustworthy, calm) and let **warm gold** carry hope
and the sense of occasion, with a **terracotta clay** secondary pulled straight from Tanzanian
soil and the red figure in the logo. Warm ivory paper and a warm near-black keep everything
human rather than corporate.

**Brand constraint honoured:** this palette is deliberately NOT Tearfund's bright blue-on-white
corporate identity. Collective Calling's blue is a deep, warm indigo-navy on warm ivory, with
gold and clay. It is its own brand.

---

## 2. Colour palette

Colours were sampled from Collective Calling's own assets (logo decal, gala poster, Tanzania
photography) and then tuned for a premium feel and for accessible contrast.

| Token       | Hex       | Name              | Drawn from                         | Use |
|-------------|-----------|-------------------|------------------------------------|-----|
| `brand`     | `#1B3A6B` | Dignified Indigo  | Logo blue (#0081E6), deepened      | Primary brand colour. Headers, primary buttons, links, key surfaces, footer. |
| `brandDark` | `#0F2347` | Midnight Navy     | Gala poster night sky (#110C23)    | Deep sections, hero overlays, footer base, hover state of primary buttons. |
| `accent`    | `#C8922A` | Antique Gold      | Gala title gold (#F0E480), deepened | Hope and occasion. Small accents, underlines, icons, donate highlight, focus rings. Decorative or large only, never body text on light. |
| `ink`       | `#1F1B16` | Warm Ink          | Warm near-black                    | Body text and headings on light backgrounds. |
| `paper`     | `#FBF7F0` | Warm Ivory        | Warm off-white                     | Default page background. Softer and warmer than pure white. |
| `muted`     | `#6E6258` | Warm Taupe        | Warm neutral grey                  | Secondary text, captions, meta, borders, disabled states. |

**Supporting secondary (documented for later UI, not a core token):**

| Name        | Hex       | Use |
|-------------|-----------|-----|
| Terracotta Clay | `#B05A38` | Secondary accent for Tanzania-themed sections, tags, and warm call-outs. Drawn from Tanzanian soil and the logo's red figure. |
| Clay Tint   | `#F3E7DC` | Soft warm card / band background. |
| Indigo Tint | `#E7ECF4` | Soft cool card / band background. |

**Accessibility (contrast on warm ivory paper `#FBF7F0`):**

- `ink` 16.0:1, `brandDark` 14.6:1, `brand` 10.6:1, `muted` 5.5:1, clay 4.5:1, all pass WCAG AA.
- White text on `brand` 11.3:1, on `brandDark` 15.5:1, on clay 4.8:1, all pass AA.
- `accent` gold is a decorative and large-element colour (2.6:1 on paper). Never use gold for
  body copy on light backgrounds. For text, use gold only on `brandDark` (large headings or
  labels) where it reads as warm light.

---

## 3. Typography

A warm, characterful serif for display paired with a clean, friendly humanist sans for reading.
This says "established and trustworthy" without feeling corporate, and "human and warm" without
feeling soft or amateur.

- **Headings: Fraunces** (Google Fonts). An old-style serif with optical sizing and gentle
  character. Dignified, editorial, warm. Weights: 400, 500, 600, 9pt-144pt optical range.
  Use Soft / lower optical settings at large sizes for warmth.
- **Body: Mulish** (Google Fonts). A minimalist humanist sans-serif that is highly legible at
  small sizes and calm in long passages. Weights: 400, 500, 600, 700.

```
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Mulish:wght@400;500;600;700&display=swap');
```

### Type scale (1.250 major third, body 18px base)

| Role       | Font     | Size (rem / px)   | Weight | Line height | Notes |
|------------|----------|-------------------|--------|-------------|-------|
| Display    | Fraunces | 4.0rem / 64px     | 500    | 1.05        | Hero headline. text-balance. |
| H1         | Fraunces | 3.0rem / 48px     | 500    | 1.1         | Page title. |
| H2         | Fraunces | 2.25rem / 36px    | 500    | 1.15        | Section heading. |
| H3         | Fraunces | 1.75rem / 28px    | 600    | 1.2         | Sub-section. |
| H4         | Fraunces | 1.375rem / 22px   | 600    | 1.3         | Card title. |
| H5         | Mulish   | 1.125rem / 18px   | 700    | 1.3         | Eyebrow / small heading, uppercase, letter-spacing 0.08em. |
| Body       | Mulish   | 1.125rem / 18px   | 400    | 1.65        | Default reading size. |
| Body small | Mulish   | 1.0rem / 16px     | 400    | 1.6         | Dense areas. |
| Caption    | Mulish   | 0.875rem / 14px   | 500    | 1.5         | Captions, meta, in `muted`. |

Headline rule: apply `text-wrap: balance` and a non-breaking space between the last two words on
H1, H2, H3, and the display headline so there are no orphan words.

---

## 4. Logo treatment

- File: `assets-source/logo/cc-logo.png` (white, transparent, 271 x 86).
- The supplied logo is **white-on-transparent**, so it is placed on a coloured field, never on
  light. Preferred backgrounds: `brand` indigo, `brandDark` midnight navy, or a darkened
  photograph (navy overlay).
- **Clear space:** keep a margin around the logo equal to the height of the "C" in the wordmark
  (roughly the cap height) on all sides. Nothing intrudes into this space.
- **Minimum size:** 120px wide on screen so the mark stays legible.
- **Do not:** recolour it, add a drop shadow, stretch it, rotate it, or place it on a busy or
  light part of a photo. On photos, sit it over a navy gradient or solid band.
- A dark or full-colour version may be commissioned later for light backgrounds; until then,
  on light surfaces use the wordmark set in Fraunces with the indigo + clay heart concept, or
  keep the logo within a navy band.

---

## 5. Photography style

The photography is the soul of this brand. It must always feel like real, documentary moments,
never stock.

- **Real people, real moments.** Candid, warm, hopeful. Faces, hands, eye contact, dignity.
- **Warm light.** Golden-hour and natural daylight. Lean into the existing terracotta earth
  tones and warm skin tones. Avoid cold colour grading.
- **Dignity first.** Show people as people, with agency and joy, not as objects of pity. Favour
  smiles, connection, and action (the shower van in use, a child holding a hand, a packed room
  listening) over staged sadness.
- **Composition.** Generous, editorial crops. Let images breathe. Use the navy overlay
  (`brandDark` at 35-60% with a gradient from the bottom) when text sits over a photo.
- **Treatment.** No heavy filters. A subtle warm tone is fine. Keep grain natural.

---

## 6. Components

Radius base: `0.5rem` (8px). Cards and large surfaces may step up to `0.75rem`; pills/buttons
use `0.5rem` for a calm, grounded feel (not fully rounded, not sharp).

### Buttons

- **Primary:** `brand` indigo background, white text, weight 600, radius 0.5rem, comfortable
  padding (0.85rem 1.6rem). Hover: `brandDark`. Focus: 2px `accent` gold ring with offset.
- **Secondary:** transparent background, 1.5px `brand` indigo border, `brand` text. Hover:
  `brand` background with white text.
- **Ghost / tertiary:** no border, `brand` text, weight 600, with an animated gold underline on
  hover. Used for inline and low-emphasis actions.
- **Donate (special):** the one place gold leads. `accent` gold background on `brandDark`
  contexts, or `brandDark` background with a gold underline accent on light contexts. It should
  always feel like the warmest, most invited action on the page.

### Cards

- Background white or `paper`, 1px border in a warm `muted` tint, radius 0.75rem, soft shadow
  (low, warm, e.g. `0 8px 24px rgba(31,27,22,0.08)`). Optional image top with the same radius.
  Title in Fraunces H4, body in Mulish, meta in `muted` caption. A thin gold or clay top rule
  can flag the programme (gold = general, clay = Tanzania, indigo = Spain).

### Sections

- Alternate warm ivory `paper` and soft tint bands (Indigo Tint / Clay Tint) to create rhythm.
- Deep sections use `brandDark` with white text and gold accents for emphasis and donate moments.
- Eyebrow label (H5, uppercase, gold or clay) sits above each section heading.
- Generous vertical spacing (5-7rem section padding on desktop) for a calm, premium pace.

---

## 7. Voice (for later copy tasks)

Warm, faith-forward, dignified, and direct. Speak about restoring dignity and strengthening
families. Centre the people served with respect. Hopeful, never guilt-driven. Plain, human
language with quiet conviction.

---

*Source assets live in `assets-source/`. Tokens for build live in `brand/design-tokens.json`.
A visual preview for approval lives in `brand/brand-board.html`.*
