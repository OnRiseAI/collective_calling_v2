# Collective Calling — Website Rebuild Design

**Date:** 2026-06-22
**Owner:** OnRise (OnRiseAI GitHub, OnRise Vercel team)
**Status:** Draft for review

## 1. Summary

Rebuild [collectivecalling.org](https://collectivecalling.org) from scratch as a modern, secure,
photography-forward charity website. The new site **mirrors Tearfund's information architecture,
page layouts, and section-by-section copy patterns** ([tearfund.org](https://www.tearfund.org)),
with all content adapted to Collective Calling's mission, facts, and programs.

This is a clean break from the current site, which is built on WordPress + Elementor + JetEngine and
is **currently infected with malware** (injected redirect scripts visible in page source and the site
map — e.g. obfuscated `popup-settings.php` / `class-page-post.php` payloads). Security is a primary
driver for the rebuild and for moving off WordPress.

## 2. About Collective Calling (the client)

- Christian nonprofit registered in Marbella, Spain. Registration no. **611.510**, CIF **G93524130**.
- Mission: **restore dignity and strengthen families.**
- Two programs / locations:
  - **Spain** — homelessness response, including *Spain's first mobile shower unit* for the homeless community.
  - **Tanzania** — rescue, restore, and reintegrate street-connected children via the *Centre of Hope*
    and *Transitional House*; focus on **family reunification**.
- Ways to help today: **Sponsor a child** (€58/month), **Donate to the homelessness response**,
  **Invite Collective Calling to speak**.
- Faith-forward voice (scripture, e.g. *1 John 4:11*; "our weapon is love").
- Transparency: **83% of operating expenses to programs / 17% admin** (2025); third-party accountability.
- Partners include Rotary Club Guadalmina Marbella and Ayuntamiento de Marbella.
- Events: Annual Gala, Spring Fair, Lunch with Santa.
- Existing giving runs through **Donorbox** (embedded form `giving-41`).
- Social: Facebook, YouTube, Instagram.

## 3. Decisions (confirmed with user)

| Decision | Choice |
|---|---|
| Design fidelity to Tearfund | Copy Tearfund's **structure and UX patterns**, but use **Collective Calling's own brand** (colors, logo, photography). |
| Content basis | Use **Tearfund's page structure and copy as the master template**, then adapt every section to Collective Calling. |
| Tech stack | **Next.js (App Router) + TypeScript + Tailwind**, deployed on **Vercel**. |
| CMS | **Sanity** headless CMS for staff-editable content. |
| Languages | **English first**, with i18n wired from day one; Spanish (`/es`) scaffolded, content added in phase 2. |
| Donations | **Keep Donorbox** (reuse existing account/forms), embedded; plus a Tearfund-style tiered impact widget deep-linking into Donorbox. |
| Brand source | **Derive from the current site** (existing CC logo + look); present a brand board for approval as the first build step. |

## 4. Tech architecture

- **Next.js (App Router) + TypeScript + Tailwind CSS** on **Vercel** (OnRise team; repo under OnRiseAI).
- **Sanity** headless CMS. Staff-editable content types: Story, Appeal/Campaign, Event, Program,
  TeamMember, Partner, ImpactStat, Testimonial, plus singletons for Home, About, Donate page settings.
- **next-intl** i18n from day one. English at `/`, Spanish at `/es` (scaffolded, switched on phase 2).
  All routes locale-aware; internal links via the i18n navigation helper.
- **Donorbox** embeds for all giving (existing forms reused). A custom tiered "impact" donate widget
  styled like Tearfund's (Monthly/Once toggle, suggested amounts with tangible-impact lines) deep-links
  into the appropriate Donorbox form.
- SEO/AEO baseline: per-page metadata, Open Graph, JSON-LD (Organization / NGO + Article for stories),
  sitemap, robots. Technical SEO complete before any production indexing.
- Local working directory: `D:\Projects\collective-calling`.

## 5. Information architecture (Tearfund IA → Collective Calling)

| Tearfund section | Collective Calling equivalent |
|---|---|
| Campaigns | **Appeals** — Spain Homelessness, Tanzania Children, seasonal (Gala, Christmas) |
| Giving | **Donate** — Sponsor a Child (€58/mo), Homelessness Response, Where your money goes, Ways to give |
| Stories | **Stories** — hub + individual stories ("A Life Reclaimed" — Kerodia, Kevin, …) |
| Get Involved | **Get Involved** — Sponsor a child, Fundraise, Events, Invite us to speak, Pray, Partner with us |
| About Us | **About Us** — Who we are, What we do, Our impact, Our team, Financial accountability, Partners, Contact |
| (program pages) | **Spain** and **Tanzania** dedicated program pages |

Additional pages: Home, Contact, Privacy/Policies, email-signup confirmation, 404.

Global nav (proposed): Appeals · Stories · Get Involved · About Us · **Donate** (persistent button) · Search.
Footer: closing donate CTA, Useful links, Policies, social links, charity registration, partner/accreditation logos.

## 6. Homepage (section-by-section: Tearfund pattern → CC adaptation)

1. **Hero** — full-bleed photograph + headline in CC's voice (e.g. *"Answer the call to restore dignity
   and rebuild families"*) + primary Donate CTA. (Tearfund: *"Follow Jesus into the crises the world has forgotten."*)
2. **Impact stat tiles** — three icon stats. CC's real numbers where available; otherwise clearly-marked placeholders.
3. **Appeals cards** — Spain / Tanzania / seasonal, using Tearfund's three-card pattern.
4. **About blurb** — CC mission statement + About CTA. (Tearfund: *"When people are living on the edge,
   we're by their side."*)
5. **Supporter testimonials** — carousel; placeholder quotes until CC supplies real ones.
6. **"See your impact in action"** — nav cards (Appeals, Stories, Get Involved, About, Donate).
7. **"Where your money goes"** — CC's 83% programs / 17% admin split, styled like Tearfund's 86p/14p visual.
8. **Scripture banner** — CC faith element (e.g. 1 John 4:11) in place of Tearfund's poverty statistic.
9. **Inline tiered donate widget** — Monthly/Once toggle, suggested amounts with tangible-impact lines,
   deep-linking into Donorbox.
10. **Trust signals** — CC registration (611.510), partner and accreditation logos.
11. **Email signup + footer** — closing CTA, useful links, policies, socials (FB/YT/IG), charity registration.

## 7. Brand direction

Derive CC's palette and typography from the current site (the white "CC" logo and existing look). The very
first build step produces a **brand board** (color palette, type scale, logo treatment, photography style,
component look) for user approval **before any pages are built**. Aesthetic uses the **frontend-design**
skill to express CC's identity within Tearfund's proven layout patterns — photography-forward, warm,
dignified. We adopt Tearfund's structural discipline, not its blue/white visual identity.

## 8. Content strategy & integrity

- Tearfund's section copy is the **draft scaffold**; every section is rewritten in CC's voice and facts.
- Real CC facts already in hand (programs, €58 sponsorship, 83/17 split, registration number, partners,
  events, scripture, "A Life Reclaimed" stories) are used as-is.
- Where Tearfund states figures CC has not supplied (specific impact numbers, supporter quotes,
  per-amount impact lines), the new site uses **clearly-marked placeholders** pending real data from CC.
  We do not invent facts about a real charity.
- Existing CC photography and the CC logo are harvested from the current site for reuse; the current
  WordPress source is treated as read-only and is never executed locally (malware).

## 9. Out of scope (phase 2+)

- Spanish (`/es`) translated content — structure scaffolded now, content later.
- Custom Stripe checkout (Donorbox remains the payment path).
- Donor dashboard / login / account management.
- E-commerce shop.
- Full blog/news archive migration beyond featured stories.

## 10. Risks & notes

- **Malware on current site:** never run the existing WordPress locally; only scrape rendered content
  and download static assets. Validate downloaded assets before use.
- **Placeholder data:** impact stats, testimonials, and per-amount impact lines must be replaced with
  real CC-supplied data before production launch. Tracked as a launch-blocking checklist item.
- **Donorbox form IDs:** confirm the full set of live Donorbox forms (Area of greatest need, Spain,
  Tanzania, Sponsor a Child) before wiring CTAs.
- **Domain cutover:** `collectivecalling.org` repointing to Vercel is a separate, later step; build and
  review happen on a Vercel preview URL first.
- **SEO:** do not allow production indexing until page-level technical SEO is complete.

## 11. Definition of done (phase 1)

- All IA pages in section 5 exist and are populated (English).
- Homepage matches the section structure in section 6 with CC-adapted content.
- Sanity schemas exist for all editable content types; staff can add/edit Stories, Appeals, Events.
- Donorbox giving works from every relevant CTA.
- Brand board approved and applied consistently.
- Technical SEO baseline complete; responsive across breakpoints; accessible.
- Deployed to a Vercel preview for review (domain cutover handled separately).
