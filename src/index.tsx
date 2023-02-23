import { Paper } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import React, { useCallback, useEffect, useMemo, useRef } from 'react'

import { DataKeyPair } from './components/DataKeyPair'
import { useThemeDetector } from './hooks/useThemeDetector'
import {
  createJsonViewerStore,
  JsonViewerProvider,
  useJsonViewerStore,
  useJsonViewerStoreApi
} from './stores/JsonViewerStore'
import {
  createTypeRegistryStore, predefined,
  TypeRegistryProvider, useTypeRegistryStore
} from './stores/typeRegistry'
import { darkColorspace, lightColorspace } from './theme/base16'
import type { JsonViewerProps } from './type'
import { applyValue, createDataType, isCycleReference } from './utils'

export { applyValue, createDataType, isCycleReference }

/**
 * @internal
 */
function useSetIfNotUndefinedEffect<Key extends keyof JsonViewerProps> (
  key: Key,
  value: JsonViewerProps[Key] | undefined
) {
  const api = useJsonViewerStoreApi()
  useEffect(() => {
    if (value !== undefined) {
      api.setState({
        [key]: value
      })
    }
  }, [key, value, api])
}

/**
 * @internal
 */
const JsonViewerInner: React.FC<JsonViewerProps> = (props) => {
  const api = useJsonViewerStoreApi()
  useSetIfNotUndefinedEffect('value', props.value)
  useSetIfNotUndefinedEffect('editable', props.editable)
  useSetIfNotUndefinedEffect('indentWidth', props.indentWidth)
  useSetIfNotUndefinedEffect('onChange', props.onChange)
  useSetIfNotUndefinedEffect('groupArraysAfterLength', props.groupArraysAfterLength)
  useSetIfNotUndefinedEffect('keyRenderer', props.keyRenderer)
  useSetIfNotUndefinedEffect('maxDisplayLength', props.maxDisplayLength)
  useSetIfNotUndefinedEffect('enableClipboard', props.enableClipboard)
  useSetIfNotUndefinedEffect('rootName', props.rootName)
  useSetIfNotUndefinedEffect('displayDataTypes', props.displayDataTypes)
  useSetIfNotUndefinedEffect('displayObjectSize', props.displayObjectSize)
  useSetIfNotUndefinedEffect('onCopy', props.onCopy)
  useSetIfNotUndefinedEffect('onSelect', props.onSelect)
  useEffect(() => {
    if (props.theme === 'light') {
      api.setState({
        colorspace: lightColorspace
      })
    } else if (props.theme === 'dark') {
      api.setState({
        colorspace: darkColorspace
      })
    } else if (typeof props.theme === 'object') {
      api.setState({
        colorspace: props.theme
      })
    }
  }, [api, props.theme])
  const onceRef = useRef(true)
  const predefinedTypes = useMemo(() => predefined(), [])
  const registerTypes = useTypeRegistryStore(store => store.registerTypes)
  if (onceRef.current) {
    const allTypes = props.valueTypes
      ? [...predefinedTypes, ...props.valueTypes]
      : [...predefinedTypes]
    registerTypes(allTypes)
    onceRef.current = false
  }
  useEffect(() => {
    const allTypes = props.valueTypes
      ? [...predefinedTypes, ...props.valueTypes]
      : [...predefinedTypes]
    registerTypes(allTypes)
  }, [props.valueTypes, predefinedTypes, registerTypes])

  const value = useJsonViewerStore(store => store.value)
  const setHover = useJsonViewerStore(store => store.setHover)
  const onMouseLeave = useCallback(() => setHover(null), [setHover])
  return (
    <Paper
      elevation={0}
      className={props.className}
      style={props.style}
      sx={{
        fontFamily: 'monospace',
        userSelect: 'none',
        contentVisibility: 'auto'
      }}
      onMouseLeave={ onMouseLeave }
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
  const theme = useMemo(() => {
    const backgroundColor = typeof themeType === 'object'
      ? themeType.base00
      : themeType === 'dark'
        ? darkColorspace.base00
        : lightColorspace.base00
    return createTheme({
      components: {
        MuiPaper: {
          styleOverrides: {
            root: {
              backgroundColor
            }
          }
        }
      },
      palette: {
        mode: themeType === 'dark' ? 'dark' : 'light',
        background: {
          default: backgroundColor
        }
      }
    })
  }, [themeType])
  const mixedProps = { ...props, theme: themeType }
  return (
    <ThemeProvider theme={theme}>
      <TypeRegistryProvider createStore={createTypeRegistryStore}>
        <JsonViewerProvider createStore={() => {
          // This function only runs once, so we don't need a memo for this.
          //  Refs: https://github.com/pmndrs/zustand/blob/77d14b17bc33a6f10f072802fac56aa78510710e/src/context.ts#L36-L38
          return createJsonViewerStore(props)
        }}>
          <JsonViewerInner {...mixedProps}/>
        </JsonViewerProvider>
      </TypeRegistryProvider>
    </ThemeProvider>
  )
}

export * from './theme/base16'
export * from './type'
