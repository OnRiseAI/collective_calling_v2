import * as React from 'react'
import { Section } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'
import { Eyebrow } from '@/components/ui/Eyebrow'
import type { Appeal } from '@/lib/content/types'

/**
 * Appeals cards section for the Collective Calling homepage.
 *
 * The "how you can help" moment: a calm, premium three-up grid of the charity's
 * current appeals (Spain, Tanzania, and sponsorship). Each appeal is a single
 * Card whose whole surface links through to its page, with a thin top rule that
 * flags the programme by theme (indigo = Spain, clay = Tanzania, gold = general).
 *
 * Per the brand board:
 *  - sits on a warm ivory paper band to alternate with the surrounding tint bands.
 *  - opens with a gold eyebrow (H5, uppercase, with a short gold rule echoing the
 *    gala poster) above the section heading.
 *  - the section heading is an h2 in Fraunces with text-balance and a non-breaking
 *    space between the last two words so there is no orphan. The hero owns the page
 *    h1, and each Card renders its title as an h3, so the heading levels nest
 *    cleanly (h1 hero, h2 here, h3 per card).
 *
 * The grid is a <ul> of <li> wrappers so the appeals read as a list to assistive
 * technology. The Card already supplies the only interactive element (its link),
 * so nothing interactive is nested inside it.
 */
export function AppealsCards(props: { appeals: Appeal[] }): React.JSX.Element {
  const { appeals } = props

  return (
    <Section tone="paper" containerSize="wide">
      {/* Eyebrow: gold, uppercase, with a short gold rule echoing the gala poster. */}
      <Eyebrow align="center">How you can help</Eyebrow>

      {/* Section heading. The hero owns the page h1, so this is an h2, and each
          Card title below is an h3 nested beneath it. NBSP holds "of love". */}
      <h2 className="mx-auto mt-5 max-w-2xl text-balance text-center font-heading text-3xl font-bold leading-[1.12] text-brand-dark sm:text-[38px]">
        Answer the call of&nbsp;love
      </h2>
      <span aria-hidden="true" className="mx-auto mt-4 block h-1 w-12 rounded-full bg-accent" />

      <ul className="mx-auto mt-14 grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {appeals.map((appeal) => (
          <li key={appeal.slug} className="flex">
            <Card
              image={appeal.image}
              alt={appeal.alt}
              title={appeal.title}
              theme={appeal.theme}
              href={appeal.href}
              className="w-full"
            >
              {appeal.blurb}
            </Card>
          </li>
        ))}
      </ul>
    </Section>
  )
}

export default AppealsCards
