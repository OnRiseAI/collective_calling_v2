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

const client = getCliClient({ apiVersion: '2025-01-01' })
const PUBLIC_DIR = join(process.cwd(), 'public')

let keyCounter = 0
const nextKey = (prefix: string): string => `${prefix}-${(keyCounter += 1)}`

async function uploadImage(
  publicPath: string,
  cache: Map<string, string>,
): Promise<string> {
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

async function main(): Promise<void> {
  const home = SEED_HOME
  const cache = new Map<string, string>()

  const heroAssetId = await uploadImage(home.hero.image, cache)
  const viaAssetId = await uploadImage(home.via.image, cache)
  const involveAssetId = await uploadImage(home.involve.image, cache)

  const cards = []
  for (const card of home.ways.cards) {
    const assetId = await uploadImage(card.image, cache)
    cards.push({
      _type: 'wayCard',
      _key: nextKey('way'),
      key: card.key,
      title: card.title,
      body: card.body,
      image: imageRef(assetId),
      alt: card.alt,
      href: card.href,
    })
  }

  const storyCards = []
  for (const card of home.storiesIntro.cards) {
    const assetId = await uploadImage(card.image, cache)
    storyCards.push({
      _type: 'storyCard',
      _key: nextKey('storycard'),
      title: card.title,
      blurb: card.blurb,
      image: imageRef(assetId),
      alt: card.alt,
      href: card.href,
    })
  }

  const doc = {
    _id: 'homePage',
    _type: 'homePage',
    hero: {
      _type: 'homeHero',
      eyebrow: home.hero.eyebrow,
      headlineLead: home.hero.headlineLead,
      headlineAccent: home.hero.headlineAccent,
      lede: home.hero.lede,
      image: imageRef(heroAssetId),
      alt: home.hero.alt,
      primaryCta: { _type: 'linkCta', ...home.hero.primaryCta },
      secondaryCta: { _type: 'linkCta', ...home.hero.secondaryCta },
      scrollCue: home.hero.scrollCue,
    },
    ways: {
      _type: 'homeWays',
      heading: home.ways.heading,
      cards,
    },
    via: {
      _type: 'homeVia',
      eyebrow: home.via.eyebrow,
      heading: home.via.heading,
      body: home.via.body,
      cta: { _type: 'linkCta', ...home.via.cta },
      image: imageRef(viaAssetId),
      alt: home.via.alt,
    },
    storiesIntro: {
      _type: 'homeStoriesIntro',
      heading: home.storiesIntro.heading,
      subline: home.storiesIntro.subline,
      viewAll: { _type: 'linkCta', ...home.storiesIntro.viewAll },
      cards: storyCards,
    },
    snapshot: {
      _type: 'homeSnapshot',
      heading: home.snapshot.heading,
      stats: home.snapshot.stats.map((stat) => ({
        _type: 'snapshotStat',
        _key: nextKey('stat'),
        icon: stat.icon,
        value: stat.value,
        label: stat.label,
      })),
    },
    partners: {
      _type: 'homePartners',
      heading: home.partners.heading,
      body: home.partners.body,
      names: home.partners.names,
      logoSlot: home.partners.logoSlot,
      cta: { _type: 'linkCta', ...home.partners.cta },
    },
    involve: {
      _type: 'homeInvolve',
      heading: home.involve.heading,
      body: home.involve.body,
      actions: home.involve.actions.map((action) => ({
        _type: 'involveAction',
        _key: nextKey('action'),
        icon: action.icon,
        title: action.title,
        blurb: action.blurb,
        href: action.href,
      })),
      image: imageRef(involveAssetId),
      alt: home.involve.alt,
      shops: {
        heading: home.involve.shops.heading,
        body: home.involve.shops.body,
        cta: { _type: 'linkCta', ...home.involve.shops.cta },
      },
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
