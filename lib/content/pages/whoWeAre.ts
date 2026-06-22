import type { PageHero, ValueItem } from './types'

/**
 * Content for the Who We Are page (/about/who-we-are).
 *
 * Adapted faithfully from Collective Calling's own Who We Are page: the mission
 * (Spain and Tanzania), the vision statement with its Jeremiah 29:11-13
 * scripture, and the charity's four stated values (We are Christian, We value
 * people, We are stewards, We are partners). The copy is kept in the brand voice
 * from the brand board (section 7): warm, faith-forward, dignified, and direct,
 * centred on restoring dignity and strengthening families, hopeful rather than
 * guilt-driven.
 *
 * This is plain typed data so the page and its tests stay simple. The hero owns
 * the page's only h1; values render as h3 sub-section headings.
 */

/** A vision statement: a short quote plus the scripture it rests on. */
export type VisionQuote = {
  quote: string
  scripture: string
  reference: string
}

export type WhoWeAreContent = {
  hero: PageHero
  mission: string[]
  vision: VisionQuote
  values: ValueItem[]
}

export const whoWeAreContent: WhoWeAreContent = {
  hero: {
    eyebrow: 'About us',
    title: 'Who We Are',
    lede:
      'Collective Calling is a Christian charity restoring dignity and strengthening families. We answer homelessness in Spain and reunite street-connected children in Tanzania.',
    image: '/images/about/hero-group.jpg',
    alt: 'The Collective Calling team and community gathered together.',
  },

  mission: [
    'Collective Calling is committed to addressing the pressing issue of homelessness in Spain and to supporting street children in Tanzania.',
    'In Tanzania, our mission is to provide comprehensive assistance, empowerment, and long-term solutions to children affected by homelessness, poverty, and social exclusion. We work to reunite families and to give children a brighter future.',
    'In Spain, our mission is to bring dignity back to our homeless friends through our Mobile Sanitary Unit, meeting people where they are with warmth and respect.',
  ],

  vision: {
    quote:
      'Our vision is a world without homelessness, where everyone has a secure and supportive home.',
    scripture:
      'For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future. Then you will call on me and come and pray to me, and I will listen to you. You will seek me and find me when you seek me with all your heart.',
    reference: 'Jeremiah 29:11-13',
  },

  values: [
    {
      title: 'We are Christian',
      body:
        "Collective Calling's founders and board are Christians who deeply value the teachings of Jesus Christ and biblical integrity. Our work is rooted in a commitment to uphold these principles in everything we do. We strive to reflect Christ's love and compassion in our mission, so that our actions and decisions align with our faith. This foundation shapes how we serve vulnerable children and families, and it fosters a culture of trust, accountability, and community among those we serve and the partners who walk with us.",
    },
    {
      title: 'We value people',
      body:
        'We give priority to people over money, structures, bureaucracy, and systems. We work in a way that upholds the dignity and intrinsic worth of every individual, from our volunteers and donors to the poor and the oppressed. We celebrate the uniqueness of every person and the richness of cultural diversity, and we encourage the personal, professional, and spiritual development of everyone who is part of the Collective Calling family.',
    },
    {
      title: 'We are stewards',
      body:
        'The resources given to Collective Calling are not ours. They are a trust from God, through our donors, designated for the poor and the oppressed. We are an open book: we speak factually and honestly, we demand consistency between what we say and what we do, and we present a public image that aligns with reality. We are also stewards of God’s creation, caring for the Earth and acting to protect the environment throughout our programmes.',
    },
    {
      title: 'We are partners',
      body:
        'We are part of a larger global network of like-minded NGOs leading the charge within the family reunification sector across Africa. Our partnerships bring expertise and accountability to our programming. Wherever possible, we stay open to collaborating with governments and other like-minded organisations to further our mission of serving the poor and the oppressed.',
    },
  ],
}

export default whoWeAreContent
