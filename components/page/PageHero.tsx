import * as React from 'react'
import Image from 'next/image'
import { Container } from '@/components/ui/Container'
import { cx } from '@/lib/cx'
import { noOrphan } from '@/lib/text'
import type { PageHero as PageHeroContent } from '@/lib/content/pages/types'

/**
 * PageHero is the header band for an About or programme page. It renders the
 * page's single `<h1>` and follows the brand board (sections 2, 3, 5, 6):
 *
 * - A gold eyebrow label (Mulish H5, uppercase, wide tracking) sits above the
 *   title. On a photographic hero the gold reads as warm light over navy.
 * - The title is Fraunces, `text-balance`, with a non-breaking space joining
 *   the last two words so there is never an orphan (the `&nbsp;` entity).
 * - An optional Mulish lede gives a calm one or two line subhead.
 *
 * Two visual modes:
 * - Photographic: when `content.image` is set, a full-bleed `next/image`
 *   (fill, object-cover, priority) sits under a `brand-dark` navy gradient that
 *   rises from the bottom so the text stays legible. Text is paper-white.
 * - Solid: otherwise a deep `brand-dark` midnight-navy band carries the text.
 *
 * This component must be the only `<h1>` on any page that uses it.
 */

type PageHeroProps = {
  content: PageHeroContent
}



export function PageHero({ content }: PageHeroProps) {
  const { eyebrow, title, lede, image, alt } = content
  const hasImage = Boolean(image)

  return (
    <header
      className={cx(
        'relative isolate overflow-hidden',
        // Generous, premium vertical pace; a touch taller when photographic so
        // the image has room to breathe.
        hasImage ? 'py-24 sm:py-32 lg:py-40' : 'py-20 sm:py-24 lg:py-32',
        'bg-brand-dark text-paper',
      )}
    >
      {hasImage ? (
        <>
          <Image
            src={image as string}
            alt={alt ?? ''}
            fill
            sizes="100vw"
            priority
            className="-z-20 object-cover"
          />
          {/* Navy gradient rising from the bottom (brand board section 5):
              stronger at the base where the text sits, lighter up top, with a
              steady wash so warm photography never washes out the copy. */}
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-gradient-to-t from-brand-dark via-brand-dark/70 to-brand-dark/30"
          />
        </>
      ) : null}

      <Container>
        <p className="font-body text-lg font-bold uppercase tracking-[0.08em] text-accent">
          {eyebrow}
        </p>

        <h1 className="mt-4 max-w-3xl font-heading text-[2.5rem] leading-[1.1] font-medium text-balance sm:text-5xl">
          {noOrphan(title)}
        </h1>

        {lede ? (
          <p className="mt-6 max-w-2xl font-body text-lg leading-[1.65] text-paper/85">
            {lede}
          </p>
        ) : null}
      </Container>
    </header>
  )
}

export default PageHero
