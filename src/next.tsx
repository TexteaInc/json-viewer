import {
  Box,
  createTheme,
  ThemeProvider
} from '@mui/material'
import type React from 'react'
import { useMemo } from 'react'

import { DataKeyPair } from './components/next/DataKeyPair'
import {
  createJsonViewerStore,
  JsonViewerProvider,
  useJsonViewerStoreApi
} from './stores/JsonViewerStore'
import type { ReactJsonViewProps } from './type'

const JsonViewerInner: React.FC<ReactJsonViewProps> = (props) => {
  const api = useJsonViewerStoreApi()
  api.setState(() => ({
    src: props.src,
    indentWidth: props.indentWidth
  }))
  return (
    <Box sx={{
      fontFamily: 'monospace',
      userSelect: 'none'
    }}>
      <DataKeyPair dataKey='root' value={props.src}/>
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
