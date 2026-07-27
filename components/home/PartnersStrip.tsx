import * as React from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import type { HomeContent } from '@/lib/content/home.types'

/**
 * Trusted partners — design section 8. A hairline, the label, then the marks:
 * a 52px square logo, two letterspaced capitals, one name in the display serif
 * italic, and the dashed slot that closes the row.
 */
export function PartnersStrip({
  content,
}: {
  content: HomeContent['partners']
}): React.JSX.Element {
  return (
    <section className="px-16 pb-[130px] max-md:px-6 max-md:pb-20">
      <div className="mx-auto flex max-w-[1320px] flex-wrap items-center justify-between gap-12 border-t border-rule pt-14">
        <span className="whitespace-nowrap text-[12px] font-semibold tracking-[3px] text-muted-soft">
          {content.label}
        </span>
        <div className="flex flex-wrap items-center gap-14 opacity-75 max-md:gap-8">
          {content.marks.map((mark) =>
            mark.logo ? (
              <Image
                key={mark.name}
                src={mark.logo}
                alt={mark.name}
                width={52}
                height={52}
                className="h-[52px] w-[52px] rounded-[8px] object-cover"
              />
            ) : mark.style === 'italic' ? (
              <span key={mark.name} className="font-heading text-[19px] italic">
                {mark.name}
              </span>
            ) : (
              <span key={mark.name} className="text-[17px] font-semibold tracking-[2px]">
                {mark.name}
              </span>
            ),
          )}
          <Link
            href={content.logoSlot.href}
            className="border border-dashed border-[#b0a892] px-5 py-3 text-[12px] tracking-[1px] text-muted-soft transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            {content.logoSlot.label}
          </Link>
        </div>
      </div>
    </section>
  )
}

export default PartnersStrip
