'use client'

import * as React from 'react'
import { donorboxUrl } from '@/lib/donate'

const AMOUNTS = [25, 50, 100, 250]
const CURRENCIES = [
  { code: 'EUR', symbol: '\u20AC', label: 'EUR (\u20AC)' },
  { code: 'GBP', symbol: '\u00A3', label: 'GBP (\u00A3)' },
  { code: 'USD', symbol: '$', label: 'USD ($)' },
] as const

/**
 * Designed donation picker. Amount and frequency deep-link into the live
 * Donorbox campaign. Currency is display-only; the campaign itself is EUR.
 */
export function DonateCard(): React.JSX.Element {
  const [freq, setFreq] = React.useState<'one' | 'monthly'>('one')
  const [amount, setAmount] = React.useState(100)
  const [other, setOther] = React.useState('')
  const [currency, setCurrency] = React.useState<(typeof CURRENCIES)[number]['code']>('EUR')

  const cur = CURRENCIES.find((item) => item.code === currency) ?? CURRENCIES[0]
  const resolved = other ? Number(other) : amount
  const href = Number.isFinite(resolved) && resolved > 0
    ? donorboxUrl(resolved, freq === 'monthly' ? 'monthly' : 'once')
    : donorboxUrl(undefined, freq === 'monthly' ? 'monthly' : 'once')

  return (
    <div className="rounded-[18px] border border-[#2A2520]/12 bg-[#EFEAE0] px-10 pt-10 pb-[30px] shadow-[0_18px_50px_rgba(30,27,23,0.08)] max-[680px]:px-6">
      <h3 className="m-0 font-heading text-[34px] font-normal text-[#1E1B17]">Make a donation</h3>
      <div
        role="group"
        aria-label="Donation frequency"
        className="mt-[26px] flex gap-1 rounded-full border border-[#2A2520]/14 bg-[#FFFDF9] p-1"
      >
        {([
          ['one', 'One-time'],
          ['monthly', 'Monthly'],
        ] as const).map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => setFreq(key)}
            className={
              freq === key
                ? 'flex-1 rounded-full border border-[#2E2A1E] bg-[#2E2A1E] py-[13px] text-[14px] font-semibold tracking-[0.3px] text-[#F7F3EA]'
                : 'flex-1 rounded-full border border-transparent py-[13px] text-[14px] font-semibold tracking-[0.3px] text-[#4a443a]'
            }
          >
            {label}
          </button>
        ))}
      </div>
      <div
        role="group"
        aria-label="Amount"
        className="mt-[22px] grid grid-cols-5 gap-2.5 max-[680px]:grid-cols-3"
      >
        {AMOUNTS.map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => {
              setAmount(value)
              setOther('')
            }}
            className={
              amount === value && !other
                ? 'rounded-[10px] border-[1.5px] border-[#C89A3C] bg-[#FFFDF9] py-4 text-[15px] font-semibold text-[#1E1B17] shadow-[0_0_0_3px_rgba(200,154,60,0.15)]'
                : 'rounded-[10px] border border-[#2A2520]/18 bg-[#FFFDF9] py-4 text-[15px] font-semibold text-[#1E1B17]'
            }
          >
            {cur.symbol}
            {value}
          </button>
        ))}
        <input
          type="text"
          inputMode="numeric"
          placeholder="Other"
          aria-label="Other amount"
          value={other}
          onChange={(event) => {
            setOther(event.target.value.replace(/[^0-9]/g, ''))
            setAmount(0)
          }}
          className={
            other
              ? 'w-full rounded-[10px] border-[1.5px] border-[#C89A3C] bg-[#FFFDF9] py-4 text-center text-[15px] font-semibold text-[#1E1B17] outline-none'
              : 'w-full rounded-[10px] border border-[#2A2520]/18 bg-[#FFFDF9] py-4 text-center text-[15px] font-semibold text-[#1E1B17] outline-none'
          }
        />
      </div>
      <div className="relative mt-[18px]">
        <select
          aria-label="Currency"
          value={currency}
          onChange={(event) =>
            setCurrency(event.target.value as (typeof CURRENCIES)[number]['code'])
          }
          className="w-full appearance-none rounded-[10px] border border-[#2A2520]/18 bg-[#FFFDF9] py-[15px] pr-11 pl-11 text-[14.5px] font-medium text-[#1E1B17]"
        >
          {CURRENCIES.map((item) => (
            <option key={item.code} value={item.code}>
              {item.label}
            </option>
          ))}
        </select>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-[15px] h-[18px] w-[18px] -translate-y-1/2"
        >
          <circle cx="12" cy="12" r="8.5" stroke="#4a443a" strokeWidth="1.4" />
          <path
            d="M3.5 12h17M12 3.5c-2.6 2.4-3.9 5.3-3.9 8.5s1.3 6.1 3.9 8.5c2.6-2.4 3.9-5.3 3.9-8.5S14.6 5.9 12 3.5Z"
            stroke="#4a443a"
            strokeWidth="1.4"
          />
        </svg>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2"
        >
          <path
            d="M6 9.5 12 15l6-5.5"
            stroke="#4a443a"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <a
        href={href}
        className="mt-5 flex w-full items-center justify-center gap-3 rounded-[10px] bg-[#2E2A1E] py-[18px] text-[13.5px] font-semibold tracking-[1.6px] text-[#F7F3EA] transition-colors hover:bg-[#3a3527]"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
          <rect x="5" y="10.5" width="14" height="9" rx="1.6" stroke="#C89A3C" strokeWidth="1.5" />
          <path
            d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5"
            stroke="#C89A3C"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        DONATE SECURELY
      </a>
      <div className="mt-4 flex items-center justify-center gap-2 text-[12.5px] text-[#6b6357]">
        <svg viewBox="0 0 24 24" fill="none" className="h-[13px] w-[13px]" aria-hidden="true">
          <rect x="5" y="10.5" width="14" height="9" rx="1.6" stroke="#6b6357" strokeWidth="1.4" />
          <path
            d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5"
            stroke="#6b6357"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
        Secure payment powered by Stripe
      </div>
    </div>
  )
}

export default DonateCard
