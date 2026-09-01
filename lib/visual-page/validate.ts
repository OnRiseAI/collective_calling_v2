import type { Cta, SplitHeading } from '@/lib/content/home.types'
import { DENIED_EDITOR_KEYS, SECTION_FIELD_ALLOWLIST } from './registry'
import { assertSafeHref } from './urls'
import {
  CTA_THEMES,
  IMAGE_POSITIONS,
  PHASE1_TEST_SLUG,
  VISUAL_PAGE_TYPE,
  type CtaSectionData,
  type CtaTheme,
  type HeroSectionData,
  type ImagePosition,
  type ImageTextSectionData,
  type SanityImageRef,
  type StatsSectionData,
  type ValidationIssue,
  type ValidationResult,
  type VisualLocale,
  type VisualPageData,
  type VisualSection,
  type VisualStatItem,
  isVisualLocale,
  isVisualSectionType,
  publishedId,
  visualPageId,
} from './types'

const MAX = {
  title: 120,
  eyebrow: 80,
  heading: 200,
  body: 2000,
  alt: 200,
  label: 80,
  seoTitle: 120,
  seoDescription: 300,
  stats: 6,
  sections: 20,
} as const

const EXECUTABLE = /^\s*(function\b|=>|eval\s*\(|new\s+Function\b)/
const SCRIPTISH = /<\s*script|javascript:|vbscript:|data:\s*text\/html/i

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {}
}

function push(issues: ValidationIssue[], path: string, message: string): void {
  issues.push({ path, message })
}

function requireString(value: unknown, path: string, issues: ValidationIssue[], max: number): string {
  if (typeof value !== 'string') {
    push(issues, path, 'must be a string')
    return ''
  }
  if (value.length > max) {
    push(issues, path, `must be at most ${max} characters`)
  }
  if (EXECUTABLE.test(value) || SCRIPTISH.test(value)) {
    push(issues, path, 'contains disallowed executable content')
  }
  return value
}

function requireCta(value: unknown, path: string, issues: ValidationIssue[]): Cta {
  const record = asRecord(value)
  const label = requireString(record.label, `${path}.label`, issues, MAX.label)
  const href = requireString(record.href, `${path}.href`, issues, 500)
  const hrefIssue = assertSafeHref(href, `${path}.href`)
  if (hrefIssue) push(issues, `${path}.href`, hrefIssue)
  return { label, href }
}

function requireHeading(value: unknown, path: string, issues: ValidationIssue[]): SplitHeading {
  const record = asRecord(value)
  return {
    lead: requireString(record.lead, `${path}.lead`, issues, MAX.heading),
    accent: requireString(record.accent, `${path}.accent`, issues, MAX.heading),
  }
}

function optionalImage(value: unknown, path: string, issues: ValidationIssue[]): SanityImageRef | undefined {
  if (value == null) return undefined
  const record = asRecord(value)
  const asset = asRecord(record.asset)
  const ref = asset._ref
  if (record._type !== 'image' || asset._type !== 'reference' || typeof ref !== 'string' || ref.length === 0) {
    push(issues, path, 'must be a Sanity image reference')
    return undefined
  }
  if (!ref.startsWith('image-')) {
    push(issues, path, 'must reference a Sanity image asset')
    return undefined
  }
  return {
    _type: 'image',
    asset: { _type: 'reference', _ref: ref },
  }
}

function rejectDeniedKeys(record: Record<string, unknown>, path: string, issues: ValidationIssue[]): void {
  for (const key of Object.keys(record)) {
    if ((DENIED_EDITOR_KEYS as readonly string[]).includes(key)) {
      push(issues, `${path}.${key}`, 'field is not editable')
    }
  }
}

function pickAllowed<T extends Record<string, unknown>>(
  record: T,
  allowed: readonly string[],
): Record<string, unknown> {
  const next: Record<string, unknown> = {}
  for (const key of allowed) {
    if (key in record) next[key] = record[key]
  }
  return next
}

function requireKey(value: unknown, path: string, issues: ValidationIssue[], fallback: string): string {
  if (typeof value === 'string' && value.length > 0 && value.length <= 80) return value
  if (typeof value !== 'string' || value.length === 0) return fallback
  push(issues, path, 'invalid section key')
  return fallback
}

