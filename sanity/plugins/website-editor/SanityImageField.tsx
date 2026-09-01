'use client'

import * as React from 'react'
import { useClient } from 'sanity'
import { FieldLabel } from '@puckeditor/core'
import { urlForImage } from '@/sanity/image'
import type { SanityImageRef } from '@/lib/visual-page/types'

type AssetHit = {
  _id: string
  url?: string
  originalFilename?: string
}

export function SanityImageField({
  value,
  onChange,
  readOnly,
}: {
  value: SanityImageRef | undefined
  onChange: (value: SanityImageRef | undefined) => void
  readOnly?: boolean
}): React.ReactElement {
  const client = useClient({ apiVersion: '2025-01-01' })
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [assets, setAssets] = React.useState<AssetHit[]>([])
  const [busy, setBusy] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    let cancelled = false
    client
      .fetch<AssetHit[]>(
        `*[_type == "sanity.imageAsset"] | order(_updatedAt desc)[0...12]{ _id, url, originalFilename }`,
      )
      .then((rows) => {
        if (!cancelled) setAssets(rows)
      })
      .catch(() => {
        if (!cancelled) setAssets([])
      })
    return () => {
      cancelled = true
    }
  }, [client, value])

  async function onFile(file: File): Promise<void> {
    setBusy(true)
    setError(null)
    try {
      const asset = await client.assets.upload('image', file, { filename: file.name })
      onChange({
        _type: 'image',
        asset: { _type: 'reference', _ref: asset._id },
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setBusy(false)
    }
  }

  const preview = value ? urlForImage(value) : undefined

  return (
    <div>
      <FieldLabel label="Photograph" />
      {preview ? (
        // Editor-only preview of the Sanity asset. Production still uses next/image.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={preview}
          alt=""
          style={{ width: '100%', maxHeight: 160, objectFit: 'cover', borderRadius: 4, marginBottom: 8 }}
        />
      ) : (
        <p style={{ fontSize: 12, opacity: 0.7 }}>No image selected. Production falls back to a placeholder.</p>
      )}
      <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
        <button
          type="button"
          disabled={readOnly || busy}
          onClick={() => inputRef.current?.click()}
        >
          {busy ? 'Uploading…' : 'Upload to Sanity'}
        </button>
        {value ? (
          <button type="button" disabled={readOnly} onClick={() => onChange(undefined)}>
            Remove
          </button>
        ) : null}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        disabled={readOnly}
        onChange={(event) => {
          const file = event.target.files?.[0]
          if (file) void onFile(file)
          event.target.value = ''
        }}
      />
      {error ? <p style={{ color: '#b00020', fontSize: 12 }}>{error}</p> : null}
      {assets.length > 0 ? (
        <div>
          <p style={{ fontSize: 12, marginBottom: 6 }}>Recent Sanity assets</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
            {assets.map((asset) => (
              <button
                key={asset._id}
                type="button"
                disabled={readOnly}
                title={asset.originalFilename ?? asset._id}
                onClick={() =>
                  onChange({
                    _type: 'image',
                    asset: { _type: 'reference', _ref: asset._id },
                  })
                }
                style={{ padding: 0, border: value?.asset._ref === asset._id ? '2px solid #c89a3c' : '1px solid #ccc' }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={asset.url} alt="" style={{ width: '100%', height: 48, objectFit: 'cover', display: 'block' }} />
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}
