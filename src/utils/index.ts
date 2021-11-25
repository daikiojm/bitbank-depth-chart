import { Pair } from '../types'

export function toDisplayPair(pair: Pair) {
  return pair.split('_').join('/').toUpperCase()
}

export function isJpyPair(pair: Pair) {
  return pair.endsWith('jpy')
}
