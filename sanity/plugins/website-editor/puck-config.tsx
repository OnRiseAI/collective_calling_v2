'use client'

import * as React from 'react'
import type { Config } from '@puckeditor/core'
import { HeroSection } from '@/components/home/HeroSection'
import { ImpactStats } from '@/components/home/ImpactStats'
import { ClosingBand } from '@/components/home/ClosingBand'
import { ImageTextSection } from '@/components/visual-page/ImageTextSection'
import { SanityImageField } from './SanityImageField'
import { urlForImage } from '@/sanity/image'
import { HERO_IMAGE_FALLBACK, IMAGE_TEXT_FALLBACK } from '@/lib/visual-page/seed'
import type { ImagePosition, SanityImageRef } from '@/lib/visual-page/types'
import type { ImpactStat } from '@/lib/content/home.types'

const STAT_KEYS: ImpactStat['key'][] = ['people', 'education', 'projects', 'shops', 'partners']

const previewShellStyle: React.CSSProperties = {
  ['--font-instrument-serif' as string]: 'Georgia, "Times New Roman", serif',
  ['--font-figtree' as string]: 'system-ui, sans-serif',
}

function PreviewShell({ children }: { children: React.ReactNode }): React.JSX.Element {
  return (
    <div
      className="website-editor-preview bg-paper font-body text-[16px] leading-normal text-ink"
      style={previewShellStyle}
    >
      {children}
    </div>
  )
}

function imageUrl(image: SanityImageRef | undefined, fallback: string): string {
  return (image ? urlForImage(image) : undefined) ?? fallback
}

type HeroProps = {
  eyebrow: string
  headlineLead: string
  headlineAccent: string
  description: string
  image?: SanityImageRef
  alt: string
  primaryCtaLabel: string
  primaryCtaHref: string
  secondaryCtaLabel: string
  secondaryCtaHref: string
}

type StatsProps = {
  eyebrow: string
  heading: string
  intro: string
  stats: Array<{ _key?: string; value: number; suffix: string; label: string }>
}

type ImageTextProps = {
  eyebrow: string
  headlineLead: string
  headlineAccent: string
  body: string
  image?: SanityImageRef
  alt: string
  ctaLabel: string
  ctaHref: string
  imagePosition: ImagePosition
}

type CtaProps = {
  eyebrow: string
  headlineLead: string
  headlineAccent: string
  body: string
  primaryCtaLabel: string
  primaryCtaHref: string
  secondaryCtaLabel: string
  secondaryCtaHref: string
  theme: 'default' | 'dark'
}

