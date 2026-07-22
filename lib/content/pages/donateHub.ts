import type { PageHero } from './types'
import type { MoneySplit } from '@/lib/content/types'

/**
 * Content for the Donate hub (/donate).
 *
 * This is the destination every gold Donate CTA across the site points at
 * (DONATE_HREF = '/donate'). It is a giving hub: the embedded Donorbox form is
 * the centerpiece, framed by an honest, dignified case for support.
 *
 * Real facts only. The only hard numbers are the charity's own published 83/17
 * split (2025 donation-based operating expenses), expressed in the homepage
 * WhereMoneyGoes `money` shape so the page reuses that exact visual unchanged.
 * The four designations (Area of greatest need, Spain, Tanzania, Sponsor a
 * Child) are the real giving options the charity offers.
 *
 * Copy follows the brand voice (brand board section 7): warm, faith-forward,
 * dignified, and direct. Hopeful rather than guilt-driven. The "what your gift
 * does" lines are concise and non-guaranteeing (they describe the work a gift
 * supports, never a promised per-pound outcome). No em dashes anywhere.
 *
 * The hero owns the page's only h1; every section heading is h2.
 */

/** One thing a gift supports, shown as a concise, non-guaranteeing impact line. */
export type GiftEffect = {
  title: string
  body: string
}

/** A giving designation a supporter can choose inside the Donorbox form. */
export type Designation = {
  name: string
  body: string
}

export type DonateHubContent = {
  hero: PageHero
  /** A short intro that frames the giving moment, shown above the form. */
  intro: string
  /** The "what your gift does" framing. */
  giftDoes: {
    eyebrow: string
    heading: string
    items: GiftEffect[]
  }
  /**
   * The 83/17 split, expressed in the homepage WhereMoneyGoes `money` shape so
   * the page reuses that exact visual. Driven by data, never hardcoded in markup.
   */
  money: MoneySplit
  /** Label and target for the "see the full breakdown" link under the split. */
  fullBreakdown: {
    label: string
    href: string
  }
  /** Reassurance block: secure giving, one-time or monthly, choose a designation. */
  reassurance: {
    eyebrow: string
    heading: string
    body: string
    points: string[]
  }
  /** The four real giving designations a supporter can choose. */
  designations: Designation[]
  /** Closing links to other ways to give and to sponsorship. */
  more: {
    eyebrow: string
    heading: string
    body: string
    waysToGive: { label: string; href: string }
    sponsor: { label: string; href: string }
  }
}

export const donateHubContent: DonateHubContent = {
  hero: {
    eyebrow: 'Give today',
    title: 'Your gift restores dignity',
    lede:
      'Every gift becomes part of restoring dignity and strengthening families: the mobile shower unit on the road in Spain, and the Centre of Hope a safe haven in Tanzania. Give once or monthly, and choose where your gift goes.',
  },

  intro:
    'Use the secure form below to give. You can make a one-time gift or set up monthly giving, and choose the cause closest to your heart.',

  giftDoes: {
    eyebrow: 'What your gift does',
    heading: 'A gift that reaches people',
    items: [
      {
        title: 'Restores dignity in Spain',
        body: 'Your support helps keep Spain’s first mobile shower unit on the road in Marbella, offering a hot shower, clean clothes, and a moment of being seen to people experiencing homelessness.',
      },
      {
        title: 'Reunites families in Tanzania',
        body: 'Gifts help the Centre of Hope rescue street-connected children, care for them safely, and work toward reuniting them with family wherever it is possible.',
      },
      {
        title: 'Strengthens the work for the long road',
        body: 'Regular giving steadies this work month to month, so the team can plan ahead rather than respond gift to gift.',
      },
    ],
  },

  money: {
    programsPct: 83,
    adminPct: 17,
    programsLabel:
      'went to program services, including the logistics to deliver them',
    adminLabel:
      'covered marketing, communication, and fundraising that sustain and grow our impact',
    note: 'Based on Collective Calling’s 2025 donation-based operating expenses.',
  },

  fullBreakdown: {
    label: 'See the full breakdown',
    href: '/about/financial-accountability',
  },

  reassurance: {
    eyebrow: 'Giving with confidence',
    heading: 'Secure, flexible, and yours to direct',
    body: 'Your gift is processed securely through Donorbox, a trusted donation platform. You stay in control of how, when, and where you give.',
    points: [
      'Secure giving through Donorbox',
      'Give once or set up monthly support',
      'Choose a designation: Area of greatest need, Spain, Tanzania, or Sponsor a Child',
    ],
  },

  designations: [
    {
      name: 'Area of greatest need',
      body: 'Let us direct your gift to wherever it will do the most good right now, across Spain and Tanzania.',
    },
    {
      name: 'Spain',
      body: 'Support the homelessness response in Marbella, including Spain’s first mobile shower unit.',
    },
    {
      name: 'Tanzania',
      body: 'Support the Centre of Hope as it rescues and reunites street-connected children.',
    },
    {
      name: 'Sponsor a Child',
      body: 'Walk alongside one child with steady monthly support for their care and future.',
    },
  ],

  more: {
    eyebrow: 'More ways to help',
    heading: 'Other ways to give',
    body: 'A single gift is one way to help. There are others, from leaving a legacy to walking with one child over time.',
    waysToGive: { label: 'Explore ways to give', href: '/donate/ways-to-give' },
    sponsor: { label: 'Sponsor a child', href: '/get-involved/sponsor-a-child' },
  },
}

export default donateHubContent
