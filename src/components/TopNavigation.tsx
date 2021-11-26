import React, { useContext } from 'react'
import { Box, AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import MenuIcon from '@mui/icons-material/Menu'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'

import { ColorModeContext } from '@/providers/theme'

type Props = {
  onClickMenu: () => void
}

const TopNavigation: React.VFC<Props> = ({ onClickMenu }) => {
  const theme = useTheme()
  const colorMode = useContext(ColorModeContext)

  const handleRefresh = () => {
    window.location.reload()
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={onClickMenu}>
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', display: 'inline-block' }}>
              Depth Chart
              <Typography
                sx={{
                  ml: 1,
                  fontSize: '12px',
                  lineHeight: '14px',
                  display: 'inline-block',
                  [theme.breakpoints.down('sm')]: {
                    display: 'none',
                  },
                }}
              >
                bitbank.cc
              </Typography>
            </Typography>
          </Box>
          <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <Button color="inherit" onClick={handleRefresh}>
            Refresh
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default TopNavigation
