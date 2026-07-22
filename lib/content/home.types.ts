/**
 * Homepage content model for the design-theme mockup (spec 2026-07-22 v2).
 *
 * Eight sections mirroring the client's mockup. The seed in home.seed.ts is the
 * mockup's copy verbatim and is canonical; Sanity may override it field by field.
 */

/** The 83/17 split shape shared with /donate and /about/financial-accountability. */
export type MoneySplit = {
  programsPct: number
  adminPct: number
  programsLabel: string
  adminLabel: string
  note: string
}

/** One of the three "ways we create impact" cards. */
export type WayCard = {
  key: 'community' | 'children-families' | 'businesses'
  title: string
  body: string
  image: string
  alt: string
  href: string
}

/** One impact-snapshot stat. */
export type SnapshotStat = {
  icon: 'people' | 'education' | 'projects' | 'shop' | 'partners'
  value: string
  label: string
}

/** One Get Involved action in the closing band. */
export type InvolveAction = {
  icon: 'donate' | 'volunteer' | 'partner'
  title: string
  blurb: string
  href: string
}

export type HomeContent = {
  hero: {
    eyebrow: string
    /** Headline with the final accent word split out for the gold-italic treatment. */
    headlineLead: string
    headlineAccent: string
    lede: string
    image: string
    alt: string
    primaryCta: { label: string; href: string }
    secondaryCta: { label: string; href: string }
    scrollCue: string
  }
  ways: {
    heading: string
    cards: WayCard[]
  }
  via: {
    eyebrow: string
    heading: string
    body: string
    cta: { label: string; href: string }
    image: string
    alt: string
  }
  storiesIntro: {
    heading: string
    subline: string
    viewAll: { label: string; href: string }
  }
  snapshot: {
    heading: string
    stats: SnapshotStat[]
  }
  partners: {
    heading: string
    body: string
    names: string[]
    logoSlot: string
    cta: { label: string; href: string }
  }
  involve: {
    heading: string
    body: string
    actions: InvolveAction[]
    image: string
    alt: string
    shops: {
      heading: string
      body: string
      cta: { label: string; href: string }
    }
  }
}
