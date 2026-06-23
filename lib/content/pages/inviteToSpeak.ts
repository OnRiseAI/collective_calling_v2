import type { PageHero } from './types'

/**
 * Content for the Invite Us to Speak page (/get-involved/invite-us-to-speak).
 *
 * Invite Collective Calling to speak at a church, school, or community event.
 * The photographic hero uses speaking-event.jpg. CTA routes to /contact.
 *
 * No fabricated facts. No em dashes.
 */

export type InviteToSpeakContent = {
  hero: PageHero
  intro: {
    eyebrow: string
    heading: string
    body: string[]
  }
  whatToExpectEyebrow: string
  whatToExpectHeading: string
  whatToExpect: string[]
  cta: {
    eyebrow: string
    heading: string
    body: string
    contactCta: string
  }
}

export const inviteToSpeakContent: InviteToSpeakContent = {
  hero: {
    eyebrow: 'Get involved',
    title: 'Invite us to speak',
    lede:
      'We are always glad to bring the story of Spain and Tanzania to churches, schools, and community groups. Get in touch and we will arrange a visit.',
    image: '/images/speaking-event.jpg',
    alt: 'A Collective Calling speaker at a community event.',
  },

  intro: {
    eyebrow: 'Share the story',
    heading: 'Bringing the field to your community',
    body: [
      'Some of the most important moments in this work happen when someone hears the story for the first time and something shifts. A speaking visit from Collective Calling is an opportunity to introduce your community to what God is doing in Spain and Tanzania and to invite them into it.',
      'We speak at churches, small groups, schools, colleges, and community events. Whether you want a ten-minute slot in a Sunday service or a full evening event, we are happy to shape it around your context.',
    ],
  },

  whatToExpectEyebrow: 'What we cover',
  whatToExpectHeading: 'What a speaking visit looks like',

  whatToExpect: [
    'The story behind Collective Calling and why it started',
    'The reality of homelessness in Spain and what the mobile shower unit does for people',
    'Life at the Centre of Hope in Kasulu, Tanzania, and what family reunification means for a child',
    'How your community can get involved, from sponsoring a child to running a fundraiser',
    'A time for questions from your audience',
  ],

  cta: {
    eyebrow: 'Ready to invite us?',
    heading: 'Get in touch to arrange a visit',
    body:
      'Use the Contact page to reach the team. Let us know a little about your event, your expected audience, and your preferred dates, and we will get back to you as soon as we can.',
    contactCta: 'Contact us',
  },
}

export default inviteToSpeakContent
