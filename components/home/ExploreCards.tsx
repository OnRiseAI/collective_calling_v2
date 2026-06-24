import * as React from 'react'
import { Section } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'
import { Eyebrow } from '@/components/ui/Eyebrow'
import type { ExploreCard } from '@/lib/content/types'

/**
 * Explore cards section for the Collective Calling homepage.
 *
 * "See your impact in action": after the appeals and testimonials, this is the
 * calm wayfinding moment that invites the reader deeper into the site (Appeals,
 * Stories, Get involved, About us). Each destination is a single Card whose whole
 * surface links through, so the section reads as four clear, premium doorways.
 *
 * Per the brand board:
 *  - sits on a soft indigo tint band so it alternates with the surrounding paper
 *    and tint sections for a calm, premium rhythm.
 *  - opens with a gold eyebrow (uppercase, with a short gold rule echoing the gala
 *    poster) above the section heading.
 *  - the section heading is an h2 in Fraunces with text-balance and a non-breaking
 *    space between the last two words so there is no orphan. The hero owns the page
 *    h1 and each Card renders its title as an h3, so the levels nest cleanly
 *    (h1 hero, h2 here, h3 per card).
 *
 * The grid is a 2-up at small widths and 4-up from large up (a tidy single row of
 * four doorways, 2x2 in between). It is a <ul> of <li> wrappers so the cards read
 * as a list to assistive technology. The Card already supplies the only
 * interactive element (its link), so nothing interactive is nested inside it.
 */
export function ExploreCards(props: { cards: ExploreCard[] }): React.JSX.Element {
  const { cards } = props

  return (
    <Section tone="indigo-tint" containerSize="wide">
      {/* Light band so the large white feature cards pop, sitting between the
          navy testimonials and the navy big-number band. */}
      <Eyebrow align="center">Explore</Eyebrow>

      {/* Section heading. The hero owns the page h1, so this is an h2, and each
          Card title below is an h3 nested beneath it. NBSP holds "in action". */}
      <h2 className="mx-auto mt-5 max-w-2xl text-balance text-center font-heading text-3xl font-bold leading-[1.12] text-brand-dark sm:text-4xl lg:text-[2.75rem]">
        See your impact in&nbsp;action
      </h2>
      <span aria-hidden="true" className="mx-auto mt-4 block h-1 w-12 rounded-full bg-accent" />

      <ul className="mx-auto mt-14 grid max-w-5xl gap-8 sm:grid-cols-2">
        {cards.map((card) => (
          <li key={card.href} className="flex">
            <Card
              image={card.image}
              alt={card.alt}
              title={card.title}
              theme="general"
              href={card.href}
              large
              className="w-full"
            >
              {card.blurb}
            </Card>
          </li>
        ))}
      </ul>
    </Section>
  )
}

export default ExploreCards
