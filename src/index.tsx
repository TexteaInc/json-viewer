import {
  Box,
  createTheme,
  ThemeProvider
} from '@mui/material'
import type React from 'react'
import { useCallback, useEffect, useMemo } from 'react'

import { DataKeyPair } from './components/DataKeyPair'
import {
  createJsonViewerStore,
  JsonViewerProvider, JsonViewerState, useJsonViewerStore,
  useJsonViewerStoreApi
} from './stores/JsonViewerStore'
import type { JsonViewerProps } from './type'
import { applyValue } from './utils'

export { applyValue }

export type JsonViewerOnChange = <U = unknown>(path: (string | number)[], oldValue: U, newValue: U) => void

const JsonViewerInner: React.FC<JsonViewerProps> = (props) => {
  const api = useJsonViewerStoreApi()
  const setIfNotUndefined = useCallback(function setIfNotUndefined <Key extends keyof JsonViewerState> (key: Key, value: JsonViewerState[Key] | undefined) {
    if (value !== undefined) {
      api.setState({
        [key]: value
      })
    }
  }, [api])
  useEffect(() => {
    setIfNotUndefined('value', props.value)
  }, [props.value, setIfNotUndefined])
  useEffect(() => {
    // setIfNotUndefined('indentWidth', props.indentWidth)
    setIfNotUndefined('defaultCollapsed', props.defaultCollapsed)
    setIfNotUndefined('onChange', props.onChange)
    setIfNotUndefined('groupArraysAfterLength', props.groupArraysAfterLength)
  }, [api, props.defaultCollapsed, props.groupArraysAfterLength, props.onChange, props.value, setIfNotUndefined])

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
