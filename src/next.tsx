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
  JsonViewerProvider, useJsonViewerStore,
  useJsonViewerStoreApi
} from './stores/JsonViewerStore'

export type JsonViewerProps<Value = unknown> = {
  value: Value
  indentWidth?: number
  onChange?: (...args: any[]) => void
  defaultCollapsed?: boolean | number
}

const JsonViewerInner: React.FC<JsonViewerProps> = (props) => {
  const api = useJsonViewerStoreApi()
  api.setState(() => ({
    value: props.value,
    indentWidth: props.indentWidth,
    defaultCollapsed: props.defaultCollapsed
  }))
  const value = useJsonViewerStore(store => store.value)
  return (
    <Box sx={{
      fontFamily: 'monospace',
      userSelect: 'none'
    }}>
      <DataKeyPair
        value={value}
        path={useMemo(() => [], [])}
      />
    </Box>
  )
}

export const JsonViewer: React.FC<JsonViewerProps> = (props) => {
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
