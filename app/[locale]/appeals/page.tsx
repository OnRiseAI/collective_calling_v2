import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { PageHero } from '@/components/page/PageHero'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { CollectionCard } from '@/components/collections/CollectionCard'
import { getAppeals } from '@/lib/content/appeals'
import { DONATE_HREF } from '@/lib/nav'

/**
 * Appeals hub (/appeals).
 *
 * An async server component that composes the appeals hub from the appeals
 * read layer and the shared page toolkit:
 *  1. PageHero, which owns the page's only h1, with a gold eyebrow and a
 *     Fraunces heading in solid navy mode.
 *  2. A grid of CollectionCard for every appeal returned by getAppeals. Cards
 *     link to /appeals/[slug] and pass blurb as the description.
 *  3. A closing gold Donate CTA on deep navy.
 *
 * Heading hierarchy is strict: one h1 from PageHero, h2 for section headings,
 * h3 inside each CollectionCard (via the Card primitive). No em dashes.
 */
export default async function AppealsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const appeals = await getAppeals()

  return (
    <>
      <PageHero
        content={{
          eyebrow: 'Give today',
          title: 'Our appeals',
          lede:
            'Every appeal is tied to a real Donorbox designation so your gift goes exactly where you intend it. Choose the cause that moves you.',
        }}
      />

      {/* Appeal cards grid. CollectionCard handles the image, h3 title, blurb,
          and PlaceholderBadge for seed entries. */}
      <Section tone="paper">
        <ul
          role="list"
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {appeals.map((appeal) => (
            <li key={appeal.slug}>
              <CollectionCard
                href={`/appeals/${appeal.slug}`}
                title={appeal.title}
                description={appeal.blurb}
                image={appeal.image}
                alt={appeal.alt}
                theme={appeal.theme}
                placeholder={appeal.placeholder}
              />
            </li>
          ))}
        </ul>
      </Section>

      {/* Donate: gold CTA on deep navy. */}
      <Section tone="dark">
        <div className="max-w-2xl">
          <p className="font-body text-lg font-bold uppercase tracking-[0.08em] text-accent">
            Make a difference
          </p>
          <h2 className="mt-3 font-heading text-[2.25rem] leading-[1.15] font-medium text-balance text-paper">
            Your gift restores lives
          </h2>
          <p className="mt-6 font-body text-lg leading-[1.65] text-paper/85">
            83 cents of every euro you give goes directly to the programmes
            supporting families in Spain and Tanzania. Pick an appeal above or
            give to our area of greatest need.
          </p>
          <div className="mt-8">
            <Button
              as={Link}
              href={DONATE_HREF}
              size="lg"
              className="bg-accent! text-brand-dark! hover:bg-accent/90!"
            >
              Donate today
            </Button>
          </div>
        </div>
      </Section>
    </>
  )
}
