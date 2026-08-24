import * as React from 'react'
import Image from 'next/image'
import { Eyebrow, DisplayHeading, ArrowLink } from '@/components/home/primitives'
import { Reveal } from '@/components/ui/Reveal'
import type { HomeContent } from '@/lib/content/home.types'

/**
 * See what's possible — design section 6. A 1.35fr / 1fr grid on a 56px gutter:
 * one 520px feature beside two 220px cards stacked at the same 56px. Below lg
 * the two columns stack.
 */
export function StoriesSection({
  content,
}: {
  content: HomeContent['stories']
}): React.JSX.Element {
  return (
    <section className="px-16 py-[140px] max-md:px-6 max-md:py-16">
      <div className="mx-auto max-w-[1320px]">
        <Reveal className="mb-[70px] flex items-end justify-between max-md:mb-9 max-md:flex-col max-md:items-start max-md:gap-4">
          <div>
            <Eyebrow>{content.eyebrow}</Eyebrow>
            <DisplayHeading
              heading={content.heading}
              breakBefore
              className="mb-0 mt-4 text-[56px] leading-[1.05] tracking-[-0.5px] max-md:text-[29px]"
            />
          </div>
          <ArrowLink cta={content.viewAll} className="whitespace-nowrap" />
        </Reveal>

        <div className="grid grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] items-start gap-14 max-lg:grid-cols-1 max-md:gap-10">
          <Reveal>
            <div className="relative h-[520px] w-full overflow-hidden rounded-[18px] max-md:h-[270px]">
              <Image
                src={content.feature.image}
                alt={content.feature.alt}
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover"
              />
            </div>
            <h3 className="mb-2 mt-[26px] font-heading text-[32px] font-normal tracking-normal max-md:mt-5 max-md:text-[24px]">
              {content.feature.title}
            </h3>
            <p className="mb-[14px] mt-0 text-[15.5px] font-normal text-muted max-md:text-[15px]">
              {content.feature.blurb}
            </p>
            <ArrowLink cta={{ label: 'READ MORE', href: content.feature.href }} />
          </Reveal>

          <div className="flex min-w-0 flex-col gap-14 max-md:gap-10">
            {content.cards.map((card, index) => (
              <Reveal key={card.title} delay={(index + 1) * 0.07}>
                <div className="relative h-[220px] w-full overflow-hidden rounded-[18px] max-md:h-[200px]">
                  <Image
                    src={card.image}
                    alt={card.alt}
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <h3 className="mb-[6px] mt-5 font-heading text-[25px] font-normal tracking-normal max-md:text-[21px]">
                  {card.title}
                </h3>
                <p className="mb-3 mt-0 text-[15px] font-normal text-muted">{card.blurb}</p>
                <ArrowLink cta={{ label: 'READ MORE', href: card.href }} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default StoriesSection