function parseHero(raw: Record<string, unknown>, path: string, issues: ValidationIssue[]): HeroSectionData {
  rejectDeniedKeys(raw, path, issues)
  const picked = pickAllowed(raw, SECTION_FIELD_ALLOWLIST.heroSection)
  return {
    _type: 'heroSection',
    _key: requireKey(picked._key, `${path}._key`, issues, 'hero'),
    eyebrow: requireString(picked.eyebrow, `${path}.eyebrow`, issues, MAX.eyebrow),
    headline: requireHeading(picked.headline, `${path}.headline`, issues),
    description: requireString(picked.description, `${path}.description`, issues, MAX.body),
    image: optionalImage(picked.image, `${path}.image`, issues),
    alt: requireString(picked.alt, `${path}.alt`, issues, MAX.alt),
    primaryCta: requireCta(picked.primaryCta, `${path}.primaryCta`, issues),
    secondaryCta: requireCta(picked.secondaryCta, `${path}.secondaryCta`, issues),
  }
}

function parseStats(raw: Record<string, unknown>, path: string, issues: ValidationIssue[]): StatsSectionData {
  rejectDeniedKeys(raw, path, issues)
  const picked = pickAllowed(raw, SECTION_FIELD_ALLOWLIST.statsSection)
  const statsRaw = Array.isArray(picked.stats) ? picked.stats : []
  if (statsRaw.length > MAX.stats) {
    push(issues, `${path}.stats`, `at most ${MAX.stats} stats are allowed`)
  }
  const stats: VisualStatItem[] = statsRaw.slice(0, MAX.stats).map((item, index) => {
    const row = asRecord(item)
    const value = row.value
    if (typeof value !== 'number' || !Number.isFinite(value) || value < 0 || value > 1_000_000_000) {
      push(issues, `${path}.stats.${index}.value`, 'must be a finite number')
    }
    return {
      _key: requireKey(row._key, `${path}.stats.${index}._key`, issues, `stat-${index}`),
      value: typeof value === 'number' && Number.isFinite(value) ? value : 0,
      suffix: requireString(row.suffix ?? '', `${path}.stats.${index}.suffix`, issues, 8),
      label: requireString(row.label, `${path}.stats.${index}.label`, issues, MAX.label),
    }
  })
  return {
    _type: 'statsSection',
    _key: requireKey(picked._key, `${path}._key`, issues, 'stats'),
    eyebrow: requireString(picked.eyebrow, `${path}.eyebrow`, issues, MAX.eyebrow),
    heading: requireString(picked.heading, `${path}.heading`, issues, MAX.heading),
    intro: requireString(picked.intro, `${path}.intro`, issues, MAX.body),
    stats,
  }
}

function parseImageText(
  raw: Record<string, unknown>,
  path: string,
  issues: ValidationIssue[],
): ImageTextSectionData {
  rejectDeniedKeys(raw, path, issues)
  const picked = pickAllowed(raw, SECTION_FIELD_ALLOWLIST.imageTextSection)
  const position = picked.imagePosition
  if (position !== undefined && !(IMAGE_POSITIONS as readonly string[]).includes(String(position))) {
    push(issues, `${path}.imagePosition`, 'must be left or right')
  }
  return {
    _type: 'imageTextSection',
    _key: requireKey(picked._key, `${path}._key`, issues, 'image-text'),
    eyebrow: requireString(picked.eyebrow, `${path}.eyebrow`, issues, MAX.eyebrow),
    headline: requireHeading(picked.headline, `${path}.headline`, issues),
    body: requireString(picked.body, `${path}.body`, issues, MAX.body),
    image: optionalImage(picked.image, `${path}.image`, issues),
    alt: requireString(picked.alt, `${path}.alt`, issues, MAX.alt),
    cta: requireCta(picked.cta, `${path}.cta`, issues),
    imagePosition: (IMAGE_POSITIONS as readonly string[]).includes(String(position))
      ? (position as ImagePosition)
      : 'left',
  }
}

