import type { Cta, SplitHeading } from '@/lib/content/home.types'
import { SECTION_FIELD_ALLOWLIST } from './registry'
import {
  type CtaSectionData,
  type HeroSectionData,
  type ImageTextSectionData,
  type SanityImageRef,
  type StatsSectionData,
  type VisualPageData,
  type VisualSection,
  type VisualSectionType,
  isVisualSectionType,
  publishedId,
  visualPageId,
} from './types'
import { validateVisualPage } from './validate'

/**
 * Mapper between canonical Sanity visualPage documents and Puck UI state.
 * Puck internals (root zones, puck metadata) are never stored.
 */

export type PuckSectionItem = {
  type: VisualSectionType
  props: Record<string, unknown>
}

export type PuckPageData = {
  root: {
    props: {
      title: string
      seoTitle: string
      seoDescription: string
    }
  }
  content: PuckSectionItem[]
}

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {}
}

function imageProps(image: SanityImageRef | undefined): SanityImageRef | undefined {
  return image
}

function heroToPuck(section: HeroSectionData): PuckSectionItem {
  return {
    type: 'heroSection',
    props: {
      id: section._key,
      eyebrow: section.eyebrow,
      headlineLead: section.headline.lead,
      headlineAccent: section.headline.accent,
      description: section.description,
      image: imageProps(section.image),
      alt: section.alt,
      primaryCtaLabel: section.primaryCta.label,
      primaryCtaHref: section.primaryCta.href,
      secondaryCtaLabel: section.secondaryCta.label,
      secondaryCtaHref: section.secondaryCta.href,
    },
  }
}

function statsToPuck(section: StatsSectionData): PuckSectionItem {
  return {
    type: 'statsSection',
    props: {
      id: section._key,
      eyebrow: section.eyebrow,
      heading: section.heading,
      intro: section.intro,
      stats: section.stats.map((stat) => ({
        _key: stat._key,
        value: stat.value,
        suffix: stat.suffix,
        label: stat.label,
      })),
    },
  }
}

function imageTextToPuck(section: ImageTextSectionData): PuckSectionItem {
  return {
    type: 'imageTextSection',
    props: {
      id: section._key,
      eyebrow: section.eyebrow,
      headlineLead: section.headline.lead,
      headlineAccent: section.headline.accent,
      body: section.body,
      image: imageProps(section.image),
      alt: section.alt,
      ctaLabel: section.cta.label,
      ctaHref: section.cta.href,
      imagePosition: section.imagePosition,
    },
  }
}

function ctaToPuck(section: CtaSectionData): PuckSectionItem {
  return {
    type: 'ctaSection',
    props: {
      id: section._key,
      eyebrow: section.eyebrow,
      headlineLead: section.headline.lead,
      headlineAccent: section.headline.accent,
      body: section.body,
      primaryCtaLabel: section.primaryCta.label,
      primaryCtaHref: section.primaryCta.href,
      secondaryCtaLabel: section.secondaryCta.label,
      secondaryCtaHref: section.secondaryCta.href,
      theme: section.theme,
    },
  }
}

export function sanityToPuck(page: VisualPageData): PuckPageData {
  return {
    root: {
      props: {
        title: page.title,
        seoTitle: page.seo.title,
        seoDescription: page.seo.description,
      },
    },
    content: page.sections.map((section) => {
      if (section._type === 'heroSection') return heroToPuck(section)
      if (section._type === 'statsSection') return statsToPuck(section)
      if (section._type === 'imageTextSection') return imageTextToPuck(section)
      return ctaToPuck(section)
    }),
  }
}

function puckCta(label: unknown, href: unknown): Cta {
  return {
    label: typeof label === 'string' ? label : '',
    href: typeof href === 'string' ? href : '/',
  }
}

function puckHeading(lead: unknown, accent: unknown): SplitHeading {
  return {
    lead: typeof lead === 'string' ? lead : '',
    accent: typeof accent === 'string' ? accent : '',
  }
}

function puckImage(value: unknown): SanityImageRef | undefined {
  const record = asRecord(value)
  const asset = asRecord(record.asset)
  if (record._type === 'image' && asset._type === 'reference' && typeof asset._ref === 'string') {
    return {
      _type: 'image',
      asset: { _type: 'reference', _ref: asset._ref },
    }
  }
  return undefined
}

