import { defineField, defineType } from 'sanity'

/** Trust and registration details. Mirrors HomeContent.trust. */
export const trust = defineType({
  name: 'trust',
  title: 'Trust',
  type: 'object',
  fields: [
    defineField({ name: 'registration', title: 'Registration', type: 'string' }),
    defineField({ name: 'statement', title: 'Statement', type: 'text', rows: 3 }),
    defineField({
      name: 'partners',
      title: 'Partners',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
})
