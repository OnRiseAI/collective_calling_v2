/**
 * Repoints the homepage "Stories" explore card at a reframed image that keeps
 * both faces in the 3:2 card crop. Uploads the cropped asset and patches the
 * single `homePage` document in Sanity (the source the live site reads).
 *
 * Run authenticated via the Sanity CLI:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID=cpkoqe2k NEXT_PUBLIC_SANITY_DATASET=production \
 *   npx sanity exec scripts/fix-stories-image.ts --with-user-token
 */
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { getCliClient } from 'sanity/cli'

const client = getCliClient({ apiVersion: '2025-01-01' })

async function main(): Promise<void> {
  const filePath = join(process.cwd(), 'public/images/transform-5-stories.png')
  const asset = await client.assets.upload('image', readFileSync(filePath), {
    filename: 'transform-5-stories.png',
  })
  console.log('uploaded asset:', asset._id)

  const res = await client
    .patch('homePage')
    .set({
      'exploreCards[_key=="explore-5"].image': {
        _type: 'image',
        asset: { _type: 'reference', _ref: asset._id },
      },
      'exploreCards[_key=="explore-5"].alt':
        'A volunteer and a child hand in hand in Tanzania.',
    })
    .commit()
  console.log('patched homePage:', res._id)
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
