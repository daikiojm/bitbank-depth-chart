import { useState } from 'react'
import { Container, Drawer } from '@mui/material'

import { AppProvider } from './providers/app'
import TopNavigation from './components/TopNavigation'
import DepthChart from './components/DepthChart'
import Footer from './components/Footer'
import DrawerInner from './components/DrawerInner'

const drawerWidth = 240

function App() {
  const [open, setOpen] = useState<boolean>(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <AppProvider>
      <TopNavigation onClickMenu={handleDrawerOpen} />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="temporary"
        anchor="left"
        onClose={handleDrawerClose}
        open={open}
      >
        <DrawerInner />
      </Drawer>
      <Container sx={{ pt: 2, mb: 'auto', flex: 1 }}>
        <DepthChart />
      </Container>
      <Footer sx={{ position: 'absolute', bottom: 0 }} />
    </AppProvider>
  )
}

export default App
