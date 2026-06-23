import type { PageHero } from './types'
import type { SubNavCard } from '@/components/page/SubNavCards'

/**
 * Content for the Get Involved hub (/get-involved).
 *
 * The Get Involved hub is the front door to every action a supporter can take
 * beyond donating: sponsoring a child, running a fundraiser, attending or
 * hosting events, inviting Collective Calling to speak, praying alongside the
 * team, or becoming an organisational partner.
 *
 * The copy is kept in the brand voice (warm, faith-forward, dignified, direct)
 * and lists only real routes already in the information architecture. The hero
 * owns the page's only h1; SubNavCards titles render as h3 sub-section headings.
 *
 * No em dashes anywhere.
 */

export type GetInvolvedContent = {
  hero: PageHero
  intro: {
    eyebrow: string
    heading: string
    body: string[]
  }
  subNav: {
    eyebrow: string
    heading: string
    cards: SubNavCard[]
  }
}

export const getInvolvedContent: GetInvolvedContent = {
  hero: {
    eyebrow: 'Get involved',
    title: 'Get involved',
    lede:
      'Whether you give, pray, fundraise, or come and speak with us, your involvement makes the work possible. Find the right step for you below.',
  },

  intro: {
    eyebrow: 'There are many ways',
    heading: 'Walk with us in Spain and Tanzania',
    body: [
      'Collective Calling is a small charity with a focused mission: restoring dignity on the streets of Spain and walking children home to their families in Tanzania. None of that happens without people who decide to get involved.',
      'Below are six ways to take that step. Each one is a real, meaningful contribution to the work. Start wherever feels right.',
    ],
  },

  subNav: {
    eyebrow: 'Ways to get involved',
    heading: 'Choose how you want to walk with us',
    cards: [
      {
        title: 'Sponsor a child',
        blurb:
          'Give EUR 58 a month to support a child at our Centre of Hope in Kasulu, Tanzania. Your gift covers education, nutrition, and care.',
        href: '/get-involved/sponsor-a-child',
        image: '/images/tanzania-children.jpg',
      },
      {
        title: 'Fundraise',
        blurb:
          'Run a marathon, bake a cake, or organise a community event. Every fundraiser, however big or small, drives the work forward.',
        href: '/get-involved/fundraise',
        image: '/images/about/hero-group.jpg',
      },
      {
        title: 'Events',
        blurb:
          'Join one of our upcoming events to connect with the team, hear from the field, and meet fellow supporters.',
        href: '/events',
        image: '/images/speaking-event.jpg',
      },
      {
        title: 'Invite us to speak',
        blurb:
          'Bring the story of Spain and Tanzania to your church, school, or community group. We are always glad to come and share.',
        href: '/get-involved/invite-us-to-speak',
        image: '/images/speaking-event.jpg',
      },
      {
        title: 'Pray',
        blurb:
          'Prayer is not background noise; it is part of the work. Find our current prayer points and join us.',
        href: '/get-involved/pray',
        image: '/images/spain-homelessness.jpg',
      },
      {
        title: 'Partner with us',
        blurb:
          'Churches, businesses, and organisations can partner with Collective Calling at an institutional level. Find out what that looks like.',
        href: '/get-involved/partner',
        image: '/images/transform-5.png',
      },
    ],
  },
}

export default getInvolvedContent
