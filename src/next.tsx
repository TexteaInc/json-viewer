import { Box, createTheme, ThemeProvider } from '@mui/material'
import type React from 'react'
import { useEffect, useMemo } from 'react'

import {
  createJsonViewerStore,
  JsonViewerProvider, useJsonViewerStoreApi
} from './stores/JsonViewerStore'
import type { ReactJsonViewProps } from './type'

const JsonViewerInner: React.FC<ReactJsonViewProps> = (props) => {
  const api = useJsonViewerStoreApi()
  useEffect(() => {
    api.setState(state => ({
      ...state,
      src: props.src
    }))
  }, [api, props.src])
  // todo: still working on it
  return (
    <Box>
      {JSON.stringify(props.src)}
    </Box>
  )
}

export const JsonViewer: React.FC<ReactJsonViewProps> = (props) => {
  const theme = useMemo(() => createTheme({
    // todo: inject theme based on base16
  }), [])
  return (
    <ThemeProvider theme={theme}>
      <JsonViewerProvider createStore={createJsonViewerStore}>
        <JsonViewerInner {...props}/>
      </JsonViewerProvider>
    </ThemeProvider>
  )
}