function puckToSection(item: PuckSectionItem, index: number): Record<string, unknown> | undefined {
  if (!isVisualSectionType(item.type)) return undefined
  const props = asRecord(item.props)
  const key = typeof props.id === 'string' && props.id.length > 0 ? props.id : `${item.type}-${index}`

  if (item.type === 'heroSection') {
    return {
      _type: 'heroSection',
      _key: key,
      eyebrow: props.eyebrow,
      headline: puckHeading(props.headlineLead, props.headlineAccent),
      description: props.description,
      image: puckImage(props.image),
      alt: props.alt,
      primaryCta: puckCta(props.primaryCtaLabel, props.primaryCtaHref),
      secondaryCta: puckCta(props.secondaryCtaLabel, props.secondaryCtaHref),
    }
  }

  if (item.type === 'statsSection') {
    const stats = Array.isArray(props.stats) ? props.stats : []
    return {
      _type: 'statsSection',
      _key: key,
      eyebrow: props.eyebrow,
      heading: props.heading,
      intro: props.intro,
      stats: stats.map((row, statIndex) => {
        const stat = asRecord(row)
        return {
          _key: typeof stat._key === 'string' ? stat._key : `stat-${statIndex}`,
          value: stat.value,
          suffix: stat.suffix,
          label: stat.label,
        }
      }),
    }
  }

  if (item.type === 'imageTextSection') {
    return {
      _type: 'imageTextSection',
      _key: key,
      eyebrow: props.eyebrow,
      headline: puckHeading(props.headlineLead, props.headlineAccent),
      body: props.body,
      image: puckImage(props.image),
      alt: props.alt,
      cta: puckCta(props.ctaLabel, props.ctaHref),
      imagePosition: props.imagePosition,
    }
  }

  return {
    _type: 'ctaSection',
    _key: key,
    eyebrow: props.eyebrow,
    headline: puckHeading(props.headlineLead, props.headlineAccent),
    body: props.body,
    primaryCta: puckCta(props.primaryCtaLabel, props.primaryCtaHref),
    secondaryCta: puckCta(props.secondaryCtaLabel, props.secondaryCtaHref),
    theme: props.theme,
  }
}

export function puckToSanity(input: {
  data: PuckPageData
  locale: VisualPageData['locale']
  slug: string
}): ReturnType<typeof validateVisualPage> {
  const root = asRecord(input.data.root)
  const rootProps = asRecord(root.props)
  const content = Array.isArray(input.data.content) ? input.data.content : []

  const candidate = {
    _id: visualPageId(input.locale, input.slug),
    _type: 'visualPage' as const,
    title: rootProps.title,
    slug: input.slug,
    locale: input.locale,
    seo: {
      title: rootProps.seoTitle,
      description: rootProps.seoDescription,
    },
    sections: content
      .map((item, index) => puckToSection(item as PuckSectionItem, index))
      .filter((section): section is Record<string, unknown> => section !== undefined),
  }

  return validateVisualPage(candidate)
}

export type VisualPageWriteDocument = {
  _id: string
  _type: 'visualPage'
  title: string
  slug: { _type: 'slug'; current: string }
  locale: VisualPageData['locale']
  seo: { _type: 'visualPageSeo'; title: string; description: string }
  sections: Record<string, unknown>[]
}

export function toSanityWriteDocument(page: VisualPageData): VisualPageWriteDocument {
  const id = publishedId(page._id)
  return {
    _id: id,
    _type: page._type,
    title: page.title,
    slug: { _type: 'slug', current: page.slug },
    locale: page.locale,
    seo: {
      _type: 'visualPageSeo',
      title: page.seo.title,
      description: page.seo.description,
    },
    sections: page.sections.map((section) => sectionToSanity(section)),
  }
}

function sectionToSanity(section: VisualSection): Record<string, unknown> {
  const allowed = SECTION_FIELD_ALLOWLIST[section._type]
  const record = section as unknown as Record<string, unknown>
  const next: Record<string, unknown> = {}
  for (const key of allowed) {
    if (key in record) next[key] = record[key]
  }
  return next
}

export function emptyPuckData(title: string): PuckPageData {
  return {
    root: {
      props: {
        title,
        seoTitle: title,
        seoDescription: '',
      },
    },
    content: [],
  }
}
