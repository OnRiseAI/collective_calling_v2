import type { PageHero, TeamGroup } from './types'

/**
 * Content for the Our Team page (/about/our-team).
 *
 * Adapted faithfully from Collective Calling's own Who We Are page (the "Meet
 * the Team", "The Board", and "Ambassadors" sections): the charity's real
 * leadership, board, and ambassadors with their real roles and biographies. The
 * bios are lightly edited into the brand voice from the brand board (section 7),
 * warm, dignified, and direct, while keeping every fact intact.
 *
 * Headshots were harvested from the live site into `public/images/team/`. Where
 * a person had no usable portrait on the source (Gemma Carr), the member is left
 * without an `image` and the TeamGrid renders a tasteful initials avatar rather
 * than a placeholder face.
 *
 * This is plain typed data so the page and its tests stay simple. The hero owns
 * the page's only h1; group labels are h2 and member names are h3.
 */

export type OurTeamContent = {
  hero: PageHero
  intro: string
  groups: TeamGroup[]
}

export const ourTeamContent: OurTeamContent = {
  hero: {
    eyebrow: 'About us',
    title: 'Our Team',
    lede:
      'The people behind Collective Calling: founders, trustees, and ambassadors who share one calling, to restore dignity and strengthen families in Spain and Tanzania.',
    image: '/images/about/hero-group.jpg',
    alt: 'The Collective Calling team and community gathered together.',
  },

  intro:
    'Collective Calling is led by people who give their time, expertise, and hearts to the work. Our founders set the direction, our board brings governance and wisdom, and our ambassadors carry the mission into their own communities.',

  groups: [
    {
      label: 'Leadership',
      members: [
        {
          name: 'Paul Carr',
          role: 'President & Co-founder',
          bio: 'Born in Leicester, UK in 1982, Paul explored Australia and East Asia in his early twenties before finding his home in Spain. Following a deep calling, he travelled to Greece at 33 to help in the refugee crisis. Less than a year later Collective Calling was born, a reflection of his unwavering compassion and his commitment to helping others.',
          image: '/images/team/paul-carr.jpeg',
        },
        {
          name: 'Gemma Carr',
          role: 'Secretary & Co-founder',
          bio: 'A creative soul who grew up in Hampstead, north-west London, Gemma followed her heart to Spain at 23 and still lives there today. As an artist and entrepreneur she has left her mark through fine art and trompe l’oeil murals. In 2017, alongside her husband Paul, she co-founded Collective Calling, igniting a passion for making a positive difference in the lives of others.',
        },
        {
          name: 'Rebecka Rocky',
          role: 'Executive Director, Tanzania',
          bio: 'Armed with a Bachelor’s degree in law and a background in education and NGOs, Rebecka has long been a fervent advocate for children’s rights. With a heart dedicated to street children, she leads our work in Tanzania with the aim of reuniting families, empowering communities, and creating a brighter future for vulnerable children.',
          image: '/images/team/rebecka-rocky.png',
        },
      ],
    },
    {
      label: 'Board',
      members: [
        {
          name: 'Patrick Murphy',
          role: 'Chair of the Board',
          bio: 'A dedicated philanthropist, Patrick was introduced to our mission through a fundraising event in Spain, where the transformative work of the Centre of Hope ignited his passion. Inspired to make a difference, he engaged his foundation, the Zen Wealth Charitable Foundation, to contribute to our cause. Patrick brings expertise and philanthropic wisdom to our journey.',
          image: '/images/team/patrick-murphy.png',
        },
        {
          name: 'Kurt Kettner-Borough',
          role: 'Director',
          bio: 'Kurt has been the pastor of Wave Church in Puerto Banus, Spain for over a decade. With a heart for service, he has managed a non-profit and worked extensively in Africa, meeting both spiritual and practical needs through mission teams. His wealth of knowledge and experience enriches Collective Calling’s mission.',
          image: '/images/team/kurt-kettner-borough.png',
        },
        {
          name: 'Sarah Wood',
          role: 'Director',
          bio: 'After graduating with an MBA from the University of North Carolina, Sarah built a successful career in the regulated sector and serves as Director of Compliance, UK with Entain plc, one of the world’s largest gambling operators and a FTSE 100 company. She sits on the board of several Entain subsidiaries and brings a wealth of experience in compliance, governance, audit, and risk management. She is also an author of Christian non-fiction and enjoys travelling, yoga, and time at the beach.',
          image: '/images/team/sarah-wood.png',
        },
        {
          name: 'Barrie Tyler',
          role: 'Director',
          bio: 'With more than 30 years of investment management experience, Barrie is a Chartered Fellow of the Chartered Institute of Securities and Investment and a Chartered Wealth Manager. Having held senior roles at W.H. Ireland and Brewin Dolphin, he brings invaluable expertise to Collective Calling, driving sustainable growth and supporting our mission to transform lives.',
          image: '/images/team/barrie-tyler.jpeg',
        },
        {
          name: 'Andrew Chubb',
          role: 'Director',
          bio: 'A retired CEO of a Multi-Academy Trust and a passionate advocate for social justice, Andrew brings extensive experience in education to Collective Calling. He works closely with our executive and board, driving strategic development.',
          image: '/images/team/andrew-chubb.png',
        },
      ],
    },
    {
      label: 'Ambassadors',
      members: [
        {
          name: 'Veronika Tye',
          role: 'International Programming Ambassador',
          bio: 'Founder of Life4U, a prominent relocation company on the Costa del Sol, Veronika is a mother, wife, and compassionate individual whose desire to help those in need shines through her professional and personal life. Her respected presence in the community makes her a trusted figure and a valued part of the Collective Calling team.',
          image: '/images/team/veronika-tye.png',
        },
        {
          name: 'Helena Chevalley-Levy',
          role: 'Media & Strategy Ambassador',
          bio: 'A compassionate soul, Helena found her calling in Marbella after studying alternative medicines in Switzerland. With her natural gifts and a deep desire to serve others, she brings immeasurable value as our media and strategy ambassador, and we are thrilled to have her on board.',
          image: '/images/team/helena-chevalley-levy.jpeg',
        },
        {
          name: 'Yuliya Azuelos',
          role: 'Public Relations Ambassador',
          bio: 'An active Marbella public relations figure of Ukrainian origin, Yuliya brings her radiant energy to the most glamorous social events of the Costa del Sol and to the never-ending needs of the local Ukrainian refugee community. She shares Collective Calling’s multi-purpose approach and gets things done when it comes to helping others.',
          image: '/images/team/yuliya-azuelos.png',
        },
      ],
    },
  ],
}

export default ourTeamContent
