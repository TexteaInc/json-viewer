import { Box, createTheme, Stack, ThemeProvider } from '@mui/material'
import type React from 'react'
import { useDebugValue, useEffect, useMemo } from 'react'

import {
  createJsonViewerStore,
  JsonViewerProvider, useJsonViewerStore, useJsonViewerStoreApi
} from './stores/JsonViewerStore'
import type { ReactJsonViewProps } from './type'

export type DataProps<Data = unknown> = {
  value: Data
  currentIndent: number
}

function getType (value: unknown) {
  // todo: enhance this
  const type = typeof value

  if (type === 'object') {
    if (value instanceof RegExp) {
      return 'regexp'
    } else if (value instanceof Date) {
      return 'date'
    } else if (value === null) {
      return 'null'
    }
  }
  return type
}

const ObjectJson: React.FC<DataProps> = ({
  value,
  currentIndent
}) => {
  const type = useMemo(() => getType(value), [value])
  useDebugValue(type, type => `value type: ${type}`)
  const indentWidth = useJsonViewerStore(store => store.indentWidth)
  const elements = useMemo(() => {
    if (type === 'object') {
      return Object.entries(value as object).map(([key, value]) => (
        <Box
          key={key}
          sx={{
            pl: currentIndent
          }}
        >
          <Stack direction='row' spacing={1}>
            <Box>{key}</Box>
            <Box component='div'>
              <ObjectJson value={value}
                          currentIndent={currentIndent + indentWidth}/>
            </Box>
          </Stack>
        </Box>
      ))
    } else {
      return `${value}`
    }
  }, [currentIndent, indentWidth, type, value])
  return <>{elements}</>
}

const JsonViewerInner: React.FC<ReactJsonViewProps> = (props) => {
  const api = useJsonViewerStoreApi()
  useEffect(() => {
    api.setState(state => ({
      ...state,
      src: props.src,
      indentWidth: props.indentWidth
    }))
  }, [api, props.src, props.indentWidth])
  // todo: still working on it
  return (
    <Box>
      <ObjectJson value={props.src} currentIndent={0}/>
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
