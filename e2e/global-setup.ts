import { chromium, type FullConfig } from '@playwright/test'

/**
 * Warm the production server before the suite runs.
 *
 * The single-process `next start` server stalls the document `load` event on
 * the first cold hits to a route on this platform: the HTML and DOM render but
 * a keep-alive socket stays pending, so the very first navigations time out
 * even though later ones are instant. Probing the routes (and their
 * subresources) once in a real browser primes the server so every spec then
 * navigates against a warm server and resolves in well under a second.
 *
 * This is a stability warm-up only. It runs no assertions and changes no test
 * logic. Companion to the `build && start` and capped-workers choices in the
 * config.
 */
export default async function globalSetup(config: FullConfig) {
  const baseURL =
    config.projects[0]?.use?.baseURL ?? 'http://localhost:3000'

  const browser = await chromium.launch()
  try {
    // Warm both locales in series so the first real request to each route, and
    // its subresources (fonts, the optimized logo), completes here rather than
    // inside the first timed spec.
    for (const path of ['/', '/es']) {
      const page = await browser.newPage()
      try {
        await page.goto(new URL(path, baseURL).toString(), {
          waitUntil: 'load',
          timeout: 60_000,
        })
      } catch {
        // A warm-up timeout must not fail the suite. The specs carry the real
        // assertions; if the server is genuinely unreachable they will report it.
      } finally {
        await page.close()
      }
    }
  } finally {
    await browser.close()
  }
}
