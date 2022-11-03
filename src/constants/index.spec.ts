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
    'mkr_jpy',
    'matic_jpy',
    'dot_jpy',
    'doge_jpy',
    'boba_jpy',
    'enj_jpy',
    'astr_jpy',
    'ada_jpy',
  ])
})
