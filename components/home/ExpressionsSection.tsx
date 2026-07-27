import * as React from 'react'
import Image from 'next/image'
import { Eyebrow, PlainHeading, ArrowLink } from '@/components/home/primitives'
import { Reveal } from '@/components/ui/Reveal'
import type { HomeContent } from '@/lib/content/home.types'

/**
 * How it comes to life — design section 3. Three columns on a 48px gutter,
 * stepped 0 / 72 / 144px down the page, each with a 400px tall image at an 18px
 * radius. Below lg the columns stack and the steps are dropped.
 */

const STEPS = ['', 'mt-[72px] max-lg:mt-0', 'mt-[144px] max-lg:mt-0']

export function ExpressionsSection({
  content,
}: {
  content: HomeContent['expressions']
}): React.JSX.Element {
  return (
    <section className="px-16 pb-[120px] pt-[130px] max-md:px-6 max-md:pb-16 max-md:pt-16">
      <div className="mx-auto max-w-[1320px]">
        <Reveal className="mb-[90px] flex flex-wrap items-end justify-between gap-[60px] max-md:mb-9 max-md:gap-5">
          <div>
            <Eyebrow>{content.eyebrow}</Eyebrow>
            <PlainHeading
              text={content.heading}
              className="mb-0 mt-4 text-[56px] leading-[1.05] tracking-[-0.5px] max-md:text-[29px]"
            />
          </div>
          <p className="m-0 max-w-[380px] text-[16px] font-light leading-[1.7] text-muted max-md:text-[15px]">
            {content.intro}
          </p>
        </Reveal>

        <div className="grid grid-cols-3 items-start gap-12 max-lg:grid-cols-1 max-lg:gap-14 max-md:gap-11">
          {content.cards.map((card, index) => (
            <Reveal key={card.key} className={STEPS[index]} delay={index * 0.07}>
              <div className="relative h-[400px] w-full overflow-hidden rounded-[18px] max-md:h-[260px]">
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="mt-[28px] flex items-baseline gap-4">
                <span aria-hidden="true" className="font-heading text-[20px] italic text-accent">
                  {card.index}
                </span>
                <h3 className="m-0 font-heading text-[28px] font-normal tracking-normal max-md:text-[24px]">
                  {card.title}
                </h3>
              </div>
              <p className="mb-4 mt-3 text-[15px] font-light leading-[1.7] text-muted">
                <em className="font-heading text-[17px] italic text-accent">
                  {card.tagline}
                </em>
                <br />
                <br />
                {card.body}
              </p>
              <ArrowLink cta={card.cta} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ExpressionsSection
