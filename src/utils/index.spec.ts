import { isJpyPair, toDisplayPair } from './index'

describe('toDisplayPair', () => {
  test('should get display pair', () => {
    expect(toDisplayPair('btc_jpy')).toBe('BTC/JPY')
    expect(toDisplayPair('xrp_btc')).toBe('XRP/BTC')
  })
})

describe('isJpyPair', () => {
  test('isJpyPair return true', () => {
    expect(isJpyPair('btc_jpy')).toBe(true)
  })

  test('isJpyPair return false', () => {
    expect(isJpyPair('xrp_btc')).toBe(false)
  })
})
