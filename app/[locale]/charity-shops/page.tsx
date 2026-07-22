import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { PageHero } from '@/components/page/PageHero'
import { Section } from '@/components/ui/Section'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { charityShopsContent } from '@/lib/content/pages/charityShops'
import { pageMetadata } from '@/lib/seo'
import { noOrphan } from '@/lib/text'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const { hero } = charityShopsContent
  return pageMetadata({
    locale,
    path: '/charity-shops',
    title: hero.title,
    description: hero.lede,
  })
}

/**
 * Charity Shops (/charity-shops).
 *
 * A modest page in the mockup theme: hero (owns the h1), an intro on why the
 * shops matter, three ways to take part (h3), and a contact CTA for locations
 * and hours (no fabricated addresses). No em dashes.
 */
export default async function CharityShopsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const content = charityShopsContent

  return (
    <>
      <PageHero content={content.hero} />

      <Section>
        <div className="mx-auto max-w-3xl">
          <Eyebrow>{content.intro.eyebrow}</Eyebrow>
          <h2 className="mt-4 text-balance font-heading text-3xl text-brand-dark sm:text-4xl">
            {noOrphan(content.intro.heading)}
          </h2>
          <div className="mt-6 space-y-5">
            {content.intro.body.map((paragraph) => (
              <p key={paragraph} className="font-body text-lg leading-relaxed text-ink/85">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="indigo-tint">
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
          {content.ways.map((way) => (
            <div key={way.title} className="border border-ink/10 bg-card p-7">
              <h3 className="font-body text-sm font-semibold uppercase tracking-[0.18em] text-brand-dark">
                {way.title}
              </h3>
              <p className="mt-3 font-body text-[15px] leading-relaxed text-muted">{way.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="dark">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance font-heading text-3xl sm:text-4xl">
            {noOrphan(content.cta.heading)}
          </h2>
          <p className="mt-4 font-body text-lg leading-relaxed text-paper/75">{content.cta.body}</p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center justify-center rounded-[--radius] bg-accent px-6 py-3 font-body text-sm font-semibold uppercase tracking-wider text-brand-dark transition-colors hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
          >
            {content.cta.contactCta}
          </Link>
        </div>
      </Section>
    </>
  )
}
