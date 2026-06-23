import * as React from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/Button'
import { DONATE_HREF } from '@/lib/nav'
import { noOrphan } from '@/lib/text'
import type { HomeContent } from '@/lib/content/types'

/**
 * Photographic hero for the Collective Calling homepage.
 *
 * The brand board calls the photography the soul of the brand, so this section
 * leads with a full-bleed documentary photograph (warm Tanzania / Spain field
 * work) rather than a flat colour field. Legibility comes from a midnight-navy
 * (`brand-dark`) gradient that is nearly clear at the top, so the image breathes,
 * and deepens toward the bottom-left where the text sits (brand board section 5:
 * navy overlay at 35 to 60 percent, gradient from the bottom).
 *
 * Composition (left-aligned, constrained reading width, about 80vh tall):
 *  - a gold eyebrow with a short gold rule, echoing the gala poster's warm gold
 *    lettering. Gold on the navy overlay reads as warm light (brand board section 2:
 *    gold for text is allowed only on brand-dark).
 *  - a Fraunces display headline with text-balance and a non-breaking space joining
 *    its last two words so there are no orphans (brand board headline rule).
 *  - a Mulish lede in light paper text (text-paper/85).
 *  - the gold-led Donate action (the one place gold leads, brand board section 6),
 *    plus a calm secondary link through to the appeals.
 *
 * It takes only the provided hero content. No invented stats or extra copy.
 */


export function Hero(props: { content: HomeContent['hero'] }): React.JSX.Element {
  const { content } = props

  return (
    <section className="relative isolate overflow-hidden bg-brand-dark text-paper">
      {/* Full-bleed documentary photograph. priority because this is the LCP
          image; fill + object-cover so it covers the field at every size. */}
      <Image
        src={content.image}
        alt={content.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Navy gradient: clear at the top so the photo breathes, deepening to a
          legible field at the bottom-left where the copy sits. Two stacked
          gradients (vertical bottom-up + a gentle left-side lift) keep the text
          readable without flattening the whole image. */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(to top, rgba(15,35,71,0.92) 0%, rgba(15,35,71,0.78) 22%, rgba(15,35,71,0.45) 52%, rgba(15,35,71,0.20) 78%, rgba(15,35,71,0.10) 100%), ' +
            'linear-gradient(to right, rgba(15,35,71,0.55) 0%, rgba(15,35,71,0.15) 45%, transparent 72%)',
        }}
      />

      {/* Content column: left-aligned, constrained reading width, vertically
          centred in a generous ~80vh field. */}
      <div className="relative mx-auto flex min-h-[80vh] w-full max-w-7xl flex-col justify-center px-6 py-24 sm:px-8 sm:py-28 lg:px-12">
        <div className="max-w-2xl">
          {/* Eyebrow: gold, uppercase, bold body face, with a short gold rule that
              echoes the gala poster's gold lettering. */}
          <p className="flex items-center gap-3 font-body text-sm font-bold uppercase tracking-[0.18em] text-accent">
            <span aria-hidden="true" className="h-px w-8 bg-accent" />
            {content.eyebrow}
          </p>

          <h1 className="mt-6 text-balance font-heading text-4xl font-medium leading-[1.05] text-paper sm:text-5xl lg:text-[4rem]">
            {noOrphan(content.headline)}
          </h1>

          <p className="mt-7 max-w-xl text-balance font-body text-lg leading-relaxed text-paper/85">
            {content.lede}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            {/* Donate: the one place gold leads. Important modifiers ensure the gold
                fill wins over the primary variant background (brand board section 6). */}
            <Button
              as={Link}
              href={DONATE_HREF}
              size="lg"
              className="bg-accent! text-brand-dark! hover:bg-accent/90! focus-visible:ring-offset-brand-dark!"
            >
              Donate
            </Button>

            {/* Secondary, calm: a ghost-style link through to the appeals. Gold
                underline grows on hover; gold focus ring offset against navy. */}
            <Link
              href="/appeals"
              className="group inline-flex items-center gap-2 font-body font-semibold text-paper underline decoration-2 decoration-transparent underline-offset-[6px] transition-[color,text-decoration-color] duration-200 hover:decoration-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
            >
              See our appeals
              <svg
                aria-hidden="true"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              >
                <path
                  d="M3.5 9h11M10 4.5 14.5 9 10 13.5"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
