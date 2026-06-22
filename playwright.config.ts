import { defineConfig, devices } from '@playwright/test'

// E2E specs live in ./e2e so they never collide with the Vitest unit tests
// under __tests__. Later tasks can add specs and a webServer block here.
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  use: {
    baseURL: 'http://localhost:3000',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
})
