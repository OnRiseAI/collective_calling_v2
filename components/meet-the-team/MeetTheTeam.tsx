import * as React from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { JOURNEY_HREF } from '@/lib/nav'
import { FadeIn } from '@/components/ui/FadeIn'
import { Reveal } from '@/components/ui/Reveal'

/**
 * Meet the Team, transcribed from the v4 `Meet the Team.dc.html`.
 * Uses the shared SiteHeader / SiteFooter. All copy is static; nothing here
 * reads Sanity. The leadership pair stacks below 1024px, the team grid steps
 * 5 → 3 → 2 → 1 across 1024 / 780 / 680px, and the hero photograph drops
 * below the copy on the narrowest screens.
 */

type Member = {
  image: string
  alt: string
  name: string
  role: string
  bio: string
}

const LEADERSHIP: (Member & { storyLabel: string })[] = [
  {
    image: '/images/meet-the-team/mt-paul.png',
    alt: 'Paul Carr wearing a cap, looking into the distance',
    name: 'Paul Carr',
    role: 'Co-Founder & President',
    bio: "Paul's heart for people and justice drives the vision and direction of Collective Calling.",
    storyLabel: "VIEW PAUL'S STORY",
  },
  {
    image: '/images/meet-the-team/mt-gemma.png',
    alt: 'Gemma Blanchard smiling in front of green hills',
    name: 'Gemma Blanchard',
    // Two lines by design: the role wraps under the ampersand.
    role: 'Co-Founder &\nSecretary / Treasurer',
    bio: 'Gemma leads with wisdom and compassion, ensuring stewardship and strong foundations for the work.',
    storyLabel: "VIEW GEMMA'S STORY",
  },
]

const TEAM: Member[] = [
  {
    image: '/images/meet-the-team/mt-aicha.png',
    alt: 'Aicha Msuya smiling outdoors',
    name: 'Aicha Msuya',
    role: 'Operations Manager\nSpain',
    bio: 'Oversees our centres and shops, leading teams and daily operations.',
  },
  {
    image: '/images/meet-the-team/mt-artur.png',
    alt: 'Artur Gorecki smiling in a black shirt',
    name: 'Artur Gorecki',
    role: 'VIA Programme Director',
    bio: 'Leads Values in Action, partnering with businesses to create lasting impact.',
  },
  {
    image: '/images/meet-the-team/mt-natalie.png',
    alt: 'Natalie Harrison smiling outdoors',
    name: 'Natalie Harrison',
    role: 'Community & Events Lead',
    bio: 'Builds community connections and creates spaces that bring people together for good.',
  },
  {
    image: '/images/meet-the-team/mt-emmanuel.png',
    alt: 'Emmanuel Mushi smiling in the hills',
    name: 'Emmanuel Mushi',
    role: 'Tanzania Programme Lead',
    bio: 'Oversees our work in Tanzania, ensuring local needs are met with dignity and love.',
  },
  {
    image: '/images/meet-the-team/mt-josh.png',
    alt: 'Josh Hards smiling outdoors',
    name: 'Josh Hards',
    role: 'Logistics & Operations',
    bio: 'Keeps things moving—behind the scenes and on the ground.',
  },
  {
    image: '/images/meet-the-team/mt-ruth.png',
    alt: 'Ruth García smiling softly',
    name: 'Ruth García',
    role: 'Shop Manager\nSan Pedro',
    bio: 'Leads our San Pedro team with excellence and heart.',
  },
  {
    image: '/images/meet-the-team/mt-eva.png',
    alt: 'Eva Ramírez smiling warmly',
    name: 'Eva Ramírez',
    role: 'Shop Manager\nEstepona',
    bio: 'Oversees our Estepona shop and creates a welcoming experience for all.',
  },
  {
    image: '/images/meet-the-team/mt-george.png',
    alt: 'George William wearing a cap',
    name: 'George William',
    role: 'Driver & Logistics',
    bio: 'Ensures safe transport and reliable support for our teams and projects.',
  },
  {
    image: '/images/meet-the-team/mt-veronica.png',
    alt: 'Veronica Tai smiling in the sun',
    name: 'Veronica Tai',
    role: 'Ambassador',
    bio: 'Using her voice and influence to champion the mission.',
  },
]

