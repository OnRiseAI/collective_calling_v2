# Experience-Led Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the Collective Calling homepage as a six-chapter, experience-led journey (Understanding → Connection → Possibility → Participation) using the client's copy verbatim, plus light narrative-layer edits on four inner surfaces.

**Architecture:** New chapter components composed by `app/[locale]/page.tsx`, fed by a new `HomeContent` shape (seed = client copy, canonical) through the existing Sanity-singleton-with-seed-fallback read layer. Old homepage section components and their Sanity objects are deleted; `WhereMoneyGoes` survives (reused by /donate and /about/financial-accountability) and moves to `components/page/`.

**Tech Stack:** Next.js 16 App Router, React 19, Tailwind v4 (CSS-first tokens in `app/globals.css`), framer-motion (already a dependency), Sanity (next-sanity, GROQ singleton), next-intl, Vitest + Testing Library, Playwright.

**Spec:** `docs/superpowers/specs/2026-07-22-experience-led-homepage-design.md`

## Global Constraints

- Working directory: `D:\Projects\collective-calling`. Package manager: `pnpm`. Branch: `main` (site is pre-launch; no deploy steps).
- **Client copy is canonical and used VERBATIM in the seed** — including its em dashes. The repo's "no em dashes" rule applies to copy WE write (narrative-layer edits, comments, alt text), never to the client's homepage copy.
- Fonts: existing tokens only — `font-heading`/`font-body` (Lexend). No new fonts, no new dependencies.
- Colours: existing tokens (`brand` #1b3a6b, `brand-dark` #0f2347, `accent` #f3b007, `ink`, `paper`, `muted`, tints). Accent is used sparingly (CTAs + pulled lines).
- Headlines: `text-balance` + `noOrphan()` from `@/lib/text` on every h1/h2/h3 rendered from content.
- All motion `prefers-reduced-motion` safe (render plainly, no wrapper) and viewport-once. No scroll-jacking. Use `dvh` never `vh` for viewport heights.
- Locale-aware `Link` comes from `@/i18n/navigation` (NOT `next/link`). Component tests that render it must wrap in `NextIntlClientProvider` (see `__tests__/home/hero.test.tsx` pattern).
- This is Next.js 16: consult `node_modules/next/dist/docs/` before using an API you are unsure about (repo AGENTS.md rule).
- Anti-slop rules: no caps font-black, no gradient text, no glows, no icon pills, sentence-case UI labels (client headlines keep their own Title Case — they are canonical copy).
- Run `pnpm test` before every commit; the suite must pass.

## File Structure (end state)

| File | Responsibility |
|---|---|
| `lib/content/home.types.ts` | New `HomeContent` chapter types + `MoneySplit` (created Task 1) |
| `lib/content/home.seed.ts` | `SEED_HOME` — client copy verbatim (created Task 1) |
| `lib/content/home.ts` | Read layer (unchanged logic; imports flip in Task 7) |
| `lib/sanity/home.query.ts` | New GROQ + `mapSanityHome` with per-field seed fallbacks (Task 7) |
| `components/ui/RevealLines.tsx` | Staggered line reveal primitive (Task 2) |
| `components/home/JourneyRail.tsx` | Fixed journey rail, desktop only (Task 3) |
| `components/home/HeroChapter.tsx` | Chapter 1 (Task 4) |
| `components/home/PhilosophyChapter.tsx` | Chapter 2 (Task 4) |
| `components/home/ExpressionsChapter.tsx` | Chapter 3, alternating rows (Task 5) |
| `components/home/PossibleChapter.tsx` | Chapter 4, story moments (Task 6) |
| `components/home/ImpactChapter.tsx` | Chapter 5 (Task 6) |
| `components/home/InvitationChapter.tsx` | Chapter 6 (Task 6) |
| `components/page/WhereMoneyGoes.tsx` | Moved from `components/home/` (Task 7) |
| `sanity/schemas/homePage.ts` + new objects | New six-chapter schema (Task 8) |
| Deleted in Task 7 | `components/home/`: Hero, AppealsCards, MissionBlurb, FaithBand, Testimonials, ExploreCards, ImpactStatBand, ScriptureBanner, DonateWidget, TrustSignals, EmailSignup + their tests |

Old `HomeContent` (and `ImpactStat`, `Appeal`, `Testimonial`, `ExploreCard`, `DonateTier` types) stay in `lib/content/types.ts` until Task 7 so the tree compiles green after every task. `AppealTheme`, `Story`, `AppealEntry`, `EventItem`, `RichBlock` are consumed elsewhere and MUST survive.

---

### Task 1: New content model + seed (client copy verbatim)

**Files:**
- Create: `lib/content/home.types.ts`
- Create: `lib/content/home.seed.ts`
- Test: `__tests__/home/chapters-content.test.ts`

**Interfaces:**
- Produces: `HomeContent`, `ExpressionRow`, `MoneySplit` types and `SEED_HOME` const. Every later task consumes these exact shapes. Do not import these into existing files yet (that flip is Task 7).

- [ ] **Step 1: Write the failing test**

`__tests__/home/chapters-content.test.ts`:

```ts
import { describe, expect, test } from 'vitest'
import { SEED_HOME } from '@/lib/content/home.seed'

describe('experience-led homepage seed', () => {
  test('hero carries the client headline and scroll targets', () => {
    expect(SEED_HOME.hero.headline).toBe('A Life Beyond Ourselves')
    expect(SEED_HOME.hero.primaryCta).toEqual({ label: 'Start Your Journey', targetId: 'participation' })
    expect(SEED_HOME.hero.secondaryCta).toEqual({ label: 'See What’s Possible', targetId: 'possibility' })
  })

  test('expressions carry the three branches with real routes', () => {
    const hrefs = SEED_HOME.expressions.rows.map((r) => r.cta.href)
    expect(hrefs).toEqual(['/stories', '/spain', '/get-involved/partner'])
    expect(SEED_HOME.expressions.rows.map((r) => r.key)).toEqual([
      'children-families',
      'community',
      'business',
    ])
  })

  test('impact lists the five coming-together moments in order', () => {
    expect(SEED_HOME.impact.moments).toHaveLength(5)
    expect(SEED_HOME.impact.moments[0]).toBe('A person shares their time.')
    expect(SEED_HOME.impact.moments[4]).toBe('A simple action becomes part of something bigger.')
  })

  test('invitation routes to get-involved', () => {
    expect(SEED_HOME.invitation.cta).toEqual({ label: 'Start Your Journey', href: '/get-involved' })
  })

  test('every seeded image path exists under public/', async () => {
    const { existsSync } = await import('node:fs')
    const { join } = await import('node:path')
    const images = [SEED_HOME.hero.image, ...SEED_HOME.expressions.rows.map((r) => r.image)]
    for (const image of images) {
      expect(existsSync(join(process.cwd(), 'public', image)), image).toBe(true)
    }
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm vitest run __tests__/home/chapters-content.test.ts`
Expected: FAIL — cannot resolve `@/lib/content/home.seed`

- [ ] **Step 3: Create `lib/content/home.types.ts`**

```ts
/**
 * Experience-led homepage content model (spec 2026-07-22).
 *
 * Six chapters mapped to the journey Understanding -> Connection ->
 * Possibility -> Participation. The seed in home.seed.ts is the client's copy
 * verbatim and is canonical; Sanity may override it field by field.
 */

/** The 83/17 split shape shared with /donate and /about/financial-accountability. */
export type MoneySplit = {
  programsPct: number
  adminPct: number
  programsLabel: string
  adminLabel: string
  note: string
}

/** One of the three expressions (branches) in chapter 3. */
export type ExpressionRow = {
  key: 'children-families' | 'community' | 'business'
  eyebrow: string
  heading: string
  belief: string
  body: string
  image: string
  alt: string
  cta: { label: string; href: string }
}

export type HomeContent = {
  hero: {
    headline: string
    text: string[]
    image: string
    alt: string
    primaryCta: { label: string; targetId: string }
    secondaryCta: { label: string; targetId: string }
  }
  philosophy: {
    headline: string
    body: string[]
    pullLine: string
  }
  expressions: {
    headline: string
    intro: string
    credo: string[]
    rows: ExpressionRow[]
  }
  possible: {
    headline: string
    intro: string
    moments: string[]
    outro: string
  }
  impact: {
    headline: string
    intro: string[]
    moments: string[]
    outro: string
    cta: { label: string; href: string }
  }
  invitation: {
    headline: string
    intro: string
    bring: string[]
    outro: string
    cta: { label: string; href: string }
  }
}
```

- [ ] **Step 4: Create `lib/content/home.seed.ts`**

Client copy VERBATIM (curly apostrophes and em dashes preserved exactly):

```ts
import type { HomeContent } from './home.types'

/**
 * Seed homepage content: the client's homepage copy verbatim (canonical, do not
 * edit without a client-approved copy change). Rendered whenever Sanity is
 * unconfigured, unreachable, or missing a field.
 */
export const SEED_HOME: HomeContent = {
  hero: {
    headline: 'A Life Beyond Ourselves',
    text: [
      'We believe every person carries something that can impact the life of another.',
      'Collective Calling creates pathways for individuals, communities and organisations to use what they have — their time, skills, resources and influence — to restore dignity, create opportunity and bring lasting change.',
    ],
    image: '/images/mission-tanzania.png',
    alt: 'A Collective Calling team member walking hand in hand with a boy in Tanzania.',
    primaryCta: { label: 'Start Your Journey', targetId: 'participation' },
    secondaryCta: { label: 'See What’s Possible', targetId: 'possibility' },
  },
  philosophy: {
    headline: 'Everyone Has Something To Give',
    body: [
      'We believe every person carries something unique.',
      'Our experiences, abilities, resources and influence were never meant to exist in isolation — they have the power to create something far beyond ourselves.',
      'Collective Calling creates opportunities for people, communities and organisations to discover how what they carry can become part of a bigger story.',
    ],
    pullLine:
      'Because when what we carry becomes part of something bigger than ourselves, stories are changed — including our own.',
  },
  expressions: {
    headline: 'Different Expressions. One Shared Purpose.',
    intro: 'The ways we create change may look different, but they all grow from the same belief:',
    credo: [
      'Every person has value.',
      'Everyone carries something they can contribute.',
      'And when people come together, new possibilities are created.',
    ],
    rows: [
      {
        key: 'children-families',
        eyebrow: 'Children & Families',
        heading: 'Creating futures beyond circumstances.',
        belief:
          'Every child carries potential that should not be limited by the circumstances they were born into.',
        body: 'Through protection, education and long-term support in Tanzania, we create environments where children and families can heal, grow and discover what is possible.',
        image: '/images/tanzania-children.jpg',
        alt: 'Children at the Centre of Hope in Tanzania.',
        cta: { label: 'See Their Stories', href: '/stories' },
      },
      {
        key: 'community',
        eyebrow: 'Community',
        heading: 'Restoring dignity through connection.',
        belief: 'Every person deserves to be seen, valued and recognised.',
        body: 'Through our Mobile Shower Unit, charity shops and local initiatives in Spain, we create opportunities for communities to come together and remind people that their story matters.',
        image: '/images/spain-mobile-shower.jpg',
        alt: 'The Collective Calling mobile shower unit serving people in Spain.',
        cta: { label: 'Explore Community Impact', href: '/spain' },
      },
      {
        key: 'business',
        eyebrow: 'Business',
        heading: 'Extending the impact of what you already believe.',
        belief: 'Every business carries a story — built through its people, culture and values.',
        body: 'Values In Action exists to recognise what is already there and create opportunities for those values to travel further — beyond the walls of an organisation and into the lives of others.',
        image: '/images/speaking-event.jpg',
        alt: 'A Collective Calling speaking event with local businesses.',
        cta: { label: 'Explore Values In Action', href: '/get-involved/partner' },
      },
    ],
  },
  possible: {
    headline: 'Every Story Begins With Someone Choosing To Respond',
    intro: 'Behind every moment of change is a connection.',
    moments: [
      'Someone who saw potential.',
      'Someone who shared what they carried.',
      'Someone who believed a different future was possible.',
    ],
    outro:
      'These stories represent what happens when lives, communities and opportunities come together.',
  },
  impact: {
    headline: 'What Happens When We Come Together',
    intro: [
      'Impact is not created by one person, one organisation or one action.',
      'It is created when many different parts come together.',
    ],
    moments: [
      'A person shares their time.',
      'A business extends its values.',
      'A community responds.',
      'A resource becomes an opportunity.',
      'A simple action becomes part of something bigger.',
    ],
    outro: 'Together, these moments create stories of lasting change.',
    cta: { label: 'See The Impact', href: '/about/our-impact' },
  },
  invitation: {
    headline: 'Find Your Place In The Story',
    intro: 'Every journey looks different.',
    bring: [
      'Some people bring time.',
      'Some bring experience.',
      'Some bring resources.',
      'Some bring ideas, connections or opportunities.',
    ],
    outro: 'Each contribution is different, but together they become part of something greater.',
    cta: { label: 'Start Your Journey', href: '/get-involved' },
  },
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `pnpm vitest run __tests__/home/chapters-content.test.ts`
Expected: PASS (5 tests)

- [ ] **Step 6: Full suite + commit**

Run: `pnpm test` — expected all green (nothing imports the new files yet).

```bash
git add lib/content/home.types.ts lib/content/home.seed.ts __tests__/home/chapters-content.test.ts
git commit -m "feat(home): six-chapter content model with client copy as seed"
```

---

### Task 2: RevealLines motion primitive

**Files:**
- Create: `components/ui/RevealLines.tsx`
- Test: `__tests__/ui/reveal-lines.test.tsx`

**Interfaces:**
- Produces: `RevealLines({ lines, as?, className?, lineClassName? })` — client component rendering `lines: string[]` as staggered scroll reveals. Chapters 3 (credo), 4 (moments), 5 (moments), 6 (bring) consume it.

- [ ] **Step 1: Write the failing test**

`__tests__/ui/reveal-lines.test.tsx`:

```tsx
import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import { RevealLines } from '@/components/ui/RevealLines'

const LINES = ['Someone who saw potential.', 'Someone who shared what they carried.']

test('renders every line as its own paragraph, in order', () => {
  render(<RevealLines lines={LINES} />)
  const paragraphs = screen.getAllByText(/someone who/i)
  expect(paragraphs).toHaveLength(2)
  expect(paragraphs[0]).toHaveTextContent(LINES[0])
  expect(paragraphs[1]).toHaveTextContent(LINES[1])
})

test('applies the line class to each line', () => {
  render(<RevealLines lines={LINES} lineClassName="text-2xl" />)
  for (const line of LINES) {
    expect(screen.getByText(line)).toHaveClass('text-2xl')
  }
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm vitest run __tests__/ui/reveal-lines.test.tsx`
Expected: FAIL — cannot resolve `@/components/ui/RevealLines`

- [ ] **Step 3: Implement `components/ui/RevealLines.tsx`**

```tsx
'use client'

import * as React from 'react'
import { motion, useReducedMotion } from 'framer-motion'

/**
 * RevealLines renders a short sequence of standalone lines that appear one
 * after another as the block scrolls into view (~120ms apart), once. It is the
 * homepage's rhythm device for the credo and "moments" sequences.
 *
 * Reduced motion: render the lines plainly, fully visible, no animation.
 */
export function RevealLines({
  lines,
  className,
  lineClassName,
}: {
  lines: string[]
  className?: string
  lineClassName?: string
}): React.JSX.Element {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return (
      <div className={className}>
        {lines.map((line) => (
          <p key={line} className={lineClassName}>
            {line}
          </p>
        ))}
      </div>
    )
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
    >
      {lines.map((line) => (
        <motion.p
          key={line}
          className={lineClassName}
          variants={{
            hidden: { opacity: 0, y: 12 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
          }}
        >
          {line}
        </motion.p>
      ))}
    </motion.div>
  )
}

export default RevealLines
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm vitest run __tests__/ui/reveal-lines.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add components/ui/RevealLines.tsx __tests__/ui/reveal-lines.test.tsx
git commit -m "feat(ui): RevealLines staggered line reveal primitive"
```

---

### Task 3: JourneyRail

**Files:**
- Create: `components/home/JourneyRail.tsx`
- Modify: `app/globals.css` (smooth scrolling, motion-safe)
- Test: `__tests__/home/journey-rail.test.tsx`

**Interfaces:**
- Produces: `JourneyRail()` — no props; it owns the stage list. It observes `section[data-stage]` elements by id. Task 7's page gives chapters `id` + `data-stage`:
  hero `id="understanding"`, philosophy `id="philosophy"` (stage understanding), expressions `id="connection"`, possible `id="possibility"`, impact `id="impact"` (stage possibility), invitation `id="participation"`.
- Stage anchors are `#understanding`, `#connection`, `#possibility`, `#participation`.

- [ ] **Step 1: Write the failing test**

`__tests__/home/journey-rail.test.tsx`:

```tsx
import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import { JourneyRail } from '@/components/home/JourneyRail'

test('renders the four journey stages as in-page anchors', () => {
  render(<JourneyRail />)
  const nav = screen.getByRole('navigation', { name: /journey/i })
  const links = ['Understanding', 'Connection', 'Possibility', 'Participation']
  for (const label of links) {
    const link = screen.getByRole('link', { name: label })
    expect(nav).toContainElement(link)
  }
  expect(screen.getByRole('link', { name: 'Understanding' })).toHaveAttribute(
    'href',
    '#understanding',
  )
  expect(screen.getByRole('link', { name: 'Participation' })).toHaveAttribute(
    'href',
    '#participation',
  )
})

test('is hidden from small viewports via lg-only display classes', () => {
  render(<JourneyRail />)
  const nav = screen.getByRole('navigation', { name: /journey/i })
  expect(nav.className).toMatch(/hidden/)
  expect(nav.className).toMatch(/lg:flex/)
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm vitest run __tests__/home/journey-rail.test.tsx`
Expected: FAIL — cannot resolve `@/components/home/JourneyRail`

- [ ] **Step 3: Implement `components/home/JourneyRail.tsx`**

```tsx
'use client'

import * as React from 'react'
import { cx } from '@/lib/cx'

/**
 * JourneyRail is the fixed wayfinding element for the experience-led homepage:
 * the four journey stages down the left edge on large screens, with a dot that
 * fills as the reader crosses into each stage. Clicking a stage jumps to its
 * anchor (smooth via the motion-safe html rule in globals.css).
 *
 * It observes section[data-stage] elements; several chapters may share one
 * stage, and the last stage whose section crossed the observation band wins.
 * Hidden entirely below lg; on small screens the page pacing does the work.
 */
const STAGES = [
  { id: 'understanding', label: 'Understanding' },
  { id: 'connection', label: 'Connection' },
  { id: 'possibility', label: 'Possibility' },
  { id: 'participation', label: 'Participation' },
] as const

type StageId = (typeof STAGES)[number]['id']

export function JourneyRail(): React.JSX.Element {
  const [active, setActive] = React.useState<StageId>('understanding')

  React.useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return

    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-stage]'))
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const stage = (entry.target as HTMLElement).dataset.stage as StageId | undefined
          if (stage) setActive(stage)
        }
      },
      // A narrow horizontal band around the upper third of the viewport, so the
      // active stage flips as a chapter's body reaches reading position.
      { rootMargin: '-30% 0px -60% 0px' },
    )

    for (const section of sections) observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <nav
      aria-label="Journey"
      className="fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-6 lg:flex"
    >
      {STAGES.map((stage) => {
        const isActive = stage.id === active
        return (
          <a
            key={stage.id}
            href={`#${stage.id}`}
            aria-current={isActive ? 'true' : undefined}
            className="group flex items-center gap-3 focus-visible:outline-none"
          >
            <span
              aria-hidden="true"
              className={cx(
                'h-2.5 w-2.5 rounded-full border-2 transition-colors duration-300',
                isActive ? 'border-accent bg-accent' : 'border-muted/60 bg-transparent',
              )}
            />
            <span
              className={cx(
                'text-xs font-semibold tracking-wide transition-colors duration-300',
                isActive ? 'text-ink' : 'text-muted/80',
                'group-hover:text-ink group-focus-visible:text-ink',
              )}
            >
              {stage.label}
            </span>
          </a>
        )
      })}
    </nav>
  )
}

