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
    legalName: SITE.org.legalName,
    taxID: SITE.org.taxId,
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

/**
 * Returns an Article JSON-LD object for an editorial story page.
 * Uses only facts supplied by the caller - no fabricated data.
 * No em dashes anywhere in this function.
 */
export function articleJsonLd(opts: {
  title: string
  description: string
  url: string
  image?: string
}): object {
  const base: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.title,
    description: opts.description,
    mainEntityOfPage: opts.url,
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.url,
    },
  }
  if (opts.image) base.image = opts.image
  return base
}
