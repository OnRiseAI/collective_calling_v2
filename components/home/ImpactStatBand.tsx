import * as React from 'react'
import { Link } from '@/i18n/navigation'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { DONATE_HREF } from '@/lib/nav'
import { noOrphan } from '@/lib/text'

/**
 * Full-width big-number impact band (Tearfund's "1 in 10" strip), used as a
 * divider between content sections. Navy band, the standout figure in gold and
 * the rest of the line in white, with a bold white call to action beneath.
 *
 * Content integrity: this uses a real Collective Calling fact (the Centre of
 * Hope in Kasulu, Tanzania, currently home to 18 rescued children). Swap in a
 * sourced Spain statistic here when one is available.
 */
export function ImpactStatBand(): React.JSX.Element {
  return (
    <Section tone="dark" className="text-center">
      <p className="mx-auto max-w-3xl font-heading text-3xl font-bold leading-[1.2] sm:text-4xl lg:text-[2.75rem]">
        <span className="text-accent">18 children</span>{' '}
        <span className="text-paper">
          {noOrphan(
            'have found safety and a family at our Centre of Hope in Tanzania, rescued from the street.',
          )}
        </span>
      </p>

      <p className="mx-auto mt-6 max-w-2xl font-heading text-xl font-bold text-paper sm:text-2xl">
        Help us rescue the next one.
      </p>

      <div className="mt-8">
        <Button
          as={Link}
          href={DONATE_HREF}
          size="lg"
          className="bg-accent! font-bold text-brand-dark! hover:bg-accent/90! focus-visible:ring-offset-brand-dark!"
        >
          Donate
        </Button>
      </div>
    </Section>
  )
}

export default ImpactStatBand
