import { defineField, defineType } from 'sanity'

/** How donations are split. Mirrors HomeContent.money. */
export const moneySplit = defineType({
  name: 'moneySplit',
  title: 'Money split',
  type: 'object',
  fields: [
    defineField({
      name: 'programsPct',
      title: 'Programs percentage',
      type: 'number',
      validation: (rule) => rule.required().min(0).max(100),
    }),
    defineField({
      name: 'adminPct',
      title: 'Admin percentage',
      type: 'number',
      validation: (rule) => rule.required().min(0).max(100),
    }),
    defineField({ name: 'programsLabel', title: 'Programs label', type: 'string' }),
    defineField({ name: 'adminLabel', title: 'Admin label', type: 'string' }),
    defineField({ name: 'note', title: 'Note', type: 'text', rows: 2 }),
  ],
})
