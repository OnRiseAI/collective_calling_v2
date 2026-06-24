import * as React from 'react'
import { Section } from '@/components/ui/Section'
import type { HomeContent } from '@/lib/content/types'

/**
 * Trust signals band for the Collective Calling homepage.
 *
 * A quiet, understated band that closes the page with accountability: a gold
 * eyebrow ("Accountable to you"), a plain-spoken transparency statement, a clean
 * logo wall of the charity's real partners and supporters, and the exact
 * registration line.
 *
 * The logo wall is borderless (whitespace only). Every logo is height-normalised
 * (one optical weight) and shown full colour, the premium-restraint "trusted by"
 * treatment benchmarked against Tearfund. Logos are real harvested assets in
 * /public/logos/.
 *
 * Heading hierarchy: the hero owns the page h1, so the section title is an h2,
 * matching the eyebrow -> h2 -> supporting-text pattern of the other homepage
 * sections.
 *
 * The registration string already contains middot separators and is rendered
 * verbatim. It is never reformatted.
 */

const EYEBROW = 'Accountable to you'

// Data-driven so partners are easy to add/remove. `src` points at the cleanest
// available official asset in /public/logos/ (SVG preferred, transparent PNG
// fallback). See sourcing notes: Spence Clarke is a pale taupe wordmark (reads
// faint under greyscale), SANA is icon-only (no dark-on-light wordmark exists).
const LOGOS: { name: string; src: string }[] = [
  { name: 'Junta de Andalucía', src: '/logos/junta-de-andalucia.svg' },
  { name: 'Ayuntamiento de Marbella', src: '/logos/marbella.svg' },
  { name: 'Rotary Club Marbella-Guadalmina', src: '/logos/rotary.svg' },
  { name: 'Spence Clarke', src: '/logos/spence-clarke.png' },
  { name: 'Fundación Elena Gaite', src: '/logos/elena-gaite.png' },
  { name: 'Mariposa Energía', src: '/logos/mariposa.png' },
  { name: 'SANA Catering', src: '/logos/sana.png' },
  { name: 'The Wave', src: '/logos/wave.jpg' },
]

export function TrustSignals(props: { content: HomeContent['trust'] }): React.JSX.Element {
  const { content } = props
  const { registration, statement } = content

  // Give the band a real heading without inventing copy: the first sentence of
  // the transparency statement becomes the bold section heading, and the rest is
  // the supporting line beneath it.
  const [firstSentence, ...rest] = statement.split('. ')
  const heading = firstSentence.endsWith('.') ? firstSentence : `${firstSentence}.`
  const supporting = rest.join('. ')

  return (
    <Section tone="paper">
      <div className="mx-auto max-w-4xl text-center">
        {/* A thin gold rule, centred, that flags the trust note. Calm, not a badge. */}
        <span aria-hidden="true" className="mx-auto block h-px w-10 bg-accent" />

        {/* Eyebrow: gold, uppercase, small. */}
        <p className="mt-5 font-body text-sm font-bold uppercase tracking-[0.18em] text-accent">
          {EYEBROW}
        </p>

        {/* Section heading: bold, display, leads the band like the other sections. */}
        <h2 className="mx-auto mt-4 max-w-3xl text-balance font-heading text-3xl font-bold leading-[1.12] text-brand-dark sm:text-[38px]">
          {heading}
        </h2>

        {/* Supporting line, in the brand's own plain voice. */}
        {supporting && (
          <p className="mx-auto mt-5 max-w-2xl text-pretty font-body text-lg leading-relaxed text-muted">
            {supporting}
          </p>
        )}

        {/* Sub-label: small, light, uppercase. Quieter than the eyebrow so the
            hierarchy reads eyebrow > statement > sub-label. */}
        <p className="mt-12 font-body text-xs uppercase tracking-[0.15em] text-slate-400">
          With thanks to our partners and supporters
        </p>

        {/* Borderless logo wall. Each logo is height-normalised (max-h-11) inside
            a fixed-height cell so wide wordmarks and tall crests read at one
            weight. Shown full colour. */}
        <ul className="mt-8 grid grid-cols-2 items-center gap-x-12 gap-y-12 sm:grid-cols-4">
          {LOGOS.map((logo) => (
            <li key={logo.name} className="flex h-14 items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logo.src}
                alt={logo.name}
                className="max-h-11 w-auto object-contain"
                loading="lazy"
                decoding="async"
              />
            </li>
          ))}
        </ul>

        {/* The exact registration line, rendered verbatim with its own middot
            separators. Quiet, the smallest type on the page. A hairline rule
            above sets it apart as the legal footnote. */}
        <p className="mx-auto mt-14 max-w-2xl border-t border-ink/10 pt-6 font-body text-sm leading-relaxed text-muted">
          {registration}
        </p>
      </div>
    </Section>
  )
}

export default TrustSignals
