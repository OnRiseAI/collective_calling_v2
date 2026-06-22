import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { NAV_SECTIONS, DONATE_HREF } from "@/lib/nav";

/**
 * Branded placeholder home.
 *
 * This is the deployable shell, not the full homepage (those sections land in
 * Plan 2). Its job is to prove the brand system renders together: the design
 * tokens, the layout primitives, the header, and the footer compose on one
 * page with a single on-brand hero.
 *
 * The hero sits on the deep midnight-navy field (Section tone="dark") with an
 * eyebrow label, a Fraunces display headline in Collective Calling's voice,
 * a supporting sentence, the gold-led Donate action, and a calm secondary
 * link. text-balance plus a non-breaking space between the last two words keep
 * the headline free of orphans (brand board headline rule).
 *
 * No invented charity figures, no impact tiles, no widgets. Just the shell.
 */
export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const learnMore = NAV_SECTIONS.find((section) => section.key === "about");

  return (
    <Section
      as="div"
      tone="dark"
      container={false}
      className="relative overflow-hidden"
    >
      {/* Atmosphere: a warm gold glow low-right and a soft indigo lift, layered
          on the navy so the field reads as depth rather than a flat block. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(60rem 40rem at 85% 115%, rgba(200,146,42,0.18), transparent 60%), radial-gradient(50rem 40rem at 0% -10%, rgba(27,58,107,0.55), transparent 55%)",
        }}
      />

      <div className="relative mx-auto flex min-h-[78vh] w-full max-w-5xl flex-col justify-center px-6 py-24 sm:px-8 sm:py-32">
        <h1 className="max-w-3xl">
          <span className="block font-body text-xs font-bold uppercase tracking-[0.2em] text-accent">
            Collective Calling
          </span>
          <span className="mt-6 block text-balance font-heading text-4xl font-medium leading-[1.05] text-paper sm:text-5xl lg:text-6xl">
            Answer the call to restore dignity and rebuild&nbsp;families.
          </span>
        </h1>

        <p className="mt-7 max-w-xl text-balance font-body text-lg leading-relaxed text-paper/80">
          A Christian charity walking with people in Spain and Tanzania,
          restoring dignity and bringing families back&nbsp;together.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4">
          <Button
            as={Link}
            href={DONATE_HREF}
            size="lg"
            // Gold leads for Donate (brand board section 6). Important modifiers
            // ensure the gold fill wins over the primary variant background.
            className="bg-accent! text-brand-dark! hover:bg-accent/90!"
          >
            Donate
          </Button>

          {learnMore ? (
            <Link
              href={learnMore.href}
              className="group inline-flex items-center gap-2 font-body font-semibold text-paper underline-offset-4 transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
            >
              Learn who we are
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
          ) : null}
        </div>
      </div>
    </Section>
  );
}
