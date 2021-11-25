import React, { useState, useMemo, createContext } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { PaletteMode } from '@mui/material'
import { indigo } from '@mui/material/colors'

export const ColorModeContext = createContext({ toggleColorMode: () => {} })

const ColorModeProvider: React.FC = ({ children }) => {
  const [mode, setMode] = useState<PaletteMode>('light')
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
      },
    }),
    [],
  )

  const theme = useMemo(
    () =>
      createTheme({
        typography: {
          fontSize: 12,
        },
        palette: {
          mode,
          primary: indigo,
        },
      }),
    [mode],
  )

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default ColorModeProvider
