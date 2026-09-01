import { createElement, lazy, Suspense } from 'react'
import { definePlugin } from 'sanity'

const LazyWebsiteEditor = lazy(() =>
  import('./WebsiteEditor').then((mod) => ({ default: mod.WebsiteEditor })),
)

function WebsiteEditorTool() {
  return createElement(
    Suspense,
    { fallback: createElement('div', { style: { padding: 24 } }, 'Loading Website Editor…') },
    createElement(LazyWebsiteEditor),
  )
}

export const websiteEditorPlugin = definePlugin({
  name: 'website-editor',
  tools: [
    {
      name: 'website-editor',
      title: 'Website Editor',
      component: WebsiteEditorTool,
    },
  ],
})
