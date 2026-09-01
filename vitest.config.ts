import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  plugins: [
    {
      name: 'stub-css',
      transform(_code, id) {
        if (id.includes('.css')) {
          return { code: 'export default {}', map: null }
        }
        return undefined
      },
    },
    react(),
  ],
  resolve: {
    alias: {
      // Mirror the tsconfig "@/*" -> project root mapping so tests can import
      // app code the same way the app does.
      '@': fileURLToPath(new URL('.', import.meta.url)),
      // next-intl's client navigation imports the bare specifier "next/navigation",
      // which Vite's ESM resolver cannot map without Next's own bundler. Point it
      // at the real CJS client module so Link/useRouter resolve under jsdom.
      'next/navigation': fileURLToPath(
        new URL('./node_modules/next/navigation.js', import.meta.url),
      ),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    // Only run unit tests here. Playwright owns the e2e directory.
    include: ['**/__tests__/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['node_modules', '.next', 'e2e'],
    server: {
      deps: {
        // Inline next-intl so the "next/navigation" alias above is applied to
        // its client navigation code (deps in node_modules are externalized by
        // default and would otherwise bypass the alias).
        inline: ['next-intl'],
      },
    },
  },
})
