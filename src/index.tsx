import {
  Box,
  createTheme,
  ThemeProvider
} from '@mui/material'
import type React from 'react'
import { useCallback, useEffect, useMemo, useRef } from 'react'

import { DataKeyPair } from './components/DataKeyPair'
import {
  ObjectType,
  PostObjectType,
  PreObjectType
} from './components/DataTypes/Object'
import {
  createJsonViewerStore,
  JsonViewerProvider,
  JsonViewerState,
  useJsonViewerStore,
  useJsonViewerStoreApi
} from './stores/JsonViewerStore'
import { registerType } from './stores/typeRegistry'
import type { JsonViewerProps } from './type'
import { applyValue } from './utils'

export { applyValue }

export type JsonViewerOnChange = <U = unknown>(path: (string | number)[], oldValue: U, newValue: U /*, type: ChangeType */) => void

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
    setIfNotUndefined('defaultInspectDepth', props.defaultInspectDepth)
    setIfNotUndefined('onChange', props.onChange)
    setIfNotUndefined('groupArraysAfterLength', props.groupArraysAfterLength)
    setIfNotUndefined('keyRenderer', props.keyRenderer)
  }, [api, props.defaultInspectDepth, props.groupArraysAfterLength, props.keyRenderer, props.onChange, props.value, setIfNotUndefined])

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
  const onceRef = useRef(true)
  // DO NOT try to dynamic add value types, that is costly. Trust me.
  if (onceRef.current) {
    props.valueTypes?.forEach(type => {
      registerType(type)
    })
    // Always last one, fallback for all data like 'object'
    registerType<object>(
      {
        is: (value): value is object => typeof value === 'object',
        Component: ObjectType,
        PreComponent: PreObjectType,
        PostComponent: PostObjectType
      }
    )
    onceRef.current = false
  }
  return (
    <ThemeProvider theme={theme}>
      <JsonViewerProvider createStore={createJsonViewerStore}>
        <JsonViewerInner {...props}/>
      </JsonViewerProvider>
    </ThemeProvider>
  )
}

export * from './type'
