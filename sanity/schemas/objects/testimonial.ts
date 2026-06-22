import { defineField, defineType } from 'sanity'

/** A testimonial quote. Mirrors HomeContent.testimonials[]. */
export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
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
      name: 'attribution',
      title: 'Attribution',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'placeholder',
      title: 'Placeholder',
      type: 'boolean',
      description: 'Marks this as placeholder copy, not a real testimonial.',
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: 'attribution', subtitle: 'quote' },
  },
})
