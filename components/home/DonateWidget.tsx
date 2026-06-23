'use client'

import * as React from 'react'
import { cx } from '@/lib/cx'
import { Section } from '@/components/ui/Section'
import { donorboxUrl } from '@/lib/donate'
import type { DonateTier, HomeContent } from '@/lib/content/types'

/**
 * Tiered Donate widget for the Collective Calling homepage.
 *
 * This is the warm donate moment: a deep midnight-navy band where gold leads,
 * per the brand board. It is the most interactive section on the page, so it is
 * a client component. It carries no payment logic; it simply deep-links to the
 * charity's Donorbox campaign with the chosen amount and interval prefilled
 * (Plan 4 owns the full Donate page).
 *
 * Interaction model:
 * - A Monthly/Once segmented toggle, built as a radiogroup. Monthly is the
 *   default interval.
 * - For the active interval, its three tiers render as a second radiogroup of
 *   selectable amounts. The middle tier (index 1) is selected by default, and
 *   switching interval resets the selection to that interval's middle tier.
 * - A gold-led Donate action, rendered as an external anchor, whose href is
 *   composed by `donorboxUrl(selectedAmount, interval)` and updates live as the
 *   interval or amount changes.
 *
 * Accessibility:
 * - Both groups use WAI-ARIA radio semantics (role="radiogroup" with
 *   role="radio" + aria-checked children) so screen readers announce the
 *   selected option and the group purpose.
 * - Roving tabindex plus arrow-key handling makes each group operable by
 *   keyboard, matching native radio behaviour.
 * - Transitions are colour-only and disabled under prefers-reduced-motion.
 */

type Interval = 'monthly' | 'once'

// The default selection within an interval: the middle tier (index 1). Falls
// back gracefully if an interval ever has fewer than two tiers.
function defaultIndexFor(tiers: DonateTier[]): number {
  return tiers.length > 1 ? 1 : 0
}

// Format an amount as a euro figure. The euro sign keeps the currency explicit
// without depending on locale formatting in this small widget.
function euros(amount: number): string {
  return `€${amount}`
}


