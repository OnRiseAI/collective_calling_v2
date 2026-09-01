import { defineArrayMember, defineField, defineType } from 'sanity'
import { PHASE1_TEST_SLUG } from '../../../lib/visual-page/types'

/**
 * Isolated visual page document. Phase 1 does not replace homePage or migrate
 * live documents. One document per locale + slug. Slug is locked to the
 * isolated test page for this phase.
 */
export const visualPage = defineType({
  name: 'visualPage',
  title: 'Visual page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 64 },
      validation: (rule) =>
        rule.required().custom((value) => {
          if (!value?.current) return 'Slug is required'
          if (value.current !== PHASE1_TEST_SLUG) {
            return `Phase 1 only allows "${PHASE1_TEST_SLUG}"`
          }
          return true
        }),
    }),
    defineField({
      name: 'locale',
      title: 'Locale',
      type: 'string',
      options: {
        list: [
          { title: 'English', value: 'en' },
          { title: 'Spanish', value: 'es' },
        ],
        layout: 'radio',
      },
      initialValue: 'en',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'visualPageSeo',
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        defineArrayMember({ type: 'heroSection' }),
        defineArrayMember({ type: 'statsSection' }),
        defineArrayMember({ type: 'imageTextSection' }),
        defineArrayMember({ type: 'ctaSection' }),
      ],
      validation: (rule) => rule.max(20),
    }),
  ],
  preview: {
    select: { title: 'title', locale: 'locale', slug: 'slug.current' },
    prepare({ title, locale, slug }) {
      return {
        title: title || 'Visual page',
        subtitle: `${locale ?? 'en'} / ${slug ?? ''}`,
      }
    },
  },
})