function Hero(): React.JSX.Element {
  return (
    <section
      aria-label="Meet the team"
      className="relative overflow-hidden bg-[#141009] max-[680px]:pb-[280px]"
    >
      <div className="absolute inset-y-0 right-0 w-[74%] [-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_22%)] [mask-image:linear-gradient(to_right,transparent_0%,black_22%)] max-[680px]:inset-y-auto max-[680px]:bottom-0 max-[680px]:h-[300px] max-[680px]:w-full max-[680px]:[-webkit-mask-image:linear-gradient(to_top,black_60%,transparent_100%)] max-[680px]:[mask-image:linear-gradient(to_top,black_60%,transparent_100%)]">
        <Image
          src="/images/meet-the-team/mt-hero.png"
          alt="The Collective Calling team walking a village track together at sunset"
          fill
          priority
          sizes="(max-width: 680px) 100vw, 74vw"
          className="object-cover object-[60%_50%]"
        />
      </div>
      <div
        className="absolute inset-0 max-[680px]:hidden"
        style={{
          background:
            'linear-gradient(to right, #100C06 0%, rgba(16,12,6,0.94) 24%, rgba(16,12,6,0.6) 40%, rgba(16,12,6,0.12) 58%, rgba(16,12,6,0) 76%)',
        }}
      />
      <div className="relative z-10 mx-auto max-w-[1320px] px-16 pt-[150px] pb-[100px] max-[680px]:px-7">
        <FadeIn>
          <div className="flex items-center gap-4">
            <span className="text-[12.5px] font-semibold tracking-[2.2px] text-[#F7F3EA]">
              MEET THE TEAM
            </span>
            <span className="h-px w-[26px] bg-[#F7F3EA]/70" />
          </div>
          <h1 className="mt-6 max-w-[340px] font-heading text-[clamp(46px,5.2vw,68px)] font-normal leading-[1.14] text-balance text-[#F7F3EA] max-[680px]:text-[44px]">
            A team united by purpose.
          </h1>
          <p className="mt-[26px] max-w-[300px] text-[14.5px] leading-[1.85] text-[#F7F3EA]/90">
            Different backgrounds. Shared calling. Working together to create environments where
            transformation happens.
          </p>
        </FadeIn>
      </div>
    </section>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }): React.JSX.Element {
  return (
    <>
      <div className="text-[12px] font-semibold tracking-[1.5px] text-[#8A5F16]">{children}</div>
      <div className="mt-2 h-px w-8 bg-[#C89A3C]" />
    </>
  )
}

