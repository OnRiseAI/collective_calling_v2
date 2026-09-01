import { defineQuery } from 'next-sanity'
import { urlForImage } from '@/sanity/image'
import { HERO_IMAGE_FALLBACK, IMAGE_TEXT_FALLBACK, getSeedVisualPage } from '@/lib/visual-page/seed'
import { validateVisualPage } from '@/lib/visual-page/validate'
import {
  type SanityImageRef,
  type VisualLocale,
  type VisualPageData,
  type VisualPageRenderModel,
  type VisualSection,
  isVisualLocale,
  publishedId,
} from '@/lib/visual-page/types'

export const VISUAL_PAGE_QUERY = defineQuery(`*[_type == "visualPage" && slug.current == $slug && locale == $locale][0]{
  _id,
  _type,
  title,
  "slug": slug.current,
  locale,
  seo{ title, description },
  sections[]{
    _key,
    _type,
    eyebrow,
    heading,
    headline{ lead, accent },
    description,
    body,
    intro,
    alt,
    image,
    imagePosition,
    theme,
    primaryCta{ label, href },
    secondaryCta{ label, href },
    cta{ label, href },
    stats[]{ _key, value, suffix, label }
  }
}`)

function resolveImageUrl(image: SanityImageRef | undefined, fallback: string): string {
  if (!image) return fallback
  return urlForImage(image) ?? fallback
}

export function imageUrlsForPage(page: VisualPageData): Record<string, string> {
  const urls: Record<string, string> = {}
  for (const section of page.sections) {
    if (section._type === 'heroSection') {
      urls[section._key] = resolveImageUrl(section.image, HERO_IMAGE_FALLBACK)
    }
    if (section._type === 'imageTextSection') {
      urls[section._key] = resolveImageUrl(section.image, IMAGE_TEXT_FALLBACK)
    }
  }
  return urls
}

export function mapSanityVisualPage(
  raw: unknown,
  locale: VisualLocale,
): VisualPageData | undefined {
  const result = validateVisualPage(raw)
  if (!result.ok) return undefined
  if (result.value.locale !== locale) return undefined
  return {
    ...result.value,
    _id: publishedId(result.value._id),
  }
}

export function toRenderModel(
  page: VisualPageData,
  isDraft: boolean,
): VisualPageRenderModel {
  return {
    title: page.title,
    slug: page.slug,
    locale: page.locale,
    seo: page.seo,
    sections: page.sections as VisualSection[],
    imageUrls: imageUrlsForPage(page),
    isDraft,
  }
}

export function fallbackRenderModel(locale: string, isDraft: boolean): VisualPageRenderModel {
  const safeLocale: VisualLocale = isVisualLocale(locale) ? locale : 'en'
  return toRenderModel(getSeedVisualPage(safeLocale), isDraft)
}
