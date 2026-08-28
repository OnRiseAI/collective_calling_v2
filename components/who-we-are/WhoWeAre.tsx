import * as React from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { SiteFooter } from '@/components/layout/SiteFooter'

/**
 * Who We Are, transcribed from the v3 `Who We Are.dc.html`.
 * Uses the shared SiteHeader / SiteFooter. All copy is static; nothing here
 * reads Sanity. Grids stack below 1024px; paddings step down below 680px.
 */

const GOLD = '#C89A3C'

function Rule({ className }: { className?: string }): React.JSX.Element {
  return <div className={`h-[2px] w-10 bg-[#C89A3C] ${className ?? ''}`} />
}

function Hero(): React.JSX.Element {
  return (
    <section aria-label="Who we are" className="relative overflow-hidden bg-[#141009]">
      <div
        className="absolute bottom-0 right-0 top-0 w-[58%]"
        style={{
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 28%)',
          maskImage: 'linear-gradient(to right, transparent 0%, black 28%)',
        }}
      >
        <Image
          src="/images/who-we-are/hero.png"
          alt="A young boy looking at the camera, friends behind him in soft focus"
          fill
          priority
          sizes="58vw"
          className="object-cover object-[50%_20%]"
        />
      </div>
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to right, #100C06 0%, #100C06 36%, rgba(16,12,6,0.7) 48%, rgba(16,12,6,0.18) 62%, rgba(16,12,6,0) 78%)',
        }}
      />
      <div className="relative z-10 max-w-[760px] px-16 pb-16 pt-[150px] max-[680px]:px-7">
        <div className="text-[14px] font-bold tracking-[2.4px] text-[#C89A3C]">WHO WE ARE</div>
        <h1 className="mt-[26px] max-w-[560px] font-heading text-[64px] font-normal leading-[1.12] text-[#F7F3EA] max-[680px]:text-[44px]">
          Every life
          <br />
          carries worth.
        </h1>
        <Rule className="mt-[34px]" />
        <p className="mt-8 max-w-[430px] text-[17px] leading-[1.7] text-[#F7F3EA]/95">
          We believe every person possesses inherent worth.
        </p>
        <p className="mt-[18px] max-w-[430px] text-[17px] leading-[1.7] text-[#F7F3EA]/95">
          And sometimes, the right environment
          <br />
          can help someone rediscover it.
        </p>
      </div>
    </section>
  )
}

function WorthSection(): React.JSX.Element {
  return (
    <section aria-label="Worth is not earned" className="px-[90px] py-[84px] max-[680px]:px-7">
      <div className="mx-auto grid max-w-[1260px] grid-cols-2 items-center gap-14 max-lg:grid-cols-1">
        <div>
          <h2 className="m-0 font-heading text-[46px] font-normal leading-[1.2] max-[680px]:text-[32px]">
            Worth is not earned.
            <br />
            It is already there.
          </h2>
          <Rule className="mt-7" />
          <p className="mt-[34px] max-w-[420px] text-[16.5px] leading-[1.75] text-[#26211B]">
            But life does not always create the conditions for people to recognise it.
          </p>
          <p className="mt-5 max-w-[440px] text-[16.5px] leading-[1.75] text-[#26211B]">
            Poverty, homelessness, trauma, addiction, isolation and lack of opportunity can shape
            how people see themselves and what they believe is possible for their lives.
          </p>
          <p className="mt-[26px] text-[16.5px] font-bold leading-[1.75] text-[#1E1B17]">
            We believe the right environment can help change that.
          </p>
        </div>
        <figure className="m-0">
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
            <Image
              src="/images/who-we-are/worth.jpg"
              alt="People walking a dirt track through an informal hillside settlement at sunset"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </figure>
      </div>
    </section>
  )
}