export const visualEditorConfig = {
  root: {
    fields: {
      title: { type: 'text', label: 'Page title' },
      seoTitle: { type: 'text', label: 'SEO title' },
      seoDescription: { type: 'textarea', label: 'SEO description' },
    },
    defaultProps: {
      title: 'Visual editor test',
      seoTitle: 'Visual editor test',
      seoDescription: 'Isolated proof of the visual editor.',
    },
  },
  categories: {
    sections: {
      title: 'Sections',
      components: ['heroSection', 'statsSection', 'imageTextSection', 'ctaSection'],
    },
  },
  components: {
    heroSection: {
      label: 'Hero',
      fields: {
        eyebrow: { type: 'text', label: 'Eyebrow' },
        headlineLead: { type: 'text', label: 'Headline' },
        headlineAccent: { type: 'text', label: 'Headline accent' },
        description: { type: 'textarea', label: 'Description' },
        image: {
          type: 'custom',
          label: 'Photograph',
          render: ({ value, onChange, readOnly }) => (
            <SanityImageField value={value} onChange={onChange} readOnly={readOnly} />
          ),
        },
        alt: { type: 'text', label: 'Alt text' },
        primaryCtaLabel: { type: 'text', label: 'Primary button label' },
        primaryCtaHref: { type: 'text', label: 'Primary button URL' },
        secondaryCtaLabel: { type: 'text', label: 'Secondary button label' },
        secondaryCtaHref: { type: 'text', label: 'Secondary button URL' },
      },
      defaultProps: {
        eyebrow: 'EDITOR TEST',
        headlineLead: 'Editor test',
        headlineAccent: 'page.',
        description: 'Isolated proof of the visual editor.',
        alt: 'Placeholder photograph',
        primaryCtaLabel: 'Start your journey',
        primaryCtaHref: '/journey',
        secondaryCtaLabel: "See what's possible",
        secondaryCtaHref: '/stories',
      } satisfies HeroProps,
      render: (props) => {
        const hero = props as unknown as HeroProps
        return (
          <PreviewShell>
            <HeroSection
              content={{
                eyebrow: hero.eyebrow,
                heading: { lead: hero.headlineLead, accent: hero.headlineAccent },
                lede: hero.description,
                image: imageUrl(hero.image, HERO_IMAGE_FALLBACK),
                alt: hero.alt,
                primaryCta: { label: hero.primaryCtaLabel, href: hero.primaryCtaHref },
                secondaryCta: { label: hero.secondaryCtaLabel, href: hero.secondaryCtaHref },
              }}
            />
          </PreviewShell>
        )
      },
    },
    statsSection: {
      label: 'Stats',
      fields: {
        eyebrow: { type: 'text', label: 'Eyebrow' },
        heading: { type: 'text', label: 'Heading' },
        intro: { type: 'textarea', label: 'Intro' },
        stats: {
          type: 'array',
          label: 'Figures',
          max: 6,
          getItemSummary: (item: { label?: string }) => item.label || 'Stat',
          arrayFields: {
            value: { type: 'number', label: 'Figure' },
            suffix: { type: 'text', label: 'Suffix' },
            label: { type: 'text', label: 'Label' },
          },
          defaultItemProps: { value: 0, suffix: '', label: 'Label' },
        },
      },
      defaultProps: {
        eyebrow: 'PLACEHOLDER FIGURES',
        heading: 'These numbers exist only on the test page',
        intro: 'Add, remove, or reorder this band in the Website Editor.',
        stats: [{ value: 1, suffix: '', label: 'Isolated test route' }],
      } satisfies StatsProps,
      render: (props) => {
        const stats = props as unknown as StatsProps
        return (
        <PreviewShell>
          <ImpactStats
            content={{
              eyebrow: stats.eyebrow,
              heading: stats.heading,
              intro: stats.intro,
              stats: (stats.stats ?? []).map((stat, index) => ({
                key: STAT_KEYS[index] ?? 'people',
                value: Number(stat.value) || 0,
                suffix: stat.suffix ?? '',
                label: stat.label ?? '',
              })),
            }}
          />
        </PreviewShell>
        )
      },
    },
    imageTextSection: {
      label: 'Image and text',
      fields: {
        eyebrow: { type: 'text', label: 'Eyebrow' },
        headlineLead: { type: 'text', label: 'Headline' },
        headlineAccent: { type: 'text', label: 'Headline accent' },
        body: { type: 'textarea', label: 'Body' },
        image: {
          type: 'custom',
          label: 'Photograph',
          render: ({ value, onChange, readOnly }) => (
            <SanityImageField value={value} onChange={onChange} readOnly={readOnly} />
          ),
        },
        alt: { type: 'text', label: 'Alt text' },
        ctaLabel: { type: 'text', label: 'Button label' },
        ctaHref: { type: 'text', label: 'Button URL' },
        imagePosition: {
          type: 'radio',
          label: 'Image position',
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Right', value: 'right' },
          ],
        },
      },
      defaultProps: {
        eyebrow: 'IMAGE AND TEXT',
        headlineLead: 'Approved image',
        headlineAccent: 'and copy.',
        body: 'Replace the photograph from Sanity assets. This band is not on the live homepage.',
        alt: 'Placeholder photograph',
        ctaLabel: 'See what we do',
        ctaHref: '/what-we-do',
        imagePosition: 'left',
      } satisfies ImageTextProps,
      render: (props) => {
        const block = props as unknown as ImageTextProps
        return (
        <PreviewShell>
          <ImageTextSection
            section={{
              _type: 'imageTextSection',
              _key: 'preview',
              eyebrow: block.eyebrow,
              headline: { lead: block.headlineLead, accent: block.headlineAccent },
              body: block.body,
              image: block.image,
              alt: block.alt,
              cta: { label: block.ctaLabel, href: block.ctaHref },
              imagePosition: block.imagePosition === 'right' ? 'right' : 'left',
            }}
            imageUrl={imageUrl(block.image, IMAGE_TEXT_FALLBACK)}
          />
        </PreviewShell>
        )
      },
    },
    ctaSection: {
      label: 'Call to action',
      fields: {
        eyebrow: { type: 'text', label: 'Eyebrow' },
        headlineLead: { type: 'text', label: 'Headline' },
        headlineAccent: { type: 'text', label: 'Headline accent' },
        body: { type: 'textarea', label: 'Body' },
        primaryCtaLabel: { type: 'text', label: 'Primary button label' },
        primaryCtaHref: { type: 'text', label: 'Primary button URL' },
        secondaryCtaLabel: { type: 'text', label: 'Secondary button label' },
        secondaryCtaHref: { type: 'text', label: 'Secondary button URL' },
        theme: {
          type: 'radio',
          label: 'Theme',
          options: [
            { label: 'Default', value: 'default' },
            { label: 'Dark', value: 'dark' },
          ],
        },
      },
      defaultProps: {
        eyebrow: 'SANITY DRAFTS',
        headlineLead: 'Save a draft,',
        headlineAccent: 'then publish.',
        body: 'Routine edits stay in Sanity.',
        primaryCtaLabel: 'Open Studio',
        primaryCtaHref: '/studio',
        secondaryCtaLabel: 'Back home',
        secondaryCtaHref: '/',
        theme: 'dark',
      } satisfies CtaProps,
      render: (props) => {
        const cta = props as unknown as CtaProps
        return (
        <PreviewShell>
          <ClosingBand
            content={{
              eyebrow: cta.eyebrow,
              heading: { lead: cta.headlineLead, accent: cta.headlineAccent },
              body: cta.body,
              primaryCta: { label: cta.primaryCtaLabel, href: cta.primaryCtaHref },
              secondaryCta: { label: cta.secondaryCtaLabel, href: cta.secondaryCtaHref },
            }}
          />
        </PreviewShell>
        )
      },
    },
  },
} as Config
