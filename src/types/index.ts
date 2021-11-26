import { BASE_CURRENCIES, QUOTE_CURRENCIES } from '@/constants'

export type BC = typeof BASE_CURRENCIES[number]
export type QC = typeof QUOTE_CURRENCIES[number]

type Join<T extends string, U extends string, S extends string = '_'> = `${T}${S}${U}`
type JoinPair<Q extends string, B extends string, S extends string = '_', _ = Q> = B extends _
  ? JoinPair<Exclude<Q, B>, B, S>
  : Join<Q, B, S>

export type Pair = JoinPair<QC, BC>
