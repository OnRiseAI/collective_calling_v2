import { Link } from '@/i18n/navigation'
import { Emblem } from '@/components/layout/Emblem'
import { JOURNEY_HREF, MEET_THE_TEAM_HREF, SUPPORT_HREF } from '@/lib/nav'

/**
 * v3 editorial footer: a closing give/journey band, then four columns
 * (brand, explore, our work, get involved) and a legal strip. Used on the
 * designed interior pages. The homepage keeps its own slimmer Footer.
 */

const EXPLORE = [
  { label: 'Who we are', href: '/who-we-are' },
  { label: 'Meet the team', href: MEET_THE_TEAM_HREF },
  { label: 'What we do', href: '/what-we-do' },
  { label: 'Stories', href: '/stories' },
  { label: 'Impact', href: '/about/our-impact' },
  { label: 'Contact', href: '/contact' },
]

const OUR_WORK = [
  { label: 'Children & families', href: '/what-we-do#children-families' },
  { label: 'Homelessness & restoration', href: '/what-we-do#homelessness-restoration' },
  { label: 'Values in action', href: '/what-we-do#values-in-action' },
  { label: 'Events & experiences', href: '/events' },
]

const GET_INVOLVED = [
  { label: 'Find your path', href: JOURNEY_HREF },
  { label: 'Support our work', href: SUPPORT_HREF },
  { label: 'Volunteer', href: '/get-involved' },
  { label: 'Partner with us', href: '/get-involved/partner' },
]

function FooterCol({
  label,
  items,
}: {
  label: string
  items: { label: string; href: string }[]
}): React.JSX.Element {
  return (
    <nav aria-label={label}>
      <div className="text-[12px] font-bold tracking-[1.5px] text-[#F7F3EA]/55">{label}</div>
      <div className="mt-4 flex flex-col gap-0.5">
        {items.map((item) => (
          <Link
            key={item.href + item.label}
            href={item.href}
            className="flex min-h-[38px] items-center text-[14.5px] text-[#F7F3EA] transition-colors duration-200 hover:text-[#C89A3C]"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}

export function SiteFooter(): React.JSX.Element {
  return (
    <footer className="bg-[#141009] font-body text-[#F7F3EA]">
      <div className="mx-auto max-w-[1320px] px-16 pt-24 max-[680px]:px-7">
        <div className="flex items-end justify-between gap-12 border-b border-[#F7F3EA]/14 pb-16 max-lg:flex-col max-lg:items-start max-lg:gap-9">
          <div>
            <div className="h-0.5 w-10 bg-[#C89A3C]" />
            <h2 className="mt-[22px] max-w-[520px] font-heading text-[clamp(34px,3.4vw,48px)] font-normal leading-[1.18] text-balance">
              What you carry can change a{' '}life.
            </h2>
          </div>
          <div className="flex flex-none items-center gap-3.5 max-[680px]:w-full max-[680px]:flex-col max-[680px]:items-stretch">
            <Link
              href={SUPPORT_HREF}
              className="inline-flex min-h-[52px] items-center justify-center gap-3 rounded-[6px] bg-[#D9A83F] px-8 text-[13px] font-bold tracking-[1.4px] text-[#2A2415] whitespace-nowrap transition-all duration-[250ms] hover:-translate-y-px hover:bg-[#C89A3C]"
            >
              GIVE <span aria-hidden="true" className="text-[15px]">→</span>
            </Link>
            <Link
              href={JOURNEY_HREF}
              className="inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-[6px] border border-[#F7F3EA]/40 px-[26px] text-[13px] font-semibold tracking-[1.4px] text-[#F7F3EA] whitespace-nowrap transition-all duration-[250ms] hover:border-[#C89A3C] hover:text-[#C89A3C]"
            >
              START YOUR JOURNEY
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-[1.3fr_1fr_1fr_1fr] gap-14 py-16 max-lg:grid-cols-2 max-lg:gap-10 max-[680px]:grid-cols-1">
          <div>
            <div className="flex items-center gap-3">
              <Emblem />
              <span className="text-[13px] font-bold leading-[1.25] tracking-[1.5px]">
                COLLECTIVE
                <br />
                CALLING
              </span>
            </div>
            <p className="mt-5 max-w-[280px] text-[14px] leading-[1.8] text-[#F7F3EA]/75">
              We believe every person carries something that can impact the life of another. From
              Tanzania to Spain, we create environments where transformation happens.
            </p>
          </div>
          <FooterCol label="EXPLORE" items={EXPLORE} />
          <FooterCol label="OUR WORK" items={OUR_WORK} />
          <FooterCol label="GET INVOLVED" items={GET_INVOLVED} />
        </div>

        <div className="flex items-center justify-between gap-6 border-t border-[#F7F3EA]/14 py-[26px] max-[680px]:flex-col max-[680px]:items-start max-[680px]:gap-3.5">
          <div className="text-[12.5px] text-[#F7F3EA]/60">© Collective Calling 2026</div>
          <div className="flex items-center gap-7">
            <Link
              href="/privacy"
              className="text-[12.5px] text-[#F7F3EA]/60 transition-colors duration-200 hover:text-[#F7F3EA]"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-[12.5px] text-[#F7F3EA]/60 transition-colors duration-200 hover:text-[#F7F3EA]"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default SiteFooter
