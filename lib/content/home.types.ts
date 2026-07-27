/**
 * Homepage content model for the Collective Calling v2 design
 * ("Collective Calling v2.dc.html").
 *
 * Nine bands, in page order: hero, philosophy, expressions, Values In Action,
 * impact, stories, impact call-to-action, partners, closing. The seed in
 * home.seed.ts is the design's copy verbatim and is canonical; Sanity may
 * override it field by field.
 */

/**
 * The shape version of the homepage content model.
 *
 * The CMS document merges into the seed field by field, which means a document
 * written for an older design can quietly push its copy into a newer layout
 * through whatever field names the two shapes happen to share. The document
 * carries this number so it can be recognised: a homePage document that does
 * not declare the current version is ignored wholesale and the page renders the
 * seed. Bump it whenever the model changes in a way that reuses old field names
 * for new meaning, and re-run scripts/seed-sanity.ts to restamp the document.
 */
export const HOME_CONTENT_VERSION = 2

/** A labelled link. */
export type Cta = {
  label: string
  href: string
}

/**
 * A headline split at the phrase the design sets in gold italic. `lead` renders
 * in the page's ink colour, `accent` in gold italic immediately after it.
 */
export type SplitHeading = {
  lead: string
  accent: string
}

/** The 83/17 split shape shared with /donate and /about/financial-accountability. */
export type MoneySplit = {
  programsPct: number
  adminPct: number
  programsLabel: string
  adminLabel: string
  note: string
}

/**
 * One of the three expressions of the mission. `index` is the numeral shown
 * beside the title — these are three parallel expressions rather than steps, so
 * the numeral is a positional marker for the staggered grid, not a sequence.
 */
export type ExpressionCard = {
  key: 'children-families' | 'community' | 'business'
  index: string
  title: string
  /** One-line italic statement of what this expression does. */
  tagline: string
  body: string
  image: string
  alt: string
  cta: Cta
}

/** One story card. The stories band renders one feature card and two stacked. */
export type StoryCard = {
  title: string
  blurb: string
  image: string
  alt: string
  href: string
}

/**
 * One impact figure. `value` is numeric so the band can count up to it on
 * scroll; `suffix` is the gold character that trails the number ("+" or none).
 */
export type ImpactStat = {
  key: 'people' | 'education' | 'projects' | 'shops' | 'partners'
  value: number
  suffix: string
  label: string
}

/**
 * One partner mark. A mark with a `logo` renders that image at 52px square; the
 * rest render as type, either letterspaced caps or the display serif in italic,
 * exactly as the design sets each one.
 */
export type PartnerMark = {
  name: string
  logo?: string
  style?: 'caps' | 'italic'
}

export type HomeContent = {
  hero: {
    eyebrow: string
    heading: SplitHeading
    lede: string
    image: string
    alt: string
    primaryCta: Cta
    secondaryCta: Cta
  }
  philosophy: {
    eyebrow: string
    heading: SplitHeading
    body: string
    /** The closing line, set in the display serif rather than the body face. */
    pullquote: string
  }
  expressions: {
    eyebrow: string
    heading: string
    intro: string
    cards: ExpressionCard[]
  }
  via: {
    eyebrow: string
    heading: SplitHeading
    body: string
    cta: Cta
    image: string
    alt: string
  }
  impact: {
    eyebrow: string
    heading: string
    intro: string
    stats: ImpactStat[]
  }
  stories: {
    eyebrow: string
    heading: SplitHeading
    viewAll: Cta
    feature: StoryCard
    cards: StoryCard[]
  }
  impactCta: {
    eyebrow: string
    heading: SplitHeading
    cta: Cta
    image: string
    alt: string
  }
  partners: {
    label: string
    marks: PartnerMark[]
    /** The design's open invitation where a partner logo would sit. */
    logoSlot: Cta
  }
  closing: {
    eyebrow: string
    heading: SplitHeading
    body: string
    primaryCta: Cta
    secondaryCta: Cta
  }
}
