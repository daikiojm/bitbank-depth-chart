import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline, GlobalStyles, createTheme } from '@mui/material'
import { WebsocketProvider } from 'react-use-bitbank'

const theme = createTheme({
  typography: {
    fontSize: 12,
  },
})

type AppProviderProps = {
  children: React.ReactNode
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <WebsocketProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles
          styles={{
            ul: { paddingLeft: 0, marginTop: 0 },
          }}
        />
        {children}
      </ThemeProvider>
    </WebsocketProvider>
  )
}
