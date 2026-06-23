import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { PageHero } from '@/components/page/PageHero'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { CollectionCard } from '@/components/collections/CollectionCard'
import { getStories } from '@/lib/content/stories'
import { DONATE_HREF } from '@/lib/nav'

/**
 * Stories hub (/stories).
 *
 * An async server component that composes the hub page from the stories read
 * layer and the shared page toolkit:
 *  1. PageHero, which owns the page's only h1, with a gold eyebrow and a
 *     Fraunces heading in photographic or solid mode.
 *  2. A grid of CollectionCard for every story returned by getStories. Cards
 *     link to /stories/[slug] and show a PlaceholderBadge for seed entries.
 *  3. A gentle "More stories coming" note since the real set is small.
 *  4. A closing gold Donate CTA on dark navy.
 *
 * Heading hierarchy is strict: one h1 from PageHero, h2 for section headings,
 * h3 inside each CollectionCard (via the Card primitive). No em dashes.
 */
export default async function StoriesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const stories = await getStories()

  return (
    <>
      <PageHero
        content={{
          eyebrow: 'Lives changed',
          title: 'Lives reclaimed',
          lede:
            'Every person Collective Calling serves has a story. Here are a few of the lives restored through our work in Spain and Tanzania.',
        }}
      />

      {/* Story cards grid. CollectionCard handles the image, h3 title, excerpt,
          and PlaceholderBadge for seed entries. */}
      <Section tone="paper">
        <ul
          role="list"
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {stories.map((story) => (
            <li key={story.slug}>
              <CollectionCard
                href={`/stories/${story.slug}`}
                title={story.title}
                description={story.excerpt}
                image={story.images?.[0]}
                alt={`Photo for the story: ${story.title}`}
                theme={
                  story.location === 'tanzania'
                    ? 'tanzania'
                    : story.location === 'spain'
                      ? 'spain'
                      : 'general'
                }
                placeholder={story.placeholder}
              />
            </li>
          ))}
        </ul>

        {/* Gentle note: real stories are coming. */}
        <p className="mt-12 font-body text-base leading-[1.6] text-muted">
          More stories are coming as we gather accounts from supporters and
          families touched by this work. If you have a story to share, please{' '}
          <Link
            href="/contact"
            className="font-medium text-brand underline decoration-accent decoration-2 underline-offset-4 hover:text-brand-dark"
          >
            get in touch
          </Link>
          .
        </p>
      </Section>

      {/* Donate: gold CTA on deep navy. */}
      <Section tone="dark">
        <div className="max-w-2xl">
          <p className="font-body text-lg font-bold uppercase tracking-[0.08em] text-accent">
            Be part of the story
          </p>
          <h2 className="mt-3 font-heading text-[2.25rem] leading-[1.15] font-medium text-balance text-paper">
            Your gift writes the next chapter
          </h2>
          <p className="mt-6 font-body text-lg leading-[1.65] text-paper/85">
            Behind every story is a network of supporters who gave. Join them
            and help us reach more people in Spain and Tanzania.
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
