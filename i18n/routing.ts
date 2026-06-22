import { defineRouting } from 'next-intl/routing'

// English is live at /, Spanish is scaffolded at /es (content lands in phase 2).
export const routing = defineRouting({
  locales: ['en', 'es'],
  defaultLocale: 'en',
})
