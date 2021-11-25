import { useState, useCallback } from 'react'
import { Container, Drawer } from '@mui/material'

import { Pair } from '@/types'

import { AppProvider } from './providers/app'
import TopNavigation from './components/TopNavigation'
import DepthChart from './components/DepthChart'
import Footer from './components/Footer'
import DrawerInner from './components/DrawerInner'
import Ticker from './components/Ticker'

const DRAWER_WIDTH = 240

function App() {
  const [open, setOpen] = useState<boolean>(false)
  const [activePair, setActivePair] = useState<Pair>('btc_jpy')

  const handleDrawerOpen = useCallback(() => {
    setOpen(true)
  }, [setOpen])

  const handleDrawerClose = useCallback(() => {
    setOpen(false)
  }, [setOpen])

  const handlePairChange = useCallback(
    (pair: Pair) => {
      setActivePair(pair)
      setOpen(false)
    },
    [setActivePair],
  )

  return (
    <AppProvider>
      <TopNavigation onClickMenu={handleDrawerOpen} />
      <Drawer
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
          },
        }}
        variant="temporary"
        anchor="left"
        onClose={handleDrawerClose}
        open={open}
      >
        <DrawerInner onChangePair={handlePairChange} />
      </Drawer>
      <Container sx={{ pt: 2, mb: 'auto', flex: 1 }}>
        <Ticker pair={activePair} sx={{ my: 2, mx: 1 }} />
        <DepthChart pair={activePair} />
      </Container>
      <Footer sx={{ position: 'absolute', bottom: 0 }} />
    </AppProvider>
  )
}

export default App
