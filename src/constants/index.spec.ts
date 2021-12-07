import { ALL_PAIRS } from './index'

test('should get all pairs', () => {
  expect(ALL_PAIRS).toStrictEqual([
    'btc_jpy',
    'xrp_jpy',
    'ltc_jpy',
    'eth_jpy',
    'mona_jpy',
    'bcc_jpy',
    'xlm_jpy',
    'qtum_jpy',
    'bat_jpy',
    'omg_jpy',
    'xym_jpy',
    'link_jpy',
    'xrp_btc',
    'ltc_btc',
    'eth_btc',
    'mona_btc',
    'bcc_btc',
    'xlm_btc',
    'qtum_btc',
    'bat_btc',
    'omg_btc',
    'xym_btc',
    'link_btc',
  ])
})
