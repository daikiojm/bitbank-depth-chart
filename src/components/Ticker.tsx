import React from 'react'
import { Card, Typography, CardProps, useTheme } from '@mui/material'

import { Pair } from '@/types'
import { toDisplayPair } from '@/utils'

type Props = CardProps & {
  pair: Pair
}

const Ticker: React.VFC<Props> = ({ pair, ...props }) => {
  const theme = useTheme()

  return (
    <Card variant="outlined" {...props} sx={{ p: 2, ...props.sx }}>
      <Typography sx={{ color: theme.palette.text.secondary }}>{toDisplayPair(pair)}</Typography>
    </Card>
  )
}

export default Ticker
