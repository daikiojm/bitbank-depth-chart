import BigNumber from 'bignumber.js'

import { CMC_COIN_IDS, CMC_STATIC_BASE_URL, CMC_STATIC_EXTENSION, PAIR_SEPARATOR } from '../constants'
import { Pair, QC } from '../types'

export function toDisplayPair(pair: Pair) {
  return pair.split(PAIR_SEPARATOR).join('/').toUpperCase()
}

export function isJpyPair(pair: Pair) {
  return pair.endsWith('jpy')
}

export function formatFixed(value: number | string) {
  return new BigNumber(value).toFormat()
}

export function toFixed(value: number | string, dp = 2) {
  return new BigNumber(value).toFixed(dp)
}

export function getCoinImageUrl(pair: Pair) {
  const bc = pair.split(PAIR_SEPARATOR)[0] as QC
  const bcId = CMC_COIN_IDS[bc]
  return `${CMC_STATIC_BASE_URL}${bcId}${CMC_STATIC_EXTENSION}`
}
