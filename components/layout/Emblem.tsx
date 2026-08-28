/**
 * Gold three-ring emblem used by the v3 site header and footer.
 * Stand-in until the official SVG lands. Stroke colour is locked to brand gold.
 */
export function Emblem({ className = 'h-[34px] w-[34px]' }: { className?: string }) {
  return (
    <svg viewBox="0 0 38 38" fill="none" className={className} aria-hidden="true">
      <circle cx="19" cy="19" r="16.6" stroke="#C89A3C" strokeWidth="1.6" />
      <path
        d="M25.4 12.6A8.8 8.8 0 1 0 25.4 25.4"
        stroke="#C89A3C"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M23.4 15.1A5.4 5.4 0 1 0 23.4 22.9"
        stroke="#C89A3C"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default Emblem
