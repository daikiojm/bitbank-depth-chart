import React, { useMemo } from 'react'
import { Box, Avatar, Grid, Skeleton, Card, Typography, CardProps, useTheme } from '@mui/material'
import { teal, deepOrange } from '@mui/material/colors'
import { useTicker } from 'react-use-bitbank'

import { Pair } from '@/types'
import { toDisplayPair, formatFixed, toFixed, getCoinImageUrl } from '@/utils'
import { BTC_SYMBOL, JPY_SYMBOL } from '@/constants'

type Props = CardProps & {
  pair: Pair
}

const Ticker: React.VFC<Props> = ({ pair, ...props }) => {
  const theme = useTheme()
  const ticker = useTicker(pair)
  const displayPair = useMemo(() => toDisplayPair(pair), [pair])
  const baseCurrency = useMemo(() => pair.split('_')[0].toUpperCase(), [pair])
  const quoteCurrency = useMemo(() => pair.split('_')[1].toUpperCase(), [pair])
  const quoteSymbol = useMemo(() => (quoteCurrency === 'BTC' ? BTC_SYMBOL : JPY_SYMBOL), [quoteCurrency])
  const change = useMemo(() => (ticker ? ((+ticker.last - +ticker.open) / +ticker.open) * 100 : 0), [ticker])
  const changeColor = useMemo(() => (change >= 0 ? teal[500] : deepOrange[800]), [change])
  const conImageUrl = useMemo(() => getCoinImageUrl(pair), [pair])

  return (
    <Card variant="outlined" {...props} sx={{ p: 2, display: 'flex', ...props.sx }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          {ticker ? (
            <React.Fragment>
              <Box sx={{ display: 'flex' }}>
                <Avatar src={conImageUrl} sx={{ width: 15, height: 15, my: 'auto' }} />
                <Typography sx={{ ml: 1, color: theme.palette.text.primary, fontWeight: 'bold' }}>{displayPair}</Typography>
              </Box>
              <Typography sx={{ color: theme.palette.text.secondary }}>
                {quoteSymbol}
                {formatFixed(ticker.last)}
              </Typography>
              <Typography sx={{ color: theme.palette.text.secondary }}>
                Low: {quoteSymbol}
                {formatFixed(ticker.low)}
              </Typography>
              <Typography sx={{ color: theme.palette.text.secondary }}>
                High: {quoteSymbol}
                {formatFixed(ticker.high)}
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {[...Array(4)].map((_, index) => (
                <Skeleton key={index} variant="text" width={200} />
              ))}
            </React.Fragment>
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          {ticker ? (
            <React.Fragment>
              <Typography sx={{ color: theme.palette.text.secondary }}>Base currency: {baseCurrency} </Typography>
              <Typography sx={{ color: theme.palette.text.secondary }}>Quote currency: {quoteCurrency} </Typography>
              <Box sx={{ display: 'flex' }}>
                <Typography sx={{ color: theme.palette.text.secondary }}>Change today:</Typography>
                <Typography sx={{ ml: 1, color: changeColor }}>
                  {change > 0 && '+'}
                  {toFixed(change, 2)}%
                </Typography>
              </Box>
              <Typography sx={{ color: theme.palette.text.secondary }}>24h volume: {formatFixed(ticker.vol)}</Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {[...Array(4)].map((_, index) => (
                <Skeleton key={index} variant="text" width={200} />
              ))}
            </React.Fragment>
          )}
        </Grid>
      </Grid>
    </Card>
  )
}

export default Ticker
