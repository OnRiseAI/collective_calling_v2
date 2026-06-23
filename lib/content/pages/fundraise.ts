import type { PageHero, ValueItem } from './types'

/**
 * Content for the Fundraise page (/get-involved/fundraise).
 *
 * Evergreen, non-fabricated guidance on running a fundraiser for Collective
 * Calling. The ideas section gives practical starting points; the how-it-works
 * section explains the three steps; the outro points to /contact and the donate
 * route so supporters can register a fundraiser or give directly.
 *
 * Real facts used: EUR 58/month child sponsorship, 83% programmes / 17% admin
 * split, registration number 611.510.
 *
 * No em dashes anywhere.
 */

export type FundraiseContent = {
  hero: PageHero
  intro: {
    eyebrow: string
    heading: string
    body: string[]
  }
  ideasEyebrow: string
  ideasHeading: string
  ideas: ValueItem[]
  howItWorksEyebrow: string
  howItWorksHeading: string
  steps: ValueItem[]
  donate: {
    eyebrow: string
    heading: string
    body: string
    cta: string
  }
}

export const fundraiseContent: FundraiseContent = {
  hero: {
    eyebrow: 'Get involved',
    title: 'Fundraise for Collective Calling',
    lede:
      'Every fundraiser, however big or small, keeps the work going in Spain and Tanzania. Here is how to start one.',
  },

  intro: {
    eyebrow: 'Why it matters',
    heading: 'Your effort goes straight to the work',
    body: [
      'Collective Calling is a lean, field-focused charity. Across our programmes, 83 per cent of operating expenses go directly to Spain and Tanzania. When you fundraise for us, the money you raise reaches people.',
      'You do not need to be a professional fundraiser or a seasoned marathon runner. A birthday collection, a coffee morning, a sponsored walk, or a community quiz night all make a real difference. The only requirement is that you care about the people we serve.',
    ],
  },

  ideasEyebrow: 'Inspiration',
  ideasHeading: 'Fundraising ideas to get you started',

  ideas: [
    {
      title: 'Sponsored challenge',
      body:
        'A walk, run, cycle, or swim. Set a distance or a target and ask friends, family, and colleagues to sponsor you. Sponsored challenges are some of the most effective ways to raise awareness alongside funds.',
    },
    {
      title: 'Community event',
      body:
        'A bake sale, a quiz night, a charity auction, or a community dinner. Local events build community while raising funds and introducing new people to the work in Spain and Tanzania.',
    },
    {
      title: 'Celebration collection',
      body:
        'Instead of gifts for a birthday, wedding, or work leaving party, invite people to give to Collective Calling. It is a generous way to mark a moment that matters to you.',
    },
    {
      title: 'Church or small-group giving',
      body:
        'Talk to your church leadership about featuring Collective Calling in an offering, a giving season, or a mission focus. We are glad to provide materials or come and speak.',
    },
  ],

  howItWorksEyebrow: 'Three simple steps',
  howItWorksHeading: 'How to run a fundraiser for us',

  steps: [
    {
      title: 'Get in touch',
      body:
        'Drop us a message through the Contact page to let us know what you are planning. We can send you materials, answer questions, and make sure your fundraiser is set up to succeed.',
    },
    {
      title: 'Run your fundraiser',
      body:
        'Go for it. Whether it is a solo challenge or a community event, we are cheering you on. Share updates on social media and tag us so we can amplify your effort.',
    },
    {
      title: 'Pass on the funds',
      body:
        'Once your fundraiser is complete, transfer the funds through the donate link below or contact us for bank details. We will send you a thank-you note and let you know the impact your fundraiser makes.',
    },
  ],

  donate: {
    eyebrow: 'Ready to start?',
    heading: 'Register your fundraiser or give directly',
    body:
      'Get in touch to tell us about your fundraiser, or click Donate to give directly to Collective Calling. Every pound and every euro brings us closer to a world without homelessness.',
    cta: 'Donate',
  },
}

export default fundraiseContent
