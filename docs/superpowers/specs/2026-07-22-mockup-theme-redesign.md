# Mockup-theme redesign — spec v2

Date: 2026-07-22
Supersedes: 2026-07-22-experience-led-homepage-design.md (the six-chapter build remains in git
history; this spec re-skins and restructures to the client's design-theme mockup).
Decisions: **the mockup is the brief** (sections, copy, numbers, proportions) and the theme is
**sitewide** (header, nav, footer, tokens).

## 1. Visual theme (from mockup)

- Palette: warm cream page (#f3efe6), near-black warm charcoal bands (#0f1620; footer #0b1119),
  gold accent (#c9a45c), ink on cream (#1a2029), muted (#5d6470). Cards on cream are lighter
  cream/white with hairline borders. Gold used for eyebrows, rules, icons, primary buttons.
- Type: Playfair Display for display headlines (with the final hero word in gold italic:
  "Visible."), Lexend stays for body/UI. Eyebrows: small caps, letterspaced, gold.
- Photography: real repo/Sanity photos only (mockup's AI images are placeholders). Dark bands
  blend photos with charcoal gradients.
- No ticker (the AppealTicker is removed sitewide — not present in the mockup).
- Journey rail removed (not in the mockup).

## 2. Header / nav (mockup order → existing routes)

Impact → /about/our-impact · Values in Action → /get-involved/partner · Stories → /stories ·
Events → /events · Charity Shops → /charity-shops (new page) · About → /about ·
Contact → /contact · CTA button "Get Involved" → /get-involved.
Dark charcoal bar, existing CC logo (new circular mark in mockup = open item for client assets),
tagline "Where values become visible" under the wordmark where space allows.

## 3. Homepage sections (mockup copy verbatim)

1. **Hero** (dark): eyebrow COLLECTIVE CALLING; H1 "Where Values Become Visible." with
   "Visible." gold italic; lede "We exist to transform values into meaningful action together
   with communities and businesses."; CTAs "Explore Our Impact" (gold → /about/our-impact) and
   "Discover Values in Action" (outline → /get-involved/partner); "Scroll to discover" cue.
   Photo right, blended (use /images/mission-tanzania.png).
2. **Three Ways We Create Impact** (cream): three cards with photo, circular gold icon, title,
   blurb, "Learn more →": Community (→ /spain), Children & Families (→ /tanzania), Businesses
   (→ /get-involved/partner). Card copy per mockup.
3. **Values In Action band** (dark): eyebrow VALUES IN ACTION; "When values lead, business
   becomes a force for good."; body per mockup; button "Discover VIA" → /get-involved/partner;
   photo right (speaking-event image).
4. **Stories That Inspire** (cream): heading + "Real people. Real journeys. Real impact." +
   "View all stories →"; three story cards from the Sanity stories collection (image, title,
   one-liner, "Read more →").
5. **Our Impact Snapshot** (dark): five stats with gold icons — 10,000+ People Supported,
   150+ Children in Education, 25+ Projects Delivered, 2 Charity Shops, 100+ Business Partners
   (client-authored numbers from the mockup).
6. **Stronger Together** (cream): intro per mockup; partner marks rendered as styled text
   (Drumelia Real Estate, Manifesto Cabinets, Not Just A Gift, Bounce Beach) + a "Your Logo
   Here" slot; "Meet our partners →" → /about/partners.
7. **Get Involved + Charity Shops** (dark): "Get Involved" with Donate / Volunteer / Partner
   icon trio (→ /donate, /get-involved, /get-involved/partner), group photo left; adjacent
   "Visit Our Charity Shops" panel with shop-front treatment → /charity-shops.
8. **Footer** (darkest): columns Explore / About / Get Involved / Contact per mockup; Stay
   Connected socials + newsletter input; legal bar retained (real registration details).

## 4. New page: /charity-shops

Modest elegant page in the new theme: what the shops are, how shopping/donating goods supports
the mission, and contact details for locations/hours (no fabricated addresses — the confirmed
contact channels only). Linked from nav and the homepage band. Included in sitemap.

## 5. Content architecture

Same pattern as before: `HomeContent` v3 in lib/content/home.types.ts, mockup copy verbatim in
home.seed.ts (canonical), Sanity homePage schema mirrors it, mapper falls back per-field to the
seed, production singleton re-seeded. Stories section reuses getStories().

## 6. Out of scope / open items

- New circular logo mark + final brand fonts from client (using existing logo asset meanwhile).
- Newsletter backend: input posts to the same sink the old EmailSignup used if one exists,
  otherwise a mailto-based signup; flag whichever lands.
- Inner-page copy redesigns beyond theme inheritance (tokens/type restyle them automatically).
- ES locale.
