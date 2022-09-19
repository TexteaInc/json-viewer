import {
  createTheme, Paper,
  ThemeProvider
} from '@mui/material'
import type React from 'react'
import { useCallback, useEffect, useMemo, useRef } from 'react'

import { DataKeyPair } from './components/DataKeyPair'
import { useThemeDetector } from './hooks/useThemeDetector'
import {
  createJsonViewerStore,
  JsonViewerProvider,
  JsonViewerState,
  useJsonViewerStore,
  useJsonViewerStoreApi
} from './stores/JsonViewerStore'
import { registerType } from './stores/typeRegistry'
import { darkNamespace, lightColorNamespace } from './theme/base16'
import type { JsonViewerProps } from './type'
import { applyValue } from './utils'

export { applyValue }

export type JsonViewerOnChange = <U = unknown>(
  path: (string | number)[], oldValue: U,
  newValue: U /*, type: ChangeType */) => void

const JsonViewerInner: React.FC<JsonViewerProps> = (props) => {
  const api = useJsonViewerStoreApi()
  const setIfNotUndefined = useCallback(
    function setIfNotUndefined<Key extends keyof JsonViewerState> (key: Key,
      value: JsonViewerState[Key] | undefined) {
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
    setIfNotUndefined('onChange', props.onChange)
    setIfNotUndefined('groupArraysAfterLength', props.groupArraysAfterLength)
    setIfNotUndefined('keyRenderer', props.keyRenderer)
    setIfNotUndefined('maxDisplayLength', props.maxDisplayLength)
  }, [
    api,
    props.groupArraysAfterLength,
    props.keyRenderer,
    props.onChange,
    props.value,
    props.maxDisplayLength,
    setIfNotUndefined
  ])

  useEffect(() => {
    if (props.theme === 'light') {
      api.setState({
        colorNamespace: lightColorNamespace
      })
    } else if (props.theme === 'dark') {
      api.setState({
        colorNamespace: darkNamespace
      })
    }
  }, [api, props.theme])

  const value = useJsonViewerStore(store => store.value)
  const setHover = useJsonViewerStore(store => store.setHover)
  return (
    <Paper
      className={props.className}
      style={props.style}
      sx={{
        fontFamily: 'monospace',
        userSelect: 'none',
        contentVisibility: 'auto'
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
    </Paper>
  )
}

export const JsonViewer = function JsonViewer<Value> (props: JsonViewerProps<Value>): React.ReactElement {
  const isAutoDarkTheme = useThemeDetector()
  const themeType = useMemo(() => props.theme === 'auto'
    ? (isAutoDarkTheme ? 'light' : 'dark')
    : props.theme ?? 'light', [isAutoDarkTheme, props.theme])
  const theme = useMemo(() => createTheme({
    palette: {
      mode: themeType === 'dark' ? 'dark' : 'light',
      background: {
        default: themeType === 'dark'
          ? darkNamespace.base00
          : lightColorNamespace.base00
      }
    }
  }), [themeType])
  const onceRef = useRef(true)
  // DO NOT try to dynamic add value types, that is costly. Trust me.
  if (onceRef.current) {
    props.valueTypes?.forEach(type => {
      registerType(type)
    })
    onceRef.current = false
  }
  const mixedProps = { ...props, theme: themeType }
  return (
    <ThemeProvider theme={theme}>
      <JsonViewerProvider createStore={() => createJsonViewerStore(props)}>
        <JsonViewerInner {...mixedProps}/>
      </JsonViewerProvider>
    </ThemeProvider>
  )
}

export * from './type'
