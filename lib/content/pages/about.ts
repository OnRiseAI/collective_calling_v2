import type { PageHero } from './types'
import type { SubNavCard } from '@/components/page/SubNavCards'

/**
 * Content for the About hub (/about).
 *
 * The About hub is the front door to the About cluster. It carries a short "who
 * we are" overview (mission, vision, and the 2017 founding), then a grid of
 * SubNavCards routing to every page in the cluster: Who We Are, What We Do, Our
 * Impact, Our Team, Financial Accountability, Partners, and Contact.
 *
 * The overview copy is adapted faithfully from Collective Calling's own Who We
 * Are page (mission for Spain and Tanzania, the vision statement) and the site
 * footer (founded 2017, registered nonprofit). It is kept in the brand voice
 * from the brand board (section 7): warm, faith-forward, dignified, and direct,
 * centred on restoring dignity and strengthening families, hopeful rather than
 * guilt-driven.
 *
 * This is plain typed data so the page and its tests stay simple. The hero owns
 * the page's only h1; SubNavCards titles render as h3 sub-section headings.
 */

export type AboutContent = {
  hero: PageHero
  overview: {
    eyebrow: string
    heading: string
    /** The mission and vision narrative, one entry per paragraph. */
    body: string[]
  }
  /** The in-page navigation grid into the rest of the About cluster. */
  subNav: {
    eyebrow: string
    heading: string
    cards: SubNavCard[]
  }
  donate: {
    eyebrow: string
    heading: string
    body: string
    cta: string
  }
}

export const aboutContent: AboutContent = {
  hero: {
    eyebrow: 'About us',
    title: 'About Collective Calling',
    lede:
      'A Christian charity restoring dignity and strengthening families. We answer homelessness in Spain and reunite street-connected children in Tanzania.',
    image: '/images/about/hero-group.jpg',
    alt: 'The Collective Calling team and community gathered together.',
  },

  overview: {
    eyebrow: 'Who we are',
    heading: 'Restoring dignity, strengthening families',
    body: [
      'Founded in 2017, Collective Calling is committed to addressing the pressing issue of homelessness in Spain and to supporting street children in Tanzania. In Spain, we bring dignity back to our homeless friends through our Mobile Sanitary Unit, meeting people where they are with warmth and respect. In Tanzania, we provide comprehensive assistance, empowerment, and long-term solutions to children affected by homelessness, poverty, and social exclusion, working to reunite families and give children a brighter future.',
      'Our vision is a world without homelessness, where everyone has a secure and supportive home. We are a Christian charity, and that faith shapes how we serve: we give priority to people over structures, we steward every gift with honesty, and we work alongside a global network of partners so that the people we serve are met as exactly that, people, made and loved.',
      'The pages below open up the full picture: who we are and what we believe, the work we do across Spain and Tanzania, the impact of that work, the team and board who lead it, how we stay financially accountable, the partners who walk with us, and how to get in touch.',
    ],
  },

  subNav: {
    eyebrow: 'Explore',
    heading: 'Get to know the work',
    cards: [
      {
        title: 'Who We Are',
        blurb:
          'Our mission, our vision, and the Christian values that root everything we do.',
        href: '/about/who-we-are',
        image: '/images/about/hero-group.jpg',
      },
      {
        title: 'What We Do',
        blurb:
          'The Mobile Sanitary Unit in Spain and the Centre of Hope in Tanzania, explained.',
        href: '/about/what-we-do',
        image: '/images/spain-mobile-shower.jpg',
      },
      {
        title: 'Our Impact',
        blurb:
          'Lives changed in two places at once: dignity on the streets and children walking home.',
        href: '/about/our-impact',
        image: '/images/tanzania-children.jpg',
      },
      {
        title: 'Our Team',
        blurb:
          'The founders, board, and ambassadors who lead and steward Collective Calling.',
        href: '/about/our-team',
        image: '/images/speaking-event.jpg',
      },
      {
        title: 'Financial Accountability',
        blurb:
          'Where your money goes, and the third parties we are happy to be reviewed by.',
        href: '/about/financial-accountability',
        image: '/images/spain-homelessness.jpg',
      },
      {
        title: 'Partners',
        blurb:
          'The like-minded organisations and supporters who make this work possible.',
        href: '/about/partners',
        image: '/images/transform-5.png',
      },
      {
        title: 'Contact',
        blurb:
          'Get in touch, support a family, partner with us, or invite us to speak.',
        href: '/contact',
        image: '/images/spain-mobile-shower.jpg',
      },
    ],
  },

  donate: {
    eyebrow: 'Stand with us',
    heading: 'No donation is too small',
    body: 'Give today and help us meet people with dignity in Spain and walk children home to their families in Tanzania. Together we keep this work going.',
    cta: 'Donate',
  },
}

export default aboutContent