function WhyWeExistSection(): React.JSX.Element {
  return (
    <section aria-label="Why we exist" className="relative py-[76px]">
      <div className="absolute bottom-[180px] left-0 top-[76px] w-[38%] overflow-hidden rounded-r-2xl max-lg:relative max-lg:bottom-auto max-lg:top-0 max-lg:h-[380px] max-lg:w-full max-lg:rounded-none">
        <Image
          src="/images/who-we-are/why-we-exist.jpg"
          alt="A Collective Calling volunteer in conversation with a smiling man outdoors"
          fill
          sizes="(min-width: 1024px) 38vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="ml-[42%] max-w-[980px] pr-[90px] max-lg:ml-0 max-lg:px-12 max-lg:pb-0 max-lg:pt-12 max-[680px]:px-7">
        <div className="text-[14px] font-bold tracking-[2.4px] text-[#8A5F16]">WHY WE EXIST</div>
        <h2 className="mt-6 max-w-[700px] font-heading text-[46px] font-normal leading-[1.2] max-[680px]:text-[32px]">
          We create environments where something different can become possible.
        </h2>
        <Rule className="mt-7" />
        <div className="mt-10 grid grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] gap-11 max-lg:grid-cols-1">
          <div>
            <p className="m-0 text-[16.5px] leading-[1.75] text-[#26211B]">
              But we have learned that environments alone do not transform lives.
            </p>
            <div className="mt-[26px] font-heading text-[44px] text-[#8A5F16]">People do.</div>
          </div>
          <div className="border-l border-[#D6CFC2] pl-12 max-lg:border-l-0 max-lg:pl-0">
            <p className="m-0 text-[16.5px] leading-[1.75] text-[#26211B]">
              Services can meet an immediate need. A shower can restore dignity for a morning. A
              safe home can protect a child. Education can create opportunity.
            </p>
            <p className="mt-5 text-[16.5px] leading-[1.75] text-[#26211B]">
              But these things also create something deeper:
              <br />
              the opportunity for relationship.
            </p>
            <p className="mt-5 text-[16.5px] leading-[1.75] text-[#26211B]">
              When people continue to show up, relationships grow. Relationships build trust.
            </p>
            <p className="mt-5 text-[16.5px] leading-[1.75] text-[#26211B]">
              And where trust exists, restoration can begin.
            </p>
          </div>
        </div>
      </div>
      <div className="px-[90px] pt-16 text-center max-[680px]:px-7">
        <p className="m-0 text-[16.5px] leading-[2] text-[#26211B]">
          This understanding shapes the way we work.
        </p>
        <p className="mt-1 text-[16.5px] leading-[2] text-[#26211B]">
          We don&rsquo;t simply ask, &ldquo;What does this person need?&rdquo;
        </p>
        <p className="mt-1 text-[16.5px] leading-[2] text-[#26211B]">
          We also ask:{' '}
          <strong className="font-bold text-[#1E1B17]">
            &ldquo;What kind of environment could help this person discover who they are and what
            their life could become?&rdquo;
          </strong>
        </p>
      </div>
    </section>
  )
}

function RestorationSection(): React.JSX.Element {
  return (
    <section
      aria-label="From restoration to purpose"
      className="relative pt-[70px]"
      style={{
        background: 'linear-gradient(to bottom, #F4F0E8 0%, #EFE7D8 58%, #EAE1D0 100%)',
      }}
    >
      <div className="absolute right-0 top-0 h-[360px] w-[60%] overflow-hidden rounded-l-2xl max-lg:relative max-lg:h-[320px] max-lg:w-full max-lg:rounded-none">
        <Image
          src="/images/who-we-are/restoration.jpg"
          alt="One hiker reaching down to pull another up a rocky summit at dusk"
          fill
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover"
          style={{
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 26%)',
            maskImage: 'linear-gradient(to right, transparent 0%, black 26%)',
          }}
        />
        <div
          className="absolute inset-0 max-lg:hidden"
          style={{
            background: 'linear-gradient(to right, #F4F0E8 0%, rgba(244,240,232,0) 26%)',
          }}
        />
      </div>
      <div className="relative z-10 -mt-[70px] w-[44%] pl-[90px] pt-[70px] max-lg:mt-0 max-lg:w-full max-lg:px-12 max-[680px]:px-7">
        <div className="text-[14px] font-bold tracking-[2.4px] text-[#8A5F16]">
          FROM RESTORATION TO PURPOSE
        </div>
        <h2 className="mt-[22px] font-heading text-[46px] font-normal leading-[1.2] max-[680px]:text-[32px]">
          Restoration is
          <br />
          the beginning.
        </h2>
        <p className="mt-7 max-w-[480px] text-[16.5px] leading-[1.75] text-[#26211B]">
          As people experience dignity, relationship and opportunity, something else can begin to
          emerge: identity, purpose and the recognition that their life carries something of value.
        </p>
        <p className="mt-6 max-w-[440px] text-[16.5px] font-bold leading-[1.75] text-[#1E1B17]">
          Because we believe every person has something within their hands.
        </p>
      </div>
      <div className="mx-auto grid max-w-[1440px] grid-cols-[minmax(0,0.94fr)_minmax(0,1.06fr)] gap-14 px-[90px] pb-[76px] pt-12 max-lg:grid-cols-1 max-[680px]:px-7">
        <div>
          <div className="max-w-[560px] font-heading text-[30px] leading-[1.6] text-[#8A5F16]">
            Time.&ensp;Ability.&ensp;Experience.&ensp;Influence.&ensp;Opportunity.
            <br />
            Compassion.&ensp;Resources.
          </div>
          <p className="mt-5 text-[16px] leading-[1.75] text-[#26211B]">
            Sometimes simply the willingness to show up.
          </p>
        </div>
        <div className="border-l border-[#C89A3C] pl-[52px] max-lg:border-l-0 max-lg:pl-0">
          <p className="m-0 text-[16.5px] leading-[1.75] text-[#26211B]">
            Someone who was supported can become someone who supports.
          </p>
          <p className="mt-4 text-[16.5px] leading-[1.75] text-[#26211B]">
            Someone who was given an opportunity can create one for somebody else.
          </p>
          <p className="mt-4 text-[16.5px] leading-[1.75] text-[#26211B]">
            Someone whose dignity was restored can begin restoring dignity in another.
          </p>
          <div className="mt-7 font-heading text-[30px] text-[#8A5F16]">
            What was received begins to multiply.
          </div>
        </div>
      </div>
    </section>
  )
}

