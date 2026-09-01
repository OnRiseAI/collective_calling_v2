/**
 * Seeds isolated visualPage documents (en + es) for the Website Editor proof.
 * Does not touch homePage or live collection documents.
 *
 *   NEXT_PUBLIC_SANITY_PROJECT_ID=<id> NEXT_PUBLIC_SANITY_DATASET=production \
 *   pnpm exec sanity exec scripts/seed-visual-page.ts --with-user-token
 */
import { getCliClient } from 'sanity/cli'
import { SEED_VISUAL_PAGES } from '../lib/visual-page/seed'
import { toSanityWriteDocument } from '../lib/visual-page/mapper'
import { VISUAL_LOCALES } from '../lib/visual-page/types'

const client = getCliClient({ apiVersion: '2025-01-01' })

async function main(): Promise<void> {
  for (const locale of VISUAL_LOCALES) {
    const page = SEED_VISUAL_PAGES[locale]
    const doc = toSanityWriteDocument(page)
    await client.createOrReplace(doc)
    console.log(`Seeded ${doc._id}`)
  }
}

main().catch((error: unknown) => {
  console.error(error)
  process.exit(1)
})
