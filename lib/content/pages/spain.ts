import type { PageHero, ProgramHelpItem } from './types'

/**
 * Content for the Spain programme page (/spain).
 *
 * Adapted faithfully from Collective Calling's own Spain page: the homelessness
 * response along the Costa del Sol, delivered through Spain's first mobile
 * shower unit, and the three ways the work helps (Access to Hygiene, Building
 * Trust and Connection, Taking Help to the Streets), followed by how a supporter
 * can help.
 *
 * The copy is kept in the brand voice from the brand board (section 7): warm,
 * faith-forward, dignified, and direct, centred on restoring dignity, hopeful
 * rather than guilt-driven. No em dashes anywhere.
 *
 * This is plain typed data so the page and its tests stay simple. The hero owns
 * the page's only h1; the three help items render as h3 sub-section headings via
 * ProgramHelp. Each help item carries a real documentary photo of the work.
 */

export type SpainContent = {
  hero: PageHero
  intro: string[]
  help: {
    eyebrow: string
    heading: string
    items: ProgramHelpItem[]
  }
  involve: {
    eyebrow: string
    heading: string
    body: string[]
  }
  donate: {
    eyebrow: string
    heading: string
    body: string
    cta: string
  }
}

export const spainContent: SpainContent = {
  hero: {
    eyebrow: 'Our work in Spain',
    title: 'Spain',
    lede:
      'A warm shower and a moment of humanity for people experiencing homelessness along the Costa del Sol. Spain’s first mobile shower unit travels to where the need is greatest.',
    image: '/images/spain/hero-mobile-shower.jpg',
    alt: 'Collective Calling’s mobile shower unit serving people along the Costa del Sol.',
  },

  intro: [
    'At Collective Calling, we believe everyone deserves to feel clean, valued, and dignified. Our mobile shower unit travels along the Costa del Sol, offering something so simple, yet so powerful: a warm shower and a moment of humanity for those experiencing homelessness.',
    'This initiative does more than provide hygiene. It opens the door to relationships, emotional support, and connection to essential services. Often, a shower is the first step toward hope and a new beginning.',
    'Our team, alongside compassionate volunteers, offers more than water and soap. We offer listening ears, love, and respect, because every life matters.',
  ],

  help: {
    eyebrow: 'How we help',
    heading: 'Dignity, delivered where it is needed most',
    items: [
      {
        title: 'Access to Hygiene',
        body:
          'We facilitate access to hygiene through our mobile shower unit, giving people experiencing homelessness the chance to maintain personal cleanliness and dignity. Regular access to showers matters not only for physical health, but for mental well-being and self-worth. By offering this service we help reduce health risks, build confidence, and create meaningful connections that can lead to further support and lasting change.',
      },
      {
        title: 'Building Trust & Connection',
        body:
          'Beyond hygiene, the mobile shower unit becomes a bridge of trust between our team and those living on the streets. Each visit is an opportunity to listen, build relationships, and offer a consistent presence. Over time that trust opens the door to deeper support, from shelter and food programmes to mental health care and pathways toward long-term transformation.',
      },
      {
        title: 'Taking Help to the Streets',
        body:
          'Because it is mobile, our shower unit lets us go directly to where the need is greatest. From city centres to hidden corners along the Costa del Sol, we reach people who might never access traditional support services. The mobility of the unit breaks down barriers, bringing dignity, cleanliness, and care to those who may feel forgotten, right where they are.',
      },
    ],
  },

  involve: {
    eyebrow: 'How you can help',
    heading: 'Stand alongside the people we serve',
    body: [
      'This work runs on the generosity of people who believe nobody should be left without dignity. A gift helps keep the mobile shower unit on the road and stocked with hot water, clean towels, and essential hygiene supplies.',
      'You can also start your own fundraiser and rally your friends, workplace, or church behind families in Spain affected by poverty. Every effort, large or small, helps someone take a first step toward hope.',
    ],
  },

  donate: {
    eyebrow: 'Give to Spain',
    heading: 'Your gift is a warm shower and a fresh start',
    body:
      'No donation is too small. In 2025, the large majority of our operating expenses went straight to programmes that support children and parents living in poverty. Give today and help restore dignity, one shower and one conversation at a time.',
    cta: 'Donate',
  },
}

export default spainContent
