import React from 'react'
import { Box, AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

type Props = {
  onClickMenu: () => void
}

const TopNavigation: React.VFC<Props> = ({ onClickMenu }) => {
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
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            Depth Chart
            <Typography variant="h6" sx={{ ml: 1, display: 'inline-block' }}>
              - bitbank.cc
            </Typography>
          </Typography>
          <Button color="inherit" onClick={handleRefresh}>
            Refresh
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default TopNavigation
