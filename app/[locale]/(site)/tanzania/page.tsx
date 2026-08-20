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
import { tanzaniaContent } from '@/lib/content/pages/tanzania'
import { pageMetadata } from '@/lib/seo'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const { hero } = tanzaniaContent
  return pageMetadata({
    locale,
    path: '/tanzania',
    title: hero.title,
    description: hero.lede,
    image: hero.image,
  })
}

/**
 * Tanzania programme page (/tanzania).
 *
 * An async server component that composes the page from typed content and the
 * shared page toolkit, mirroring the Spain page so the two programmes feel like
 * one connected charity. The Tanzania accent is clay (terracotta) per the
 * homepage appeal theme:
 *  1. PageHero, which owns the page's only h1 ("Tanzania") over a Centre of Hope
 *     photo.
 *  2. A Prose section framing the orphanage statistic that drives the family
 *     reunification mission.
 *  3. A Prose-and-photo section on the Centre of Hope (Kasulu, established 2018,
 *     a 200m home on a 500m plot, 18 children).
 *  4. A Prose section on the reunification approach (the three Rs).
 *  5. ProgramHelp for Rescue, Rehabilitate, Reintegrate, each an h3, with the
 *     clay accent rule.
 *  6. A "Meet Caleb" story block (RichBlock) on a soft clay band.
 *  7. A deep navy Donate section where gold leads, the warmest invited action,
 *     with the sponsor-a-child invitation.
 *
 * Heading hierarchy is strict: the hero h1, section headings h2, help-item
 * titles h3.
 */
export default async function TanzaniaPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const { hero, statistic, centre, reunification, help, caleb, donate } =
    tanzaniaContent

  return (
    <>
      <PageHero content={hero} />

      {/* Why it matters: the orphanage statistic that drives the whole mission. */}
      <Section tone="paper">
        <div className="max-w-2xl">
          <p className="font-body text-lg font-bold uppercase tracking-[0.08em] text-clay">
            Why it matters
          </p>
          <h2 className="mt-3 font-heading text-[38px] leading-[1.15] font-medium text-balance text-ink">
            {statistic.heading}
          </h2>
          <Prose className="mt-6">
            {statistic.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Prose>
        </div>
      </Section>

      {/* The Centre of Hope: its facts paired with a documentary photo of the
          work, on a soft clay band so the Tanzania theme reads at a glance. */}
      <Section tone="clay-tint">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="font-body text-lg font-bold uppercase tracking-[0.08em] text-clay">
              In Kasulu
            </p>
            <h2 className="mt-3 font-heading text-[38px] leading-[1.15] font-medium text-balance text-ink">
              {centre.heading}
            </h2>
            <Prose className="mt-6">
              {centre.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </Prose>
          </div>

          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-muted/20 shadow-[0_8px_24px_rgba(31,27,22,0.08)]">
            <Image
              src={centre.image}
              alt={centre.alt}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </Section>

      {/* Our approach: family reunification, the three Rs. */}
      <Section tone="paper">
        <div className="max-w-2xl">
          <p className="font-body text-lg font-bold uppercase tracking-[0.08em] text-clay">
            {reunification.eyebrow}
          </p>
          <h2 className="mt-3 font-heading text-[38px] leading-[1.15] font-medium text-balance text-ink">
            {reunification.heading}
          </h2>
          <Prose className="mt-6">
            {reunification.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Prose>
        </div>
      </Section>

      {/* The three ways the work helps (Rescue, Rehabilitate, Reintegrate), on a
          soft cool band so the white cards lift off the page. Each title is an
          h3 via ProgramHelp, flagged with the clay Tanzania accent rule. */}
      <ProgramHelp
        eyebrow={help.eyebrow}
        heading={help.heading}
        items={help.items}
        tone="indigo-tint"
        accent="clay"
      />

      {/* Meet Caleb: a single child's story, told with a real before/after
          documentary photo, on a soft clay band. */}
      <Section tone="clay-tint">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl border border-muted/20 shadow-[0_8px_24px_rgba(31,27,22,0.08)] lg:order-last">
            <Image
              src={caleb.image}
              alt={caleb.alt}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>

          <div>
            <p className="font-body text-lg font-bold uppercase tracking-[0.08em] text-clay">
              {caleb.eyebrow}
            </p>
            <h2 className="mt-3 font-heading text-[38px] leading-[1.15] font-medium text-balance text-ink">
              {caleb.heading}
            </h2>
            <Prose className="mt-6">
              <p>{caleb.story.body}</p>
            </Prose>
          </div>
        </div>
      </Section>

      {/* Donate and sponsor: the one place gold leads (brand board sections 6
          and 7), with the sponsor-a-child invitation. */}
      <Section tone="dark">
        <div className="max-w-2xl">
          <p className="font-body text-lg font-bold uppercase tracking-[0.08em] text-accent">
            {donate.eyebrow}
          </p>
          <h2 className="mt-3 font-heading text-[38px] leading-[1.15] font-medium text-balance text-paper">
            {donate.heading}
          </h2>
          <p className="mt-6 font-body text-lg leading-[1.65] text-paper/85">
            {donate.body}
          </p>
          <p className="mt-4 font-body text-lg leading-[1.65] text-paper/85">
            {donate.sponsor}
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
