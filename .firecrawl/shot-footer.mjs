import { chromium } from '@playwright/test'
const b = await chromium.launch()
const p = await b.newPage({ viewport: { width: 1280, height: 900 } })
await p.goto('http://localhost:3000/en', { waitUntil: 'domcontentloaded' })
await p.locator('footer').scrollIntoViewIfNeeded()
await p.waitForTimeout(400)
await p.locator('footer').screenshot({ path: '.firecrawl/cc-footer.png' })
await b.close()
console.log('done')
