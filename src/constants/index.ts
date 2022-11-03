import { Pair, QC } from '@/types'

export const DEPTH_PRICE_INDEX = 0
export const DEPTH_AMOUNT_INDEX = 1

export const BASE_CURRENCIES = ['jpy'] as const
export const QUOTE_CURRENCIES = [
  'btc',
  'xrp',
  'ltc',
  'eth',
  'mona',
  'bcc',
  'xlm',
  'qtum',
  'bat',
  'omg',
  'xym',
  'link',
  'mkr',
  'matic',
  'dot',
  'doge',
  'boba',
  'enj',
  'astr',
  'ada',
] as const

export const PAIR_SEPARATOR = '_'
export const ALL_PAIRS = BASE_CURRENCIES.reduce<string[]>((prev, curr) => {
  const p = QUOTE_CURRENCIES.map((qc) => `${qc}${PAIR_SEPARATOR}${curr}`)
  return [...prev, ...p]
}, []).filter((p) => p.split(PAIR_SEPARATOR)[0] !== p.split(PAIR_SEPARATOR)[1]) as Pair[]

export const JPY_SYMBOL = '¥'
export const BTC_SYMBOL = '₿'

export const CMC_COIN_IDS: { [key in QC]: number } = {
  btc: 1,
  xrp: 52,
  ltc: 2,
  eth: 1027,
  mona: 213,
  bcc: 1831,
  xlm: 512,
  qtum: 1684,
  bat: 1697,
  omg: 1808,
  xym: 8677,
  link: 1975,
  mkr: 1518,
  matic: 3890,
  dot: 6636,
  doge: 74,
  boba: 14556,
  enj: 2130,
  astr: 12885,
  ada: 2010,
}

export const CMC_STATIC_BASE_URL = 'https://s2.coinmarketcap.com/static/img/coins/64x64/'
export const CMC_STATIC_EXTENSION = '.png'
