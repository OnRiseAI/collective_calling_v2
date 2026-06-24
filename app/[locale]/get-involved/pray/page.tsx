import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { PageHero } from '@/components/page/PageHero'
import { Prose } from '@/components/page/Prose'
import { Section } from '@/components/ui/Section'
import { prayContent } from '@/lib/content/pages/pray'
import { pageMetadata } from '@/lib/seo'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const { hero } = prayContent
  return pageMetadata({
    locale,
    path: '/get-involved/pray',
    title: hero.title,
    description: hero.lede,
    image: hero.image,
  })
}

/**
 * Pray (/get-involved/pray).
 *
 * An async server component that composes the page from typed content and the
 * shared page toolkit:
 *  1. PageHero (photographic with spain-homelessness.jpg), which owns the only h1.
 *  2. A Prose intro: why prayer matters to Collective Calling.
 *  3. A scripture blockquote (1 John 4:11) in a faith-forward figure element.
 *  4. The prayer points as h3 headings inside Prose.
 *  5. A closing paragraph linking to /contact.
 *
 * Heading hierarchy: hero h1, section headings h2, prayer point titles h3.
 * No em dashes anywhere.
 */
export default async function PrayPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const { hero, intro, scripture, pointsEyebrow, pointsHeading, points, closing } =
    prayContent

  return (
    <>
      <PageHero content={hero} />

      {/* Intro: why prayer is part of the work. */}
      <Section tone="paper">
        <div className="max-w-3xl">
          <p className="font-body text-lg font-bold uppercase tracking-[0.08em] text-accent">
            {intro.eyebrow}
          </p>
          <h2 className="mt-3 font-heading text-[38px] leading-[1.15] font-medium text-balance text-ink">
            {intro.heading}
          </h2>
          <Prose className="mt-6">
            {intro.body.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </Prose>

          {/* Scripture: 1 John 4:11 */}
          <figure className="mt-10 border-l-2 border-accent pl-6">
            <blockquote className="font-heading text-[1.625rem] leading-[1.3] font-medium text-ink">
              {scripture.quote}
            </blockquote>
            <figcaption className="mt-4 font-body text-sm font-bold uppercase tracking-[0.08em] text-accent">
              {scripture.reference}
            </figcaption>
          </figure>
        </div>
      </Section>

      {/* Prayer points. */}
      <Section tone="indigo-tint">
        <div className="max-w-3xl">
          <p className="font-body text-lg font-bold uppercase tracking-[0.08em] text-accent">
            {pointsEyebrow}
          </p>
          <h2 className="mt-3 font-heading text-[38px] leading-[1.15] font-medium text-balance text-ink">
            {pointsHeading}
          </h2>
          <Prose className="mt-6">
            {points.map((point) => (
              <div key={point.title}>
                <h3>{point.title}</h3>
                <p>{point.body}</p>
              </div>
            ))}
            <p>
              {closing}{' '}
              <Link href="/contact">Contact the team</Link>.
            </p>
          </Prose>
        </div>
      </Section>
    </>
  )
}
