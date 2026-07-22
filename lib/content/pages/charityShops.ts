import type { PageHero } from './types'

/**
 * Content for the Charity Shops page (/charity-shops).
 *
 * Collective Calling operates two charity shops (the "2 Charity Shops" stat in
 * the homepage impact snapshot). Their income runs through a separate financial
 * system (noted on the financial-accountability page), and shopping or donating
 * goods is a practical way to support the mission.
 *
 * Real facts only: no invented addresses or opening hours. Location and hours
 * enquiries route to the confirmed contact channels. No em dashes.
 */

export type CharityShopsContent = {
  hero: PageHero
  intro: {
    eyebrow: string
    heading: string
    body: string[]
  }
  ways: { title: string; body: string }[]
  cta: {
    heading: string
    body: string
    contactCta: string
  }
}

export const charityShopsContent: CharityShopsContent = {
  hero: {
    eyebrow: 'Collective Calling',
    title: 'Our charity shops',
    lede: 'Find great items, support our mission and help create impact.',
  },

  intro: {
    eyebrow: 'Shop with purpose',
    heading: 'Every purchase becomes part of the work',
    body: [
      'Collective Calling runs two charity shops on the Costa del Sol. They are more than places to find a bargain: every purchase and every donated item helps fund the work with vulnerable children in Tanzania and people experiencing homelessness in Spain.',
      'The shops are also community spaces. Volunteers run them, neighbours meet in them, and donated goods find a second life instead of going to waste.',
    ],
  },

  ways: [
    {
      title: 'Shop',
      body: 'Browse clothing, homeware, books and more. Stock changes constantly, and every sale supports the mission.',
    },
    {
      title: 'Donate goods',
      body: 'Good-quality clothing, accessories and household items are always welcome. Drop them off at either shop during opening hours.',
    },
    {
      title: 'Volunteer',
      body: 'The shops run on volunteers. If you have a few hours a week, there is a place for you behind the counter or in the stockroom.',
    },
  ],

  cta: {
    heading: 'Visit us',
    body: 'For shop locations, opening hours, or to arrange a larger donation of goods, get in touch and we will point you the right way.',
    contactCta: 'Contact us',
  },
}

export default charityShopsContent
