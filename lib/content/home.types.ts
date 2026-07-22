/**
 * Experience-led homepage content model (spec 2026-07-22).
 *
 * Six chapters mapped to the journey Understanding -> Connection ->
 * Possibility -> Participation. The seed in home.seed.ts is the client's copy
 * verbatim and is canonical; Sanity may override it field by field.
 */

/** The 83/17 split shape shared with /donate and /about/financial-accountability. */
export type MoneySplit = {
  programsPct: number
  adminPct: number
  programsLabel: string
  adminLabel: string
  note: string
}

/** One of the three expressions (branches) in chapter 3. */
export type ExpressionRow = {
  key: 'children-families' | 'community' | 'business'
  eyebrow: string
  heading: string
  belief: string
  body: string
  image: string
  alt: string
  cta: { label: string; href: string }
}

export type HomeContent = {
  hero: {
    headline: string
    text: string[]
    image: string
    alt: string
    primaryCta: { label: string; targetId: string }
    secondaryCta: { label: string; targetId: string }
  }
  philosophy: {
    headline: string
    body: string[]
    pullLine: string
  }
  expressions: {
    headline: string
    intro: string
    credo: string[]
    rows: ExpressionRow[]
  }
  possible: {
    headline: string
    intro: string
    moments: string[]
    outro: string
  }
  impact: {
    headline: string
    intro: string[]
    moments: string[]
    outro: string
    cta: { label: string; href: string }
  }
  invitation: {
    headline: string
    intro: string
    bring: string[]
    outro: string
    cta: { label: string; href: string }
  }
}
