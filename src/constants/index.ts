import { Pair } from '@/types'

export const DEPTH_PRICE_INDEX = 0
export const DEPTH_AMOUNT_INDEX = 1

export const BASE_CURRENCIES = ['btc', 'jpy'] as const
export const QUOTE_CURRENCIES = ['btc', 'xrp', 'ltc', 'eth', 'mona', 'bcc', 'xlm', 'qtum', 'bat', 'omg', 'xym'] as const

export const ALL_PAIRS = BASE_CURRENCIES.reduce<string[]>((prev, curr) => {
  const p = QUOTE_CURRENCIES.map((qc) => `${qc}_${curr}`)
  return [...prev, ...p]
}, []).filter((p) => p.split('_')[0] !== p.split('_')[1]) as Pair[]