const BELIEF_CARDS: { image: string; alt: string; title: string; body: string }[] = [
  {
    image: '/images/who-we-are/children-families.jpg',
    alt: 'Four smiling children under trees',
    title: 'Children & Families',
    body: 'We create safe and supportive environments for vulnerable children and families, helping them discover safety, relationship and opportunity.',
  },
  {
    image: '/images/who-we-are/homelessness.jpg',
    alt: 'A man in a hooded jacket looking up, stone wall behind him',
    title: 'Homelessness & Restoration',
    body: 'We stand alongside people experiencing homelessness, creating opportunities for dignity and relationship.',
  },
  {
    image: '/images/who-we-are/community-business.jpg',
    alt: 'A team in discussion around a meeting table',
    title: 'Community & Business',
    body: 'We work with people, organisations and communities to participate, serve and contribute. And through Values in Action, we help businesses turn their values into impact that strengthens lives beyond their walls.',
  },
]

function BeliefCardsSection(): React.JSX.Element {
  return (
    <section
      aria-label="Today this belief takes many forms"
      className="px-[90px] pb-24 pt-[88px] max-[680px]:px-7"
    >
      <div className="text-center">
        <div className="text-[14px] font-bold tracking-[2.4px] text-[#8A5F16]">
          DIFFERENT EXPRESSIONS. THE SAME ROOT.
        </div>
        <h2 className="mt-[18px] font-heading text-[42px] font-normal leading-[1.2] max-[680px]:text-[32px]">
          Today this belief takes many forms.
        </h2>
      </div>
      <div className="mx-auto mt-9 grid max-w-[1260px] grid-cols-3 gap-11 max-lg:grid-cols-1">
        {BELIEF_CARDS.map((card) => (
          <article key={card.title}>
            <div className="relative aspect-[3/2] w-full overflow-hidden rounded-[14px] border border-[#2A2520]/[0.22]">
              <Image
                src={card.image}
                alt={card.alt}
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover"
              />
            </div>
            {/* font-body: the base layer sets h1-h4 to the display serif, but
                the design keeps these card titles in Figtree bold. */}
            <h3 className="mt-[22px] font-body text-[19px] font-bold">{card.title}</h3>
            <p className="mt-3 text-[15.5px] leading-[1.75] text-[#26211B]">{card.body}</p>
          </article>
        ))}
      </div>
      <div className="mt-[72px] text-center">
        <p className="m-0 font-heading text-[22px] text-[#1E1B17]">
          Different people. Different circumstances. Different expressions.
        </p>
        <div className="mt-3 font-heading text-[36px] text-[#8A5F16]">The same root.</div>
        <p className="mt-3.5 font-heading text-[19px] text-[#1E1B17]">
          The belief that every life carries worth, and every life can carry something into the
          life of another.
        </p>
      </div>
    </section>
  )
}

