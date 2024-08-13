import {
  createTheme, Paper,
  ThemeProvider
} from '@mui/material'
import clsx from 'clsx'
import type { FC, ReactElement } from 'react'
import { useCallback, useContext, useEffect, useMemo, useRef } from 'react'

import { DataKeyPair } from './components/DataKeyPair'
import { useThemeDetector } from './hooks/useThemeDetector'
import {
  createJsonViewerStore,
  JsonViewerStoreContext,
  useJsonViewerStore
} from './stores/JsonViewerStore'
import {
  createTypeRegistryStore,
  predefinedTypes,
  TypeRegistryStoreContext,
  useTypeRegistryStore
} from './stores/typeRegistry'
import { darkColorspace, lightColorspace } from './theme/base16'
import type { JsonViewerProps } from './type'

/**
 * @internal
 */
function useSetIfNotUndefinedEffect<Key extends keyof JsonViewerProps> (
  key: Key,
  value: JsonViewerProps[Key] | undefined
) {
  const { setState } = useContext(JsonViewerStoreContext)
  useEffect(() => {
    if (value !== undefined) {
      setState({
        [key]: value
      })
    }
  }, [key, value, setState])
}

/**
 * @internal
 */
const JsonViewerInner: FC<JsonViewerProps> = (props) => {
  const { setState } = useContext(JsonViewerStoreContext)
  useEffect(() => {
    setState((state) => ({
      prevValue: state.value,
      value: props.value
    }))
  }, [props.value, setState])
  useSetIfNotUndefinedEffect('rootName', props.rootName)
  useSetIfNotUndefinedEffect('indentWidth', props.indentWidth)
  useSetIfNotUndefinedEffect('keyRenderer', props.keyRenderer)
  useSetIfNotUndefinedEffect('enableAdd', props.enableAdd)
  useSetIfNotUndefinedEffect('enableDelete', props.enableDelete)
  useSetIfNotUndefinedEffect('enableClipboard', props.enableClipboard)
  useSetIfNotUndefinedEffect('editable', props.editable)
  useSetIfNotUndefinedEffect('onChange', props.onChange)
  useSetIfNotUndefinedEffect('onCopy', props.onCopy)
  useSetIfNotUndefinedEffect('onSelect', props.onSelect)
  useSetIfNotUndefinedEffect('onAdd', props.onAdd)
  useSetIfNotUndefinedEffect('onDelete', props.onDelete)
  useSetIfNotUndefinedEffect('maxDisplayLength', props.maxDisplayLength)
  useSetIfNotUndefinedEffect('groupArraysAfterLength', props.groupArraysAfterLength)
  useSetIfNotUndefinedEffect('displayDataTypes', props.displayDataTypes)
  useSetIfNotUndefinedEffect('displaySize', props.displaySize)
  useSetIfNotUndefinedEffect('highlightUpdates', props.highlightUpdates)
  useEffect(() => {
    if (props.theme === 'light') {
      setState({
        colorspace: lightColorspace
      })
    } else if (props.theme === 'dark') {
      setState({
        colorspace: darkColorspace
      })
    } else if (typeof props.theme === 'object') {
      setState({
        colorspace: props.theme
      })
    }
  }, [setState, props.theme])
  const themeCls = useMemo(() => {
    if (typeof props.theme === 'object') return 'json-viewer-theme-custom'
    return props.theme === 'dark' ? 'json-viewer-theme-dark' : 'json-viewer-theme-light'
  }, [props.theme])
  const onceRef = useRef(true)
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
  }, [props.valueTypes, registerTypes])

  const value = useJsonViewerStore(store => store.value)
  const prevValue = useJsonViewerStore(store => store.prevValue)
  const emptyPath = useMemo(() => [], [])
  const setHover = useJsonViewerStore(store => store.setHover)
  const onMouseLeave = useCallback(() => setHover(null), [setHover])
  return (
    <Paper
      elevation={0}
      className={clsx(themeCls, props.className)}
      style={props.style}
      sx={{
        fontFamily: 'monospace',
        userSelect: 'none',
        contentVisibility: 'auto',
        ...props.sx
      }}
      onMouseLeave={onMouseLeave}
    >
      <DataKeyPair
        value={value}
        prevValue={prevValue}
        path={emptyPath}
      />
    </Paper>
  )
}

export const JsonViewer = function JsonViewer<Value> (props: JsonViewerProps<Value>): ReactElement {
  if (process.env.NODE_ENV !== 'production') {
    if ('displayObjectSize' in props) {
      console.error('`displayObjectSize` is deprecated. Use `displaySize` instead.\nSee https://viewer.textea.io/migration/migration-v3#raname-displayobjectsize-to-displaysize for more information.')
    }
  }
  const isAutoDarkTheme = useThemeDetector()
  const themeType = useMemo(() => props.theme === 'auto'
    ? (isAutoDarkTheme ? 'dark' : 'light')
    : props.theme ?? 'light', [isAutoDarkTheme, props.theme])
  const theme = useMemo(() => {
    const backgroundColor = typeof themeType === 'object'
      ? themeType.base00
      : themeType === 'dark'
        ? darkColorspace.base00
        : lightColorspace.base00
    const foregroundColor = typeof themeType === 'object'
      ? themeType.base07
      : themeType === 'dark'
        ? darkColorspace.base07
        : lightColorspace.base07
    return createTheme({
      components: {
        MuiPaper: {
          styleOverrides: {
            root: {
              backgroundColor,
              color: foregroundColor
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const jsonViewerStore = useMemo(() => createJsonViewerStore(props), [])
  const typeRegistryStore = useMemo(() => createTypeRegistryStore(), [])

  return (
    <ThemeProvider theme={theme}>
      <TypeRegistryStoreContext.Provider value={typeRegistryStore}>
        <JsonViewerStoreContext.Provider value={jsonViewerStore}>
          <JsonViewerInner {...mixedProps} />
        </JsonViewerStoreContext.Provider>
      </TypeRegistryStoreContext.Provider>
    </ThemeProvider>
  )
}

export * from './components/DataTypes'
export * from './theme/base16'
export * from './type'
export type { PathValueCustomGetter } from './utils'
export {
  applyValue,
  createDataType,
  defineDataType,
  deleteValue,
  getPathValue,
  isCycleReference,
  pathValueDefaultGetter,
  safeStringify
} from './utils'
