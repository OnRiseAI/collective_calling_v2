import { PHASE1_TEST_SLUG, visualPageId, type VisualLocale, type VisualPageData } from './types'

function testPage(locale: VisualLocale): VisualPageData {
  return {
    _id: visualPageId(locale, PHASE1_TEST_SLUG),
    _type: 'visualPage',
    title: 'Visual editor test',
    slug: PHASE1_TEST_SLUG,
    locale,
    seo: {
      title: 'Visual editor test',
      description: 'Isolated proof of the visual editor. This is not a live Collective Calling page.',
    },
    sections: [
      {
        _type: 'heroSection',
        _key: 'hero-1',
        eyebrow: 'EDITOR TEST',
        headline: { lead: 'Editor test', accent: 'page.' },
        description:
          'Isolated proof of the visual editor. This is not a live Collective Calling page. Published visitors see only published content.',
        alt: 'Warm interior photograph used as a placeholder on the editor test page',
        primaryCta: { label: 'Start your journey', href: '/journey' },
        secondaryCta: { label: "See what's possible", href: '/stories' },
      },
      {
        _type: 'statsSection',
        _key: 'stats-1',
        eyebrow: 'PLACEHOLDER FIGURES',
        heading: 'These numbers exist only on the test page',
        intro: 'Add, remove, or reorder this band in the Website Editor without touching the live homepage.',
        stats: [
          { _key: 'stat-a', value: 3, suffix: '', label: 'Allowlisted section types nearby' },
          { _key: 'stat-b', value: 2, suffix: '', label: 'Locales (en and es documents)' },
          { _key: 'stat-c', value: 1, suffix: '', label: 'Isolated test route' },
        ],
      },
      {
        _type: 'ctaSection',
        _key: 'cta-1',
        eyebrow: 'SANITY DRAFTS',
        headline: { lead: 'Save a draft,', accent: 'then publish.' },
        body: 'Routine edits stay in Sanity. No Git, GitHub, or Vercel step is required for copy changes.',
        primaryCta: { label: 'Open Studio', href: '/studio' },
        secondaryCta: { label: 'Back home', href: '/' },
        theme: 'dark',
      },
    ],
  }
}

export const SEED_VISUAL_PAGES: Record<VisualLocale, VisualPageData> = {
  en: testPage('en'),
  es: {
    ...testPage('es'),
    title: 'Prueba del editor visual',
    seo: {
      title: 'Prueba del editor visual',
      description: 'Prueba aislada del editor visual. No es una pagina publica de Collective Calling.',
    },
    sections: [
      {
        _type: 'heroSection',
        _key: 'hero-1',
        eyebrow: 'PRUEBA DEL EDITOR',
        headline: { lead: 'Pagina de', accent: 'prueba.' },
        description:
          'Prueba aislada del editor visual. No es una pagina publica de Collective Calling.',
        alt: 'Fotografia de interior usada como marcador de posicion',
        primaryCta: { label: 'Start your journey', href: '/journey' },
        secondaryCta: { label: "See what's possible", href: '/stories' },
      },
      {
        _type: 'statsSection',
        _key: 'stats-1',
        eyebrow: 'CIFRAS DE PRUEBA',
        heading: 'Estos numeros solo existen en la pagina de prueba',
        intro: 'Anade, quita o reordena esta seccion en el Website Editor.',
        stats: [
          { _key: 'stat-a', value: 3, suffix: '', label: 'Tipos de seccion permitidos cerca' },
          { _key: 'stat-b', value: 2, suffix: '', label: 'Idiomas (en y es)' },
          { _key: 'stat-c', value: 1, suffix: '', label: 'Ruta de prueba aislada' },
        ],
      },
      {
        _type: 'ctaSection',
        _key: 'cta-1',
        eyebrow: 'BORRADORES DE SANITY',
        headline: { lead: 'Guarda un borrador,', accent: 'luego publica.' },
        body: 'Los cambios de contenido viven en Sanity. No hace falta Git para un cambio de texto.',
        primaryCta: { label: 'Open Studio', href: '/studio' },
        secondaryCta: { label: 'Back home', href: '/' },
        theme: 'dark',
      },
    ],
  },
}

export const HERO_IMAGE_FALLBACK = '/images/about/hero-group.jpg'
export const IMAGE_TEXT_FALLBACK = '/design/values-crop.jpg'

export function getSeedVisualPage(locale: VisualLocale): VisualPageData {
  return SEED_VISUAL_PAGES[locale]
}