export default JourneyRail
```

Note: the rail renders over both light and dark chapters. After Task 7's assembly, verify legibility over the dark hero and invitation chapters in the browser; if the labels vanish on dark fields, add `mix-blend-difference` is NOT the fix (brand rule: keep it simple) — instead hide labels until hover on dark stages is overkill; the accepted fallback is a `drop-shadow` on the text: `[text-shadow:0_1px_2px_rgba(255,255,255,0.6)]` is visual-review territory; flag it in the Task 10 review if needed.

- [ ] **Step 4: Add motion-safe smooth scrolling to `app/globals.css`**

Append after the `body` rule:

```css
/* In-page journey anchors glide rather than jump, but never for readers who
   ask for reduced motion. */
@media (prefers-reduced-motion: no-preference) {
  html {
    scroll-behavior: smooth;
  }
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `pnpm vitest run __tests__/home/journey-rail.test.tsx`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add components/home/JourneyRail.tsx app/globals.css __tests__/home/journey-rail.test.tsx
git commit -m "feat(home): journey rail wayfinding + motion-safe smooth scroll"
```

---

### Task 4: HeroChapter + PhilosophyChapter

**Files:**
- Create: `components/home/HeroChapter.tsx`
- Create: `components/home/PhilosophyChapter.tsx`
- Test: `__tests__/home/hero-chapter.test.tsx`, `__tests__/home/philosophy-chapter.test.tsx`

**Interfaces:**
- Consumes: `HomeContent` from `@/lib/content/home.types` (Task 1); `noOrphan` from `@/lib/text`; `Container` from `@/components/ui/Container`.
- Produces: `HeroChapter({ content: HomeContent['hero'] })` and `PhilosophyChapter({ content: HomeContent['philosophy'] })`. HeroChapter owns the page h1. Neither takes ids — Task 7's page wraps each in a `<section id data-stage>`? NO: each chapter renders its own `<section>` and accepts `id?: string` and `data-stage` via `sectionProps`? Keep it simpler: each chapter component accepts `id: string` and `stage: string` props and renders them on its own `<section>`.

Final signatures (used by Task 7 verbatim):

```ts
HeroChapter({ content, id, stage }: { content: HomeContent['hero']; id: string; stage: string })
PhilosophyChapter({ content, id, stage }: { content: HomeContent['philosophy']; id: string; stage: string })
```

(All chapter components in Tasks 4–6 take the same `{ content, id, stage }` shape.)

- [ ] **Step 1: Write the failing tests**

`__tests__/home/hero-chapter.test.tsx`:

```tsx
import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import { HeroChapter } from '@/components/home/HeroChapter'
import { SEED_HOME } from '@/lib/content/home.seed'

test('hero renders the client headline as the page h1', () => {
  render(<HeroChapter content={SEED_HOME.hero} id="understanding" stage="understanding" />)
  const heading = screen.getByRole('heading', { level: 1 })
  expect(heading).toHaveTextContent(/a life beyond ourselves/i)
})

test('hero CTAs are in-page anchors to participation and possibility', () => {
  render(<HeroChapter content={SEED_HOME.hero} id="understanding" stage="understanding" />)
  expect(screen.getByRole('link', { name: /start your journey/i })).toHaveAttribute(
    'href',
    '#participation',
  )
  expect(screen.getByRole('link', { name: /see what/i })).toHaveAttribute('href', '#possibility')
})

test('hero section carries its stage id for the journey rail', () => {
  render(<HeroChapter content={SEED_HOME.hero} id="understanding" stage="understanding" />)
  const section = document.querySelector('section#understanding')
  expect(section).not.toBeNull()
  expect(section).toHaveAttribute('data-stage', 'understanding')
})
```

`__tests__/home/philosophy-chapter.test.tsx`:

```tsx
import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import { PhilosophyChapter } from '@/components/home/PhilosophyChapter'
import { SEED_HOME } from '@/lib/content/home.seed'

test('philosophy renders headline as h2 and the pulled line', () => {
  render(<PhilosophyChapter content={SEED_HOME.philosophy} id="philosophy" stage="understanding" />)
  expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
    /everyone has something to give/i,
  )
  expect(screen.getByText(/stories are changed/i)).toBeInTheDocument()
})