const HANDS_ITEMS: { icon: React.JSX.Element; label: React.JSX.Element }[] = [
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="h-[38px] w-[38px]" aria-hidden="true">
        <path
          d="M14 7h12v26H14z M14 7 8 10v23l6-3M19 20.5v3"
          stroke={GOLD}
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    ),
    label: (
      <>
        Somebody
        <br />
        opened a door.
      </>
    ),
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="h-[38px] w-[38px]" aria-hidden="true">
        <path
          d="M20 32s-11-6.6-11-14a6.2 6.2 0 0 1 11-3.9A6.2 6.2 0 0 1 31 18c0 7.4-11 14-11 14Z"
          stroke={GOLD}
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path d="M20 24v-6m0 0-3-3m3 3 3-3" stroke={GOLD} strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
    label: (
      <>
        Somebody
        <br />
        believed in us.
      </>
    ),
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="h-[38px] w-[38px]" aria-hidden="true">
        <path
          d="M12 8h16v24H12z M28 8l-8 3v24l8-3M16 18h4"
          stroke={GOLD}
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    ),
    label: (
      <>
        Somebody
        <br />
        taught us.
      </>
    ),
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="h-[38px] w-[38px]" aria-hidden="true">
        <path
          d="M11 24c2-4 5-6 9-6s7 2 9 6M20 18v-4m-4.5 5.5L13 17m11.5 2.5L27 17"
          stroke={GOLD}
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 30c3.4-3 8-4.4 12-4.4S28.6 27 32 30"
          stroke={GOLD}
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
    ),
    label: (
      <>
        Somebody
        <br />
        gave us an
        <br />
        opportunity.
      </>
    ),
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="h-[38px] w-[38px]" aria-hidden="true">
        <circle cx="14" cy="13" r="3.4" stroke={GOLD} strokeWidth="1.7" />
        <circle cx="26" cy="13" r="3.4" stroke={GOLD} strokeWidth="1.7" />
        <circle cx="20" cy="10" r="3.4" stroke={GOLD} strokeWidth="1.7" fill="#141009" />
        <path
          d="M7 31c0-4.5 3.1-7.5 7-7.5 2.4 0 4.5 1.1 6 2.9 1.5-1.8 3.6-2.9 6-2.9 3.9 0 7 3 7 7.5"
          stroke={GOLD}
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
    ),
    label: (
      <>
        Somebody
        <br />
        showed up.
      </>
    ),
  },
]

