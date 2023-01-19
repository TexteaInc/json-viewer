import {
  createTheme, Paper,
  ThemeProvider
} from '@mui/material'
import { useAtomValue, useSetAtom } from 'jotai'
import type { Atom } from 'jotai'
import type { FC, ReactElement } from 'react'
import { useCallback, useEffect, useMemo, useRef } from 'react'

import { DataKeyPair } from './components/DataKeyPair'
import { useThemeDetector } from './hooks/useThemeDetector'
import {
  colorspaceAtom,
  displayDataTypesAtom,
  displayObjectSizeAtom,
  editableAtom,
  enableClipboardAtom,
  groupArraysAfterLengthAtom,
  indentWidthAtom,
  keyRendererAtom,
  maxDisplayLengthAtom,
  onChangeAtom,
  onCopyAtom,
  onSelectAtom,
  registryTypesAtom,
  rootNameAtom,
  setHoverAtom,
  valueAtom
} from './state'
import {
  createJsonViewerStore,
  JsonViewerProvider
} from './stores/JsonViewerStore'
import { predefined } from './stores/typeRegistry'
import { darkColorspace, lightColorspace } from './theme/base16'
import type { JsonViewerProps, JsonViewerState } from './type'
import { applyValue, createDataType, isCycleReference } from './utils'

export { applyValue, createDataType, isCycleReference }

/**
 * @internal
 */
function useSetIfNotUndefinedEffect (
  atom: Atom<JsonViewerState[keyof JsonViewerState]>,
  value: JsonViewerProps[keyof JsonViewerProps] | undefined
) {
  const setAtom = useSetAtom(atom)
  useEffect(() => {
    if (value !== undefined) {
      setAtom(value)
    }
  }, [value, setAtom])
}

/**
 * @internal
 */
const JsonViewerInner: FC<JsonViewerProps> = (props) => {
  const setColorspace = useSetAtom(colorspaceAtom)
  useSetIfNotUndefinedEffect(valueAtom, props.value)
  useSetIfNotUndefinedEffect(editableAtom, props.editable)
  useSetIfNotUndefinedEffect(indentWidthAtom, props.indentWidth)
  useSetIfNotUndefinedEffect(onChangeAtom, props.onChange)
  useSetIfNotUndefinedEffect(groupArraysAfterLengthAtom, props.groupArraysAfterLength)
  useSetIfNotUndefinedEffect(keyRendererAtom, props.keyRenderer)
  useSetIfNotUndefinedEffect(maxDisplayLengthAtom, props.maxDisplayLength)
  useSetIfNotUndefinedEffect(enableClipboardAtom, props.enableClipboard)
  useSetIfNotUndefinedEffect(rootNameAtom, props.rootName)
  useSetIfNotUndefinedEffect(displayDataTypesAtom, props.displayDataTypes)
  useSetIfNotUndefinedEffect(displayObjectSizeAtom, props.displayObjectSize)
  useSetIfNotUndefinedEffect(onCopyAtom, props.onCopy)
  useSetIfNotUndefinedEffect(onSelectAtom, props.onSelect)
  useEffect(() => {
    if (props.theme === 'light') {
      setColorspace(lightColorspace)
    } else if (props.theme === 'dark') {
      setColorspace(darkColorspace)
    } else if (typeof props.theme === 'object') {
      setColorspace(props.theme)
    }
  }, [props.theme, setColorspace])
  const onceRef = useRef(true)
  const predefinedTypes = useMemo(() => predefined(), [])
  const registerTypes = useSetAtom(registryTypesAtom)
  if (onceRef.current) {
    const allTypes = [...predefinedTypes]
    props.valueTypes?.forEach(type => {
      allTypes.push(type)
    })
    registerTypes(allTypes)
    onceRef.current = false
  }
  useEffect(() => {
    const allTypes = [...predefinedTypes]
    props.valueTypes?.forEach(type => {
      allTypes.push(type)
    })
    registerTypes(allTypes)
  }, [predefinedTypes, props.valueTypes, registerTypes])

  const value = useAtomValue(valueAtom)
  const setHover = useSetAtom(setHoverAtom)
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

export const JsonViewer = function JsonViewer<Value> (props: JsonViewerProps<Value>): ReactElement {
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
      {/* <TypeRegistryProvider initialValues={createTypeRegistryStore()}> merged with JsonViewerProvider because registryAtom isn't set */}
        <JsonViewerProvider initialValues={createJsonViewerStore(props)}>
          <JsonViewerInner {...mixedProps}/>
        </JsonViewerProvider>
      {/* </TypeRegistryProvider> */}
    </ThemeProvider>
  )
}

export * from './theme/base16'
export * from './type'
