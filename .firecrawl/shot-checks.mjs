import { chromium } from '@playwright/test'
const b = await chromium.launch()
const p = await b.newPage({ viewport: { width: 1280, height: 900 } })
await p.goto('http://localhost:3000/en', { waitUntil: 'domcontentloaded' })
await p.screenshot({ path: '.firecrawl/v5-top.png', clip: { x: 0, y: 0, width: 1280, height: 230 } })
const donate = p.locator('section', { hasText: 'Give once, or walk with us' }).first()
await donate.scrollIntoViewIfNeeded(); await p.waitForTimeout(400)
await donate.screenshot({ path: '.firecrawl/v5-donate.png' })
await b.close(); console.log('done')
