import * as React from 'react'
import Image from 'next/image'
import { Eyebrow, DisplayHeading, PillLink } from '@/components/home/primitives'
import { Reveal } from '@/components/ui/Reveal'
import type { HomeContent } from '@/lib/content/home.types'

/**
 * Impact invitation — design section 7. A navy card at a 24px radius with the
 * photograph held at 35% behind a 105deg gradient, and three concentric rings
 * hung off the top-right corner at 14%.
 */
export function ImpactCta({ content }: { content: HomeContent['impactCta'] }): React.JSX.Element {
  return (
    <section className="px-16 pb-[120px] max-md:px-6 max-md:pb-16">
      <Reveal className="relative mx-auto max-w-[1320px] overflow-hidden rounded-[24px] bg-band">
        <Image
          src={content.image}
          alt={content.alt}
          fill
          sizes="(min-width: 1320px) 1320px, 100vw"
          className="absolute inset-0 h-full w-full object-cover opacity-[0.35]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(105deg, rgba(13,21,38,0.97) 0%, rgba(13,21,38,0.82) 55%, rgba(13,21,38,0.35) 100%)',
          }}
        />
        <svg
          aria-hidden="true"
          viewBox="0 0 38 38"
          fill="none"
          className="pointer-events-none absolute -right-[70px] -top-[70px] h-[340px] w-[340px] opacity-[0.14]"
        >
          <circle cx="19" cy="19" r="17" stroke="#C89A3C" strokeWidth="0.6" />
          <circle cx="19" cy="19" r="10.5" stroke="#C89A3C" strokeWidth="0.4" />
          <circle cx="19" cy="19" r="5.5" stroke="#C89A3C" strokeWidth="0.5" />
        </svg>

        <div className="relative flex flex-wrap items-center justify-between gap-12 p-24 max-md:gap-7 max-md:p-7">
          <div>
            <Eyebrow>{content.eyebrow}</Eyebrow>
            <DisplayHeading
              as="h3"
              heading={content.heading}
              className="mb-0 mt-4 max-w-[640px] text-[52px] leading-[1.12] tracking-normal text-[#f8f4eb] max-md:text-[27px]"
            />
          </div>
          <PillLink
            cta={content.cta}
            padding="px-[46px] py-5"
            className="whitespace-nowrap"
          />
        </div>
      </Reveal>
    </section>
  )
}

export default ImpactCta
