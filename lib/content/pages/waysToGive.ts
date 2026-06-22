import type { PageHero } from './types'

/**
 * Content for the Ways to Give page (/donate/ways-to-give).
 *
 * An informational hub of the real, non-fabricated ways a supporter can stand
 * with Collective Calling. The Donate hub (/donate) carries the embedded giving
 * form; this page widens the picture: monthly giving, child sponsorship,
 * fundraising, a gift in memory or in a will, a bank transfer, and inviting the
 * team to speak. Each way is a card with a short, honest description and one
 * clear call to action.
 *
 * Honesty rules (held strictly):
 * - No invented tax-relief claims, Gift Aid promises, or bank account details.
 *   The bank-transfer card simply offers to share details on request via the
 *   contact route, rather than printing an account number we do not have.
 * - The only hard figure is the charity's real Sponsor a Child price, 58 euros
 *   a month, which matches the published sponsorship offer.
 * - The Fundraise route (/get-involved/fundraise) belongs to a later plan and
 *   may 404 for now. That is acceptable, the same as other not-yet-built routes.
 *
 * Voice follows the brand board (section 7): warm, faith-forward, dignified,
 * and direct. Hopeful rather than guilt-driven. No em dashes anywhere.
 *
 * The hero owns the page's only h1; the section heading is h2; each card title
 * is an h3 in the page markup.
 */

/**
 * One way to support Collective Calling: a card with a title, a short body, and
 * a single call to action. `external` marks a CTA that is a plain anchor (for
 * example a mailto), so the page renders it as `<a>` rather than the
 * locale-aware Link used for internal routes.
 */
export type GivingWay = {
  /** Card heading, rendered as an h3 on the page. */
  title: string
  /** A short, honest description of this way to give. */
  body: string
  /** The call-to-action label. */
  ctaLabel: string
  /** The call-to-action target (internal route, or a mailto when external). */
  ctaHref: string
  /** True when ctaHref is a non-route link (mailto) rendered as a plain anchor. */
  external?: boolean
  /** Card top-rule theme: general (gold), spain (indigo), or tanzania (clay). */
  theme?: 'general' | 'spain' | 'tanzania'
}

export type WaysToGiveContent = {
  hero: PageHero
  /** A short intro that frames the page above the grid of ways. */
  intro: string
  /** The eyebrow and heading above the grid of ways. */
  ways: {
    eyebrow: string
    heading: string
    items: GivingWay[]
  }
  /** The closing gold-led Donate moment. */
  closing: {
    eyebrow: string
    heading: string
    body: string
    ctaLabel: string
    ctaHref: string
  }
}

export const waysToGiveContent: WaysToGiveContent = {
  hero: {
    eyebrow: 'Stand with us',
    title: 'Ways to give',
    lede:
      'There are many ways to restore dignity and strengthen families alongside us, from a single gift to walking with one child over years. Find the one that fits you.',
  },

  intro:
    'However you choose to give, your support reaches real people: the mobile shower unit on the road in Spain, and the Centre of Hope in Tanzania. Here are the ways you can be part of the work.',

  ways: {
    eyebrow: 'Ways to give',
    heading: 'Choose how you stand with us',
    items: [
      {
        title: 'Give once or monthly',
        body: 'Make a single gift, or set up monthly giving so the team can plan ahead rather than respond gift to gift. You choose where your gift goes, and you can change or pause it anytime.',
        ctaLabel: 'Give now',
        ctaHref: '/donate',
        theme: 'general',
      },
      {
        title: 'Sponsor a child',
        body: 'Walk alongside one child at the Centre of Hope for 58 euros a month, supporting their care, safety, and future as the team works toward reuniting families wherever it is possible.',
        ctaLabel: 'Sponsor a child',
        ctaHref: '/get-involved/sponsor-a-child',
        theme: 'tanzania',
      },
      {
        title: 'Fundraise for Collective Calling',
        body: 'Run, bake, climb, or gather your community for a moment that matters. Turn a birthday, a challenge, or a church event into support for the work, and we will help you along the way.',
        ctaLabel: 'Start fundraising',
        ctaHref: '/get-involved/fundraise',
        theme: 'general',
      },
      {
        title: 'Give in memory or leave a gift in your will',
        body: 'Remember a loved one with a gift in their memory, or leave a lasting legacy that carries this work forward. We would be honoured to talk it through with you, with care and discretion.',
        ctaLabel: 'Email us about a legacy gift',
        ctaHref: 'mailto:info@collectivecalling.org',
        external: true,
        theme: 'general',
      },
      {
        title: 'Bank transfer or another way',
        body: 'Prefer to give by bank transfer, or have another way of giving in mind? Get in touch and we will share what you need and find the way that works best for you.',
        ctaLabel: 'Contact us to arrange',
        ctaHref: '/contact',
        theme: 'spain',
      },
      {
        title: 'Invite us to speak',
        body: 'Invite Collective Calling to your church, school, or group to share the story of the work in Spain and Tanzania, and the people whose lives it touches.',
        ctaLabel: 'Invite us to speak',
        ctaHref: '/contact',
        theme: 'general',
      },
    ],
  },

  closing: {
    eyebrow: 'Give today',
    heading: 'Ready to give?',
    body: 'Every gift becomes part of restoring dignity and strengthening families. Give once or monthly, and choose the cause closest to your heart.',
    ctaLabel: 'Donate now',
    ctaHref: '/donate',
  },
}

export default waysToGiveContent
