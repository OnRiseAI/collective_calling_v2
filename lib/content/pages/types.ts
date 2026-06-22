/**
 * Content types for Collective Calling's About and programme pages.
 *
 * Every later page in this plan (About, programme hubs, contact, and the like)
 * composes its content from these shapes, and the shared page toolkit
 * (PageHero, Prose, SubNavCards) and the page-level sections consume them. The
 * types are intentionally plain data so content authors and tests stay simple.
 */

/**
 * The header band for a page. Drives the single `<h1>`, a gold eyebrow above
 * it, an optional lede, and an optional background photograph. When `image` is
 * present the hero is photographic with a navy gradient overlay for legibility;
 * otherwise it is a solid brand band.
 */
export type PageHero = {
  eyebrow: string
  title: string
  lede?: string
  image?: string
  alt?: string
}

/** A single named value or principle, shown in About-style value grids. */
export type ValueItem = {
  title: string
  body: string
}

/** One person on a team or board, with an optional portrait. */
export type TeamMember = {
  name: string
  role: string
  bio: string
  image?: string
}

/** A labelled cluster of people (for example "Trustees" or "Spain team"). */
export type TeamGroup = {
  label: string
  members: TeamMember[]
}

/** A partner or supporting organisation, optionally linked, with an optional logo. */
export type Partner = {
  name: string
  blurb?: string
  href?: string
  logo?: string
}

/** Contact details for a contact page or footer block. */
export type ContactInfo = {
  phone: string
  phoneHref: string
  address: string
  email: string
}

/** A single "how you can help" item on a programme page. */
export type ProgramHelpItem = {
  title: string
  body: string
}

/** A block of long-form copy with an optional heading, for narrative sections. */
export type RichBlock = {
  heading?: string
  body: string
}
