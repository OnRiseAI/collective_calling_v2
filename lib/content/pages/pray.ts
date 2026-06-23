import type { PageHero } from './types'

/**
 * Content for the Pray page (/get-involved/pray).
 *
 * Faith-forward prayer points adapted from Collective Calling's voice and real
 * programme facts: the mobile shower unit in Spain, the Centre of Hope in
 * Kasulu Tanzania (18 children), family reunification, and the team.
 *
 * Scripture: 1 John 4:11 (as referenced in the brief); Psalm 82:3 added as a
 * second anchor, consistent with the charity's faith and justice framing.
 *
 * No fabricated facts. No em dashes.
 */

export type PrayPoint = {
  title: string
  body: string
}

export type PrayContent = {
  hero: PageHero
  intro: {
    eyebrow: string
    heading: string
    body: string[]
  }
  scripture: {
    quote: string
    reference: string
  }
  pointsEyebrow: string
  pointsHeading: string
  points: PrayPoint[]
  closing: string
}

export const prayContent: PrayContent = {
  hero: {
    eyebrow: 'Get involved',
    title: 'Pray with us',
    lede:
      'Prayer is not background noise. It is part of the work. Here are the things we are bringing before God right now.',
    image: '/images/spain-homelessness.jpg',
    alt: 'A person experiencing homelessness on the streets of Spain.',
  },

  intro: {
    eyebrow: 'Why prayer matters',
    heading: 'Standing with us before God',
    body: [
      'Collective Calling was built on the conviction that responding to homelessness and poverty is an act of love, and that love finds its source in God. We believe prayer is not separate from the practical work; it sustains and directs it.',
      'If you care about what we do in Spain and Tanzania, we would be glad to have you praying with us. Below are the specific things we are carrying right now.',
    ],
  },

  scripture: {
    quote:
      'Dear friends, since God so loved us, we also ought to love one another.',
    reference: '1 John 4:11',
  },

  pointsEyebrow: 'Current prayer points',
  pointsHeading: 'What we are praying for',

  points: [
    {
      title: 'The people we serve in Spain',
      body:
        'Pray for the men and women who receive our mobile shower unit in Spain. Many have been without stable housing for a long time. Ask God to bring them dignity, safety, and a path forward, and that the warmth they experience through our volunteers would point them toward something greater.',
    },
    {
      title: 'The Centre of Hope in Tanzania',
      body:
        'Our Centre of Hope in Kasulu, Tanzania, is home to 18 children who have been separated from their families. Pray for each child by name, even if you do not know those names. Ask God for healing, stability, and the restoration of family bonds wherever it is safe and possible.',
    },
    {
      title: 'Family reunification',
      body:
        'Many of the children in our care in Tanzania have families who want to welcome them home. Pray for that process: for wisdom in each case, for the removal of barriers, and for the courage families need to be reconciled.',
    },
    {
      title: 'The Collective Calling team',
      body:
        'Pray for the founders, staff, and volunteers who carry this work day to day. Ask God to sustain them with joy and resilience, to protect them in the field, and to give them wisdom as they make decisions that affect real lives.',
    },
    {
      title: 'Provision and partners',
      body:
        'Pray for the resources Collective Calling needs to keep going, and for the right partners to come alongside us. Ask God to raise up churches, businesses, and individuals who share our vision of a world without homelessness.',
    },
  ],

  closing:
    'If you are praying for us regularly, or if God has laid something on your heart for this work, we would love to hear from you. Use the Contact page to reach the team.',
}

export default prayContent
