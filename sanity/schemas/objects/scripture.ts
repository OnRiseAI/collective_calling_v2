import { defineField, defineType } from 'sanity'

/** A scripture quote. Mirrors HomeContent.scripture. */
export const scripture = defineType({
  name: 'scripture',
  title: 'Scripture',
  type: 'object',
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'reference',
      title: 'Reference',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
})
