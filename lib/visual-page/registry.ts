import type { VisualSectionType } from './types'
import { VISUAL_SECTION_TYPES } from './types'

/**
 * Developer-owned mapping from stored section type to production component.
 * Editors may only set the listed fields. Unknown types are rejected.
 */

export const SECTION_FIELD_ALLOWLIST: Record<VisualSectionType, readonly string[]> = {
  heroSection: [
    '_type',
    '_key',
    'eyebrow',
    'headline',
    'description',
    'image',
    'alt',
    'primaryCta',
    'secondaryCta',
  ],
  statsSection: ['_type', '_key', 'eyebrow', 'heading', 'intro', 'stats'],
  imageTextSection: [
    '_type',
    '_key',
    'eyebrow',
    'headline',
    'body',
    'image',
    'alt',
    'cta',
    'imagePosition',
  ],
  ctaSection: [
    '_type',
    '_key',
    'eyebrow',
    'headline',
    'body',
    'primaryCta',
    'secondaryCta',
    'theme',
  ],
}

export const PAGE_FIELD_ALLOWLIST = [
  '_id',
  '_type',
  '_rev',
  'title',
  'slug',
  'locale',
  'seo',
  'sections',
] as const

export const DENIED_EDITOR_KEYS = [
  'className',
  'style',
  'dangerouslySetInnerHTML',
  'component',
  'render',
  'html',
  'script',
  'children',
  'query',
  'endpoint',
  'token',
  'env',
] as const

export function isRegisteredSectionType(type: string): type is VisualSectionType {
  return (VISUAL_SECTION_TYPES as readonly string[]).includes(type)
}

export const SECTION_LABELS: Record<VisualSectionType, string> = {
  heroSection: 'Hero',
  statsSection: 'Stats',
  imageTextSection: 'Image and text',
  ctaSection: 'Call to action',
}
