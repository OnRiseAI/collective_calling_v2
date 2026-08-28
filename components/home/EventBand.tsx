import { Link } from '@/i18n/navigation'
import { Reveal } from '@/components/ui/Reveal'
import { FASHION_SHOW_HREF, FASHION_SHOW_RESERVE_HREF } from '@/lib/nav'

/**
 * Homepage upcoming-event band from the v3 homepage (`Collective Calling v2.dc.html`).
 * Sits under the hero. Time and venue stay to be confirmed.
 */
export function EventBand(): React.JSX.Element {
  return (
    <section
      aria-label="Upcoming event"
      className="border-t border-[#D9A83F]/45 bg-[#141009]"
    >
      <Reveal className="mx-auto flex max-w-[1320px] flex-wrap items-center justify-between gap-12 px-16 py-14 max-[680px]:px-7">
        <div className="min-w-0">
          <div className="text-[13px] font-bold tracking-[2.4px] text-[#D9A83F]">
            THURSDAY 24 SEPTEMBER 2026
          </div>
          <h2 className="mt-3.5 font-heading text-[40px] font-normal leading-[1.15] text-[#F7F3EA] max-[680px]:text-[32px]">
            The Fashion Show
          </h2>
          <p className="mt-3 text-[15px] leading-[1.7] text-[#F7F3EA]/85">
            An evening of fashion in support of Collective Calling&rsquo;s work in Spain and
            Tanzania.
          </p>
          <p className="mt-2 text-[13px] tracking-[0.4px] text-[#F7F3EA]/60">
            Venue and doors to be confirmed
          </p>
        </div>
        <div className="flex flex-none items-center gap-3.5 max-[680px]:w-full max-[680px]:flex-col max-[680px]:items-stretch">
          <a
            href={FASHION_SHOW_RESERVE_HREF}
            className="inline-flex min-h-[52px] items-center justify-center gap-3 rounded-[6px] bg-[#D9A83F] px-[30px] text-[13px] font-bold tracking-[1.4px] text-[#2A2415] whitespace-nowrap transition-all duration-[250ms] hover:-translate-y-px hover:bg-[#C89A3C]"
          >
            RESERVE YOUR PLACE <span aria-hidden="true">→</span>
          </a>
          <Link
            href={FASHION_SHOW_HREF}
            className="inline-flex min-h-[52px] items-center justify-center rounded-[6px] border border-[#F7F3EA]/40 px-6 text-[13px] font-semibold tracking-[1.4px] text-[#F7F3EA] whitespace-nowrap transition-all duration-[250ms] hover:border-[#C89A3C] hover:text-[#C89A3C]"
          >
            FIND OUT MORE
          </Link>
        </div>
      </Reveal>
    </section>
  )
}

export default EventBand
