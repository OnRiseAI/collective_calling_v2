import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { PageHero } from '@/components/page/PageHero'
import { Section } from '@/components/ui/Section'
import { WhereMoneyGoes } from '@/components/home/WhereMoneyGoes'
import { DonorboxEmbed } from '@/components/donate/DonorboxEmbed'
import { donateHubContent } from '@/lib/content/pages/donateHub'

/**
 * Donate hub (/donate).
 *
 * The destination every gold Donate CTA across the site points at
 * (DONATE_HREF = '/donate'). An async server component that composes the page
 * from typed content and the shared toolkit, mirroring the sibling pages so the
 * whole site feels like one connected charity:
 *  1. PageHero, which owns the page's only h1 ("Your gift restores dignity"),
 *     with the gold "Give today" eyebrow. Solid navy mode.
 *  2. The Donorbox form as the centerpiece: a short intro, then the embedded
 *     live form (default campaign giving-41, no special query). The form is a
 *     client + lazy iframe, so the page still prerenders.
 *  3. A "what your gift does" framing: three concise, real, non-guaranteeing
 *     lines about the work a gift supports.
 *  4. The 83/17 split, reused from the homepage WhereMoneyGoes component, then a
 *     Link to /about/financial-accountability for the full breakdown.
 *  5. A reassurance block: secure giving through Donorbox, one-time or monthly,
 *     and the four designations a supporter can choose.
 *  6. A closing band linking to /donate/ways-to-give and
 *     /get-involved/sponsor-a-child.
 *
 * Heading hierarchy is strict: the hero owns the h1; every section heading is
 * h2 (WhereMoneyGoes renders its own internal h2, which is correct). No em
 * dashes anywhere.
 */
export default async function DonatePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const { hero, intro, giftDoes, money, fullBreakdown, reassurance, designations, more } =
    donateHubContent

  return (
    <>
      <PageHero content={hero} />

      {/* The centerpiece: a short framing line, then the live Donorbox form.
          The form owns the visual interior; the band around it stays calm. */}
      <Section tone="paper">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-body text-lg leading-[1.65] text-ink">{intro}</p>
        </div>
        <div className="mt-12">
          <DonorboxEmbed />
        </div>
      </Section>

      {/* What your gift does: concise, real, non-guaranteeing lines on a soft
          cool band, each with a gold top rule (gold = general). */}
      <Section tone="indigo-tint">
        <div className="max-w-2xl">
          <p className="flex items-center gap-3 font-body text-sm font-bold uppercase tracking-[0.18em] text-accent">
            <span aria-hidden="true" className="h-px w-8 bg-accent" />
            {giftDoes.eyebrow}
          </p>
          <h2 className="mt-5 text-balance font-heading text-3xl font-medium leading-[1.15] text-ink sm:text-4xl">
            {giftDoes.heading}
          </h2>
        </div>

        <dl className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6">
          {giftDoes.items.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border-t-2 border-accent bg-paper px-7 py-8 shadow-[0_8px_24px_rgba(31,27,22,0.08)]"
            >
              <dt className="font-heading text-[1.375rem] leading-[1.3] font-semibold text-ink">
                {item.title}
              </dt>
              <dd className="mt-3 font-body text-base leading-[1.6] text-muted">
                {item.body}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* The 83/17 split, reused from the homepage so the same honest picture
          renders here. It carries its own eyebrow, h2, the role="img" split bar,
          the two labelled figures, the accountability note, and a gold Donate
          action. We follow it with a quiet link to the full breakdown. */}
      <WhereMoneyGoes content={money} />

      <Section tone="paper" className="pt-0!">
        <div className="max-w-3xl">
          <Link
            href={fullBreakdown.href}
            className="font-body text-lg font-medium text-brand underline decoration-accent decoration-2 underline-offset-4 hover:text-brand-dark"
          >
            {fullBreakdown.label}
          </Link>
        </div>
      </Section>

      {/* Reassurance: secure giving through Donorbox, one-time or monthly, and
          the four designations a supporter can choose. Deep navy where gold
          reads as warm light, so the most reassuring moment is also the warmest. */}
      <Section tone="dark">
        <div className="max-w-2xl">
          <p className="font-body text-lg font-bold uppercase tracking-[0.08em] text-accent">
            {reassurance.eyebrow}
          </p>
          <h2 className="mt-3 text-balance font-heading text-[2.25rem] font-medium leading-[1.15] text-paper">
            {reassurance.heading}
          </h2>
          <p className="mt-6 font-body text-lg leading-[1.65] text-paper/85">
            {reassurance.body}
          </p>

          <ul className="mt-8 space-y-3">
            {reassurance.points.map((point) => (
              <li key={point} className="flex gap-3 font-body text-base leading-[1.6] text-paper/90">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* The four giving designations, as a quiet card grid on the navy band. */}
        <dl className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {designations.map((designation) => (
            <div
              key={designation.name}
              className="rounded-xl border border-paper/15 bg-paper/5 px-7 py-6"
            >
              <dt className="font-heading text-[1.375rem] leading-[1.3] font-semibold text-paper">
                {designation.name}
              </dt>
              <dd className="mt-2 font-body text-base leading-[1.6] text-paper/80">
                {designation.body}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* Closing band: other ways to help. Two clear paths out. */}
      <Section tone="clay-tint">
        <div className="max-w-2xl">
          <p className="font-body text-lg font-bold uppercase tracking-[0.08em] text-clay">
            {more.eyebrow}
          </p>
          <h2 className="mt-3 text-balance font-heading text-[2.25rem] font-medium leading-[1.15] text-ink">
            {more.heading}
          </h2>
          <p className="mt-6 font-body text-lg leading-[1.65] text-ink">{more.body}</p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:gap-8">
            <Link
              href={more.waysToGive.href}
              className="font-body text-lg font-semibold text-brand underline decoration-accent decoration-2 underline-offset-4 hover:text-brand-dark"
            >
              {more.waysToGive.label}
            </Link>
            <Link
              href={more.sponsor.href}
              className="font-body text-lg font-semibold text-brand underline decoration-accent decoration-2 underline-offset-4 hover:text-brand-dark"
            >
              {more.sponsor.label}
            </Link>
          </div>
        </div>
      </Section>
    </>
  )
}
