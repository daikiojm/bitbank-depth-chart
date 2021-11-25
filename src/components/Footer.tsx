import React from 'react'
import { Box, Typography, Link, useTheme } from '@mui/material'
import { BoxProps } from '@mui/system'

type Props = BoxProps

const Divider = () => {
  const theme = useTheme()

  return <Typography sx={{ mx: 1, color: theme.palette.divider, display: 'inline-block' }}>/</Typography>
}

const Footer: React.VFC<Props> = ({ ...props }) => {
  const theme = useTheme()

  return (
    <Box
      {...props}
      sx={{
        p: 4,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: 120,
        backgroundColor: theme.palette.action.disabledBackground,
        borderTop: `1px solid ${theme.palette.divider}`,
        ...props.sx,
      }}
    >
      <Box sx={{ m: 'auto', textAlign: 'center' }}>
        <Link href={`https://github.com/daikiojm/bitbank-depth-chart`} target="_blank">
          <Typography
            sx={{
              textAlign: 'center',
              color: theme.palette.text.secondary,
              display: 'inline-block',
            }}
          >
            View Code on GitHub
          </Typography>
        </Link>
        <Divider />
        <Link href={`https://github.com/daikiojm`} target="_blank">
          <Typography
            sx={{
              textAlign: 'center',
              color: theme.palette.text.secondary,
              display: 'inline-block',
            }}
          >
            @daikiojm
          </Typography>
        </Link>
        <Divider />
        <Link href={`http://app.bitbank.cc/`} target="_blank">
          <Typography
            sx={{
              textAlign: 'center',
              color: theme.palette.text.secondary,
              display: 'inline-block',
            }}
          >
            Data Source (bitbank.cc)
          </Typography>
        </Link>
      </Box>
    </Box>
  )
}

export default Footer
