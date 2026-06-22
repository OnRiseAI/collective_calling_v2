import { defineConfig, devices } from '@playwright/test'

// E2E specs live in ./e2e so they never collide with the Vitest unit tests
// under __tests__. The webServer builds and starts a production server so specs
// hit prebuilt static routes at localhost:3000.
//
// We deliberately use `build && start` rather than `dev`: the Turbopack dev
// server compiles routes on first request, and under concurrent cold requests
// the document `load` event can hang past any reasonable timeout (the HTML
// renders but a subresource stays pending). A prebuilt prod server has no
// per-request compile, so navigations resolve quickly and reliably. This is a
// stability fix only; it does not change what the specs assert.
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  timeout: 60_000,
  // Prime the freshly started production server once before any spec runs, so
  // the cold first-hit `load` stall is absorbed here rather than failing the
  // first timed navigation. See e2e/global-setup.ts.
  globalSetup: './e2e/global-setup.ts',
  // Cap parallelism at two workers. The single-process `next start` production
  // server stalls a keep-alive socket when four separate browser instances hit
  // it at once on this platform: the HTML and DOM render fully (the page
  // snapshot is complete) but the document `load` event never fires, so every
  // navigation times out. Two workers stay below that threshold and the whole
  // suite passes fast and reliably. This is a server-concurrency stability cap
  // only; it changes no test logic or assertions. (Companion to the webServer
  // `build && start` stability choice below.)
  workers: 2,
  use: {
    baseURL: 'http://localhost:3000',
    navigationTimeout: 45_000,
  },
  webServer: {
    command: 'pnpm build && pnpm start',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
})
