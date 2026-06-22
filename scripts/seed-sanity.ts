/**
 * Seeds the single `homePage` document into Sanity from the typed seed content
 * in lib/content/seed.ts, uploading the homepage images as Sanity image assets.
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
import { SEED_HOME } from '../lib/content/seed'

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

  const appeals = []
  for (const a of home.appeals) {
    const assetId = await uploadImage(a.image, cache)
    appeals.push({
      _type: 'appeal',
      _key: nextKey('appeal'),
      slug: a.slug,
      title: a.title,
      blurb: a.blurb,
      image: imageRef(assetId),
      alt: a.alt,
      href: a.href,
      theme: a.theme,
    })
  }

  const exploreCards = []
  for (const c of home.exploreCards) {
    const assetId = await uploadImage(c.image, cache)
    exploreCards.push({
      _type: 'exploreCard',
      _key: nextKey('explore'),
      title: c.title,
      blurb: c.blurb,
      image: imageRef(assetId),
      alt: c.alt,
      href: c.href,
    })
  }

  const doc = {
    _id: 'homePage',
    _type: 'homePage',
    hero: {
      _type: 'heroBlock',
      eyebrow: home.hero.eyebrow,
      headline: home.hero.headline,
      lede: home.hero.lede,
      image: imageRef(heroAssetId),
      alt: home.hero.alt,
    },
    impactStats: home.impactStats.map((s) => ({
      _type: 'impactStat',
      _key: nextKey('stat'),
      icon: s.icon,
      value: s.value,
      label: s.label,
    })),
    appeals,
    mission: { _type: 'mission', ...home.mission },
    scripture: { _type: 'scripture', ...home.scripture },
    testimonials: home.testimonials.map((t) => ({
      _type: 'testimonial',
      _key: nextKey('testimonial'),
      quote: t.quote,
      attribution: t.attribution,
      ...(typeof t.placeholder === 'boolean' ? { placeholder: t.placeholder } : {}),
    })),
    exploreCards,
    money: { _type: 'moneySplit', ...home.money },
    donate: {
      monthlyTiers: home.donate.monthlyTiers.map((t) => ({
        _type: 'donateTier',
        _key: nextKey('monthly'),
        amount: t.amount,
        interval: t.interval,
        impact: t.impact,
      })),
      onceTiers: home.donate.onceTiers.map((t) => ({
        _type: 'donateTier',
        _key: nextKey('once'),
        amount: t.amount,
        interval: t.interval,
        impact: t.impact,
      })),
    },
    trust: {
      _type: 'trust',
      registration: home.trust.registration,
      statement: home.trust.statement,
      partners: home.trust.partners,
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
