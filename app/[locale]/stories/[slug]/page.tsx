import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { PageHero } from '@/components/page/PageHero'
import { Prose } from '@/components/page/Prose'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { PlaceholderBadge } from '@/components/collections/PlaceholderBadge'
import { getStories, getStory } from '@/lib/content/stories'
import { routing } from '@/i18n/routing'
import { DONATE_HREF } from '@/lib/nav'
import { toParagraphs } from '@/lib/text'
import { SITE } from '@/lib/site'
import { pageMetadata } from '@/lib/seo'
import { articleJsonLd } from '@/lib/jsonld'
import { JsonLd } from '@/components/seo/JsonLd'

/**
 * Story detail page (/stories/[slug]).
 *
 * An async server component that renders a single story from the stories read
 * layer. If the slug is not found, calls notFound() so Next.js returns a 404.
 *
 * Heading hierarchy is strict: one h1 from PageHero (photographic mode when
 * the story has images), then body paragraphs inside Prose. No em dashes.
 *
 * generateStaticParams pre-renders every known locale + slug pair at build
 * time. dynamicParams is left at its default (true) so Sanity-added slugs
 * still render on demand.
 */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const story = await getStory(slug)
  if (!story) return { title: SITE.name }
  return pageMetadata({
    locale,
    path: `/stories/${slug}`,
    title: story.title,
    description: story.excerpt,
    image: story.images?.[0],
  })
}

export async function generateStaticParams() {
  const stories = await getStories()
  const slugs = stories.map((s) => s.slug)
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug })),
  )
}

export default async function StoryDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const story = await getStory(slug)
  if (!story) notFound()

  // Split the plain body string into paragraphs on blank lines.
  const paragraphs = toParagraphs(story.body)

  const heroImage = story.images?.[0]

  return (
    <>
      <JsonLd
        data={articleJsonLd({
          title: story.title,
          description: story.excerpt,
          url: `${SITE.url}/stories/${story.slug}`,
          image: story.images?.[0],
        })}
      />
      <PageHero
        content={{
          eyebrow: 'Stories',
          title: story.title,
          image: heroImage,
          alt: heroImage ? `Hero image for the story: ${story.title}` : undefined,
        }}
      />

      <Section tone="paper">
        {/* Back link above the article. */}
        <div className="mb-8">
          <Link
            href="/stories"
            className="font-body text-base font-medium text-brand underline decoration-accent decoration-2 underline-offset-4 hover:text-brand-dark"
          >
            All stories
          </Link>
        </div>

        {/* PlaceholderBadge for seed entries. */}
        {story.placeholder ? (
          <div className="mb-6">
            <PlaceholderBadge />
          </div>
        ) : null}

        {/* Body rendered as Prose paragraphs, split from the plain body string. */}
        <Prose>
          {paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </Prose>
      </Section>

      {/* Closing gold Donate CTA on deep navy. */}
      <Section tone="dark">
        <div className="max-w-2xl">
          <p className="font-body text-lg font-bold uppercase tracking-[0.08em] text-accent">
            Make a difference
          </p>
          <h2 className="mt-3 font-heading text-[2.25rem] leading-[1.15] font-medium text-balance text-paper">
            Help us write more stories like this
          </h2>
          <p className="mt-6 font-body text-lg leading-[1.65] text-paper/85">
            Stories like this are made possible by supporters who give. Your gift
            helps us reach more people in Spain and Tanzania.
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
