import type { PageHero, RichBlock } from './types'

/**
 * Content for the Sponsor a Child page (/get-involved/sponsor-a-child).
 *
 * Collective Calling's child sponsorship offer in Tanzania. For 58 euros a
 * month a supporter walks alongside one child at the Centre of Hope in Kasulu,
 * giving food, shelter, education, and the chance of a future, within the
 * charity's rescue, restore, and reintegrate approach and its commitment to
 * reuniting children with their own families wherever it is safe and possible.
 *
 * Honesty rules (held strictly, real facts only):
 * - The price is the charity's real Sponsor a Child offer: 58 euros a month.
 * - The Centre of Hope is a transitional rescue centre in Kasulu, established in
 *   2018, currently caring for 18 children. These figures are drawn from the
 *   charity's own published material and are not embellished.
 * - No invented child names, outcomes, tax claims, or guarantees. The supporting
 *   copy describes the real programme (rescue, trauma and spiritual care,
 *   accelerated learning, family reunification) without overstating it.
 *
 * Voice follows the brand board (section 7): warm, faith-forward, dignified, and
 * direct. Hopeful rather than guilt-driven. No em dashes anywhere.
 *
 * The hero owns the page's only h1; section headings are h2; the "what your
 * sponsorship provides" items render with h3-style card titles in the page.
 */

/** One thing a sponsorship provides: a short title and a plain description. */
export type SponsorProvision = {
  /** The provision title, rendered as a card heading on the page. */
  title: string
  /** A short, honest description of what this provision means for a child. */
  body: string
}

export type SponsorChildContent = {
  hero: PageHero
  /** The sponsorship story, told as narrative blocks above the form. */
  story: RichBlock[]
  /** The "what your sponsorship provides" cluster. */
  provides: {
    eyebrow: string
    heading: string
    intro: string
    items: SponsorProvision[]
  }
  /** The eyebrow and heading that frame the embedded sponsorship form. */
  form: {
    eyebrow: string
    heading: string
    body: string
    /** The note telling donors which designation to choose on the form. */
    designationNote: string
  }
  /** The closing gold-led give moment. */
  closing: {
    eyebrow: string
    heading: string
    body: string
    ctaLabel: string
    ctaHref: string
  }
}

export const sponsorChildContent: SponsorChildContent = {
  hero: {
    eyebrow: 'Sponsor a child',
    title: 'Sponsor a child in Tanzania',
    lede:
      'For 58 euros a month you give one child food, shelter, education, and the chance of a future at our Centre of Hope, as we work to bring families back together.',
    image: '/images/tanzania/centre-of-hope.jpg',
    alt: 'A child at the Centre of Hope in Kasulu, Tanzania.',
  },

  story: [
    {
      body: 'When our founders first visited Tanzania in 2018, they found children as young as five living alone on the streets of Kasulu. Many had left home because of poverty, abuse, or neglect, with broken relationships at the heart of it. There was nowhere safe for them to go. So we built one.',
    },
    {
      heading: 'The Centre of Hope',
      body: 'The Centre of Hope is a transitional rescue centre for street-connected children in Kasulu, established in 2018. It is a secure home where a child can rest, eat, heal, and begin again. To date we have rescued and are currently caring for 18 children there, each one welcomed as a precious gift and treated as an individual.',
    },
    {
      heading: 'Rescue, restore, reintegrate',
      body: 'Our approach is to rescue, restore, and reintegrate. A child is gently prepared for rescue as our team builds a relationship of trust, then cared for at the Centre while a social worker walks alongside their family. Most children in orphanages and on the streets still have a family to go home to, so wherever it is safe and possible, our goal is reunification: a child restored not only to health, but to their own home.',
    },
    {
      heading: 'What your 58 euros a month does',
      body: 'Your sponsorship of 58 euros a month stands with one child through all of this. It helps provide their food, a safe place to live, their schooling, the medical and trauma care they need, and the patient work of bringing them back to their family. It is steady support the team can plan around, month after month.',
    },
  ],

  provides: {
    eyebrow: 'Your sponsorship',
    heading: 'What your sponsorship provides',
    intro:
      'Every child at the Centre of Hope is treated uniquely, with a plan built around their needs. Your monthly gift helps make all of this possible.',
    items: [
      {
        title: 'Food and nutrition',
        body: 'Nutritious daily meals and immediate relief from malnutrition, so a child who once barely survived on the streets can grow strong again.',
      },
      {
        title: 'A safe place to live',
        body: 'Shelter within the secure, walled home of the Centre of Hope, where feeling safe and settled is the first step toward healing.',
      },
      {
        title: 'Education',
        body: 'An accelerated learning programme that meets each child where they are and opens the door back into state or private schooling.',
      },
      {
        title: 'Trauma and spiritual care',
        body: 'Daily counselling and care for children carrying deep trauma, with medical treatment provided whenever it is needed.',
      },
      {
        title: 'The path back to family',
        body: 'The patient work of a social worker who keeps in touch with each family, so that when reunification happens it is safe, stable, and lasting.',
      },
    ],
  },

  form: {
    eyebrow: 'Begin sponsoring',
    heading: 'Sponsor a child for 58 euros a month',
    body: 'Set up your monthly sponsorship below. The amount is already set to 58 euros a month, ready for you to confirm.',
    designationNote:
      'On the form, please choose the "Sponsor a Child" designation so your gift reaches a child at the Centre of Hope.',
  },

  closing: {
    eyebrow: 'Stand with one child',
    heading: 'Walk with a child this year',
    body: 'Sponsorship is steady, dignified support that changes a life. If you would rather give a single gift, or give in another way, you can do that too.',
    ctaLabel: 'See all ways to give',
    ctaHref: '/donate',
  },
}

export default sponsorChildContent
