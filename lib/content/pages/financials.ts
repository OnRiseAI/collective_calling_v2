import type { PageHero } from './types'
import type { MoneySplit } from '@/lib/content/types'

/**
 * Content for the Financial Accountability page (/about/financial-accountability).
 *
 * Adapted faithfully from Collective Calling's own Financial Accountability page.
 * The real, published facts are used verbatim:
 *  - In 2025, 83% of donation-based operating expenses went to program services
 *    (including the logistics required to deliver them effectively), and the
 *    remaining 17% covered marketing, communication, and fundraising activities
 *    that help sustain and grow impact.
 *  - The charity's three transparency commitments: "No donation is too small",
 *    "We are transparent", and "Maximum impact".
 *  - Collective Calling is happy to be reviewed and held accountable to third
 *    party entities.
 *  - The legal registration line, taken from the source footer: registration
 *    number 611.510 and CIF G93524130. The middot separators are intentional and
 *    must not be replaced.
 *
 * No fabricated figures: the only hard numbers here (83 / 17) are the charity's
 * own published split. The copy follows the brand voice from the brand board
 * (section 7): warm, faith-forward, dignified, and direct, hopeful rather than
 * guilt-driven. No em dashes anywhere.
 *
 * The 83/17 split is expressed as the homepage WhereMoneyGoes `money` shape so
 * the page can reuse that visual directly. This is plain typed data so the page
 * and its tests stay simple. The hero owns the page's only h1; section headings
 * are h2.
 */

/** A single transparency commitment shown in the commitments band. */
export type TransparencyCommitment = {
  title: string
  body: string
}

export type FinancialsContent = {
  hero: PageHero
  /** Intro narrative on transparency and integrity in managing finances. */
  intro: string[]
  /**
   * The 83/17 split, expressed in the homepage WhereMoneyGoes `money` shape so
   * the page reuses that exact visual. Driven by data, never hardcoded in markup.
   */
  money: MoneySplit
  /** A short framing paragraph that introduces the split visual. */
  splitIntro: {
    eyebrow: string
    heading: string
    body: string[]
  }
  /** The three transparency commitments from the source page. */
  commitments: {
    eyebrow: string
    heading: string
    items: TransparencyCommitment[]
  }
  /** Third-party accountability note. */
  accountability: {
    eyebrow: string
    heading: string
    body: string[]
  }
  /**
   * The legal registration line. The middot separators are intentional and must
   * not be replaced with dashes.
   */
  registration: string
  donate: {
    eyebrow: string
    heading: string
    body: string
    cta: string
  }
}

export const financialsContent: FinancialsContent = {
  hero: {
    eyebrow: 'About us',
    title: 'Financial Accountability',
    lede:
      'Transparency and integrity in how we manage finances are fundamental to everything we do. Here is an honest picture of how your gifts are used to restore dignity and strengthen families.',
  },

  intro: [
    'At Collective Calling, transparency and integrity in how we manage finances are fundamental to everything we do. The reports we publish reflect the donations received by the organisation and how those funds are used to directly support our programs, such as providing shelter, education, and care for children in Tanzania, and dignity-restoring services for people experiencing homelessness in Spain.',
    'These reports do not include income or expenditure from the two charity shops operated by Collective Calling, as those are managed through a separate financial system.',
  ],

  money: {
    programsPct: 83,
    adminPct: 17,
    programsLabel:
      'went to program services, including the logistics to deliver them',
    adminLabel:
      'covered marketing, communication, and fundraising that sustain and grow our impact',
    note: 'Based on Collective Calling’s 2025 donation-based operating expenses.',
  },

  splitIntro: {
    eyebrow: 'Where your money goes',
    heading: 'Most of every gift reaches the people we serve',
    body: [
      'In 2025, 83% of our donation-based operating expenses were directed toward program services, including the logistics required to deliver these services effectively. The remaining 17% covered essential areas such as marketing, communication, and fundraising activities that help us sustain and grow our impact.',
    ],
  },

  commitments: {
    eyebrow: 'Our promise to you',
    heading: 'How we steward every gift',
    items: [
      {
        title: 'No donation is too small',
        body: 'Every gift matters. Whatever you are able to give becomes part of keeping the shower unit on the road in Spain and the Centre of Hope a safe haven in Tanzania.',
      },
      {
        title: 'We are transparent',
        body: 'We publish how funds are used and welcome questions. Your trust is something we work to earn with every report we share.',
      },
      {
        title: 'Maximum impact',
        body: 'We keep running costs lean so that the large majority of every gift reaches the children and families at the heart of our work.',
      },
    ],
  },

  accountability: {
    eyebrow: 'Held to account',
    heading: 'Reviewed by third parties',
    body: [
      'We are happy to be reviewed and held accountable to independent third party entities. Outside oversight keeps us honest and gives you confidence that your support is handled with care.',
    ],
  },

  registration: 'Registered nonprofit · Reg. 611.510 · CIF G93524130',

  donate: {
    eyebrow: 'Be part of the impact',
    heading: 'Your gift, well stewarded, restores dignity',
    body: 'No donation is too small. Give today knowing that the large majority of your gift reaches the people we serve, with the rest keeping this work sustainable for the long road home.',
    cta: 'Donate',
  },
}

export default financialsContent
