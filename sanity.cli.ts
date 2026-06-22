import { defineCliConfig } from 'sanity/cli'

import { projectId, dataset } from './sanity/env'

// CLI config for the Sanity command line (deploy, dataset management, etc.).
// Mirrors the placeholder fallback used in sanity.config.ts so the config file
// loads even before a real project id is set in the environment.
export default defineCliConfig({
  api: {
    projectId: projectId ?? 'placeholder',
    dataset,
  },
})
