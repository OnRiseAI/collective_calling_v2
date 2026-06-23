import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { PageHero } from '@/components/page/PageHero'
import { Prose } from '@/components/page/Prose'
import { Section } from '@/components/ui/Section'
import { DonorboxEmbed } from '@/components/donate/DonorboxEmbed'
import { getAppeals, getAppeal } from '@/lib/content/appeals'
import { routing } from '@/i18n/routing'

/**
 * Appeal detail page (/appeals/[slug]).
 *
 * An async server component that renders a single appeal from the appeals read
 * layer. If the slug is not found, calls notFound() so Next.js returns a 404.
 *
 * Heading hierarchy is strict: one h1 from PageHero (photographic mode when
 * the appeal has an image), then body paragraphs inside Prose. No em dashes.
 *
 * generateStaticParams pre-renders every known locale + slug pair at build
 * time. dynamicParams is left at its default (true) so Sanity-added slugs
 * still render on demand.
 */

export async function generateStaticParams() {
  const appeals = await getAppeals()
  const slugs = appeals.map((a) => a.slug)
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug })),
  )
}

export default async function AppealDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const appeal = await getAppeal(slug)
  if (!appeal) notFound()

  // Split the plain body string into paragraphs on blank lines.
  const paragraphs = appeal.body
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)

  return (
    <>
      <PageHero
        content={{
          eyebrow: 'Appeal',
          title: appeal.title,
          image: appeal.image,
          alt: appeal.alt,
        }}
      />

      {/* Back link above the article body. */}
      <Section tone="paper">
        <div className="mb-8">
          <Link
            href="/appeals"
            className="font-body text-base font-medium text-brand underline decoration-accent decoration-2 underline-offset-4 hover:text-brand-dark"
          >
            All appeals
          </Link>
        </div>

        {/* Body rendered as Prose paragraphs, split from the plain body string. */}
        <Prose>
          {paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </Prose>
      </Section>

      {/* Giving block: Donorbox embed (when a donorboxQuery is present) and
          designation note so donors pick the right designation on the form. */}
      <Section tone="indigo-tint">
        <div className="max-w-2xl">
          <p className="flex items-center gap-3 font-body text-sm font-bold uppercase tracking-[0.18em] text-accent">
            <span aria-hidden="true" className="h-px w-8 bg-accent" />
            Give now
          </p>
          <h2 className="mt-5 text-balance font-heading text-3xl font-medium leading-[1.15] text-ink sm:text-4xl">
            Support this appeal
          </h2>
          <p className="mt-6 font-body text-lg leading-[1.65] text-ink">
            When giving, please choose{' '}
            <strong className="font-semibold">{appeal.donationDesignation}</strong>{' '}
            as your designation on the form so your gift is directed to this
            appeal.
          </p>

          {/* Link to the related programme page. */}
          <div className="mt-6">
            <Link
              href={appeal.relatedHref}
              className="font-body text-base font-medium text-brand underline decoration-accent decoration-2 underline-offset-4 hover:text-brand-dark"
            >
              {appeal.relatedHref === '/spain'
                ? 'Read more about our work in Spain'
                : appeal.relatedHref === '/tanzania'
                  ? 'Read more about our work in Tanzania'
                  : appeal.relatedHref === '/donate'
                    ? 'Learn about all the ways to give'
                    : 'Learn more about this programme'}
            </Link>
          </div>
        </div>

        {appeal.donorboxQuery ? (
          <div className="mt-12">
            <DonorboxEmbed
              title={`${appeal.title} donation form`}
              query={appeal.donorboxQuery}
            />
          </div>
        ) : (
          <div className="mt-12">
            <DonorboxEmbed title={`${appeal.title} donation form`} />
          </div>
        )}
      </Section>
    </>
  )
}
