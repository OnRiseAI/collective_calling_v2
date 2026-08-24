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
// The port is overridable (E2E_PORT) and defaults to 3100 rather than 3000:
// with reuseExistingServer enabled locally, a stray dev server from another
// project on 3000 would otherwise be silently tested instead of this app.
const PORT = process.env.E2E_PORT ?? '3100'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  timeout: 60_000,
  // Prime the freshly started production server once before any spec runs, so
  // the cold first-hit `load` stall is absorbed here rather than failing the
  // first timed navigation. See e2e/global-setup.ts.
  globalSetup: './e2e/global-setup.ts',
  // Run specs serially (one worker). The single-process `next start` production
  // server stalls a keep-alive socket when multiple browser instances hit it at
  // once on this platform: the HTML and DOM render fully (the page snapshot is
  // complete) but the document `load` event never fires, so navigations time
  // out. Two workers was enough while the homepage used only local images;
  // once the homepage hero and cards load remote Sanity CDN images through the
  // next/image optimizer, the per-navigation `load` event got heavier and two
  // workers began to tip over the same socket stall intermittently. One worker
  // stays clear of the contention and the whole suite passes reliably. This is
  // a server-concurrency stability cap only; it changes no test logic or
  // assertions. (Companion to the webServer `build && start` stability choice.)
  workers: 1,
  use: {
    baseURL: `http://localhost:${PORT}`,
    navigationTimeout: 45_000,
    // Pre-seed the welcome-gate cookie so specs land on the pages they
    // navigate to rather than the first-visit /welcome interstitial. The gate
    // itself is covered by welcome.spec.ts, which clears this cookie.
    storageState: {
      cookies: [
        {
          name: 'cc_welcomed',
          value: '1',
          domain: 'localhost',
          path: '/',
          expires: -1,
          httpOnly: false,
          secure: false,
          sameSite: 'Lax' as const,
        },
      ],
      origins: [],
    },
  },
  webServer: {
    command: `pnpm build && pnpm start --port ${PORT}`,
    url: `http://localhost:${PORT}`,
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
