/**
 * Seeds the single `homePage` document into Sanity from the typed seed content
 * in lib/content/home.seed.ts, uploading the homepage images as Sanity image
 * assets.
 *
 * Run once, authenticated, via the Sanity CLI (it injects your user token):
 *   NEXT_PUBLIC_SANITY_PROJECT_ID=<id> NEXT_PUBLIC_SANITY_DATASET=production \
 *   npx sanity exec scripts/seed-sanity.ts --with-user-token
 *
 * It is idempotent: it uses createOrReplace on a fixed document id ("homePage"),
 * so running it again overwrites the document (it does re-upload the images).
 */
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { getCliClient } from 'sanity/cli'
import { SEED_HOME } from '../lib/content/home.seed'
import {
  HOME_CONTENT_VERSION,
  type Cta,
  type SplitHeading,
  type StoryCard,
} from '../lib/content/home.types'

const client = getCliClient({ apiVersion: '2025-01-01' })
const PUBLIC_DIR = join(process.cwd(), 'public')

let keyCounter = 0
const nextKey = (prefix: string): string => `${prefix}-${(keyCounter += 1)}`

const cache = new Map<string, string>()

async function uploadImage(publicPath: string): Promise<string> {
  const cached = cache.get(publicPath)
  if (cached) return cached
  const filePath = join(PUBLIC_DIR, publicPath.replace(/^\//, ''))
  const buffer = readFileSync(filePath)
  const filename = publicPath.split('/').pop() ?? 'image'
  const asset = await client.assets.upload('image', buffer, { filename })
  cache.set(publicPath, asset._id)
  return asset._id
}

function imageRef(assetId: string) {
  return { _type: 'image', asset: { _type: 'reference', _ref: assetId } }
}

const link = (cta: Cta) => ({ _type: 'linkCta', ...cta })
const heading = (value: SplitHeading) => ({ _type: 'splitHeading', ...value })

async function storyDoc(card: StoryCard) {
  return {
    _type: 'storyCard',
    title: card.title,
    blurb: card.blurb,
    image: imageRef(await uploadImage(card.image)),
    alt: card.alt,
    href: card.href,
  }
}

async function main(): Promise<void> {
  const home = SEED_HOME

  const expressions = []
  for (const card of home.expressions.cards) {
    expressions.push({
      _type: 'expressionCard',
      _key: nextKey('expression'),
      key: card.key,
      index: card.index,
      title: card.title,
      tagline: card.tagline,
      body: card.body,
      image: imageRef(await uploadImage(card.image)),
      alt: card.alt,
      cta: link(card.cta),
    })
  }

  const storyCards = []
  for (const card of home.stories.cards) {
    storyCards.push({ ...(await storyDoc(card)), _key: nextKey('storycard') })
  }

  const marks = []
  for (const mark of home.partners.marks) {
    marks.push({
      _type: 'partnerMark',
      _key: nextKey('mark'),
      name: mark.name,
      ...(mark.logo ? { logo: imageRef(await uploadImage(mark.logo)) } : {}),
    })
  }

  const doc = {
    _id: 'homePage',
    _type: 'homePage',
    // Stamps the shape this document was written for; the site ignores any
    // homePage document whose version is not the one the homepage expects.
    version: HOME_CONTENT_VERSION,
    hero: {
      _type: 'homeHero',
      eyebrow: home.hero.eyebrow,
      heading: heading(home.hero.heading),
      lede: home.hero.lede,
      image: imageRef(await uploadImage(home.hero.image)),
      alt: home.hero.alt,
      primaryCta: link(home.hero.primaryCta),
      secondaryCta: link(home.hero.secondaryCta),
    },
    philosophy: {
      _type: 'homePhilosophy',
      eyebrow: home.philosophy.eyebrow,
      heading: heading(home.philosophy.heading),
      body: home.philosophy.body,
      pullquote: home.philosophy.pullquote,
    },
    expressions: {
      _type: 'homeExpressions',
      eyebrow: home.expressions.eyebrow,
      heading: home.expressions.heading,
      intro: home.expressions.intro,
      cards: expressions,
    },
    via: {
      _type: 'homeVia',
      eyebrow: home.via.eyebrow,
      heading: heading(home.via.heading),
      body: home.via.body,
      cta: link(home.via.cta),
      image: imageRef(await uploadImage(home.via.image)),
      alt: home.via.alt,
    },
    impact: {
      _type: 'homeImpact',
      eyebrow: home.impact.eyebrow,
      heading: home.impact.heading,
      intro: home.impact.intro,
      stats: home.impact.stats.map((stat) => ({
        _type: 'impactStat',
        _key: nextKey('stat'),
        key: stat.key,
        value: stat.value,
        suffix: stat.suffix,
        label: stat.label,
      })),
    },
    stories: {
      _type: 'homeStories',
      eyebrow: home.stories.eyebrow,
      heading: heading(home.stories.heading),
      viewAll: link(home.stories.viewAll),
      feature: await storyDoc(home.stories.feature),
      cards: storyCards,
    },
    impactCta: {
      _type: 'homeImpactCta',
      eyebrow: home.impactCta.eyebrow,
      heading: heading(home.impactCta.heading),
      cta: link(home.impactCta.cta),
      image: imageRef(await uploadImage(home.impactCta.image)),
      alt: home.impactCta.alt,
    },
    partners: {
      _type: 'homePartners',
      label: home.partners.label,
      marks,
      logoSlot: link(home.partners.logoSlot),
    },
    closing: {
      _type: 'homeClosing',
      eyebrow: home.closing.eyebrow,
      heading: heading(home.closing.heading),
      body: home.closing.body,
      primaryCta: link(home.closing.primaryCta),
      secondaryCta: link(home.closing.secondaryCta),
    },
  }

  await client.createOrReplace(doc)
  console.log(`Seeded homePage document. Uploaded ${cache.size} image assets.`)
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
