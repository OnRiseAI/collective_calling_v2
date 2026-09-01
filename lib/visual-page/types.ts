import type { Cta, SplitHeading } from '@/lib/content/home.types'

/**
 * Canonical visual page contract. Sanity documents of type `visualPage` are
 * the source of truth. Puck UI state is derived from this shape and must be
 * mapped back to it before any write.
 */

export const VISUAL_PAGE_TYPE = 'visualPage' as const

export const VISUAL_SECTION_TYPES = [
  'heroSection',
  'statsSection',
  'imageTextSection',
  'ctaSection',
] as const

export type VisualSectionType = (typeof VISUAL_SECTION_TYPES)[number]

export const VISUAL_LOCALES = ['en', 'es'] as const
export type VisualLocale = (typeof VISUAL_LOCALES)[number]

export const PHASE1_TEST_SLUG = 'editor-test'

export const IMAGE_POSITIONS = ['left', 'right'] as const
export type ImagePosition = (typeof IMAGE_POSITIONS)[number]

export const CTA_THEMES = ['default', 'dark'] as const
export type CtaTheme = (typeof CTA_THEMES)[number]

export type SanityImageRef = {
  _type: 'image'
  asset: {
    _type: 'reference'
    _ref: string
  }
}

export type VisualSeo = {
  title: string
  description: string
}

export type VisualStatItem = {
  _key: string
  value: number
  suffix: string
  label: string
}

export type HeroSectionData = {
  _type: 'heroSection'
  _key: string
  eyebrow: string
  headline: SplitHeading
  description: string
  image?: SanityImageRef
  alt: string
  primaryCta: Cta
  secondaryCta: Cta
}

export type StatsSectionData = {
  _type: 'statsSection'
  _key: string
  eyebrow: string
  heading: string
  intro: string
  stats: VisualStatItem[]
}

export type ImageTextSectionData = {
  _type: 'imageTextSection'
  _key: string
  eyebrow: string
  headline: SplitHeading
  body: string
  image?: SanityImageRef
  alt: string
  cta: Cta
  imagePosition: ImagePosition
}

export type CtaSectionData = {
  _type: 'ctaSection'
  _key: string
  eyebrow: string
  headline: SplitHeading
  body: string
  primaryCta: Cta
  secondaryCta: Cta
  theme: CtaTheme
}

export type VisualSection =
  | HeroSectionData
  | StatsSectionData
  | ImageTextSectionData
  | CtaSectionData

export type VisualPageData = {
  _id: string
  _type: 'visualPage'
  title: string
  slug: string
  locale: VisualLocale
  seo: VisualSeo
  sections: VisualSection[]
}

export type VisualPageRenderModel = {
  title: string
  slug: string
  locale: VisualLocale
  seo: VisualSeo
  sections: VisualSection[]
  imageUrls: Record<string, string>
  isDraft: boolean
}

export type ValidationIssue = {
  path: string
  message: string
}

export type ValidationResult =
  | { ok: true; value: VisualPageData }
  | { ok: false; issues: ValidationIssue[] }

export function isVisualSectionType(value: string): value is VisualSectionType {
  return (VISUAL_SECTION_TYPES as readonly string[]).includes(value)
}

export function isVisualLocale(value: string): value is VisualLocale {
  return (VISUAL_LOCALES as readonly string[]).includes(value)
}

export function visualPageId(locale: VisualLocale, slug: string): string {
  return `visualPage-${locale}-${slug}`
}

export function draftId(id: string): string {
  return id.startsWith('drafts.') ? id : `drafts.${id}`
}

export function publishedId(id: string): string {
  return id.startsWith('drafts.') ? id.slice('drafts.'.length) : id
}
