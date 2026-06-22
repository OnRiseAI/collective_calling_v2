import type { PageHero, Partner } from './types'

/**
 * Content for the Our Partners page (/about/partners).
 *
 * Adapted faithfully from Collective Calling's own Our Partners page. The intro
 * is the charity's real framing, lightly tuned into the brand voice from the
 * brand board (section 7): warm, dignified, and direct.
 *
 * The seven partners are the real organisations named on the source page, with
 * their real websites. The source page carried only the partner names and their
 * website addresses, no descriptive blurbs, so no blurbs are invented here: each
 * partner is named and linked, and nothing is fabricated. Logos were harvested
 * from the live site into `public/images/partners/`; every one validated as a
 * real image, so each partner carries a `logo`.
 *
 * The two accountability bodies (Rotary Club Guadalmina Marbella and the
 * Ayuntamiento de Marbella) are kept as a separate note rather than mixed into
 * the partner grid, because they hold the charity to account rather than
 * sponsoring it.
 *
 * This is plain typed data so the page and its tests stay simple. The hero owns
 * the page's only h1; section headings are h2 and partner names are h3. No em
 * dashes anywhere.
 */

export type PartnersContent = {
  hero: PageHero
  /** Intro narrative on the partner network and shared commitment. */
  intro: string[]
  /** Eyebrow and heading for the partner grid section. */
  grid: {
    eyebrow: string
    heading: string
  }
  /** The real partner organisations, each with a website and a harvested logo. */
  partners: Partner[]
  /** A separate note on the bodies that hold the charity to account. */
  accountability: {
    eyebrow: string
    heading: string
    body: string[]
  }
  /** The gold-led Donate close. */
  donate: {
    eyebrow: string
    heading: string
    body: string
    cta: string
  }
}

export const partnersContent: PartnersContent = {
  hero: {
    eyebrow: 'About us',
    title: 'Our Partners',
    lede:
      'Together we form the Collective Calling community, united by a shared commitment to restore dignity and strengthen families. Our partners turn that commitment into action.',
  },

  intro: [
    'Our partners are at the heart of the work to end homelessness and reunite families. They embody corporate social responsibility, sharing our values and translating them into meaningful action on the ground in Spain and Tanzania.',
    'From real estate and design to catering, energy, and sport, each partner brings their own gifts to the table. Together we are stronger, and together we keep the shower unit on the road in Spain and the Centre of Hope a safe haven in Tanzania.',
  ],

  grid: {
    eyebrow: 'Stronger together',
    heading: 'The organisations standing with us',
  },

  // Names and websites taken verbatim from the source Our Partners page. No
  // blurbs are invented because the source provided none. Logos were validated
  // as real images before inclusion.
  partners: [
    {
      name: 'Drumelia Real Estate',
      href: 'https://www.drumelia.com/',
      logo: '/images/partners/drumelia.png',
    },
    {
      name: 'Manifesto',
      href: 'https://www.manifestodesign.com/',
      logo: '/images/partners/manifesto.png',
    },
    {
      name: 'Sana Catering',
      href: 'https://www.sanacateringmarbella.com/',
      logo: '/images/partners/sana-catering.png',
    },
    {
      name: 'Spence Clarke',
      href: 'https://www.spenceclarke.com/',
      logo: '/images/partners/spence-clarke.png',
    },
    {
      name: 'Elena Gaite Fundacion',
      href: 'https://www.fundacionelenagaite.org/',
      logo: '/images/partners/elena-gaite.png',
    },
    {
      name: 'Mariposa Energia',
      href: 'https://www.mariposaenergia.es/',
      logo: '/images/partners/mariposa-energia.png',
    },
    {
      name: 'Golf In The Sun',
      href: 'https://www.golfinthesun.org/',
      logo: '/images/partners/golf-in-the-sun.png',
    },
  ],

  accountability: {
    eyebrow: 'Held to account',
    heading: 'Working alongside our community',
    body: [
      'Beyond our partners, we are proud to work alongside organisations that help keep us accountable and rooted in the local community. The Rotary Club Guadalmina Marbella and the Ayuntamiento de Marbella stand with us as we serve people across the Costa del Sol.',
    ],
  },

  donate: {
    eyebrow: 'Join the calling',
    heading: 'Add your name to this community',
    body: 'Whether you give, partner, or pray, you become part of the Collective Calling community. No gift is too small, and every act of generosity helps restore dignity and strengthen families.',
    cta: 'Donate',
  },
}

export default partnersContent
