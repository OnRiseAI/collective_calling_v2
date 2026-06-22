import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'

import { projectId, dataset } from './sanity/env'
import { schemaTypes } from './sanity/schemas'
import { structure } from './sanity/structure'

// Embedded Studio config. When no Sanity project is configured, projectId is
// undefined and we fall back to 'placeholder' so the Studio compiles and the
// /studio route does not crash at build time. The Studio simply will not
// connect to a real dataset until NEXT_PUBLIC_SANITY_PROJECT_ID is set.
export default defineConfig({
  name: 'default',
  title: 'Collective Calling',
  projectId: projectId ?? 'placeholder',
  dataset,
  plugins: [structureTool({ structure }), visionTool()],
  schema: { types: schemaTypes },
})