function parseCta(raw: Record<string, unknown>, path: string, issues: ValidationIssue[]): CtaSectionData {
  rejectDeniedKeys(raw, path, issues)
  const picked = pickAllowed(raw, SECTION_FIELD_ALLOWLIST.ctaSection)
  const theme = picked.theme
  if (theme !== undefined && !(CTA_THEMES as readonly string[]).includes(String(theme))) {
    push(issues, `${path}.theme`, 'must be default or dark')
  }
  return {
    _type: 'ctaSection',
    _key: requireKey(picked._key, `${path}._key`, issues, 'cta'),
    eyebrow: requireString(picked.eyebrow, `${path}.eyebrow`, issues, MAX.eyebrow),
    headline: requireHeading(picked.headline, `${path}.headline`, issues),
    body: requireString(picked.body, `${path}.body`, issues, MAX.body),
    primaryCta: requireCta(picked.primaryCta, `${path}.primaryCta`, issues),
    secondaryCta: requireCta(picked.secondaryCta, `${path}.secondaryCta`, issues),
    theme: (CTA_THEMES as readonly string[]).includes(String(theme)) ? (theme as CtaTheme) : 'dark',
  }
}

function parseSection(value: unknown, path: string, issues: ValidationIssue[]): VisualSection | undefined {
  const raw = asRecord(value)
  const type = raw._type
  if (typeof type !== 'string' || !isVisualSectionType(type)) {
    push(issues, `${path}._type`, 'unknown section type is not allowed')
    return undefined
  }
  if (type === 'heroSection') return parseHero(raw, path, issues)
  if (type === 'statsSection') return parseStats(raw, path, issues)
  if (type === 'imageTextSection') return parseImageText(raw, path, issues)
  return parseCta(raw, path, issues)
}

export function validateVisualPage(input: unknown): ValidationResult {
  const issues: ValidationIssue[] = []
  const raw = asRecord(input)
  rejectDeniedKeys(raw, 'page', issues)

  const localeValue = raw.locale
  const localeStr = typeof localeValue === 'string' ? localeValue : ''
  if (!isVisualLocale(localeStr)) {
    push(issues, 'locale', 'must be en or es')
  }
  const locale: VisualLocale = isVisualLocale(localeStr) ? localeStr : 'en'

  const slugRecord = asRecord(raw.slug)
  const slug =
    typeof raw.slug === 'string'
      ? raw.slug
      : typeof slugRecord.current === 'string'
        ? slugRecord.current
        : ''
  if (slug !== PHASE1_TEST_SLUG) {
    push(issues, 'slug', `Phase 1 only allows the isolated slug "${PHASE1_TEST_SLUG}"`)
  }

  const title = requireString(raw.title, 'title', issues, MAX.title)
  const seoRaw = asRecord(raw.seo)
  const seo = {
    title: requireString(seoRaw.title ?? title, 'seo.title', issues, MAX.seoTitle),
    description: requireString(seoRaw.description ?? '', 'seo.description', issues, MAX.seoDescription),
  }

  const sectionsRaw = Array.isArray(raw.sections) ? raw.sections : []
  if (sectionsRaw.length > MAX.sections) {
    push(issues, 'sections', `at most ${MAX.sections} sections are allowed`)
  }

  const sections: VisualSection[] = []
  const keys = new Set<string>()
  for (let index = 0; index < Math.min(sectionsRaw.length, MAX.sections); index += 1) {
    const parsed = parseSection(sectionsRaw[index], `sections.${index}`, issues)
    if (!parsed) continue
    let key = parsed._key
    if (keys.has(key)) {
      key = `${key}-${index}`
    }
    keys.add(key)
    sections.push({ ...parsed, _key: key })
  }

  const idRaw = typeof raw._id === 'string' ? publishedId(raw._id) : visualPageId(locale, slug || PHASE1_TEST_SLUG)
  const expectedId = visualPageId(locale, PHASE1_TEST_SLUG)
  if (idRaw !== expectedId) {
    push(issues, '_id', 'document id must match locale and editor-test slug')
  }

  if (raw._type !== undefined && raw._type !== VISUAL_PAGE_TYPE) {
    push(issues, '_type', `must be ${VISUAL_PAGE_TYPE}`)
  }

  const value: VisualPageData = {
    _id: expectedId,
    _type: VISUAL_PAGE_TYPE,
    title,
    slug: PHASE1_TEST_SLUG,
    locale,
    seo,
    sections,
  }

  if (issues.length > 0) return { ok: false, issues }
  return { ok: true, value }
}

export function issuesToMessage(issues: ValidationIssue[]): string {
  return issues.map((issue) => `${issue.path}: ${issue.message}`).join('; ')
}
