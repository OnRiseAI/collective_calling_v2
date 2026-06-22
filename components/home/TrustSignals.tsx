import * as React from 'react'
import { Section } from '@/components/ui/Section'
import type { HomeContent } from '@/lib/content/types'

/**
 * Trust signals band for the Collective Calling homepage.
 *
 * A quiet, understated band that closes the page with accountability: a gold
 * eyebrow ("Accountable to you"), a plain-spoken transparency statement, the
 * charity's real partners shown as a tidy text row (no fabricated logos), and
 * the exact registration line.
 *
 * Per the brand board this is a calm warm-ivory paper band with the gold eyebrow
 * (H5, uppercase) treatment used across the homepage. It is deliberately the
 * least loud section on the page: no badges, no ratings, no logo images. The one
 * decorative flourish is gold middot separators in the partner row that rhyme
 * with the middots already in the registration line.
 *
 * Heading hierarchy: the hero owns the page h1. This band has no section heading
 * (the eyebrow is a <p>), so it introduces no extra heading level.
 *
 * The registration string already contains middot separators and is rendered
 * verbatim. It is never reformatted.
 */

const EYEBROW = 'Accountable to you'

export function TrustSignals(props: { content: HomeContent['trust'] }): React.JSX.Element {
  const { content } = props
  const { registration, statement, partners } = content

  return (
    <Section tone="paper">
      <div className="mx-auto max-w-3xl text-center">
        {/* A thin gold rule, centred, that flags the trust note and echoes the
            gala poster's warm gold lettering. Calm, not a badge. */}
        <span aria-hidden="true" className="mx-auto block h-px w-10 bg-accent" />

        {/* Eyebrow: gold, uppercase, bold body face. A <p>, not a heading, so the
            band adds no heading level beneath the hero h1. */}
        <p className="mt-5 font-body text-sm font-bold uppercase tracking-[0.18em] text-accent">
          {EYEBROW}
        </p>

        {/* The transparency statement, in the brand's own plain voice. Held to a
            comfortable reading width and centred for a settled, closing feel. */}
        <p className="mx-auto mt-5 max-w-2xl text-pretty font-body text-lg leading-relaxed text-ink/90">
          {statement}
        </p>

        {/* Partners as a tidy text row. Names only, no logo images. Gold middot
            separators sit between them (hidden from assistive tech, which reads
            each name as its own list item). The list wraps gracefully on narrow
            screens. */}
        {partners.length > 0 && (
          <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-body text-base font-semibold text-ink">
            {partners.map((partner, index) => (
              <li key={partner} className="flex items-center gap-x-4">
                {index > 0 && (
                  <span aria-hidden="true" className="select-none text-accent">
                    ·
                  </span>
                )}
                <span>{partner}</span>
              </li>
            ))}
          </ul>
        )}

        {/* The exact registration line, rendered verbatim with its own middot
            separators. Quiet, in warm muted ink, the smallest type on the page.
            A hairline rule above sets it apart as the legal footnote. */}
        <p className="mx-auto mt-10 max-w-2xl border-t border-ink/10 pt-6 font-body text-sm leading-relaxed text-muted">
          {registration}
        </p>
      </div>
    </Section>
  )
}

export default TrustSignals
