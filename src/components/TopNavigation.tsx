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
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={onClickMenu}>
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-start' }}>
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', lineHeight: '44px' }}>
              Depth Chart
            </Typography>
            <Box
              sx={{
                ml: 2,
                my: 'auto',
                [theme.breakpoints.down('sm')]: {
                  display: 'none',
                },
              }}
            >
              <Typography sx={{ fontSize: '10px', lineHeight: '10px' }}>Data Source by</Typography>
              <Typography sx={{ fontSize: '14px', lineHeight: '14px' }}>bitbank.cc</Typography>
            </Box>
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
