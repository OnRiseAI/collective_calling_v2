import * as React from 'react'
import Image from 'next/image'
import type { Partner } from '@/lib/content/pages/types'

/**
 * PartnerList renders the charity's supporting organisations as a tidy,
 * responsive grid of cards. It is the Our Partners expression of the brand board
 * card spec (section 6): white cards with a soft warm border, a thin antique-gold
 * top rule (gold = general), and a low warm shadow.
 *
 * Each card carries:
 * - a logo panel: a `next/image` set with `contain` so mixed source aspect
 *   ratios sit neatly on a white field (the harvested logos are colour marks on
 *   white or transparency, so white keeps them legible and on-brand). When a
 *   partner has no harvested logo, a clean name plate stands in: the partner's
 *   name set in Fraunces on a soft indigo tint, so a missing logo never becomes a
 *   fabricated mark.
 * - a Fraunces partner name (h3, a sub-section heading so the page hero keeps the
 *   only h1).
 * - an optional Mulish blurb in warm taupe (omitted where the source gave none).
 * - an optional external link. Partner sites are third-party, so links open in a
 *   new tab with `rel="noopener noreferrer"` and never carry a locale prefix.
 *
 * The grid is one column on phones, two from the small breakpoint, and three from
 * large up, so logos stay generous and the rhythm stays calm.
 */

type PartnerListProps = {
  partners: Partner[]
}

function cx(...parts: Array<string | undefined | false>): string {
  return parts.filter(Boolean).join(' ')
}

/**
 * Tidy a website href into a plain display label for the visit link: drop the
 * protocol and any leading "www." and trailing slash, so "https://www.drumelia.com/"
 * reads as "drumelia.com".
 */
function displayHost(href: string): string {
  return href
    .replace(/^https?:\/\//i, '')
    .replace(/^www\./i, '')
    .replace(/\/$/, '')
}

function PartnerLogo({ partner }: { partner: Partner }) {
  if (partner.logo) {
    return (
      <div className="flex h-36 w-full items-center justify-center bg-white px-8 py-6">
        <div className="relative h-full w-full">
          <Image
            src={partner.logo}
            alt={`${partner.name} logo`}
            fill
            sizes="(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 100vw"
            className="object-contain"
          />
        </div>
      </div>
    )
  }

  // Name plate fallback: a calm indigo-tint field with the partner name in
  // Fraunces brand indigo, so a missing logo stays dignified and never invented.
  return (
    <div
      aria-hidden
      className="flex h-36 w-full items-center justify-center bg-indigo-tint px-8 py-6"
    >
      <span className="text-center font-heading text-2xl font-medium text-balance text-brand">
        {partner.name}
      </span>
    </div>
  )
}

function PartnerCard({ partner }: { partner: Partner }) {
  return (
    <li
      className={cx(
        'group flex h-full flex-col overflow-hidden rounded-xl bg-white',
        'border border-muted/20 border-t-2 border-t-accent',
        'shadow-[0_8px_24px_rgba(31,27,22,0.08)]',
        'transition-shadow duration-200 ease-out',
        'hover:shadow-[0_12px_32px_rgba(31,27,22,0.12)]',
      )}
    >
      <PartnerLogo partner={partner} />

      <div className="flex flex-1 flex-col gap-3 border-t border-muted/15 p-6 lg:p-7">
        <h3 className="font-heading text-[1.375rem] leading-[1.3] font-semibold text-balance text-ink">
          {partner.name}
        </h3>

        {partner.blurb ? (
          <p className="font-body text-base leading-[1.65] text-muted">
            {partner.blurb}
          </p>
        ) : null}

        {partner.href ? (
          <a
            href={partner.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cx(
              'mt-auto inline-flex w-fit items-center gap-1 font-body text-sm font-semibold text-brand',
              'underline decoration-accent decoration-2 underline-offset-4 decoration-transparent',
              'transition-[text-decoration-color] duration-200 hover:decoration-accent',
            )}
          >
            <span>Visit {displayHost(partner.href)}</span>
            <span aria-hidden>{'↗'}</span>
          </a>
        ) : null}
      </div>
    </li>
  )
}

export function PartnerList({ partners }: PartnerListProps) {
  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
      {partners.map((partner) => (
        <PartnerCard key={partner.name} partner={partner} />
      ))}
    </ul>
  )
}

export default PartnerList
