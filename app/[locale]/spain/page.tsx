import type { Metadata } from 'next'
import Image from 'next/image'
import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { PageHero } from '@/components/page/PageHero'
import { Prose } from '@/components/page/Prose'
import { ProgramHelp } from '@/components/page/ProgramHelp'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { DONATE_HREF } from '@/lib/nav'
import { spainContent } from '@/lib/content/pages/spain'
import { pageMetadata } from '@/lib/seo'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const { hero } = spainContent
  return pageMetadata({
    locale,
    path: '/spain',
    title: hero.title,
    description: hero.lede,
    image: hero.image,
  })
}

/**
 * Spain programme page (/spain).
 *
 * An async server component that composes the page from typed content and the
 * shared page toolkit:
 *  1. PageHero, which owns the page's only h1 ("Spain") over the mobile shower
 *     unit photo.
 *  2. A Prose intro to the homelessness response along the Costa del Sol and the
 *     mobile shower unit, paired with a documentary outreach photo.
 *  3. ProgramHelp for the three ways the work helps, each an h3.
 *  4. A "how you can help" section.
 *  5. A deep navy Donate section where gold leads, the warmest invited action.
 *
 * Heading hierarchy is strict: the hero h1, section headings h2, help-item
 * titles h3.
 */
export default async function SpainPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const { hero, intro, help, involve, donate } = spainContent

  return (
    <>
      <PageHero content={hero} />

      {/* Intro to the homelessness response and the mobile shower unit, paired
          with a documentary outreach photo so the work is shown, not just told. */}
      <Section tone="paper">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="font-heading text-[2.25rem] leading-[1.15] font-medium text-balance text-ink">
              Spain’s first mobile shower for the homeless
            </h2>
            <Prose className="mt-6">
              {intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </Prose>
          </div>

          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-muted/20 shadow-[0_8px_24px_rgba(31,27,22,0.08)]">
            <Image
              src="/images/spain/outreach.jpg"
              alt="A Collective Calling volunteer meeting someone on the streets of the Costa del Sol."
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </Section>

      {/* The three ways the work helps, on a soft cool band so the white cards
          lift off the page. Each title is an h3 via ProgramHelp. */}
      <ProgramHelp
        eyebrow={help.eyebrow}
        heading={help.heading}
        items={help.items}
        tone="indigo-tint"
      />

      {/* How you can help. */}
      <Section tone="paper">
        <div className="max-w-2xl">
          <p className="font-body text-lg font-bold uppercase tracking-[0.08em] text-accent">
            {involve.eyebrow}
          </p>
          <h2 className="mt-3 font-heading text-[2.25rem] leading-[1.15] font-medium text-balance text-ink">
            {involve.heading}
          </h2>
          <Prose className="mt-6">
            {involve.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Prose>
        </div>
      </Section>

      {/* Donate: the one place gold leads (brand board sections 6 and 7). */}
      <Section tone="dark">
        <div className="max-w-2xl">
          <p className="font-body text-lg font-bold uppercase tracking-[0.08em] text-accent">
            {donate.eyebrow}
          </p>
          <h2 className="mt-3 font-heading text-[2.25rem] leading-[1.15] font-medium text-balance text-paper">
            {donate.heading}
          </h2>
          <p className="mt-6 font-body text-lg leading-[1.65] text-paper/85">
            {donate.body}
          </p>
          <div className="mt-8">
            <Button
              as={Link}
              href={DONATE_HREF}
              size="lg"
              // Donate is the one place gold leads (brand board section 6). The
              // important modifiers ensure the gold fill wins over the primary
              // variant's brand background regardless of CSS source order.
              className="bg-accent! text-brand-dark! hover:bg-accent/90!"
            >
              {donate.cta}
            </Button>
          </div>
        </div>
      </Section>
    </>
  )
}
