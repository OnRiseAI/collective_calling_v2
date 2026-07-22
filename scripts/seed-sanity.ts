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

  const rows = []
  for (const row of home.expressions.rows) {
    const assetId = await uploadImage(row.image, cache)
    rows.push({
      _type: 'expressionRow',
      _key: nextKey('expression'),
      key: row.key,
      eyebrow: row.eyebrow,
      heading: row.heading,
      belief: row.belief,
      body: row.body,
      image: imageRef(assetId),
      alt: row.alt,
      cta: { _type: 'linkCta', ...row.cta },
    })
  }

  const doc = {
    _id: 'homePage',
    _type: 'homePage',
    hero: {
      _type: 'heroChapter',
      headline: home.hero.headline,
      text: home.hero.text,
      image: imageRef(heroAssetId),
      alt: home.hero.alt,
      primaryCta: { _type: 'anchorCta', ...home.hero.primaryCta },
      secondaryCta: { _type: 'anchorCta', ...home.hero.secondaryCta },
    },
    philosophy: {
      _type: 'philosophyChapter',
      headline: home.philosophy.headline,
      body: home.philosophy.body,
      pullLine: home.philosophy.pullLine,
    },
    expressions: {
      _type: 'expressionsChapter',
      headline: home.expressions.headline,
      intro: home.expressions.intro,
      credo: home.expressions.credo,
      rows,
    },
    possible: {
      _type: 'possibleChapter',
      headline: home.possible.headline,
      intro: home.possible.intro,
      moments: home.possible.moments,
      outro: home.possible.outro,
    },
    impact: {
      _type: 'impactChapter',
      headline: home.impact.headline,
      intro: home.impact.intro,
      moments: home.impact.moments,
      outro: home.impact.outro,
      cta: { _type: 'linkCta', ...home.impact.cta },
    },
    invitation: {
      _type: 'invitationChapter',
      headline: home.invitation.headline,
      intro: home.invitation.intro,
      bring: home.invitation.bring,
      outro: home.invitation.outro,
      cta: { _type: 'linkCta', ...home.invitation.cta },
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
