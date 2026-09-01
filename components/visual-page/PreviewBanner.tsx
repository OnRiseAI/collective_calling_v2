'use client'

import * as React from 'react'

export function PreviewBanner({
  draftTokenMissing,
}: {
  draftTokenMissing: boolean
}): React.JSX.Element {
  return (
    <div className="bg-accent px-4 py-3 text-center text-[13px] font-semibold tracking-[0.4px] text-brand-dark">
      {draftTokenMissing
        ? 'Draft mode is on, but SANITY_API_READ_TOKEN is missing, so this page is showing published content. Studio canvas preview still works.'
        : 'Draft preview. Public visitors still see the published version.'}{' '}
      <button
        type="button"
        className="underline"
        onClick={() => {
          window.location.assign('/api/draft/disable')
        }}
      >
        Exit preview
      </button>
    </div>
  )
}
