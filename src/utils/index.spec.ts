import { isJpyPair, toDisplayPair, formatFixed, toFixed } from './index'

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

test('formatFixed should work', () => {
  expect(formatFixed('1')).toBe('1')
  expect(formatFixed(1)).toBe('1')
  expect(formatFixed(0.00001741)).toBe('0.00001741')
  expect(formatFixed(6213014)).toBe('6,213,014')
})

test('toFixed should work', () => {
  expect(toFixed('1')).toBe('1.00')
  expect(toFixed(1)).toBe('1.00')
  expect(toFixed(0.00001741)).toBe('0.00')
})
