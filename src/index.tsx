import {
  Box,
  createTheme,
  ThemeProvider
} from '@mui/material'
import type React from 'react'
import { useCallback, useMemo } from 'react'

import { DataKeyPair } from './components/DataKeyPair'
import {
  createJsonViewerStore,
  JsonViewerProvider, useJsonViewerStore,
  useJsonViewerStoreApi
} from './stores/JsonViewerStore'
import { applyValue } from './utils'

export { applyValue }

export type JsonViewerOnChange = <U = unknown>(path: string[], oldValue: U, newValue: U) => void

export type JsonViewerProps<T = unknown> = {
  value: T
  indentWidth?: number
  onChange?: <U>(path: string[], oldValue: U, newValue: U) => void
  defaultCollapsed?: boolean | number
  className?: string
  style?: React.CSSProperties
}

const JsonViewerInner: React.FC<JsonViewerProps> = (props) => {
  const api = useJsonViewerStoreApi()
  api.setState(() => ({
    value: props.value,
    indentWidth: props.indentWidth,
    defaultCollapsed: props.defaultCollapsed,
    onChange: props.onChange
  }))
  const value = useJsonViewerStore(store => store.value)
  const setHover = useJsonViewerStore(store => store.setHover)
  return (
    <Box
      className={props.className}
      style={props.style}
      sx={{
        fontFamily: 'monospace',
        userSelect: 'none'
      }}
      onMouseLeave={
        useCallback(() => {
          setHover(null)
        }, [setHover])
      }
    >
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
