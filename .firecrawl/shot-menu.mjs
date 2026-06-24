import { chromium } from '@playwright/test'
const b = await chromium.launch()
const p = await b.newPage({ viewport: { width: 1280, height: 800 } })
await p.goto('http://localhost:3000/en', { waitUntil: 'domcontentloaded' })
await p.getByRole('link', { name: 'Appeals', exact: true }).first().hover()
await p.waitForTimeout(600)
await p.screenshot({ path: '.firecrawl/cc-header-menu.png', clip: { x: 0, y: 0, width: 1280, height: 440 } })
await b.close()
console.log('done')
