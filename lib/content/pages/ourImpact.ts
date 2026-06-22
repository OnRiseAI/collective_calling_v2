import type { PageHero, RichBlock } from './types'

/**
 * Content for the Our Impact page (/about/our-impact).
 *
 * Adapted faithfully from Collective Calling's own Our Impact page, which frames
 * the work as transforming lives and bringing hope to vulnerable children in
 * Tanzania and to people experiencing homelessness in Spain, across a year of
 * compassion, resilience, and impact. The source page itself is mostly a wrapper
 * around a downloadable Impact Report PDF, so the narrative here is supplemented
 * with the real, established programme facts already used across the Spain and
 * Tanzania pages rather than inventing new statistics.
 *
 * Real figures only. The hard numbers used are all established programme facts:
 *  - 18 children currently rescued and cared for at the Centre of Hope.
 *  - The Centre of Hope established in 2018, in Kasulu, Tanzania.
 *  - Spain's first mobile shower unit (the "first" is the verifiable claim).
 * Spend is framed qualitatively ("the large majority of operating expenses went
 * to programmes"), matching the Spain and Tanzania content, with no fabricated
 * percentage. One figure (total people reached) is genuinely unknown and is
 * clearly marked as a placeholder below; it is NOT rendered on the page until a
 * real number is supplied.
 *
 * The copy is kept in the brand voice from the brand board (section 7): warm,
 * faith-forward, dignified, and direct, centred on restoring dignity and
 * strengthening families, hopeful rather than guilt-driven. No em dashes
 * anywhere.
 *
 * This is plain typed data so the page and its tests stay simple. The hero owns
 * the page's only h1; narrative section headings are h2.
 */

/** A single real, verifiable figure for the small impact stat row. */
export type ImpactFigure = {
  value: string
  label: string
}

export type OurImpactContent = {
  hero: PageHero
  intro: string[]
  /**
   * A small row of REAL figures only. Every value here is an established
   * programme fact. No fabricated numbers.
   */
  figures: {
    eyebrow: string
    heading: string
    items: ImpactFigure[]
  }
  spain: RichBlock
  tanzania: RichBlock
  stewardship: {
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

/**
 * PLACEHOLDER, intentionally NOT rendered. The total number of people reached
 * across Spain and Tanzania is not published anywhere in the source material, so
 * inventing it would breach the no-fabricated-numbers rule. Supply a real,
 * sourced figure here and add it to `figures.items` only once verified.
 */
export const TOTAL_PEOPLE_REACHED_PLACEHOLDER = null

export const ourImpactContent: OurImpactContent = {
  hero: {
    eyebrow: 'About us',
    title: 'Our Impact',
    lede:
      'Lives changed in two places at once: people met with dignity on the streets of Spain, and street-connected children walked home to their families in Tanzania. This is the difference your support makes.',
  },

  intro: [
    'At Collective Calling, we are dedicated to transforming lives and bringing hope to vulnerable children in Tanzania and to people experiencing homelessness in Spain. Across the past year we have provided shelter, hygiene, medical care, schooling, and above all dignity to people in need, while extending our programmes to reach more communities.',
    'This journey has been one of compassion, resilience, and impact. Whether you have supported us before or are just learning about our mission, we invite you to see the difference we are making together, and how you can be part of it.',
  ],

  figures: {
    eyebrow: 'By the numbers',
    heading: 'Real work, real change',
    items: [
      {
        value: '18',
        label: 'children rescued and cared for at the Centre of Hope in Kasulu',
      },
      {
        value: '2018',
        label: 'the year the Centre of Hope opened as a safe haven for street children',
      },
      {
        value: '1st',
        label: 'Spain’s first mobile shower unit, taking dignity to the streets',
      },
    ],
  },

  spain: {
    heading: 'Spain: dignity, delivered where it is needed most',
    body:
      'Along the Costa del Sol, our mobile shower unit travels to where the need is greatest, offering something so simple yet so powerful: a warm shower and a moment of humanity for people experiencing homelessness. Each visit is more than hygiene. It is the start of trust, a listening ear, and a connection to further support. Often a shower is the first step toward hope and a new beginning, and it is the relationships built around it that open the door to lasting change.',
  },

  tanzania: {
    heading: 'Tanzania: a safe haven and a way home',
    body:
      'In Kasulu, our Outreach Teams rescue children living in danger on the streets and bring them into the safety of the Centre of Hope. There each child receives a safe place to live, nutritious meals, medical care, accelerated learning, and daily counselling so they can begin to heal. But the Centre is never the destination. Our goal is always home: our social worker walks alongside each family so that, when reunification is safe and stable, a child returns to their own family with hope and belonging.',
  },

  stewardship: {
    eyebrow: 'Your gift, well stewarded',
    heading: 'Where your support goes',
    body: [
      'We take seriously the trust that comes with every gift. In 2025, the large majority of our operating expenses went straight to programmes that support children and parents living in poverty, keeping the mobile shower unit on the road in Spain and the Centre of Hope a safe haven in Tanzania.',
      'Every donation, large or small, is part of this story. It is people like you who keep hot water flowing on the Costa del Sol and who help a child in Kasulu find their way home.',
    ],
  },

  donate: {
    eyebrow: 'Be part of the impact',
    heading: 'Your gift restores dignity and reunites families',
    body:
      'No donation is too small. Give today and help us meet people with dignity in Spain and walk children home to their families in Tanzania. Together we keep this work going.',
    cta: 'Donate',
  },
}

export default ourImpactContent
