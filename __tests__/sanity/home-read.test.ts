import { expect, test, vi } from 'vitest'
import { mapSanityHome } from '@/lib/sanity/home.query'
import { getHomeContent } from '@/lib/content/home'
import { SEED_HOME } from '@/lib/content/seed'

test('getHomeContent falls back to the seed when Sanity is unconfigured', async () => {
  const home = await getHomeContent()
  expect(home).toEqual(SEED_HOME) // env unset in tests => client null
})

test('mapSanityHome maps a raw doc into the HomeContent shape', () => {
  const raw = {
    hero: { eyebrow: 'CC', headline: 'H', lede: 'L', image: null, alt: 'A' },
    impactStats: [{ icon: 'heart', value: '83%', label: 'x' }],
    appeals: [], mission: { eyebrow: 'm', heading: 'h', body: 'b' },
    scripture: { quote: 'q', reference: '1 John 4:11' },
    testimonials: [{ quote: 't', attribution: 'Supporter', placeholder: true }],
    exploreCards: [],
    money: { programsPct: 83, adminPct: 17, programsLabel: 'a', adminLabel: 'b', note: 'n' },
    donate: { monthlyTiers: [], onceTiers: [] },
    trust: { registration: 'r', statement: 's', partners: ['p'] },
  }
  const mapped = mapSanityHome(raw)
  expect(mapped.impactStats[0].value).toBe('83%')
  expect(mapped.money.programsPct + mapped.money.adminPct).toBe(100)
  expect(mapped.trust.partners).toEqual(['p'])
})
