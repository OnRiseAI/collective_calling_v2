import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { PageHero } from '@/components/page/PageHero'
import { Prose } from '@/components/page/Prose'
import { ValueCards } from '@/components/page/ValueCards'
import { Section } from '@/components/ui/Section'
import { whoWeAreContent } from '@/lib/content/pages/whoWeAre'
import { pageMetadata } from '@/lib/seo'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const { hero } = whoWeAreContent
  return pageMetadata({
    locale,
    path: '/about/who-we-are',
    title: hero.title,
    description: hero.lede,
    image: hero.image,
  })
}

/**
 * Who We Are (/about/who-we-are).
 *
 * An async server component that composes the page from typed content and the
 * shared page toolkit:
 *  1. PageHero, which owns the page's only h1 ("Who We Are") over the team photo.
 *  2. A mission and vision section: the mission paragraphs in Prose, then the
 *     vision as a Fraunces blockquote with its Jeremiah 29:11-13 scripture, and
 *     the reference set in antique gold beneath.
 *  3. ValueCards for the charity's four stated values, each an h3.
 *
 * Heading hierarchy is strict: the hero h1, section headings h2, value cards h3.
 */
export default async function WhoWeArePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const { hero, mission, vision, values } = whoWeAreContent

  return (
    <>
      <PageHero content={hero} />

      <Section tone="paper">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-16">
          {/* Mission narrative. */}
          <div>
            <h2 className="font-heading text-[2.25rem] leading-[1.15] font-medium text-balance text-ink">
              Our mission
            </h2>
            <Prose className="mt-6">
              {mission.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </Prose>
          </div>

          {/* Vision: a dignified quote resting on scripture. */}
          <div className="lg:pt-2">
            <h2 className="font-heading text-[2.25rem] leading-[1.15] font-medium text-balance text-ink">
              Our vision
            </h2>
            <figure className="mt-6 border-l-2 border-accent pl-6">
              <blockquote className="font-heading text-[1.625rem] leading-[1.3] font-medium text-ink">
                {vision.quote}
              </blockquote>
              <p className="mt-6 font-body text-base leading-[1.65] text-muted">
                {vision.scripture}
              </p>
              <figcaption className="mt-4 font-body text-sm font-bold uppercase tracking-[0.08em] text-accent">
                {vision.reference}
              </figcaption>
            </figure>
          </div>
        </div>
      </Section>

      <ValueCards items={values} tone="indigo-tint" />
    </>
  )
}