export function DonateWidget(props: { content: HomeContent['donate'] }): React.JSX.Element {
  const { monthlyTiers, onceTiers } = props.content

  const [interval, setInterval] = React.useState<Interval>('monthly')

  const tiers = interval === 'monthly' ? monthlyTiers : onceTiers

  // The selected tier index is tracked per interval default; when the interval
  // switches we reset to that interval's default tier.
  const [selectedIndex, setSelectedIndex] = React.useState<number>(() =>
    defaultIndexFor(monthlyTiers),
  )

  function chooseInterval(next: Interval): void {
    if (next === interval) return
    setInterval(next)
    setSelectedIndex(defaultIndexFor(next === 'monthly' ? monthlyTiers : onceTiers))
  }

  const selectedTier = tiers[selectedIndex] ?? tiers[0]
  const selectedAmount = selectedTier.amount
  const href = donorboxUrl(selectedAmount, interval)

  // Keyboard handling for a radiogroup: arrow keys move the selection, Home and
  // End jump to the ends. Used by both the interval toggle and the amount group.
  function radioKeyDown(
    event: React.KeyboardEvent,
    count: number,
    current: number,
    select: (index: number) => void,
  ): void {
    let next = current
    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        next = (current + 1) % count
        break
      case 'ArrowLeft':
      case 'ArrowUp':
        next = (current - 1 + count) % count
        break
      case 'Home':
        next = 0
        break
      case 'End':
        next = count - 1
        break
      default:
        return
    }
    event.preventDefault()
    select(next)
  }

  const intervals: Array<{ value: Interval; label: string }> = [
    { value: 'monthly', label: 'Monthly' },
    { value: 'once', label: 'Once' },
  ]
  const currentIntervalIndex = interval === 'monthly' ? 0 : 1

  const donateLabel = `Donate ${euros(selectedAmount)} ${interval === 'monthly' ? 'monthly' : 'once'}`

  return (
    <Section tone="dark">
      <div className="mx-auto max-w-2xl text-center">
        {/* Eyebrow: gold, uppercase, with a short gold rule echoing the gala
            poster's warm lettering. On dark, gold reads as warm light. */}
        <p className="flex items-center justify-center gap-3 font-body text-sm font-bold uppercase tracking-[0.18em] text-accent">
          <span aria-hidden="true" className="h-px w-8 bg-accent" />
          Give today
          <span aria-hidden="true" className="h-px w-8 bg-accent" />
        </p>

        {/* Section heading: Fraunces, text-balance, NBSP before the last word so
            it never orphans. h2 because the hero owns the page h1. */}
        <h2 className="mt-5 text-balance font-heading text-3xl font-medium leading-[1.15] text-paper sm:text-4xl">
          Give once, or walk with us every&nbsp;month
        </h2>
        <p className="mx-auto mt-4 max-w-xl font-body text-lg leading-relaxed text-paper/80">
          Choose a gift that fits you. Every amount goes straight to restoring
          dignity in Spain and reuniting families in Tanzania.
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-xl">
        {/* Monthly / Once segmented toggle as a radiogroup. */}
        <div
          role="radiogroup"
          aria-label="Giving frequency"
          className="mx-auto grid w-full max-w-xs grid-cols-2 gap-1 rounded-lg bg-paper/10 p-1 ring-1 ring-paper/15"
        >
          {intervals.map((item) => {
            const checked = item.value === interval
            return (
              <button
                key={item.value}
                type="button"
                role="radio"
                aria-checked={checked}
                tabIndex={checked ? 0 : -1}
                onClick={() => chooseInterval(item.value)}
                onKeyDown={(event) =>
                  radioKeyDown(event, intervals.length, currentIntervalIndex, (next) =>
                    chooseInterval(intervals[next].value),
                  )
                }
                className={cx(
                  'rounded-md px-4 py-2 font-body text-sm font-semibold',
                  'transition-colors duration-200 ease-out motion-reduce:transition-none',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark',
                  checked ? 'bg-accent text-brand-dark' : 'text-paper/80 hover:text-paper',
                )}
              >
                {item.label}
              </button>
            )
          })}
        </div>

        {/* Amount tiers for the active interval, as a radiogroup. Each tier is a
            selectable option showing its euro amount and impact line. */}
        <div
          role="radiogroup"
          aria-label="Donation amount"
          className="mt-8 grid gap-3"
        >
          {tiers.map((tier, index) => {
            const checked = index === selectedIndex
            return (
              <button
                key={`${interval}-${tier.amount}`}
                type="button"
                role="radio"
                aria-checked={checked}
                tabIndex={checked ? 0 : -1}
                onClick={() => setSelectedIndex(index)}
                onKeyDown={(event) =>
                  radioKeyDown(event, tiers.length, selectedIndex, setSelectedIndex)
                }
                className={cx(
                  'group flex items-baseline gap-4 rounded-xl px-5 py-4 text-left',
                  'ring-1 transition-colors duration-200 ease-out motion-reduce:transition-none',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark',
                  checked
                    ? 'bg-paper/10 ring-accent'
                    : 'bg-transparent ring-paper/15 hover:bg-paper/5 hover:ring-paper/30',
                )}
              >
                <span
                  className={cx(
                    'shrink-0 font-heading text-2xl font-medium leading-none tabular-nums',
                    checked ? 'text-accent' : 'text-paper',
                  )}
                >
                  {euros(tier.amount)}
                </span>
                <span className="font-body text-base leading-snug text-paper/80">
                  {tier.impact}
                </span>
              </button>
            )
          })}
        </div>

        {/* The one gold-led action on the page. External anchor to Donorbox; its
            href updates with the selected amount and interval. New tab, with the
            usual security rel. */}
        <div className="mt-8">
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={cx(
              'inline-flex w-full items-center justify-center rounded-lg px-8 py-[0.95rem]',
              'bg-accent font-body text-lg font-semibold text-brand-dark',
              'transition-colors duration-200 ease-out motion-reduce:transition-none hover:bg-accent/90',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark',
            )}
          >
            {donateLabel}
          </a>
          <p className="mt-3 text-center font-body text-sm text-paper/60">
            Securely processed by Donorbox. You can cancel a monthly gift anytime.
          </p>
        </div>
      </div>
    </Section>
  )
}

export default DonateWidget
