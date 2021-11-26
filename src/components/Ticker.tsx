import React, { useMemo } from 'react'
import { Grid, Skeleton, Card, Typography, CardProps, useTheme } from '@mui/material'
import { teal, deepOrange } from '@mui/material/colors'
import { useTicker } from 'react-use-bitbank'

import { Pair } from '@/types'
import { toDisplayPair } from '@/utils'

type Props = CardProps & {
  pair: Pair
}

const Ticker: React.VFC<Props> = ({ pair, ...props }) => {
  const theme = useTheme()
  const ticker = useTicker(pair)
  const displayPair = useMemo(() => toDisplayPair(pair), [pair])
  const baseCurrency = useMemo(() => pair.split('_')[0].toUpperCase(), [pair])
  const quoteCurrency = useMemo(() => pair.split('_')[1].toUpperCase(), [pair])
  const change = useMemo(() => (ticker ? ((+ticker.last - +ticker.open) / +ticker.open) * 100 : 0), [ticker])
  const changeColor = useMemo(() => (change >= 0 ? teal[500] : deepOrange[800]), [change])

  return (
    <Card variant="outlined" {...props} sx={{ p: 2, display: 'flex', ...props.sx }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          {ticker ? (
            <React.Fragment>
              <Typography sx={{ color: theme.palette.text.primary, fontWeight: 'bold' }}>{displayPair}</Typography>
              <Typography sx={{ color: theme.palette.text.secondary }}>{ticker.last}</Typography>
              <Typography sx={{ color: theme.palette.text.secondary }}>Low: {ticker.low}</Typography>
              <Typography sx={{ color: theme.palette.text.secondary }}>High: {ticker.high}</Typography>
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
              <Typography sx={{ color: theme.palette.text.secondary }}>
                Change today:
                <Typography sx={{ color: changeColor, display: 'inline-block' }}>
                  {change > 0 && '+'}
                  {change.toFixed(2)}%
                </Typography>
              </Typography>
              <Typography sx={{ color: theme.palette.text.secondary }}>24h volume: {ticker.vol}</Typography>
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
