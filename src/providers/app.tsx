import { CssBaseline, GlobalStyles, createTheme } from '@mui/material'
import { blueGrey } from '@mui/material/colors'
import { WebsocketProvider } from 'react-use-bitbank'

import ColorModeProvider from './theme'

type AppProviderProps = {
  children: React.ReactNode
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <WebsocketProvider>
      <ColorModeProvider>
        <CssBaseline />
        <GlobalStyles
          styles={{
            ul: { paddingLeft: 0, marginTop: 0 },
          }}
        />
        {children}
      </ColorModeProvider>
    </WebsocketProvider>
  )
}
