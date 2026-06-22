import { defineConfig, devices } from '@playwright/test'

// E2E specs live in ./e2e so they never collide with the Vitest unit tests
// under __tests__. The webServer block boots the dev server so specs can hit
// the app at localhost:3000.
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  use: {
    baseURL: 'http://localhost:3000',
  },
  webServer: {
    command: 'pnpm dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
})