function WhyCollectiveCallingSection(): React.JSX.Element {
  return (
    <section aria-label="Why Collective Calling" className="bg-[#141009]">
      <div className="grid grid-cols-[minmax(0,0.68fr)_minmax(0,1.32fr)] max-lg:grid-cols-1">
        <div className="relative min-h-[340px] overflow-hidden max-lg:min-h-[420px]">
          <Image
            src="/images/who-we-are/why-collective-calling.jpg"
            alt="A lone figure on a hilltop facing the sunset"
            fill
            sizes="(min-width: 1024px) 34vw, 100vw"
            className="object-cover object-center"
            style={{
              WebkitMaskImage: 'linear-gradient(to left, transparent 0%, black 18%)',
              maskImage: 'linear-gradient(to left, transparent 0%, black 18%)',
            }}
          />
          <div
            className="pointer-events-none absolute right-0 top-0 h-[38%] w-[52%]"
            style={{
              background:
                'linear-gradient(to left, #141009 0%, rgba(20,16,9,0.85) 26%, rgba(20,16,9,0.4) 58%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
              maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, rgba(16,12,6,0.55) 0%, rgba(16,12,6,0.15) 55%, rgba(16,12,6,0.6) 100%)',
            }}
          />
          <div className="relative z-10 py-11 pl-[90px] pr-10 max-[680px]:px-7">
            <div className="text-[14px] font-bold tracking-[2.4px] text-[#C89A3C]">
              WHY COLLECTIVE CALLING?
            </div>
            <h2 className="mt-5 max-w-[420px] font-heading text-[42px] font-normal leading-[1.22] text-[#F7F3EA] max-[680px]:text-[32px]">
              None of us arrives where we are entirely by ourselves.
            </h2>
            <div className="mt-[26px] h-[2px] w-10 bg-[#F7F3EA]/50" />
          </div>
        </div>
        <div className="py-[52px] pl-14 pr-[90px] pb-14 max-[680px]:px-7">
          <div className="flex items-start gap-9 max-lg:flex-wrap">
            {HANDS_ITEMS.map((item, i) => (
              <div key={i} className="min-w-[110px] flex-1 text-center">
                <span className="inline-block">{item.icon}</span>
                <p className="mt-3.5 text-[14.5px] font-medium leading-[1.6] text-[#F7F3EA]/95">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-11 text-[16.5px] leading-[1.7] text-[#F7F3EA]/95">
            And eventually we are faced with a question:
          </p>
          <div className="mt-4 font-heading text-[34px] leading-[1.3] text-[#C89A3C]">
            What will we do with what has been placed in our hands?
          </div>
          <p className="mt-[22px] text-[16.5px] leading-[1.8] text-[#F7F3EA]/95">
            Collective Calling is the belief that answering that question belongs to all of us.
            <br />
            Not everyone is called to do the same thing. But everyone can do something.
          </p>
        </div>
      </div>
    </section>
  )
}

const BOARD: {
  image: string
  alt: string
  name: string
  role: string
  bio: string
}[] = [
  {
    image: '/images/meet-the-team/mt-paul.png',
    alt: 'Paul Carr wearing a cap, looking into the distance',
    name: 'Paul Carr',
    role: 'Co-Founder & President',
    bio: "Paul's heart for people and justice drives the vision and direction of Collective Calling.",
  },
  {
    image: '/images/meet-the-team/mt-gemma.png',
    alt: 'Gemma Blanchard smiling in front of green hills',
    name: 'Gemma Blanchard',
    role: 'Co-Founder & Secretary / Treasurer',
    bio: 'Gemma leads with wisdom and compassion, ensuring stewardship and strong foundations for the work.',
  },
]

function BoardSection(): React.JSX.Element {
  return (
    <section aria-label="Our board" className="px-16 pt-[120px] pb-6 max-[680px]:px-7">
      <div className="mx-auto max-w-[1320px]">
        <div className="flex items-center gap-4">
          <span className="text-[14px] font-bold tracking-[2.4px] text-[#8A5F16]">OUR BOARD</span>
          <span className="h-px w-10 bg-[#C89A3C]" />
        </div>
        <div className="mt-8 grid grid-cols-2 gap-14 max-lg:grid-cols-1">
          {BOARD.map((person) => (
            <div
              key={person.name}
              className="grid grid-cols-[1fr_1.1fr] items-start gap-7 max-[680px]:grid-cols-1"
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-[14px]">
                <Image src={person.image} alt={person.alt} fill sizes="280px" className="object-cover" />
              </div>
              <div>
                <h2 className="m-0 font-heading text-[30px] font-normal">{person.name}</h2>
                <div className="mt-2 text-[14px] font-semibold text-[#8A5F16]">{person.role}</div>
                <div className="mt-3.5 h-px w-[34px] bg-[#C89A3C]" />
                <p className="mt-4 text-[14.5px] leading-[1.75] text-[#4A443B]">{person.bio}</p>
                <Link
                  href="/about/our-team"
                  className="mt-2 inline-flex min-h-11 items-center gap-2.5 text-[12.5px] font-bold tracking-[1.5px] text-[#1E1B17] transition-colors hover:text-[#8A5F16]"
                >
                  VIEW {person.name.split(' ')[0].toUpperCase()}&rsquo;S STORY{' '}
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const AMBASSADORS: {
  image?: string
  alt?: string
  name: string
  role: React.ReactNode
  bio: string
}[] = [
  {
    image: '/images/meet-the-team/mt-aicha.png',
    alt: 'Aicha Msuya smiling outdoors',
    name: 'Aicha Msuya',
    role: (
      <>
        Operations Manager
        <br />
        Spain
      </>
    ),
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
    bio: 'Keeps things moving, behind the scenes and on the ground.',
  },
  {
    image: '/images/meet-the-team/mt-ruth.png',
    alt: 'Ruth García smiling softly',
    name: 'Ruth García',
    role: (
      <>
        Shop Manager
        <br />
        San Pedro
      </>
    ),
    bio: 'Leads our San Pedro team with excellence and heart.',
  },
  {
    image: '/images/meet-the-team/mt-eva.png',
    alt: 'Eva Ramírez smiling warmly',
    name: 'Eva Ramírez',
    role: (
      <>
        Shop Manager
        <br />
        Estepona
      </>
    ),
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

function AmbassadorsSection(): React.JSX.Element {
  return (
    <section aria-label="Our ambassadors" className="px-16 pt-16 pb-[120px] max-[680px]:px-7">
      <div className="mx-auto max-w-[1320px]">
        <div className="flex items-center gap-4">
          <span className="text-[14px] font-bold tracking-[2.4px] text-[#8A5F16]">
            OUR AMBASSADORS
          </span>
          <span className="h-px w-10 bg-[#C89A3C]" />
        </div>
        <div className="mt-8 grid grid-cols-5 gap-6 max-lg:grid-cols-2 max-[680px]:grid-cols-1">
          {AMBASSADORS.map((person) => (
            <article
              key={person.name}
              className="flex flex-col overflow-hidden rounded-[10px] border border-[#2A2520]/14 bg-[#FAF7F1]"
            >
              {person.image && (
                <div className="relative aspect-square w-full">
                  <Image
                    src={person.image}
                    alt={person.alt ?? person.name}
                    fill
                    sizes="220px"
                    className="object-cover"
                  />
                </div>
              )}
              <div className="flex flex-1 flex-col px-5 pt-5 pb-6">
                <h3 className="m-0 font-heading text-[23px] font-normal leading-[1.2]">
                  {person.name}
                </h3>
                <div className="mt-[7px] text-[13px] font-semibold leading-[1.5] text-[#8A5F16]">
                  {person.role}
                </div>
                <p className="mt-3 text-[13.5px] leading-[1.65] text-[#4A443B]">{person.bio}</p>
              </div>
            </article>
          ))}
          <article className="flex flex-col justify-center rounded-[10px] border border-[#2A2520]/10 bg-[#EFEAE0] px-6 py-8 text-center">
            <svg
              viewBox="0 0 48 48"
              fill="none"
              className="mx-auto h-11 w-11"
              aria-hidden="true"
            >
              <path
                d="M24 38s-13-8-13-16.5A7.5 7.5 0 0 1 24 15a7.5 7.5 0 0 1 13 6.5C37 30 24 38 24 38Z"
                stroke="#C89A3C"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
            </svg>
            <h3 className="mt-[18px] font-heading text-[23px] font-normal leading-[1.25]">
              And our volunteers
            </h3>
            <p className="mt-3 text-[13.5px] leading-[1.7] text-[#4A443B]">
              A growing family of incredible people who give their time, skills, and hearts.
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}

function InvitationSection(): React.JSX.Element {
  return (
    <section aria-label="The invitation" className="relative overflow-hidden bg-[#141009]">
      <div className="absolute bottom-0 right-0 top-0 w-[46%]">
        <Image
          src="/images/who-we-are/invitation.jpg"
          alt="A wooden boardwalk winding through golden hills at sunset"
          fill
          sizes="46vw"
          className="object-cover object-[50%_60%]"
        />
      </div>
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to right, #100C06 0%, #100C06 54%, rgba(16,12,6,0.6) 64%, rgba(16,12,6,0.12) 80%, rgba(16,12,6,0) 92%)',
        }}
      />
      <div className="relative z-10 grid grid-cols-[1fr_auto_1fr] items-center gap-10 px-[90px] pb-[74px] pt-16 max-[680px]:flex max-[680px]:flex-col max-[680px]:items-start max-[680px]:gap-9 max-[680px]:px-7">
        <div className="min-w-0">
          <div className="text-[14px] font-bold tracking-[2.4px] text-[#C89A3C]">
            THE INVITATION
          </div>
          <h2 className="mt-[18px] font-heading text-[56px] font-normal leading-[1.12] text-[#F7F3EA] max-[680px]:text-[38px]">
            What do
            <br />
            you hold?
          </h2>
          <p className="mt-6 max-w-[440px] text-[16.5px] leading-[1.75] text-[#F7F3EA]/95">
            Our vision is a world where every person understands that they hold something that can
            strengthen another person&rsquo;s life.
          </p>
        </div>
        <Link
          href="/journey"
          className="inline-flex items-center gap-3.5 justify-self-center whitespace-nowrap rounded-[6px] bg-[#D9A83F] px-11 py-5 text-[14px] font-semibold tracking-[1.6px] text-[#2A2415] transition-all duration-[250ms] hover:-translate-y-px hover:bg-[#C89A3C] hover:text-[#1E1B17]"
        >
          START YOUR JOURNEY{' '}
          <span aria-hidden="true" className="text-[16px]">
            →
          </span>
        </Link>
        <div />
      </div>
    </section>
  )
}

export function WhoWeAre(): React.JSX.Element {
  return (
    <div className="bg-[#F4F0E8] font-body text-[#1E1B17]">
      <SiteHeader active="who" tone="dark" />
      <Hero />
      <WorthSection />
      <div className="h-px bg-[#D6CFC2]" />
      <WhyWeExistSection />
      <RestorationSection />
      <BeliefCardsSection />
      <WhyCollectiveCallingSection />
      <BoardSection />
      <AmbassadorsSection />
      <InvitationSection />
      <SiteFooter />
    </div>
  )
}

export default WhoWeAre
