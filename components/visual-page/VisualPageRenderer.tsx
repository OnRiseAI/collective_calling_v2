import * as React from 'react'
import { HeroSection } from '@/components/home/HeroSection'
import { ImpactStats } from '@/components/home/ImpactStats'
import { ClosingBand } from '@/components/home/ClosingBand'
import { ImageTextSection } from '@/components/visual-page/ImageTextSection'
import { HERO_IMAGE_FALLBACK } from '@/lib/visual-page/seed'
import type { VisualPageRenderModel, VisualSection } from '@/lib/visual-page/types'
import type { ImpactStat } from '@/lib/content/home.types'

const STAT_KEYS: ImpactStat['key'][] = ['people', 'education', 'projects', 'shops', 'partners']

function SectionView({
  section,
  imageUrls,
}: {
  section: VisualSection
  imageUrls: Record<string, string>
}): React.JSX.Element | null {
  if (section._type === 'heroSection') {
    return (
      <HeroSection
        content={{
          eyebrow: section.eyebrow,
          heading: section.headline,
          lede: section.description,
          image: imageUrls[section._key] ?? HERO_IMAGE_FALLBACK,
          alt: section.alt,
          primaryCta: section.primaryCta,
          secondaryCta: section.secondaryCta,
        }}
      />
    )
  }

  if (section._type === 'statsSection') {
    return (
      <ImpactStats
        content={{
          eyebrow: section.eyebrow,
          heading: section.heading,
          intro: section.intro,
          stats: section.stats.map((stat, index) => ({
            key: STAT_KEYS[index] ?? 'people',
            value: stat.value,
            suffix: stat.suffix,
            label: stat.label,
          })),
        }}
      />
    )
  }

  if (section._type === 'imageTextSection') {
    return (
      <ImageTextSection
        section={section}
        imageUrl={imageUrls[section._key] ?? HERO_IMAGE_FALLBACK}
      />
    )
  }

  if (section._type === 'ctaSection') {
    return (
      <ClosingBand
        content={{
          eyebrow: section.eyebrow,
          heading: section.headline,
          body: section.body,
          primaryCta: section.primaryCta,
          secondaryCta: section.secondaryCta,
        }}
      />
    )
  }

  return null
}

export function VisualPageRenderer({
  page,
}: {
  page: VisualPageRenderModel
}): React.JSX.Element {
  return (
    <div className="bg-paper font-body text-[16px] leading-normal text-ink">
      {page.sections.map((section) => (
        <SectionView key={section._key} section={section} imageUrls={page.imageUrls} />
      ))}
    </div>
  )
}
