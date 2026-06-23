/**
 * Sitewide constants derived from verified organization facts.
 * Do NOT add fabricated founders, ratings, awards, or numbers.
 */

export const SITE = {
  name: 'Collective Calling',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://collectivecalling.org',
  description:
    'Collective Calling is a Christian charity restoring dignity and strengthening families, with programs responding to homelessness in Spain and caring for street-connected children in Tanzania.',
  ogImage: '/images/about/hero-group.jpg',
  org: {
    legalName: 'Collective Calling',
    foundingDate: '2017',
    registration: '611.510',
    taxId: 'G93524130',
    streetAddress: 'Av. Pablo Ruiz Picasso 4',
    postalCode: '29670',
    addressLocality: 'San Pedro Alcantara',
    addressRegion: 'Malaga',
    addressCountry: 'ES',
    telephone: '+34 711 006 961',
    email: 'info@collectivecalling.org',
    sameAs: [
      'https://www.facebook.com/collectivecalling',
      'https://www.youtube.com/channel/UC-el3s8QuBqD81RtpODyhgQ',
      'https://www.instagram.com/collective_calling',
    ],
  },
} as const

export const isIndexable = process.env.NEXT_PUBLIC_SITE_INDEXABLE === 'true'
