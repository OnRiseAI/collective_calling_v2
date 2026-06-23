import { SITE } from '@/lib/site'

/**
 * Returns the sitewide Organization JSON-LD object (schema.org/NGO).
 * Uses only verified facts from SITE. No fabricated founders, ratings, or awards.
 */
export function organizationJsonLd(): object {
  const { org } = SITE
  return {
    '@context': 'https://schema.org',
    '@type': 'NGO',
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}${SITE.ogImage}`,
    description: SITE.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: org.streetAddress,
      postalCode: org.postalCode,
      addressLocality: org.addressLocality,
      addressRegion: org.addressRegion,
      addressCountry: org.addressCountry,
    },
    telephone: org.telephone,
    email: org.email,
    foundingDate: org.foundingDate,
    sameAs: [...org.sameAs],
    identifier: {
      '@type': 'PropertyValue',
      propertyID: 'Spain charity registration',
      value: org.registration,
    },
  }
}
