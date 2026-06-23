/**
 * Server component that injects a JSON-LD script tag into the document.
 * Renders as a plain <script> with no client JS.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
