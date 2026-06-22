import type { PageHero, ValueItem } from './types'

/**
 * Content for the What We Do page (/about/what-we-do).
 *
 * Adapted faithfully from Collective Calling's own What We Do page: the
 * two-country model (homelessness response in Spain through the mobile shower
 * unit, and rescuing and reuniting street-connected children in Tanzania) and
 * the four principles that the work is built on (Compassion centred, Child
 * focused, Love for the homeless, Measurable).
 *
 * The copy is kept in the brand voice from the brand board (section 7): warm,
 * faith-forward, dignified, and direct, centred on restoring dignity and
 * strengthening families, hopeful rather than guilt-driven.
 *
 * This is plain typed data so the page and its tests stay simple. The hero owns
 * the page's only h1; principles render as h3 sub-section headings via
 * ValueCards. The overview paragraphs name the two programmes so the page can
 * link out to /spain and /tanzania.
 */

export type WhatWeDoContent = {
  hero: PageHero
  overview: string[]
  principlesEyebrow: string
  principlesHeading: string
  principles: ValueItem[]
  donate: {
    eyebrow: string
    heading: string
    body: string
    cta: string
  }
}

export const whatWeDoContent: WhatWeDoContent = {
  hero: {
    eyebrow: 'About us',
    title: 'What We Do',
    lede:
      'In both Spain and Tanzania, we serve communities through practical care, compassion, and long-term support. Hygiene and hope in Spanish cities, and safe, nurturing homes for children in Tanzania.',
    image: '/images/about/hero-group.jpg',
    alt: 'Collective Calling volunteers and the community they serve, gathered together.',
  },

  overview: [
    'At Collective Calling, we serve communities in both Spain and Tanzania through practical care, compassion, and long-term support.',
    'In Spain, we assist individuals experiencing homelessness through our mobile shower unit, offering hot showers, clean towels, and essential hygiene products. This service helps restore a sense of dignity, promotes better health, and creates opportunities for further support, such as access to meals, clothing, housing pathways, and social services.',
    'In Tanzania, we work with children who have been living on the streets, providing safe shelter, education, nutrition, counselling, and guidance. Our aim is to see each child equipped for a brighter future, with a strong focus on family reintegration when it is safe and possible.',
    'From offering hygiene and hope in Spanish cities to building safe, nurturing environments for children in Tanzania, Collective Calling is committed to helping people move forward with confidence, care, and connection.',
  ],

  principlesEyebrow: 'Our work is',
  principlesHeading: 'The principles behind every programme',

  principles: [
    {
      title: 'Compassion centred',
      body:
        'We are driven by a deep compassion for the poor and the oppressed. A commitment to serving those in need is at the heart of who we are, and it shapes every decision we make.',
    },
    {
      title: 'Child focused',
      body:
        'Children are the central focus of all we do. When one child is supported, reunited with family, and given a future, we count it nothing but joy.',
    },
    {
      title: 'Love for the homeless',
      body:
        'We are deeply committed to serving the homeless community and to tackling the root causes that leave people without a safe place to call home.',
    },
    {
      title: 'Measurable',
      body:
        'Our work is tracked internally and we share our results with everyone involved. We believe transparency is how trust is earned and kept.',
    },
  ],

  donate: {
    eyebrow: 'Stand with us',
    heading: 'Your gift restores dignity and reunites families',
    body:
      'No donation is too small. In 2025, the large majority of our operating expenses went straight to programmes that support children and parents living in poverty. Give today and help someone move forward with confidence, care, and connection.',
    cta: 'Donate',
  },
}

export default whatWeDoContent
