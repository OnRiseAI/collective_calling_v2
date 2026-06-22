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
