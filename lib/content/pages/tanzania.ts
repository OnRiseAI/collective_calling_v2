import type { PageHero, ProgramHelpItem, RichBlock } from './types'

/**
 * Content for the Tanzania programme page (/tanzania).
 *
 * Adapted faithfully from Collective Calling's own Tanzania page: the work
 * rescuing and reuniting street-connected children in Kasulu through the Centre
 * of Hope, framed by the orphanage statistic that drives the family
 * reunification mission, the three Rs of the approach (Rescue, Rehabilitate,
 * Reintegrate), and Caleb's story.
 *
 * The real facts are used verbatim: 4 out of 5 children living in orphanages are
 * not orphans and have at least one surviving parent; the Centre of Hope is a
 * transitional rescue center for street children in Kasulu, established in 2018,
 * a secure 200m home on a 500m plot with a boundary wall, currently caring for
 * 18 children.
 *
 * The copy is kept in the brand voice from the brand board (section 7): warm,
 * faith-forward, dignified, and direct, centred on restoring dignity and
 * strengthening families, hopeful rather than guilt-driven. No em dashes
 * anywhere.
 *
 * This is plain typed data so the page and its tests stay simple. The hero owns
 * the page's only h1; the three help items render as h3 sub-section headings via
 * ProgramHelp. The Tanzania accent is clay (terracotta) per the homepage appeal
 * theme.
 */

export type TanzaniaContent = {
  hero: PageHero
  statistic: {
    heading: string
    body: string[]
  }
  centre: {
    heading: string
    body: string[]
    image: string
    alt: string
  }
  reunification: {
    eyebrow: string
    heading: string
    body: string[]
  }
  help: {
    eyebrow: string
    heading: string
    items: ProgramHelpItem[]
  }
  caleb: {
    eyebrow: string
    heading: string
    story: RichBlock
    image: string
    alt: string
  }
  donate: {
    eyebrow: string
    heading: string
    body: string
    sponsor: string
    cta: string
  }
}

