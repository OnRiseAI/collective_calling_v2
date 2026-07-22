import { defineArrayMember, defineField, defineType } from 'sanity'

/**
 * Object types for the six-chapter experience-led homepage. Field names mirror
 * lib/content/home.types.ts one to one; the GROQ in lib/sanity/home.query.ts
 * selects exactly these names. Editors can override any field; anything left
 * empty falls back to the canonical seed copy.
 */

export const anchorCta = defineType({
  name: 'anchorCta',
  title: 'In-page CTA',
  type: 'object',
  fields: [
    defineField({ name: 'label', title: 'Label', type: 'string' }),
    defineField({ name: 'targetId', title: 'Target section id', type: 'string' }),
  ],
})

export const linkCta = defineType({
  name: 'linkCta',
  title: 'Link CTA',
  type: 'object',
  fields: [
    defineField({ name: 'label', title: 'Label', type: 'string' }),
    defineField({ name: 'href', title: 'Href', type: 'string' }),
  ],
})

export const heroChapter = defineType({
  name: 'heroChapter',
  title: 'Hero chapter',
  type: 'object',
  fields: [
    defineField({ name: 'headline', title: 'Headline', type: 'string' }),
    defineField({
      name: 'text',
      title: 'Paragraphs',
      type: 'array',
      of: [defineArrayMember({ type: 'text' })],
    }),
    defineField({ name: 'image', title: 'Image', type: 'image' }),
    defineField({ name: 'alt', title: 'Image alt text', type: 'string' }),
    defineField({ name: 'primaryCta', title: 'Primary CTA', type: 'anchorCta' }),
    defineField({ name: 'secondaryCta', title: 'Secondary CTA', type: 'anchorCta' }),
  ],
})

export const philosophyChapter = defineType({
  name: 'philosophyChapter',
  title: 'Philosophy chapter',
  type: 'object',
  fields: [
    defineField({ name: 'headline', title: 'Headline', type: 'string' }),
    defineField({
      name: 'body',
      title: 'Paragraphs',
      type: 'array',
      of: [defineArrayMember({ type: 'text' })],
    }),
    defineField({ name: 'pullLine', title: 'Pulled line', type: 'text' }),
  ],
})

export const expressionRow = defineType({
  name: 'expressionRow',
  title: 'Expression',
  type: 'object',
  fields: [
    defineField({ name: 'key', title: 'Key', type: 'string', readOnly: true }),
    defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({ name: 'belief', title: 'Belief line', type: 'text' }),
    defineField({ name: 'body', title: 'Body', type: 'text' }),
    defineField({ name: 'image', title: 'Image', type: 'image' }),
    defineField({ name: 'alt', title: 'Image alt text', type: 'string' }),
    defineField({ name: 'cta', title: 'CTA', type: 'linkCta' }),
  ],
})

export const expressionsChapter = defineType({
  name: 'expressionsChapter',
  title: 'Expressions chapter',
  type: 'object',
  fields: [
    defineField({ name: 'headline', title: 'Headline', type: 'string' }),
    defineField({ name: 'intro', title: 'Intro', type: 'text' }),
    defineField({
      name: 'credo',
      title: 'Credo lines',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'rows',
      title: 'Expressions',
      type: 'array',
      of: [defineArrayMember({ type: 'expressionRow' })],
    }),
  ],
})

export const possibleChapter = defineType({
  name: 'possibleChapter',
  title: 'See What’s Possible chapter',
  type: 'object',
  fields: [
    defineField({ name: 'headline', title: 'Headline', type: 'string' }),
    defineField({ name: 'intro', title: 'Intro', type: 'text' }),
    defineField({
      name: 'moments',
      title: 'Someone lines',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({ name: 'outro', title: 'Outro', type: 'text' }),
  ],
})

export const impactChapter = defineType({
  name: 'impactChapter',
  title: 'Impact chapter',
  type: 'object',
  fields: [
    defineField({ name: 'headline', title: 'Headline', type: 'string' }),
    defineField({
      name: 'intro',
      title: 'Intro paragraphs',
      type: 'array',
      of: [defineArrayMember({ type: 'text' })],
    }),
    defineField({
      name: 'moments',
      title: 'Moment lines',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({ name: 'outro', title: 'Outro', type: 'text' }),
    defineField({ name: 'cta', title: 'CTA', type: 'linkCta' }),
  ],
})

export const invitationChapter = defineType({
  name: 'invitationChapter',
  title: 'Invitation chapter',
  type: 'object',
  fields: [
    defineField({ name: 'headline', title: 'Headline', type: 'string' }),
    defineField({ name: 'intro', title: 'Intro', type: 'text' }),
    defineField({
      name: 'bring',
      title: 'Bring lines',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({ name: 'outro', title: 'Outro', type: 'text' }),
    defineField({ name: 'cta', title: 'CTA', type: 'linkCta' }),
  ],
})
