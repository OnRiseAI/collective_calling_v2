import { defineArrayMember, defineField, defineType } from 'sanity'

/**
 * Allowlisted section objects for visualPage. These are data only: copy, image
 * references, CTAs, order, and controlled variants. They do not store source,
 * className, HTML, or executable expressions.
 */

export const visualPageSeo = defineType({
  name: 'visualPageSeo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
  ],
})

export const visualStatItem = defineType({
  name: 'visualStatItem',
  title: 'Stat',
  type: 'object',
  fields: [
    defineField({ name: 'value', title: 'Figure', type: 'number' }),
    defineField({ name: 'suffix', title: 'Suffix', type: 'string' }),
    defineField({ name: 'label', title: 'Label', type: 'string' }),
  ],
})

export const heroSection = defineType({
  name: 'heroSection',
  title: 'Hero',
  type: 'object',
  fields: [
    defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
    defineField({ name: 'headline', title: 'Heading', type: 'splitHeading' }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
    defineField({ name: 'image', title: 'Photograph', type: 'image' }),
    defineField({ name: 'alt', title: 'Photograph alt text', type: 'string' }),
    defineField({ name: 'primaryCta', title: 'Primary action', type: 'linkCta' }),
    defineField({ name: 'secondaryCta', title: 'Secondary action', type: 'linkCta' }),
  ],
})

export const statsSection = defineType({
  name: 'statsSection',
  title: 'Stats',
  type: 'object',
  fields: [
    defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({ name: 'intro', title: 'Intro', type: 'text' }),
    defineField({
      name: 'stats',
      title: 'Figures',
      type: 'array',
      of: [defineArrayMember({ type: 'visualStatItem' })],
      validation: (rule) => rule.max(6),
    }),
  ],
})

export const imageTextSection = defineType({
  name: 'imageTextSection',
  title: 'Image and text',
  type: 'object',
  fields: [
    defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
    defineField({ name: 'headline', title: 'Heading', type: 'splitHeading' }),
    defineField({ name: 'body', title: 'Body', type: 'text' }),
    defineField({ name: 'image', title: 'Photograph', type: 'image' }),
    defineField({ name: 'alt', title: 'Photograph alt text', type: 'string' }),
    defineField({ name: 'cta', title: 'Link', type: 'linkCta' }),
    defineField({
      name: 'imagePosition',
      title: 'Image position',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Right', value: 'right' },
        ],
        layout: 'radio',
      },
      initialValue: 'left',
    }),
  ],
})

export const ctaSection = defineType({
  name: 'ctaSection',
  title: 'Call to action',
  type: 'object',
  fields: [
    defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
    defineField({ name: 'headline', title: 'Heading', type: 'splitHeading' }),
    defineField({ name: 'body', title: 'Body', type: 'text' }),
    defineField({ name: 'primaryCta', title: 'Primary action', type: 'linkCta' }),
    defineField({ name: 'secondaryCta', title: 'Secondary action', type: 'linkCta' }),
    defineField({
      name: 'theme',
      title: 'Theme',
      type: 'string',
      options: {
        list: [
          { title: 'Default', value: 'default' },
          { title: 'Dark', value: 'dark' },
        ],
        layout: 'radio',
      },
      initialValue: 'dark',
    }),
  ],
})
