import { defineField, defineType } from 'sanity'

/**
 * Hero section. Mirrors HomeContent.hero.
 * The image asset and its alt text are sibling fields, matching the content
 * contract where image and alt are separate strings on the same object.
 */
export const heroBlock = defineType({
  name: 'heroBlock',
  title: 'Hero',
  type: 'object',
  fields: [
    defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'lede', title: 'Lede', type: 'text', rows: 3 }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'alt',
      title: 'Image alt text',
      type: 'string',
      description: 'Describes the hero image for screen readers.',
      validation: (rule) => rule.required(),
    }),
  ],
})
