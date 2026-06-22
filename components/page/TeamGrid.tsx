import * as React from 'react'
import Image from 'next/image'
import { Section } from '@/components/ui/Section'
import type { TeamGroup, TeamMember } from '@/lib/content/pages/types'

/**
 * TeamGrid renders the charity's people as a sequence of labelled, responsive
 * card grids. It is the Our Team expression of the brand board card spec
 * (section 6) and follows the warm, dignified portrait treatment from the
 * photography style (section 5).
 *
 * For each group it prints a Fraunces group label (h2, a section heading so the
 * page hero keeps the only h1) with a thin antique-gold rule beneath it, then a
 * responsive grid of member cards. The grid is one column on phones, two from
 * the small breakpoint, three from large up, so portraits stay generous.
 *
 * Each member card carries:
 * - a square portrait: a `next/image` headshot when `image` is set, cropped with
 *   object-cover so mixed source ratios read consistently; otherwise a tasteful
 *   initials avatar on a soft indigo tint, so a missing photo never becomes a
 *   wrong or placeholder face.
 * - a Fraunces name (h3, a sub-section heading).
 * - a role label in antique gold (small caps tracking), the one warm accent.
 * - a Mulish bio in warm taupe.
 *
 * `groups` are the labelled clusters to render; the alternating Section `tone`
 * keeps the page rhythm calm.
 */

type TeamGridProps = {
  groups: TeamGroup[]
}

const SECTION_TONES = ['indigo-tint', 'paper'] as const

function cx(...parts: Array<string | undefined | false>): string {
  return parts.filter(Boolean).join(' ')
}

/**
 * Build the initials for the avatar fallback: the first letter of the first and
 * last words of the name, upper-cased (for example "Gemma Carr" gives "GC").
 */
function initialsOf(name: string): string {
  const words = name.trim().split(/\s+/)
  if (words.length === 0) return ''
  const first = words[0]?.[0] ?? ''
  const last = words.length > 1 ? (words[words.length - 1]?.[0] ?? '') : ''
  return (first + last).toUpperCase()
}

function MemberPortrait({ member }: { member: TeamMember }) {
  if (member.image) {
    return (
      <div className="relative aspect-square w-full overflow-hidden bg-indigo-tint">
        <Image
          src={member.image}
          alt={`Portrait of ${member.name}`}
          fill
          sizes="(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 100vw"
          className="object-cover"
        />
      </div>
    )
  }

  // Initials avatar fallback: a calm indigo-tint field with the person's
  // initials in Fraunces brand indigo, so a missing photo stays dignified.
  return (
    <div
      aria-hidden
      className="flex aspect-square w-full items-center justify-center bg-indigo-tint"
    >
      <span className="font-heading text-5xl font-medium text-brand">
        {initialsOf(member.name)}
      </span>
    </div>
  )
}

function MemberCard({ member }: { member: TeamMember }) {
  return (
    <li
      className={cx(
        'group flex h-full flex-col overflow-hidden rounded-xl bg-white',
        'border border-muted/20 shadow-[0_8px_24px_rgba(31,27,22,0.08)]',
        'transition-shadow duration-200 ease-out',
        'hover:shadow-[0_12px_32px_rgba(31,27,22,0.12)]',
      )}
    >
      <MemberPortrait member={member} />

      <div className="flex flex-1 flex-col gap-3 p-6 lg:p-7">
        <div className="flex flex-col gap-1.5">
          <h3 className="font-heading text-[1.375rem] leading-[1.3] font-semibold text-balance text-ink">
            {member.name}
          </h3>
          <p className="font-body text-sm font-bold uppercase tracking-[0.08em] text-accent">
            {member.role}
          </p>
        </div>
        <p className="font-body text-base leading-[1.65] text-muted">
          {member.bio}
        </p>
      </div>
    </li>
  )
}

export function TeamGrid({ groups }: TeamGridProps) {
  return (
    <>
      {groups.map((group, index) => {
        const tone = SECTION_TONES[index % SECTION_TONES.length]
        return (
          <Section key={group.label} tone={tone} aria-label={group.label}>
            <div className="mb-10 lg:mb-12">
              <h2 className="font-heading text-[2.25rem] leading-[1.15] font-medium text-balance text-ink">
                {group.label}
              </h2>
              {/* Thin antique-gold rule under each group label. */}
              <span aria-hidden className="mt-4 block h-1 w-16 bg-accent" />
            </div>

            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {group.members.map((member) => (
                <MemberCard key={member.name} member={member} />
              ))}
            </ul>
          </Section>
        )
      })}
    </>
  )
}

export default TeamGrid
