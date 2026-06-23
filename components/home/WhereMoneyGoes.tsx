import * as React from 'react'
import { Link } from '@/i18n/navigation'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { DONATE_HREF } from '@/lib/nav'
import { noOrphan } from '@/lib/text'
import type { HomeContent } from '@/lib/content/types'

/**
 * "Where your money goes" for the Collective Calling homepage.
 *
 * A warm ivory paper band that answers the unspoken donor question with one
 * honest picture: most of every gift reaches the programs, and a smaller share
 * keeps the charity running and growing. Per the brand board this is a gold
 * eyebrow (H5, uppercase) above a Fraunces section heading, a single horizontal
 * split bar (brand indigo for programs, antique gold for running costs), two
 * labelled figures, the accountability note, and the one gold-led Donate moment.
 *
 * The split is driven entirely from the content props (programsPct / adminPct),
 * never hardcoded, so the same component reports whatever the latest figures are.
 *
 * Heading hierarchy: the hero owns the page h1, so this section heading is an h2.
 */

const HEADING = 'Where your money goes'

export function WhereMoneyGoes(props: { content: HomeContent['money'] }): React.JSX.Element {
  const { content } = props
  const { programsPct, adminPct, programsLabel, adminLabel, note } = content

  // A plain-language description of the split for assistive technology. The bar
  // is purely visual, so its meaning lives entirely in this label.
  const barLabel =
    `${programsPct} percent ${programsLabel}, ` +
    `${adminPct} percent ${adminLabel}.`

  return (
    <Section tone="paper">
      <div className="max-w-3xl">
        {/* Eyebrow: gold, uppercase, bold body face, with a short gold rule that
            echoes the gala poster's warm gold lettering. */}
        <p className="flex items-center gap-3 font-body text-sm font-bold uppercase tracking-[0.18em] text-accent">
          <span aria-hidden="true" className="h-px w-8 bg-accent" />
          {HEADING}
        </p>

        {/* Section heading: Fraunces, text-balance, NBSP between the last two
            words. h2 because the hero owns the page h1. */}
        <h2 className="mt-5 text-balance font-heading text-3xl font-medium leading-[1.15] text-ink sm:text-4xl">
          {noOrphan('Most of every gift reaches the people we serve')}
        </h2>
      </div>

      {/* The split visual. The bar itself is a single image for assistive tech
          (role="img" + aria-label); the captions around it repeat the same
          information visually so nothing depends on colour alone. */}
      <div className="mt-12 max-w-3xl">
        <div
          role="img"
          aria-label={barLabel}
          className="flex h-5 w-full overflow-hidden rounded-lg ring-1 ring-ink/10"
        >
          <span
            aria-hidden="true"
            className="block h-full bg-brand"
            style={{ width: `${programsPct}%` }}
          />
          <span
            aria-hidden="true"
            className="block h-full bg-accent"
            style={{ width: `${adminPct}%` }}
          />
        </div>

        {/* Two labelled figures. A definition list keeps the figure (percentage)
            and its meaning (label) bound together, with a colour key dot that
            matches each bar segment. */}
        <dl className="mt-8 grid gap-8 sm:grid-cols-2">
          <div className="flex gap-4">
            <span
              aria-hidden="true"
              className="mt-2 h-3.5 w-3.5 shrink-0 rounded-full bg-brand"
            />
            <div>
              <dt className="font-heading text-4xl font-medium leading-none text-brand">
                {programsPct}%
              </dt>
              <dd className="mt-2 font-body text-lg leading-snug text-ink">
                {programsLabel}
              </dd>
            </div>
          </div>

          <div className="flex gap-4">
            <span
              aria-hidden="true"
              className="mt-2 h-3.5 w-3.5 shrink-0 rounded-full bg-accent"
            />
            <div>
              <dt className="font-heading text-4xl font-medium leading-none text-ink">
                {adminPct}%
              </dt>
              <dd className="mt-2 font-body text-lg leading-snug text-ink">
                {adminLabel}
              </dd>
            </div>
          </div>
        </dl>

        {/* Accountability note: Mulish, quiet, in warm muted ink. */}
        <p className="mt-10 font-body text-base leading-relaxed text-muted">
          {note}
        </p>

        {/* The one gold-led action on this calm band. Gold background on the
            light paper surface so the most invited action is also the warmest.
            Important modifiers override the primary variant's indigo fill. */}
        <div className="mt-8">
          <Button
            as={Link}
            href={DONATE_HREF}
            size="lg"
            className="bg-accent! text-brand-dark! hover:bg-accent/90!"
          >
            Donate
          </Button>
        </div>
      </div>
    </Section>
  )
}

export default WhereMoneyGoes