test('philosophy renders every body paragraph', () => {
  render(<PhilosophyChapter content={SEED_HOME.philosophy} id="philosophy" stage="understanding" />)
  for (const paragraph of SEED_HOME.philosophy.body) {
    expect(screen.getByText(paragraph)).toBeInTheDocument()
  }
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `pnpm vitest run __tests__/home/hero-chapter.test.tsx __tests__/home/philosophy-chapter.test.tsx`
Expected: FAIL — modules not found

- [ ] **Step 3: Implement `components/home/HeroChapter.tsx`**

Plain `<a>` anchors (in-page, locale-agnostic) — NOT the i18n Link. Server component.

```tsx
import * as React from 'react'
import Image from 'next/image'
import { noOrphan } from '@/lib/text'
import type { HomeContent } from '@/lib/content/home.types'

/**
 * Chapter 1 — Understanding. Full-viewport photographic opening. One image,
 * warm-dark scrim deepening toward the copy, the client's invitation headline
 * very large, and two in-page CTAs that make the page itself the journey
 * (Start Your Journey -> #participation, See What's Possible -> #possibility).
 * Owns the page h1 and the LCP image; renders immediately, no reveal.
 */
export function HeroChapter({
  content,
  id,
  stage,
}: {
  content: HomeContent['hero']
  id: string
  stage: string
}): React.JSX.Element {
  return (
    <section id={id} data-stage={stage} className="relative isolate overflow-hidden bg-brand-dark text-paper">
      <Image
        src={content.image}
        alt={content.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      {/* Scrim: nearly clear up top so the photograph breathes, deep at the
          bottom-left where the copy sits. */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(to top, rgba(15,35,71,0.82) 0%, rgba(15,35,71,0.45) 40%, rgba(15,35,71,0.12) 70%, transparent 100%)',
        }}
      />
      <div className="relative mx-auto flex min-h-dvh w-full max-w-7xl flex-col justify-end px-6 pb-24 pt-32 sm:px-8 lg:px-12 lg:pb-28">
        <div className="max-w-3xl">
          <h1 className="text-balance font-heading text-5xl font-bold leading-[1.04] sm:text-6xl lg:text-[4.5rem]">
            {noOrphan(content.headline)}
          </h1>
          {content.text.map((paragraph, index) => (
            <p
              key={paragraph}
              className={
                index === 0
                  ? 'mt-6 max-w-2xl text-balance text-xl leading-relaxed text-paper/95'
                  : 'mt-4 max-w-2xl text-lg leading-relaxed text-paper/80'
              }
            >
              {paragraph}
            </p>
          ))}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={`#${content.primaryCta.targetId}`}
              className="inline-flex items-center justify-center rounded-md bg-accent px-7 py-3.5 font-heading font-semibold text-brand-dark transition-colors duration-200 hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
            >
              {content.primaryCta.label}
            </a>
            <a
              href={`#${content.secondaryCta.targetId}`}
              className="inline-flex items-center justify-center rounded-md border border-paper/40 px-7 py-3.5 font-heading font-semibold text-paper transition-colors duration-200 hover:border-paper/70 hover:bg-paper/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
            >
              {content.secondaryCta.label}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroChapter
```

- [ ] **Step 4: Implement `components/home/PhilosophyChapter.tsx`**

```tsx
import * as React from 'react'
import { noOrphan } from '@/lib/text'
import type { HomeContent } from '@/lib/content/home.types'

/**
 * Chapter 2 — Understanding, continued. Deliberately image-free: after the
 * photographic hero, a quiet white chapter with copy at reading width. The one
 * emphasis is the pulled line, set large with a gold underline. The stillness
 * is the design; nothing competes with the words.
 */
export function PhilosophyChapter({
  content,
  id,
  stage,
}: {
  content: HomeContent['philosophy']
  id: string
  stage: string
}): React.JSX.Element {
  return (
    <section id={id} data-stage={stage} className="bg-paper py-28 text-ink sm:py-36">
      <div className="mx-auto max-w-3xl px-6 sm:px-8">
        <h2 className="text-balance font-heading text-4xl font-bold leading-tight text-brand-dark sm:text-5xl">
          {noOrphan(content.headline)}
        </h2>
        <div className="mt-10 space-y-6">
          {content.body.map((paragraph) => (
            <p key={paragraph} className="text-lg leading-relaxed text-ink/85">
              {paragraph}
            </p>
          ))}
        </div>
        <p className="mt-14 text-balance font-heading text-2xl font-semibold leading-snug text-brand-dark sm:text-3xl">
          <span className="box-decoration-clone bg-[linear-gradient(transparent_82%,var(--color-accent)_82%)] pb-1">
            {content.pullLine}
          </span>
        </p>
      </div>
    </section>
  )
}

export default PhilosophyChapter
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `pnpm vitest run __tests__/home/hero-chapter.test.tsx __tests__/home/philosophy-chapter.test.tsx`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add components/home/HeroChapter.tsx components/home/PhilosophyChapter.tsx __tests__/home/hero-chapter.test.tsx __tests__/home/philosophy-chapter.test.tsx
git commit -m "feat(home): hero and philosophy chapters"
```

---

### Task 5: ExpressionsChapter

**Files:**
- Create: `components/home/ExpressionsChapter.tsx`
- Test: `__tests__/home/expressions-chapter.test.tsx`

**Interfaces:**
- Consumes: `HomeContent`, `ExpressionRow` from `@/lib/content/home.types`; `RevealLines` (Task 2); `Link` from `@/i18n/navigation`; `Reveal` from `@/components/ui/Reveal`.
- Produces: `ExpressionsChapter({ content: HomeContent['expressions']; id: string; stage: string })`.

- [ ] **Step 1: Write the failing test**

`__tests__/home/expressions-chapter.test.tsx`:

```tsx
import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import { NextIntlClientProvider } from 'next-intl'
import { ExpressionsChapter } from '@/components/home/ExpressionsChapter'
import { SEED_HOME } from '@/lib/content/home.seed'

function renderWithLocale(ui: React.ReactNode) {
  return render(
    <NextIntlClientProvider locale="en" messages={{}}>
      {ui}
    </NextIntlClientProvider>,
  )
}

test('renders the chapter headline and the three expression headings', () => {
  renderWithLocale(
    <ExpressionsChapter content={SEED_HOME.expressions} id="connection" stage="connection" />,
  )
  expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/different expressions/i)
  for (const row of SEED_HOME.expressions.rows) {
    expect(screen.getByRole('heading', { level: 3, name: new RegExp(row.heading.slice(0, 20), 'i') })).toBeInTheDocument()
  }
})

test('each expression links to its real route', () => {
  renderWithLocale(
    <ExpressionsChapter content={SEED_HOME.expressions} id="connection" stage="connection" />,
  )
  expect(screen.getByRole('link', { name: /see their stories/i })).toHaveAttribute('href', '/stories')
  expect(screen.getByRole('link', { name: /explore community impact/i })).toHaveAttribute('href', '/spain')
  expect(screen.getByRole('link', { name: /explore values in action/i })).toHaveAttribute(
    'href',
    '/get-involved/partner',
  )
})

test('renders the credo lines', () => {
  renderWithLocale(
    <ExpressionsChapter content={SEED_HOME.expressions} id="connection" stage="connection" />,
  )
  for (const line of SEED_HOME.expressions.credo) {
    expect(screen.getByText(line)).toBeInTheDocument()
  }
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm vitest run __tests__/home/expressions-chapter.test.tsx`
Expected: FAIL — module not found

- [ ] **Step 3: Implement `components/home/ExpressionsChapter.tsx`**

Alternating full-width rows (photo/copy), explicitly not a card grid:

```tsx
import * as React from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { Reveal } from '@/components/ui/Reveal'
import { RevealLines } from '@/components/ui/RevealLines'
import { noOrphan } from '@/lib/text'
import { cx } from '@/lib/cx'
import type { HomeContent } from '@/lib/content/home.types'

/**
 * Chapter 3 — Connection. Opens with the shared-belief credo, then the three
 * expressions (branches of the tree) as full-width alternating photo/copy rows.
 * Deliberately not a 3-card grid: each expression gets room to be its own
 * story, and the alternation gives the chapter a walking rhythm.
 */
export function ExpressionsChapter({
  content,
  id,
  stage,
}: {
  content: HomeContent['expressions']
  id: string
  stage: string
}): React.JSX.Element {
  return (
    <section id={id} data-stage={stage} className="bg-indigo-tint py-28 text-ink sm:py-36">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-balance font-heading text-4xl font-bold leading-tight text-brand-dark sm:text-5xl">
            {noOrphan(content.headline)}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink/80">{content.intro}</p>
          <RevealLines
            lines={content.credo}
            className="mt-8 space-y-2"
            lineClassName="font-heading text-xl font-semibold text-brand-dark"
          />
        </div>

        <div className="mt-20 space-y-20 sm:mt-24 sm:space-y-24">
          {content.rows.map((row, index) => (
            <Reveal key={row.key}>
              <article
                className={cx(
                  'flex flex-col items-center gap-10 lg:gap-16',
                  index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row',
                )}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md lg:w-1/2">
                  <Image
                    src={row.image}
                    alt={row.alt}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="w-full lg:w-1/2">
                  <p className="text-sm font-semibold uppercase tracking-widest text-brand">
                    {row.eyebrow}
                  </p>
                  <h3 className="mt-3 text-balance font-heading text-2xl font-bold leading-snug text-brand-dark sm:text-3xl">
                    {noOrphan(row.heading)}
                  </h3>
                  <p className="mt-5 font-heading text-lg font-semibold leading-relaxed text-ink">
                    {row.belief}
                  </p>
                  <p className="mt-4 text-lg leading-relaxed text-ink/80">{row.body}</p>
                  <Link
                    href={row.cta.href}
                    className="group mt-7 inline-flex items-center gap-2 font-heading font-semibold text-brand underline decoration-2 decoration-transparent underline-offset-[6px] transition-[text-decoration-color] duration-200 hover:decoration-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                  >
                    {row.cta.label}
                    <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">
                      &rarr;
                    </span>
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ExpressionsChapter
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm vitest run __tests__/home/expressions-chapter.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add components/home/ExpressionsChapter.tsx __tests__/home/expressions-chapter.test.tsx
git commit -m "feat(home): expressions chapter with alternating branch rows"
```

---

### Task 6: PossibleChapter + ImpactChapter + InvitationChapter

**Files:**
- Create: `components/home/PossibleChapter.tsx`, `components/home/ImpactChapter.tsx`, `components/home/InvitationChapter.tsx`
- Test: `__tests__/home/possible-chapter.test.tsx`, `__tests__/home/impact-chapter.test.tsx`, `__tests__/home/invitation-chapter.test.tsx`

**Interfaces:**
- Consumes: `HomeContent` (Task 1), `Story` from `@/lib/content/types`, `RevealLines` (Task 2), `Reveal`, i18n `Link`, `noOrphan`.
- Produces:
  - `PossibleChapter({ content: HomeContent['possible']; stories: Story[]; id: string; stage: string })` — renders up to 3 non-placeholder stories as moments (image when present + excerpt + link to `/stories/${slug}`).
  - `ImpactChapter({ content: HomeContent['impact']; id: string; stage: string })`
  - `InvitationChapter({ content: HomeContent['invitation']; id: string; stage: string })`

- [ ] **Step 1: Write the failing tests**

`__tests__/home/possible-chapter.test.tsx`:

```tsx
import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import { NextIntlClientProvider } from 'next-intl'
import { PossibleChapter } from '@/components/home/PossibleChapter'
import { SEED_HOME } from '@/lib/content/home.seed'
import type { Story } from '@/lib/content/types'

const stories: Story[] = [
  { slug: 'caleb', title: 'Caleb comes home', location: 'tanzania', excerpt: 'From the street back to a loving home.', body: '' },
  { slug: 'maria', title: 'Maria is seen', location: 'spain', excerpt: 'A shower, a coffee, a name remembered.', body: '' },
  { slug: 'your-story-here', title: 'Your story', location: 'general', excerpt: 'x', body: '', placeholder: true },
]

function renderWithLocale(ui: React.ReactNode) {
  return render(
    <NextIntlClientProvider locale="en" messages={{}}>
      {ui}
    </NextIntlClientProvider>,
  )
}

test('renders headline, the three someone-lines, and real stories only', () => {
  renderWithLocale(
    <PossibleChapter content={SEED_HOME.possible} stories={stories} id="possibility" stage="possibility" />,
  )
  expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/every story begins/i)
  for (const line of SEED_HOME.possible.moments) {
    expect(screen.getByText(line)).toBeInTheDocument()
  }
  expect(screen.getByRole('link', { name: /caleb comes home/i })).toHaveAttribute('href', '/stories/caleb')
  expect(screen.queryByText(/your story/i)).not.toBeInTheDocument()
})
```

`__tests__/home/impact-chapter.test.tsx`:

```tsx
import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import { NextIntlClientProvider } from 'next-intl'
import { ImpactChapter } from '@/components/home/ImpactChapter'
import { SEED_HOME } from '@/lib/content/home.seed'

function renderWithLocale(ui: React.ReactNode) {
  return render(
    <NextIntlClientProvider locale="en" messages={{}}>
      {ui}
    </NextIntlClientProvider>,
  )
}

test('renders the five moments and the impact CTA', () => {
  renderWithLocale(<ImpactChapter content={SEED_HOME.impact} id="impact" stage="possibility" />)
  for (const line of SEED_HOME.impact.moments) {
    expect(screen.getByText(line)).toBeInTheDocument()
  }
  expect(screen.getByRole('link', { name: /see the impact/i })).toHaveAttribute(
    'href',
    '/about/our-impact',
  )
})
```

`__tests__/home/invitation-chapter.test.tsx`:

```tsx
import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import { NextIntlClientProvider } from 'next-intl'
import { InvitationChapter } from '@/components/home/InvitationChapter'
import { SEED_HOME } from '@/lib/content/home.seed'

function renderWithLocale(ui: React.ReactNode) {
  return render(
    <NextIntlClientProvider locale="en" messages={{}}>
      {ui}
    </NextIntlClientProvider>,
  )
}

test('renders the invitation and routes to get-involved', () => {
  renderWithLocale(
    <InvitationChapter content={SEED_HOME.invitation} id="participation" stage="participation" />,
  )
  expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/find your place in the story/i)
  for (const line of SEED_HOME.invitation.bring) {
    expect(screen.getByText(line)).toBeInTheDocument()
  }
  expect(screen.getByRole('link', { name: /start your journey/i })).toHaveAttribute(
    'href',
    '/get-involved',
  )
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `pnpm vitest run __tests__/home/possible-chapter.test.tsx __tests__/home/impact-chapter.test.tsx __tests__/home/invitation-chapter.test.tsx`
Expected: FAIL — modules not found

- [ ] **Step 3: Implement `components/home/PossibleChapter.tsx`**

```tsx
import * as React from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { Reveal } from '@/components/ui/Reveal'
import { RevealLines } from '@/components/ui/RevealLines'
import { noOrphan } from '@/lib/text'
import type { HomeContent } from '@/lib/content/home.types'
import type { Story } from '@/lib/content/types'

/**
 * Chapter 4 — Possibility. The three "Someone..." lines land one by one, then
 * up to three real stories appear as moments (photo when there is one, an
 * excerpt, and a quiet link into the story). Placeholder stories never render
 * here; if no real stories exist the chapter simply ends after the outro.
 */
export function PossibleChapter({
  content,
  stories,
  id,
  stage,
}: {
  content: HomeContent['possible']
  stories: Story[]
  id: string
  stage: string
}): React.JSX.Element {
  const moments = stories.filter((story) => !story.placeholder).slice(0, 3)

  return (
    <section id={id} data-stage={stage} className="bg-paper py-28 text-ink sm:py-36">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-balance font-heading text-4xl font-bold leading-tight text-brand-dark sm:text-5xl">
            {noOrphan(content.headline)}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink/80">{content.intro}</p>
          <RevealLines
            lines={content.moments}
            className="mt-8 space-y-2"
            lineClassName="font-heading text-xl font-semibold text-brand-dark"
          />
          <p className="mt-8 text-lg leading-relaxed text-ink/80">{content.outro}</p>
        </div>

        {moments.length > 0 && (
          <div className="mt-16 grid gap-10 sm:mt-20 lg:grid-cols-3">
            {moments.map((story) => (
              <Reveal key={story.slug}>
                <Link href={`/stories/${story.slug}`} className="group block focus-visible:outline-none">
                  {story.images?.[0] && (
                    <span className="relative block aspect-[4/3] overflow-hidden rounded-md">
                      <Image
                        src={story.images[0]}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 33vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </span>
                  )}
                  <span className="mt-5 block font-heading text-xl font-bold text-brand-dark group-hover:underline group-hover:decoration-accent group-hover:decoration-2 group-hover:underline-offset-4">
                    {story.title}
                  </span>
                  <span className="mt-2 block leading-relaxed text-ink/75">{story.excerpt}</span>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default PossibleChapter
```

- [ ] **Step 4: Implement `components/home/ImpactChapter.tsx`**

```tsx
import * as React from 'react'
import { Link } from '@/i18n/navigation'
import { RevealLines } from '@/components/ui/RevealLines'
import { noOrphan } from '@/lib/text'
import type { HomeContent } from '@/lib/content/home.types'

/**
 * Chapter 5 — Possibility, continued. Typography is the visual: the five
 * coming-together lines land in rhythm on a dark field. No stat counters, no
 * charts; the chapter says what impact is made of, not how big it is.
 */
export function ImpactChapter({
  content,
  id,
  stage,
}: {
  content: HomeContent['impact']
  id: string
  stage: string
}): React.JSX.Element {
  return (
    <section id={id} data-stage={stage} className="bg-brand-dark py-28 text-paper sm:py-36">
      <div className="mx-auto max-w-3xl px-6 sm:px-8">
        <h2 className="text-balance font-heading text-4xl font-bold leading-tight sm:text-5xl">
          {noOrphan(content.headline)}
        </h2>
        <div className="mt-8 space-y-4">
          {content.intro.map((paragraph) => (
            <p key={paragraph} className="text-lg leading-relaxed text-paper/80">
              {paragraph}
            </p>
          ))}
        </div>
        <RevealLines
          lines={content.moments}
          className="mt-12 space-y-4"
          lineClassName="font-heading text-2xl font-semibold leading-snug text-paper sm:text-3xl"
        />
        <p className="mt-12 text-lg leading-relaxed text-paper/80">{content.outro}</p>
        <Link
          href={content.cta.href}
          className="mt-8 inline-flex items-center justify-center rounded-md border border-paper/40 px-7 py-3.5 font-heading font-semibold text-paper transition-colors duration-200 hover:border-paper/70 hover:bg-paper/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
        >
          {content.cta.label}
        </Link>
      </div>
    </section>
  )
}

export default ImpactChapter
```

- [ ] **Step 5: Implement `components/home/InvitationChapter.tsx`**

```tsx
import * as React from 'react'
import { Link } from '@/i18n/navigation'
import { RevealLines } from '@/components/ui/RevealLines'
import { noOrphan } from '@/lib/text'
import type { HomeContent } from '@/lib/content/home.types'

/**
 * Chapter 6 — Participation. The invitation: warm gold field (the one
 * accent-washed chapter on the page), the four "Some people bring..." lines,
 * and the single journey CTA into /get-involved.
 */
export function InvitationChapter({
  content,
  id,
  stage,
}: {
  content: HomeContent['invitation']
  id: string
  stage: string
}): React.JSX.Element {
  return (
    <section id={id} data-stage={stage} className="bg-accent py-28 text-brand-dark sm:py-36">
      <div className="mx-auto max-w-3xl px-6 text-center sm:px-8">
        <h2 className="text-balance font-heading text-4xl font-bold leading-tight sm:text-5xl">
          {noOrphan(content.headline)}
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-brand-dark/80">{content.intro}</p>
        <RevealLines
          lines={content.bring}
          className="mt-8 space-y-2"
          lineClassName="font-heading text-xl font-semibold"
        />
        <p className="mt-8 text-lg leading-relaxed text-brand-dark/80">{content.outro}</p>
        <Link
          href={content.cta.href}
          className="mt-10 inline-flex items-center justify-center rounded-md bg-brand-dark px-8 py-4 font-heading font-semibold text-paper transition-colors duration-200 hover:bg-brand-dark/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-dark focus-visible:ring-offset-2 focus-visible:ring-offset-accent"
        >
          {content.cta.label}
        </Link>
      </div>
    </section>
  )
}

export default InvitationChapter
```

- [ ] **Step 6: Run tests to verify they pass**

Run: `pnpm vitest run __tests__/home/possible-chapter.test.tsx __tests__/home/impact-chapter.test.tsx __tests__/home/invitation-chapter.test.tsx`
Expected: PASS

- [ ] **Step 7: Commit**

```bash
git add components/home/PossibleChapter.tsx components/home/ImpactChapter.tsx components/home/InvitationChapter.tsx __tests__/home/possible-chapter.test.tsx __tests__/home/impact-chapter.test.tsx __tests__/home/invitation-chapter.test.tsx
git commit -m "feat(home): possible, impact, and invitation chapters"
```

---

### Task 7: The flip — content pipeline, page assembly, dead-code removal

This task swaps the homepage over atomically so the tree stays green: old `HomeContent` and its components go, the new pipeline and page come in.

**Files:**
- Modify: `lib/content/types.ts` (remove old homepage types; keep `AppealTheme`, `Story`, `AppealEntry`, `EventItem`, RichBlock re-export; re-export `HomeContent` + `MoneySplit` from `./home.types` for stable import paths)
- Delete: `lib/content/seed.ts`
- Modify: `lib/content/home.ts` (import `SEED_HOME` from `./home.seed`)
- Rewrite: `lib/sanity/home.query.ts`
- Modify: `lib/content/pages/donateHub.ts`, `lib/content/pages/financials.ts` (money shape → `MoneySplit` from `@/lib/content/home.types`; check with `grep -n "HomeContent\|SEED_HOME" lib/content/pages/donateHub.ts lib/content/pages/financials.ts` and update each import/usage)
- Move: `components/home/WhereMoneyGoes.tsx` → `components/page/WhereMoneyGoes.tsx` (`git mv`), update its `money` prop type to `MoneySplit`, update imports in `app/[locale]/donate/page.tsx` and `app/[locale]/about/financial-accountability/page.tsx`
- Rewrite: `app/[locale]/page.tsx`
- Delete: `components/home/Hero.tsx`, `AppealsCards.tsx`, `MissionBlurb.tsx`, `FaithBand.tsx`, `Testimonials.tsx`, `ExploreCards.tsx`, `ImpactStatBand.tsx`, `WhereMoneyGoes.tsx` (moved, not deleted), `ScriptureBanner.tsx`, `DonateWidget.tsx`, `TrustSignals.tsx`, `EmailSignup.tsx`
- Delete tests: `__tests__/home/appeals.test.tsx`, `card.test.tsx`, `donate.test.tsx`, `editorial.test.tsx`, `explore.test.tsx`, `faith.test.tsx`, `hero.test.tsx`, `money.test.tsx` (only if it tests the homepage placement — if it tests the WhereMoneyGoes component itself, keep it and update its import path), `testimonials.test.tsx`, `trust.test.tsx`
- Rewrite: `__tests__/home/content.test.ts`, `__tests__/sanity/home-read.test.ts`
- Check/update: `__tests__/smoke.test.tsx`, `__tests__/seo/*` — run `grep -rln "answer the call\|AppealsCards\|DonateWidget\|Testimonials\|SEED_HOME" __tests__` and update every hit to the new copy/imports.

**Interfaces:**
- Consumes: everything Tasks 1–6 produced.
- Produces: `getHomeContent(): Promise<HomeContent>` (new shape, same name/module); `HOME_QUERY`, `mapSanityHome(raw): HomeContent` with per-field seed fallbacks.

- [ ] **Step 1: Rewrite `__tests__/sanity/home-read.test.ts` (failing first)**

Replace its content with tests for the new mapper (adapt the existing file's mocking approach for `sanityClient` — read it first and keep its structure):

```ts
import { describe, expect, test } from 'vitest'
import { mapSanityHome } from '@/lib/sanity/home.query'
import { SEED_HOME } from '@/lib/content/home.seed'

describe('mapSanityHome', () => {
  test('null/empty doc maps to the full seed', () => {
    expect(mapSanityHome(null)).toEqual(SEED_HOME)
    expect(mapSanityHome({})).toEqual(SEED_HOME)
  })

  test('a stale doc missing new fields falls back per-field to seed copy', () => {
    const mapped = mapSanityHome({ hero: { headline: 'CMS headline' } })
    expect(mapped.hero.headline).toBe('CMS headline')
    expect(mapped.hero.text).toEqual(SEED_HOME.hero.text)
    expect(mapped.philosophy).toEqual(SEED_HOME.philosophy)
    expect(mapped.invitation.cta.href).toBe('/get-involved')
  })

  test('expression rows override by index and keep seed rows beyond the doc', () => {
    const mapped = mapSanityHome({
      expressions: { rows: [{ heading: 'New heading' }] },
    })
    expect(mapped.expressions.rows[0].heading).toBe('New heading')
    expect(mapped.expressions.rows[0].cta.href).toBe('/stories')
    expect(mapped.expressions.rows).toHaveLength(3)
  })
})
```

- [ ] **Step 2: Run to verify it fails**

Run: `pnpm vitest run __tests__/sanity/home-read.test.ts`
Expected: FAIL (old mapper shape)

- [ ] **Step 3: Rewrite `lib/sanity/home.query.ts`**

Per-field seed fallbacks make a stale CMS document safe (spec: the seed is canonical; CMS overrides field by field):

```ts
import { defineQuery } from 'next-sanity'
import type { ExpressionRow, HomeContent } from '@/lib/content/home.types'
import { SEED_HOME } from '@/lib/content/home.seed'
import { urlForImage } from '@/sanity/image'

/**
 * GROQ for the homePage singleton, six-chapter shape. Images project as raw
 * objects so mapSanityHome can resolve them via urlForImage. Every field is
 * optional in practice: mapSanityHome falls back to the seed per field, so a
 * stale or partial document can never blank the homepage.
 */
export const HOME_QUERY = defineQuery(`*[_type == "homePage"][0]{
  hero{ headline, text, image, alt, primaryCta{ label, targetId }, secondaryCta{ label, targetId } },
  philosophy{ headline, body, pullLine },
  expressions{ headline, intro, credo, rows[]{ key, eyebrow, heading, belief, body, image, alt, cta{ label, href } } },
  possible{ headline, intro, moments, outro },
  impact{ headline, intro, moments, outro, cta{ label, href } },
  invitation{ headline, intro, bring, outro, cta{ label, href } }
}`)

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' ? (value as Record<string, unknown>) : {}
}

function str(value: unknown, fallback: string): string {
  return typeof value === 'string' && value.length > 0 ? value : fallback
}

function strArray(value: unknown, fallback: string[]): string[] {
  if (!Array.isArray(value)) return fallback
  const strings = value.filter((item): item is string => typeof item === 'string' && item.length > 0)
  return strings.length > 0 ? strings : fallback
}

function cta<T extends { label: string }>(value: unknown, fallback: T): T {
  const record = asRecord(value)
  const merged = { ...fallback } as Record<string, unknown>
  for (const key of Object.keys(fallback)) {
    merged[key] = str(record[key], (fallback as Record<string, string>)[key])
  }
  return merged as T
}

function resolveImage(source: unknown, fallback: string): string {
  if (typeof source === 'string') return source
  return urlForImage(source as never) ?? fallback
}

function mapExpressionRow(value: unknown, seed: ExpressionRow): ExpressionRow {
  const row = asRecord(value)
  return {
    key: seed.key,
    eyebrow: str(row.eyebrow, seed.eyebrow),
    heading: str(row.heading, seed.heading),
    belief: str(row.belief, seed.belief),
    body: str(row.body, seed.body),
    image: resolveImage(row.image, seed.image),
    alt: str(row.alt, seed.alt),
    cta: cta(row.cta, seed.cta),
  }
}

export function mapSanityHome(raw: unknown): HomeContent {
  const doc = asRecord(raw)
  const hero = asRecord(doc.hero)
  const philosophy = asRecord(doc.philosophy)
  const expressions = asRecord(doc.expressions)
  const possible = asRecord(doc.possible)
  const impact = asRecord(doc.impact)
  const invitation = asRecord(doc.invitation)

  const docRows = Array.isArray(expressions.rows) ? expressions.rows : []

  return {
    hero: {
      headline: str(hero.headline, SEED_HOME.hero.headline),
      text: strArray(hero.text, SEED_HOME.hero.text),
      image: resolveImage(hero.image, SEED_HOME.hero.image),
      alt: str(hero.alt, SEED_HOME.hero.alt),
      primaryCta: cta(hero.primaryCta, SEED_HOME.hero.primaryCta),
      secondaryCta: cta(hero.secondaryCta, SEED_HOME.hero.secondaryCta),
    },
    philosophy: {
      headline: str(philosophy.headline, SEED_HOME.philosophy.headline),
      body: strArray(philosophy.body, SEED_HOME.philosophy.body),
      pullLine: str(philosophy.pullLine, SEED_HOME.philosophy.pullLine),
    },
    expressions: {
      headline: str(expressions.headline, SEED_HOME.expressions.headline),
      intro: str(expressions.intro, SEED_HOME.expressions.intro),
      credo: strArray(expressions.credo, SEED_HOME.expressions.credo),
      rows: SEED_HOME.expressions.rows.map((seedRow, index) =>
        mapExpressionRow(docRows[index], seedRow),
      ),
    },
    possible: {
      headline: str(possible.headline, SEED_HOME.possible.headline),
      intro: str(possible.intro, SEED_HOME.possible.intro),
      moments: strArray(possible.moments, SEED_HOME.possible.moments),
      outro: str(possible.outro, SEED_HOME.possible.outro),
    },
    impact: {
      headline: str(impact.headline, SEED_HOME.impact.headline),
      intro: strArray(impact.intro, SEED_HOME.impact.intro),
      moments: strArray(impact.moments, SEED_HOME.impact.moments),
      outro: str(impact.outro, SEED_HOME.impact.outro),
      cta: cta(impact.cta, SEED_HOME.impact.cta),
    },
    invitation: {
      headline: str(invitation.headline, SEED_HOME.invitation.headline),
      intro: str(invitation.intro, SEED_HOME.invitation.intro),
      bring: strArray(invitation.bring, SEED_HOME.invitation.bring),
      outro: str(invitation.outro, SEED_HOME.invitation.outro),
      cta: cta(invitation.cta, SEED_HOME.invitation.cta),
    },
  }
}
```

Note: the `cta` helper's `targetId`/`href` keys come from the fallback object's own keys, so it works for both CTA shapes.

- [ ] **Step 4: Flip the content layer**

1. `lib/content/home.ts`: change `import { SEED_HOME } from './seed'` → `from './home.seed'`, and `import type { HomeContent } from './types'` → `from './home.types'`.
2. `lib/content/types.ts`: delete `ImpactStat`, `Appeal`, `Testimonial`, `ExploreCard`, `DonateTier`, and the old `HomeContent`. Keep `AppealTheme`, `Story`, `AppealEntry`, `EventItem`, and the `RichBlock` re-export. Add:

```ts
// The homepage content model lives in home.types.ts; re-exported here so
// existing '@/lib/content/types' imports keep working.
export type { HomeContent, ExpressionRow, MoneySplit } from './home.types'
```

3. Delete `lib/content/seed.ts`.
4. `grep -n "HomeContent\['money'\]\|HomeContent\|SEED_HOME" lib/content/pages/donateHub.ts lib/content/pages/financials.ts` — replace each `HomeContent['money']` usage with `MoneySplit` (import from `@/lib/content/types`); if either file imports `SEED_HOME` for the money values, inline those literal values into that file (the 83/17 split belongs to those pages now).
5. `git mv components/home/WhereMoneyGoes.tsx components/page/WhereMoneyGoes.tsx`; inside it change the money prop type to `MoneySplit`; update the two page imports (`app/[locale]/donate/page.tsx`, `app/[locale]/about/financial-accountability/page.tsx`) to `@/components/page/WhereMoneyGoes`. If `__tests__/home/money.test.tsx` tests the component, `git mv` it to `__tests__/page/where-money-goes.test.tsx` and fix its import; if it tests homepage placement, delete it.

- [ ] **Step 5: Rewrite `app/[locale]/page.tsx`**

```tsx
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { getHomeContent } from '@/lib/content/home'
import { getStories } from '@/lib/content/stories'
import { pageMetadata } from '@/lib/seo'
import { SITE } from '@/lib/site'
import { HeroChapter } from '@/components/home/HeroChapter'
import { PhilosophyChapter } from '@/components/home/PhilosophyChapter'
import { ExpressionsChapter } from '@/components/home/ExpressionsChapter'
import { PossibleChapter } from '@/components/home/PossibleChapter'
import { ImpactChapter } from '@/components/home/ImpactChapter'
import { InvitationChapter } from '@/components/home/InvitationChapter'
import { JourneyRail } from '@/components/home/JourneyRail'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const content = await getHomeContent()
  return pageMetadata({
    locale,
    path: '/',
    title: content.hero.headline,
    description: SITE.description,
    image: content.hero.image,
  })
}

/**
 * The experience-led homepage (spec 2026-07-22): six chapters walking the
 * journey Understanding -> Connection -> Possibility -> Participation, with a
 * fixed journey rail on large screens. The hero owns the page h1 and renders
 * without a reveal (LCP); every other chapter manages its own motion.
 */
export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const [content, stories] = await Promise.all([getHomeContent(), getStories()])

  return (
    <>
      <JourneyRail />
      <HeroChapter content={content.hero} id="understanding" stage="understanding" />
      <PhilosophyChapter content={content.philosophy} id="philosophy" stage="understanding" />
      <ExpressionsChapter content={content.expressions} id="connection" stage="connection" />
      <PossibleChapter content={content.possible} stories={stories} id="possibility" stage="possibility" />
      <ImpactChapter content={content.impact} id="impact" stage="possibility" />
      <InvitationChapter content={content.invitation} id="participation" stage="participation" />
    </>
  )
}
```

- [ ] **Step 6: Delete dead components and tests**

```bash
git rm components/home/Hero.tsx components/home/AppealsCards.tsx components/home/MissionBlurb.tsx components/home/FaithBand.tsx components/home/Testimonials.tsx components/home/ExploreCards.tsx components/home/ImpactStatBand.tsx components/home/ScriptureBanner.tsx components/home/DonateWidget.tsx components/home/TrustSignals.tsx components/home/EmailSignup.tsx
git rm __tests__/home/appeals.test.tsx __tests__/home/card.test.tsx __tests__/home/donate.test.tsx __tests__/home/editorial.test.tsx __tests__/home/explore.test.tsx __tests__/home/faith.test.tsx __tests__/home/hero.test.tsx __tests__/home/testimonials.test.tsx __tests__/home/trust.test.tsx
```

Then rewrite `__tests__/home/content.test.ts` to assert `getHomeContent()` returns the seed when Sanity is unconfigured (mirror its current mocking of `sanityClient` as null, assert `content.hero.headline === 'A Life Beyond Ourselves'`).

- [ ] **Step 7: Sweep remaining references**

Run: `grep -rln "components/home/Hero\|AppealsCards\|MissionBlurb\|FaithBand\|Testimonials\|ExploreCards\|ImpactStatBand\|ScriptureBanner\|DonateWidget\|TrustSignals\|EmailSignup\|content/seed'\|answer the call" app components lib __tests__ e2e scripts --include=*.ts --include=*.tsx`

Fix every hit (except `scripts/seed-sanity.ts` and `sanity/` — those are Task 8; a temporary type error in `scripts/seed-sanity.ts` is acceptable ONLY if `pnpm test` and `pnpm build` still pass; if `pnpm build` type-checks scripts, stub the homePage seed object in that script to the new shape minimally now and finish it properly in Task 8). `__tests__/smoke.test.tsx` and `__tests__/seo/*` hits: update expected homepage title/copy to `A Life Beyond Ourselves`.

- [ ] **Step 8: Full verification**

Run: `pnpm test` — all green.
Run: `pnpm lint` — clean.
Run: `pnpm build` — succeeds.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat(home): assemble experience-led homepage and retire charity-template sections"
```

---

### Task 8: Sanity schema + seed script + typegen

**Files:**
- Rewrite: `sanity/schemas/homePage.ts`
- Create: `sanity/schemas/objects/homeChapters.ts` (all six chapter object types in one focused file)
- Delete: `sanity/schemas/objects/heroBlock.ts`, `impactStat.ts`, `appeal.ts`, `testimonial.ts`, `exploreCard.ts`, `donateTier.ts`, `moneySplit.ts`, `scripture.ts`, `mission.ts`, `trust.ts`
- Modify: `sanity/schemas/index.ts`
- Modify: `scripts/seed-sanity.ts` (homePage document → new shape, values imported from `SEED_HOME`)
- Modify/verify: `__tests__/sanity/schema.test.ts`, `__tests__/collections/schemas.test.ts`
- Regenerate: `sanity-schema.json`, `sanity.types.ts` via `pnpm typegen`

**Interfaces:**
- Consumes: field names exactly as in `HOME_QUERY` (Task 7) and `HomeContent` (Task 1). Field names MUST match `hero.text` (array of text), `philosophy.pullLine`, `expressions.rows[].belief`, `possible.moments`, `impact.moments`, `invitation.bring`, CTA objects `{label, targetId}` (hero) / `{label, href}` (impact, invitation, expression rows).

- [ ] **Step 1: Update schema tests first**

Open `__tests__/sanity/schema.test.ts` and `__tests__/collections/schemas.test.ts`; rewrite homepage-related assertions to the new field set, e.g.:

```ts
import { describe, expect, test } from 'vitest'
import { homePage } from '@/sanity/schemas/homePage'

describe('homePage schema', () => {
  test('defines the six chapter fields', () => {
    const names = homePage.fields.map((f: { name: string }) => f.name)
    expect(names).toEqual(['hero', 'philosophy', 'expressions', 'possible', 'impact', 'invitation'])
  })
})
```

Run: `pnpm vitest run __tests__/sanity/schema.test.ts` — expected FAIL.

- [ ] **Step 2: Create `sanity/schemas/objects/homeChapters.ts`**

```ts
import { defineArrayMember, defineField, defineType } from 'sanity'

/**
 * Object types for the six-chapter experience-led homepage. Field names mirror
 * lib/content/home.types.ts one to one; the GROQ in lib/sanity/home.query.ts
 * selects exactly these names. Editors can override any field; anything left
 * empty falls back to the canonical seed copy.
 */

export const anchorCta = defineType({
  name: 'anchorCta',
  title: 'In-page CTA',
  type: 'object',
  fields: [
    defineField({ name: 'label', title: 'Label', type: 'string' }),
    defineField({ name: 'targetId', title: 'Target section id', type: 'string' }),
  ],
})

export const linkCta = defineType({
  name: 'linkCta',
  title: 'Link CTA',
  type: 'object',
  fields: [
    defineField({ name: 'label', title: 'Label', type: 'string' }),
    defineField({ name: 'href', title: 'Href', type: 'string' }),
  ],
})

export const heroChapter = defineType({
  name: 'heroChapter',
  title: 'Hero chapter',
  type: 'object',
  fields: [
    defineField({ name: 'headline', title: 'Headline', type: 'string' }),
    defineField({ name: 'text', title: 'Paragraphs', type: 'array', of: [defineArrayMember({ type: 'text' })] }),
    defineField({ name: 'image', title: 'Image', type: 'image' }),
    defineField({ name: 'alt', title: 'Image alt text', type: 'string' }),
    defineField({ name: 'primaryCta', title: 'Primary CTA', type: 'anchorCta' }),
    defineField({ name: 'secondaryCta', title: 'Secondary CTA', type: 'anchorCta' }),
  ],
})

export const philosophyChapter = defineType({
  name: 'philosophyChapter',
  title: 'Philosophy chapter',
  type: 'object',
  fields: [
    defineField({ name: 'headline', title: 'Headline', type: 'string' }),
    defineField({ name: 'body', title: 'Paragraphs', type: 'array', of: [defineArrayMember({ type: 'text' })] }),
    defineField({ name: 'pullLine', title: 'Pulled line', type: 'text' }),
  ],
})

export const expressionRow = defineType({
  name: 'expressionRow',
  title: 'Expression',
  type: 'object',
  fields: [
    defineField({ name: 'key', title: 'Key', type: 'string', readOnly: true }),
    defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({ name: 'belief', title: 'Belief line', type: 'text' }),
    defineField({ name: 'body', title: 'Body', type: 'text' }),
    defineField({ name: 'image', title: 'Image', type: 'image' }),
    defineField({ name: 'alt', title: 'Image alt text', type: 'string' }),
    defineField({ name: 'cta', title: 'CTA', type: 'linkCta' }),
  ],
})

export const expressionsChapter = defineType({
  name: 'expressionsChapter',
  title: 'Expressions chapter',
  type: 'object',
  fields: [
    defineField({ name: 'headline', title: 'Headline', type: 'string' }),
    defineField({ name: 'intro', title: 'Intro', type: 'text' }),
    defineField({ name: 'credo', title: 'Credo lines', type: 'array', of: [defineArrayMember({ type: 'string' })] }),
    defineField({ name: 'rows', title: 'Expressions', type: 'array', of: [defineArrayMember({ type: 'expressionRow' })] }),
  ],
})

export const possibleChapter = defineType({
  name: 'possibleChapter',
  title: 'See What’s Possible chapter',
  type: 'object',
  fields: [
    defineField({ name: 'headline', title: 'Headline', type: 'string' }),
    defineField({ name: 'intro', title: 'Intro', type: 'text' }),
    defineField({ name: 'moments', title: 'Someone lines', type: 'array', of: [defineArrayMember({ type: 'string' })] }),
    defineField({ name: 'outro', title: 'Outro', type: 'text' }),
  ],
})

export const impactChapter = defineType({
  name: 'impactChapter',
  title: 'Impact chapter',
  type: 'object',
  fields: [
    defineField({ name: 'headline', title: 'Headline', type: 'string' }),
    defineField({ name: 'intro', title: 'Intro paragraphs', type: 'array', of: [defineArrayMember({ type: 'text' })] }),
    defineField({ name: 'moments', title: 'Moment lines', type: 'array', of: [defineArrayMember({ type: 'string' })] }),
    defineField({ name: 'outro', title: 'Outro', type: 'text' }),
    defineField({ name: 'cta', title: 'CTA', type: 'linkCta' }),
  ],
})

export const invitationChapter = defineType({
  name: 'invitationChapter',
  title: 'Invitation chapter',
  type: 'object',
  fields: [
    defineField({ name: 'headline', title: 'Headline', type: 'string' }),
    defineField({ name: 'intro', title: 'Intro', type: 'text' }),
    defineField({ name: 'bring', title: 'Bring lines', type: 'array', of: [defineArrayMember({ type: 'string' })] }),
    defineField({ name: 'outro', title: 'Outro', type: 'text' }),
    defineField({ name: 'cta', title: 'CTA', type: 'linkCta' }),
  ],
})
```

- [ ] **Step 3: Rewrite `sanity/schemas/homePage.ts`**

```ts
import { defineField, defineType } from 'sanity'

/**
 * The homepage singleton, six-chapter experience-led shape. Fields mirror
 * HomeContent in lib/content/home.types.ts one to one. The Studio structure
 * enforces the singleton.
 */
export const homePage = defineType({
  name: 'homePage',
  title: 'Home page',
  type: 'document',
  fields: [
    defineField({ name: 'hero', title: 'Hero', type: 'heroChapter' }),
    defineField({ name: 'philosophy', title: 'Our philosophy', type: 'philosophyChapter' }),
    defineField({ name: 'expressions', title: 'How it comes to life', type: 'expressionsChapter' }),
    defineField({ name: 'possible', title: 'See what’s possible', type: 'possibleChapter' }),
    defineField({ name: 'impact', title: 'Impact', type: 'impactChapter' }),
    defineField({ name: 'invitation', title: 'Start your journey', type: 'invitationChapter' }),
  ],
  preview: {
    select: { title: 'hero.headline' },
    prepare({ title }) {
      return { title: title || 'Home page' }
    },
  },
})
```

- [ ] **Step 4: Update `sanity/schemas/index.ts` and delete old objects**

New registration list (objects before documents):

```ts
import { homePage } from './homePage'
import {
  anchorCta,
  linkCta,
  heroChapter,
  philosophyChapter,
  expressionRow,
  expressionsChapter,
  possibleChapter,
  impactChapter,
  invitationChapter,
} from './objects/homeChapters'
import { story } from './documents/story'
import { appealEntry } from './documents/appealEntry'
import { eventItem } from './documents/eventItem'

export const schemaTypes = [
  anchorCta,
  linkCta,
  heroChapter,
  philosophyChapter,
  expressionRow,
  expressionsChapter,
  possibleChapter,
  impactChapter,
  invitationChapter,
  homePage,
  story,
  appealEntry,
  eventItem,
]
```

Then:

```bash
git rm sanity/schemas/objects/heroBlock.ts sanity/schemas/objects/impactStat.ts sanity/schemas/objects/appeal.ts sanity/schemas/objects/testimonial.ts sanity/schemas/objects/exploreCard.ts sanity/schemas/objects/donateTier.ts sanity/schemas/objects/moneySplit.ts sanity/schemas/objects/scripture.ts sanity/schemas/objects/mission.ts sanity/schemas/objects/trust.ts
```

CAUTION before deleting: `grep -rln "donateTier\|moneySplit\|scripture'\|testimonial'" sanity app` — if `appealEntry`/`eventItem`/studio structure reference any old object, keep that object and note it.

- [ ] **Step 5: Update `scripts/seed-sanity.ts`**

Read the script first. Replace the homePage document construction with the new shape, importing values from `SEED_HOME` (`@/lib/content/home.seed` or relative path per the script's existing import style) so seed and CMS can never drift. Follow the script's existing image-upload conventions for `hero.image` and `expressions.rows[].image`.

- [ ] **Step 6: Typegen + tests**

Run: `pnpm typegen` — regenerates `sanity-schema.json` + `sanity.types.ts`.
Run: `pnpm test` — all green (schema tests from Step 1 now pass).
Run: `pnpm build` — succeeds.

- [ ] **Step 7: Re-seed the CMS (guarded)**

If `.env.local` has a Sanity write token (check with `grep -c "SANITY" .env.local`), run the seed script per its header instructions (typically `pnpm tsx scripts/seed-sanity.ts` — read the script for exact invocation) so the production dataset matches the new shape. If no token, STOP and report: "CMS not re-seeded — needs SANITY token; homepage will render the seed until the singleton is updated." (Per-field fallbacks make this safe either way.)

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat(sanity): six-chapter homePage schema, seed script, and typegen"
```

---

### Task 9: Narrative layer (inner-page tone edits)

**Files:**
- Modify: `lib/content/pages/getInvolved.ts` (hero lede + intro)
- Modify: `lib/content/pages/partner.ts` (hero lede + intro reframed around Values In Action)
- Modify: `lib/content/pages/donateHub.ts` (intro string)
- Modify: `components/layout/Footer.tsx` (philosophy line)
- Tests: `__tests__/getInvolved/getInvolved.test.tsx`, `__tests__/footer.test.tsx`, `__tests__/donate/donateHub.test.tsx` (update only assertions that referenced replaced copy)

**Interfaces:** none new — copy-only edits. Our copy below follows repo rules: no em dashes, no emojis, invitational voice.

- [ ] **Step 1: Update `lib/content/pages/getInvolved.ts`**

Replace `hero.lede` with:

```
Every person carries something that can change a life. Time, experience, resources, connections. Find the way you want to bring what you have.
```

Replace the `intro` object with:

```ts
intro: {
  eyebrow: 'Find your place',
  heading: 'Find your place in the story',
  body: [
    'Every journey into Collective Calling looks different. Some people bring time, some bring experience, some bring resources or connections. Each contribution is different, but together they become part of something greater.',
    'Below are six ways to take your first step. Start wherever feels right.',
  ],
},
```

- [ ] **Step 2: Update `lib/content/pages/partner.ts`**

Read the file fully first. Replace `hero.lede` with:

```
Values In Action is how organisations bring what they already believe into the lives of others. Churches, businesses, and organisations can walk alongside us at an institutional level.
```

Replace `intro.heading` with `Values In Action` and `intro.body` with:

```ts
body: [
  'Every business carries a story, built through its people, culture and values. Values In Action exists to recognise what is already there and create opportunities for those values to travel further, beyond the walls of an organisation and into the lives of others.',
  'Partnership with Collective Calling is not sponsorship of a cause. It is a way for the values your organisation already lives by to reach children in Tanzania and people experiencing homelessness in Spain.',
],
```

Keep everything else in the file (partner types, existing partners, CTA) unchanged.

- [ ] **Step 3: Update `lib/content/pages/donateHub.ts`**

Read the current `intro` string, then replace it with:

```
Giving is one of the ways people become part of this story. What you share here joins the time, skills and belief of many others, and together those gifts become protection for children, dignity on the street, and lasting change for families.
```

- [ ] **Step 4: Add the philosophy line to `components/layout/Footer.tsx`**

In the accountability bar area (below the link columns, near the `LEGAL.statement` rendering — read the JSX to place it), add as the bar's first line:

```tsx
<p className="font-heading text-lg font-semibold">
  A life lived beyond ourselves creates lasting change.
</p>
```

- [ ] **Step 5: Update affected tests**

Run: `pnpm test` — for each failure in `__tests__/getInvolved/getInvolved.test.tsx`, `__tests__/footer.test.tsx`, `__tests__/donate/donateHub.test.tsx` (and any other file asserting the replaced copy), update the assertion to the new copy above (e.g. expect heading `/find your place in the story/i`, footer text `/a life lived beyond ourselves/i`). Do not weaken assertions to regex-anything; assert the new copy.

- [ ] **Step 6: Verify + commit**

Run: `pnpm test` — all green.

```bash
git add lib/content/pages/getInvolved.ts lib/content/pages/partner.ts lib/content/pages/donateHub.ts components/layout/Footer.tsx __tests__
git commit -m "feat(narrative): reframe get-involved, partner (Values In Action), donate intro, and footer line"
```

---

### Task 10: E2E rewrite + full verification + visual review

**Files:**
- Rewrite: `e2e/home.spec.ts`
- Check: `e2e/nav.spec.ts`, `e2e/pages.spec.ts`, `e2e/locale.spec.ts` for homepage-copy assertions

- [ ] **Step 1: Rewrite `e2e/home.spec.ts`**

```ts
import { test, expect } from '@playwright/test'

/**
 * Homepage end-to-end coverage for the experience-led journey page: the hero
 * owns the h1 and its CTAs are in-page anchors; the three expressions link to
 * their real routes; the invitation routes to /get-involved; the journey rail
 * exists on desktop and not on mobile.
 */

test('hero renders the client headline as the page h1', async ({ page }) => {
  await page.goto('/')
  const h1 = page.getByRole('heading', { level: 1 })
  await expect(h1).toBeVisible()
  await expect(h1).toContainText(/a life beyond ourselves/i)
})

test('primary CTA walks the reader to the participation chapter', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: /start your journey/i }).first().click()
  await expect(page.locator('section#participation')).toBeInViewport()
})

test('the three expressions link to their routes', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('link', { name: /see their stories/i })).toHaveAttribute('href', /\/stories$/)
  await expect(page.getByRole('link', { name: /explore community impact/i })).toHaveAttribute('href', /\/spain$/)
  await expect(page.getByRole('link', { name: /explore values in action/i })).toHaveAttribute(
    'href',
    /\/get-involved\/partner$/,
  )
})

test('journey rail shows on desktop and hides on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/')
  await expect(page.getByRole('navigation', { name: /journey/i })).toBeVisible()

  await page.setViewportSize({ width: 390, height: 844 })
  await expect(page.getByRole('navigation', { name: /journey/i })).toBeHidden()
})

test('invitation chapter routes to get-involved', async ({ page }) => {
  await page.goto('/')
  const invitation = page.locator('section#participation')
  await invitation.scrollIntoViewIfNeeded()
  await expect(invitation.getByRole('link', { name: /start your journey/i })).toHaveAttribute(
    'href',
    /\/get-involved$/,
  )
})
```

- [ ] **Step 2: Sweep other e2e specs**

Run: `grep -n "answer the call\|testimonial\|donate widget\|donation amount" e2e/*.ts` — update or remove any hit that targets removed homepage sections (assertions on /donate's own page stay).

- [ ] **Step 3: Full verification**

Run: `pnpm test` — all green.
Run: `pnpm lint` — clean.
Run: `pnpm build` — succeeds.
Run: `pnpm test:e2e` — all green (Playwright builds + serves per its config).

- [ ] **Step 4: Visual review pass**

Start `pnpm dev`, screenshot the homepage at 1512 wide and 390 wide (full page). Check against the spec: chapter pacing and total page height feel generous not cramped; rail legible over dark hero (see Task 3 note — if illegible, report in summary rather than improvising a fix); hero photo holds at full viewport; accent used ~6 times; no orphan headline words. Report findings with screenshots; do NOT redesign inline.

- [ ] **Step 5: Commit**

```bash
git add e2e
git commit -m "test(e2e): cover the experience-led homepage journey"
```

---

## Self-Review Results

- **Spec coverage:** every spec section maps to a task — chapters/rail (3–7), removals (7), visual language (4–6 class specs), motion (2, per-component), Sanity pipeline (1, 7, 8), narrative layer (9), e2e/SEO (7, 10). Open item "email signup placement" stays an open client question (spec §9) — intentionally no task.
- **Placeholders:** none; every code step carries the real code, every copy step carries the real copy.
- **Type consistency:** chapter prop shape `{ content, id, stage }` is uniform (Tasks 4–6, consumed in 7); `MoneySplit` defined in Task 1, consumed in Task 7; Sanity field names in Task 8 match `HOME_QUERY` in Task 7 and `HomeContent` in Task 1.