function LeadershipSection(): React.JSX.Element {
  return (
    <section aria-label="Our leadership team" className="px-16 pt-[76px] max-[680px]:px-7">
      <div className="mx-auto max-w-[1320px]">
        <Reveal>
          <SectionLabel>OUR LEADERSHIP TEAM</SectionLabel>
        </Reveal>
        <div className="mt-7 grid grid-cols-2 gap-16 max-[1024px]:grid-cols-1 max-[1024px]:gap-11">
          {LEADERSHIP.map((person, index) => (
            <Reveal key={person.name} delay={index * 0.07}>
              <div className="grid grid-cols-[0.96fr_1.04fr] items-start gap-[30px] max-[1024px]:max-w-[600px] max-[1024px]:grid-cols-[220px_1fr] max-[1024px]:gap-8 max-[680px]:max-w-[320px] max-[680px]:grid-cols-1">
                <div className="relative aspect-square w-full max-w-[260px] overflow-hidden rounded-[14px] max-[680px]:max-w-full">
                  <Image
                    src={person.image}
                    alt={person.alt}
                    fill
                    sizes="(max-width: 680px) 320px, 260px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h2 className="m-0 font-heading text-[29px] font-normal leading-[1.2] text-balance">
                    {person.name}
                  </h2>
                  <div className="mt-2 whitespace-pre-line text-[13.5px] font-medium leading-[1.5] text-[#8A5F16]">
                    {person.role}
                  </div>
                  <div className="mt-4 h-px w-[30px] bg-[#C89A3C]" />
                  <p className="mt-[18px] max-w-[290px] text-[13.5px] leading-[1.85] text-[#4A443B]">
                    {person.bio}
                  </p>
                  <Link
                    href="/stories"
                    className="mt-3 inline-flex min-h-11 items-center gap-3 text-[12px] font-semibold tracking-[1.4px] text-[#1E1B17] transition-colors hover:text-[#8A5F16]"
                  >
                    {person.storyLabel} <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function TeamSection(): React.JSX.Element {
  return (
    <section aria-label="Our team" className="px-16 pt-11 pb-[60px] max-[680px]:px-7">
      <div className="mx-auto max-w-[1320px]">
        <Reveal>
          <SectionLabel>OUR TEAM</SectionLabel>
        </Reveal>
        <div className="mt-[26px] grid grid-cols-5 gap-[22px] max-[1024px]:grid-cols-3 max-[780px]:grid-cols-2 max-[680px]:grid-cols-1">
          {TEAM.map((member, index) => (
            <Reveal key={member.name} delay={(index % 5) * 0.07}>
              <article className="flex h-full flex-col overflow-hidden rounded-[10px] border border-[#2A2520]/10 bg-[#FAF7F1]">
                <div className="relative aspect-square w-full">
                  <Image
                    src={member.image}
                    alt={member.alt}
                    fill
                    sizes="(max-width: 680px) 100vw, (max-width: 780px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover"
                  />
                </div>
                <div className="h-px bg-[#C89A3C]" />
                <div className="flex flex-1 flex-col px-[18px] pt-[18px] pb-[22px]">
                  {/* h3 needs font-body explicitly: globals.css @layer base sets
                      h1–h4 to the display serif, and the card name is the serif
                      but the role below it is not. */}
                  <h3 className="m-0 font-heading text-[21px] font-normal leading-[1.2]">
                    {member.name}
                  </h3>
                  <div className="mt-1.5 whitespace-pre-line font-body text-[12.5px] font-medium leading-[1.5] text-[#8A5F16]">
                    {member.role}
                  </div>
                  <div className="mt-3.5 h-px bg-[#E4DCCC]" />
                  <p className="mt-3.5 text-[12.5px] leading-[1.75] text-[#4A443B]">{member.bio}</p>
                </div>
              </article>
            </Reveal>
          ))}
          <Reveal delay={0.28}>
            <article className="flex h-full flex-col justify-center rounded-[10px] border border-[#2A2520]/8 bg-[#F0EBE0] px-[22px] py-[30px]">
              <svg
                viewBox="0 0 48 48"
                fill="none"
                aria-hidden="true"
                className="mx-auto h-[46px] w-[46px]"
              >
                <path
                  d="M24 37.5s-12.6-7.8-12.6-16.1A7.3 7.3 0 0 1 24 15a7.3 7.3 0 0 1 12.6 6.4C36.6 29.7 24 37.5 24 37.5Z"
                  stroke="#C89A3C"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
              <h3 className="mt-6 font-heading text-[21px] font-normal leading-[1.25]">
                And our volunteers
              </h3>
              <p className="mt-3.5 font-body text-[12.5px] leading-[1.75] text-[#4A443B]">
                A growing family of incredible people who give their time, skills, and hearts.
              </p>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function ClosingSection(): React.JSX.Element {
  return (
    <section aria-label="Better together" className="px-16 pb-24 max-[680px]:px-7">
      <div className="relative mx-auto max-w-[1320px] overflow-hidden rounded-[10px] bg-[#141009]">
        <Image
          src="/images/meet-the-team/mt-closing.png"
          alt="A line of people standing with arms around each other at dusk"
          fill
          sizes="100vw"
          className="object-cover object-[50%_45%]"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(16,12,6,0.92) 0%, rgba(16,12,6,0.66) 34%, rgba(16,12,6,0.42) 60%, rgba(16,12,6,0.78) 100%)',
          }}
        />
        <Reveal className="relative z-10 flex items-center justify-between gap-12 px-14 py-[52px] max-[1024px]:flex-col max-[1024px]:items-start max-[1024px]:gap-8 max-[680px]:px-7">
          <div>
            <div className="h-px w-[30px] bg-[#C89A3C]" />
            <h2 className="mt-5 font-heading text-[clamp(28px,2.6vw,34px)] font-normal leading-[1.32] text-balance text-[#F7F3EA]">
              Better together.
              <br />
              Greater impact.
              <br />
              Lives transformed.
            </h2>
          </div>
          <Link
            href={JOURNEY_HREF}
            className="inline-flex min-h-[52px] flex-none items-center gap-3.5 rounded-[6px] border border-[#C89A3C] px-7 text-[12.5px] font-semibold tracking-[1.4px] whitespace-nowrap text-[#F7F3EA] transition-all duration-[250ms] hover:bg-[#C89A3C] hover:text-[#2A2415]"
          >
            START YOUR JOURNEY{' '}
            <span aria-hidden="true" className="text-[15px]">
              →
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

export function MeetTheTeam(): React.JSX.Element {
  return (
    <div className="bg-[#F4F0E8] font-body text-[#1E1B17]">
      <SiteHeader active="team" tone="dark" />
      <Hero />
      <LeadershipSection />
      <TeamSection />
      <ClosingSection />
      <SiteFooter />
    </div>
  )
}

export default MeetTheTeam
