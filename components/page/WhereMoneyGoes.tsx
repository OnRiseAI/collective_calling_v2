import * as React from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { DONATE_HREF } from '@/lib/nav'
import { noOrphan } from '@/lib/text'
import type { MoneySplit } from '@/lib/content/types'

/**
 * "Where your money goes" for the Collective Calling homepage.
 *
 * Split layout (Tearfund's "how we maximise every pound"): a Collective Calling
 * photograph on one side and a white stat card on the other holding a donut of
 * the programmes / running-costs split, a labelled figure with one supporting
 * line each, the gold Donate action, and a link to Financial Accountability.
 *
 * The split is driven entirely from the content props (programsPct / adminPct).
 * Heading hierarchy: the hero owns the page h1, so this section heading is an h2.
 */

function Donut({
  programsPct,
  adminPct,
  label,
}: {
  programsPct: number
  adminPct: number
  label: string
}): React.JSX.Element {
  const r = 42
  const c = 2 * Math.PI * r
  const programsLen = (programsPct / 100) * c
  const adminLen = (adminPct / 100) * c

  return (
    <div className="relative mx-auto mt-8 h-44 w-44">
      <svg viewBox="0 0 120 120" role="img" aria-label={label} className="h-full w-full">
        <circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          stroke="var(--color-brand)"
          strokeWidth="18"
          strokeDasharray={`${programsLen} ${c}`}
          transform="rotate(-90 60 60)"
        />
        <circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="18"
          strokeDasharray={`${adminLen} ${c}`}
          strokeDashoffset={`-${programsLen}`}
          transform="rotate(-90 60 60)"
        />
      </svg>
      <span className="absolute right-0 top-4 rounded-full bg-brand px-3 py-1 text-sm font-bold text-paper shadow">
        {programsPct}%
      </span>
      <span className="absolute bottom-5 left-0 rounded-full bg-accent px-3 py-1 text-sm font-bold text-brand-dark shadow">
        {adminPct}%
      </span>
    </div>
  )
}

export function WhereMoneyGoes(props: { content: MoneySplit }): React.JSX.Element {
  const { content } = props
  const { programsPct, adminPct, programsLabel, adminLabel, note } = content

  const splitLabel =
    `${programsPct} percent ${programsLabel}, ` + `${adminPct} percent ${adminLabel}.`

  return (
    <Section tone="indigo-tint" container={false} className="overflow-x-clip">
      <Container size="wide" className="relative">
        {/* Collective Calling photograph. Full-bleed across the top on mobile;
            on desktop it bleeds to the left viewport edge (square left, rounded
            right) while its right edge meets the contained grid at centre. */}
        <div className="relative -mx-6 h-[300px] overflow-hidden sm:-mx-8 sm:h-[340px] lg:absolute lg:inset-y-0 lg:left-[calc(50%_-_50vw)] lg:mx-0 lg:h-auto lg:w-[50vw] lg:rounded-r-2xl">
          <Image
            src="/images/tanzania/caleb-after.jpg"
            alt="A child cared for through Collective Calling's work in Tanzania."
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover object-center"
          />
        </div>

        {/* White stat card: stays in the contained grid on the right, its right
            edge aligned with the other contained sections. */}
        <div className="lg:ml-auto lg:flex lg:min-h-[560px] lg:w-1/2 lg:items-center lg:pl-12">
          <div className="mx-auto mt-10 w-full max-w-[560px] rounded-md bg-paper p-8 shadow-[0_16px_40px_rgba(15,35,71,0.12)] sm:p-10 lg:mx-0 lg:mt-0">
            <Eyebrow>Where your money goes</Eyebrow>
            <h2 className="mt-5 text-balance font-heading text-3xl font-bold leading-[1.12] text-brand-dark sm:text-[38px]">
              {noOrphan('Most of every gift reaches the people we serve')}
            </h2>
            <span aria-hidden="true" className="mt-4 block h-1 w-12 rounded-full bg-accent" />

            <Donut programsPct={programsPct} adminPct={adminPct} label={splitLabel} />

            <dl className="mt-8 grid gap-6 sm:grid-cols-2">
              <div>
                <dt className="flex items-baseline gap-2 font-heading text-3xl font-bold leading-none text-brand">
                  <span aria-hidden="true" className="h-3 w-3 self-center rounded-full bg-brand" />
                  {programsPct}%
                </dt>
                <dd className="mt-2 font-body text-base leading-snug text-ink">{programsLabel}</dd>
              </div>
              <div>
                <dt className="flex items-baseline gap-2 font-heading text-3xl font-bold leading-none text-brand-dark">
                  <span aria-hidden="true" className="h-3 w-3 self-center rounded-full bg-accent" />
                  {adminPct}%
                </dt>
                <dd className="mt-2 font-body text-base leading-snug text-ink">{adminLabel}</dd>
              </div>
            </dl>

            <p className="mt-8 font-body text-sm leading-relaxed text-muted">{note}</p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Button
                as={Link}
                href={DONATE_HREF}
                size="lg"
                className="bg-accent! font-bold text-brand-dark! hover:bg-accent/90!"
              >
                Donate
              </Button>
              <Link
                href="/about/financial-accountability"
                className="font-body font-semibold text-brand underline decoration-2 decoration-transparent underline-offset-4 transition-colors hover:decoration-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
              >
                Read more about where your money goes
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}

export default WhereMoneyGoes
