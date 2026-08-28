import * as React from 'react'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { SiteFooter } from '@/components/layout/SiteFooter'

/**
 * Shared chrome for Privacy and Terms: v3 SiteHeader on a dark hero, cream
 * long-form body, SiteFooter. One h1 from the hero.
 */

export function LegalPage({
  eyebrow,
  title,
  lede,
  updated,
  children,
}: {
  eyebrow: string
  title: string
  lede: string
  updated: string
  children: React.ReactNode
}): React.JSX.Element {
  return (
    <div className="bg-[#F4F0E8] font-body text-[#1E1B17]">
      <SiteHeader tone="dark" />
      <section aria-label={title} className="bg-[#141009] px-16 pt-[170px] pb-[88px] max-[680px]:px-7">
        <div className="mx-auto max-w-[1320px]">
          <div className="flex items-center gap-4">
            <span className="text-[14px] font-bold tracking-[2.4px] text-[#C89A3C]">{eyebrow}</span>
            <span className="h-px w-10 bg-[#C89A3C]" />
          </div>
          <h1 className="mt-[22px] max-w-[720px] font-heading text-[64px] font-normal leading-[1.12] text-[#F7F3EA] max-[680px]:text-[42px]">
            {title}
          </h1>
          <p className="mt-6 max-w-[520px] text-[17px] leading-[1.75] text-[#F7F3EA]/95">{lede}</p>
          <p className="mt-8 text-[12.5px] font-semibold tracking-[1.4px] text-[#C89A3C]">
            Last updated {updated}
          </p>
        </div>
      </section>
      <article className="px-16 py-[88px] max-[680px]:px-7">
        <div className="mx-auto max-w-[720px] text-[16.5px] leading-[1.85] text-[#4A443B] [&_a]:font-semibold [&_a]:text-[#8A5F16] [&_code]:rounded [&_code]:bg-[#EDE8DD] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[13.5px] [&_h2]:mt-12 [&_h2]:font-heading [&_h2]:text-[32px] [&_h2]:font-normal [&_h2]:leading-[1.2] [&_h2]:text-[#1E1B17] [&_h2]:first:mt-0 [&_li]:mt-2 [&_p]:mt-5 [&_p:first-of-type]:mt-0 [&_ul]:mt-5 [&_ul]:list-disc [&_ul]:pl-6">
          {children}
        </div>
      </article>
      <SiteFooter />
    </div>
  )
}

export default LegalPage
