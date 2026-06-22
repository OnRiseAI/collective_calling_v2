import { defineField, defineType } from 'sanity'

/** A donation tier. Mirrors HomeContent.donate.monthlyTiers[] and onceTiers[]. */
export const donateTier = defineType({
  name: 'donateTier',
  title: 'Donate tier',
  type: 'object',
  fields: [
    defineField({
      name: 'amount',
      title: 'Amount',
      type: 'number',
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: 'interval',
      title: 'Interval',
      type: 'string',
      options: {
        list: [
          { title: 'Monthly', value: 'monthly' },
          { title: 'Once', value: 'once' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'impact',
      title: 'Impact',
      type: 'string',
      description: 'What this amount funds.',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: 'amount', subtitle: 'impact' },
  },
})
