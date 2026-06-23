import type { PageHero, ValueItem } from './types'

/**
 * Content for the Partner page (/get-involved/partner).
 *
 * Partnering as a church, business, or organisation. References real partner
 * types (Rotary Club Guadalmina Marbella and Ayuntamiento de Marbella are named
 * on the live site as existing partners) and links forward to /about/partners.
 *
 * No fabricated partner details beyond what CC has stated publicly. No em dashes.
 */

export type PartnerContent = {
  hero: PageHero
  intro: {
    eyebrow: string
    heading: string
    body: string[]
  }
  partnerTypesEyebrow: string
  partnerTypesHeading: string
  partnerTypes: ValueItem[]
  existingEyebrow: string
  existingHeading: string
  existingBody: string[]
  cta: {
    eyebrow: string
    heading: string
    body: string
    contactCta: string
    partnersCta: string
  }
}

export const partnerContent: PartnerContent = {
  hero: {
    eyebrow: 'Get involved',
    title: 'Partner with Collective Calling',
    lede:
      'Churches, businesses, and organisations can walk alongside us at an institutional level. Find out what that looks like and how to get started.',
  },

  intro: {
    eyebrow: 'Institutional partnership',
    heading: 'Carrying this work together',
    body: [
      'Collective Calling works because people and organisations decide to take ownership of the mission alongside us. A partnership is more than a donation; it is an ongoing relationship that brings expertise, resources, and community to bear on a shared goal.',
      'We partner with churches, businesses, civic bodies, and NGOs who share our conviction that homelessness is solvable and that every person deserves dignity and a home. If that resonates, we would love to talk.',
    ],
  },

  partnerTypesEyebrow: 'Who we partner with',
  partnerTypesHeading: 'Three kinds of institutional partnership',

  partnerTypes: [
    {
      title: 'Churches',
      body:
        'Many of our deepest partnerships are with local churches. Whether through a mission giving commitment, a fundraising focus, prayer partnership, or sending volunteers, a church community can embed Collective Calling into its ongoing life in meaningful ways. We are glad to come and speak, provide updates for your bulletin, and keep your congregation connected to what God is doing through this work.',
    },
    {
      title: 'Businesses',
      body:
        'A business partnership can take many forms: matched giving for employee fundraisers, in-kind support, sponsoring a specific programme cost, or featuring Collective Calling in your community giving strategy. We are happy to work with you to find the arrangement that fits your organisation and our needs.',
    },
    {
      title: 'Civic and NGO partners',
      body:
        'We are part of a wider network of organisations addressing homelessness and child welfare. Our partners in Spain include the Ayuntamiento de Marbella and the Rotary Club Guadalmina Marbella. If your organisation works in a complementary field, get in touch to explore what collaboration could look like.',
    },
  ],

  existingEyebrow: 'Already walking with us',
  existingHeading: 'Our current partners',
  existingBody: [
    'Partners such as the Rotary Club Guadalmina Marbella and the Ayuntamiento de Marbella have been crucial to the work in Spain, providing logistical support, local knowledge, and community connection.',
    'You can read more about all of our partners on the Partners page.',
  ],

  cta: {
    eyebrow: 'Take the next step',
    heading: 'Get in touch to explore a partnership',
    body:
      'Every partnership looks a little different. The best place to start is a conversation. Use the Contact page to reach the team and tell us about your church, business, or organisation and what you are hoping to do.',
    contactCta: 'Contact us',
    partnersCta: 'Meet our partners',
  },
}

export default partnerContent