export const tanzaniaContent: TanzaniaContent = {
  hero: {
    eyebrow: 'Our work in Tanzania',
    title: 'Tanzania',
    lede:
      'Rescuing street-connected children in Kasulu and walking them home. Through the Centre of Hope, we help vulnerable children find healing, belonging, and a safe future with their own families.',
    image: '/images/tanzania/hero.jpg',
    alt: 'Children at Collective Calling’s Centre of Hope in Kasulu, Tanzania.',
  },

  statistic: {
    heading: 'Four out of five children in orphanages are not orphans',
    body: [
      'A recent study conducted across orphanages in Africa returned a shocking finding: 4 out of 5 children currently living in orphanages are not actually orphans. They have at least one surviving parent. For most children living in orphanages or on the streets, the reality is that they have a family to go home to, and that was true of the children we found in Kasulu too.',
      'Research proves that children develop best in a loving family unit. Institutional care is often more damaging, as children are passed from one care giver to the next, deepening the trauma they have already lived through. It is time to shift the mindset and change the approach. What vulnerable and at-risk children need is rehabilitation, not institutionalisation, and family reunification gives them the best opportunity to find hope and belonging with their own families.',
    ],
  },

  centre: {
    heading: 'The Centre of Hope',
    body: [
      'The Centre of Hope is a transitional rescue center for street children, located in Kasulu, Tanzania. Established in 2018, it was created in response to the growing challenges around the protection and care of vulnerable children living on the streets. The Centre operates within a secure 200m home on a 500m plot, enclosed by a protective boundary wall. To date, Collective Calling has rescued and is currently caring for 18 children at the Centre, providing them with a safe haven and a pathway toward healing and reintegration.',
      'Our Outreach Teams rescue children who are in dangerous situations on the streets, as well as young girls from prostitution houses. Each child is prepared for rescue into the Centre of Hope by first building a relationship of trust, and is then equipped mentally, emotionally, and spiritually for long-term success at home with their families.',
      'We provide a safe place to live, nutritious meals, new clothing, necessary medical care, and a loving environment where every child is treated uniquely. We establish where each child is academically, assess their spiritual needs, and look for signs of induced trauma and PTSD. From there a unique plan is created, the child is enrolled into our accelerated learning programme to help them re-enter schooling, and trauma and spiritual counselling is provided daily.',
    ],
    image: '/images/tanzania/centre-of-hope.jpg',
    alt: 'A child cared for at the Centre of Hope in Kasulu, Tanzania.',
  },

  reunification: {
    eyebrow: 'Our approach',
    heading: 'Rescue, rehabilitate, reintegrate',
    body: [
      'When we find a child on the street we follow three Rs: Rescue, Rehabilitate, and Reintegrate. The Centre of Hope provides immediate relief from malnutrition, ill health, and dangerous situations, and then becomes the place where lasting change begins.',
      'Before a child is brought into our care, our social worker assesses the child’s situation and connects with their family or extended relatives. This means careful home visits, interviews, and community engagement to understand the root causes of vulnerability and determine whether family reunification is possible.',
      'Once a child is in our programme, the social worker keeps in regular contact with the family, offering follow-up support, guidance, and counselling, so that if and when reunification happens, it is safe, stable, and long-lasting.',
    ],
  },

  help: {
    eyebrow: 'How we help',
    heading: 'A safe haven and a way home',
    items: [
      {
        title: 'Rescue',
        body:
          'Our Outreach Teams find children living in dangerous situations on the streets of Kasulu, and young girls trapped in prostitution houses. We build a relationship of trust first, then bring each child into the safety of the Centre of Hope, away from malnutrition, ill health, and harm, and into immediate care.',
      },
      {
        title: 'Rehabilitate',
        body:
          'At the Centre we provide a safe place to live, nutritious meals, new clothing, and medical care. Each child is assessed academically, spiritually, and psychologically, then enrolled in our accelerated learning programme with daily trauma and spiritual counselling, so they can begin to heal and re-enter schooling.',
      },
      {
        title: 'Reintegrate',
        body:
          'Our goal is always home. Our social worker walks alongside each family with home visits, counselling, and follow-up support, equipping and empowering parents to care for and love their children. When reunification is safe and stable, the child returns to their own family with hope and belonging.',
      },
    ],
  },

  caleb: {
    eyebrow: 'A child’s story',
    heading: 'Meet Caleb',
    story: {
      body:
        'Caleb was born in a village near Kasulu town. He is 5 years old and the youngest of 5 orphans. He was discovered when his oldest brother, who is 21, became too ill with kidney problems to care for them any longer. The children were suffering from painful feet mites that needed immediate hospital treatment, so they were taken into the Centre of Hope while their older brother recovers and gets back on his feet. Caleb and his brothers and sisters are now thriving: fully recovered, enrolled in a local school, smiling, and happily taking part in everything the Centre of Hope has to offer. Caleb will need medical support for the rest of his life because of HIV he was born with, as both of his parents died of the illness. By sponsoring Caleb, you help us continue to meet his needs at the Centre, and when he is able to return home to his family.',
    },
    image: '/images/tanzania/caleb-after.jpg',
    alt: 'Caleb, thriving and smiling after coming into the care of the Centre of Hope.',
  },

  donate: {
    eyebrow: 'Give to Tanzania',
    heading: 'Help a child find their way home',
    body:
      'No donation is too small. In 2025, the large majority of our operating expenses went straight to programmes that support children and parents living in poverty. Your gift helps keep the Centre of Hope a safe haven, and helps reunite children with their families.',
    sponsor:
      'You can also sponsor a child for EUR 58 a month, providing the food, medical care, schooling, and counselling that gives a child like Caleb the chance to heal and go home.',
    cta: 'Donate or sponsor a child',
  },
}

export default tanzaniaContent
