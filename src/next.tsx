import type { TreeItemClassKey } from '@mui/lab'
import type { TreeViewClassKey } from '@mui/lab/TreeView/treeViewClasses'
import {
  Box,
  createTheme,
  ThemeProvider
} from '@mui/material'
import type { OverridesStyleRules } from '@mui/material/styles/overrides'
import { DevelopmentError, NotImplementedError } from '@textea/dev-kit/utils'
import type React from 'react'
import { useEffect, useMemo } from 'react'

import { DataTypeMap } from './components/next/DataTypeMap'
import {
  createJsonViewerStore, DEFAULT_INDENT_WIDTH,
  JsonViewerProvider, useJsonViewerStoreApi
} from './stores/JsonViewerStore'
import type { ReactJsonViewProps } from './type'

declare module '@mui/material/styles' {
  export interface Components<Theme = unknown> {
    MuiTreeView?: {
      styleOverrides?: Partial<OverridesStyleRules<TreeViewClassKey, 'MuiTreeView', Theme>>
    }
    MuiTreeItem?: {
      styleOverrides?: Partial<OverridesStyleRules<TreeItemClassKey, 'MuiTreeItem', Theme>>
    }
  }
}

export type DataProps<Data = unknown> = {
  father: string
  isRoot: boolean
  value: Data
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
    } else if (Array.isArray(value)) {
      return 'array'
    }
  }
  return type
}

const needExpand = (value: unknown): boolean => {
  const type = getType(value)
  switch (type) {
    case 'object':
    case 'function':
    case 'array':
      return true
    default:
      return false
  }
}

const getEndingClosure = (value: unknown): string => {
  const type = getType(value)
  switch (type) {
    case 'object':
    case 'function':
      return '}'
    case 'array':
      return ']'
    default:
      throw new DevelopmentError()
  }
}

function shortPreviewValue (value: unknown): string {
  const type = getType(value)
  if (type === 'function') {
    return (value as Function).toString().slice(9, -1).replace(/\{[\s\S]+/, '')
  } else if (type === 'array') {
    return '[...]'
  } else if (type === 'object') {
    return '{...}'
  } else {
    return `${value}`
  }
}

function longPreviewValue (value: unknown): string {
  const type = getType(value)
  if (type === 'function') {
    const functionHead = (value as Function).toString()
      .slice(9, -1)
      .replace(/\{[\s\S]+/, '')
    return `${functionHead} {`
  } else if (type === 'array') {
    return ' ['
  } else if (type === 'object') {
    return '{'
  } else {
    return ''
  }
}

function shortPreviewKeyValuePair (key: string, value: unknown): string {
  return `${key}: ${shortPreviewValue(value)}`
}

function longPreviewKeyValuePair (key: string, value: unknown): string {
  return `${key}: ${longPreviewValue(value)}`
}

const RootObjectJson: React.FC<DataProps> = ({
  value,
  isRoot,
  father
}) => {
  if (typeof value === 'object') {
    return <DataTypeMap value={value as object}/>
  } else {
    throw new NotImplementedError()
  }
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
      <RootObjectJson
        value={props.src}
        isRoot
        father=''
      />
    </Box>
  )
}

export const JsonViewer: React.FC<ReactJsonViewProps> = (props) => {
  const theme = useMemo(() => createTheme({
    components: {
      MuiTreeItem: {
        styleOverrides: {
          group: {
            marginLeft: (props.indentWidth ?? DEFAULT_INDENT_WIDTH) * 4
          }
        }
      }
    }
    // todo: inject theme based on base16
  }), [props.indentWidth])
  return (
    <ThemeProvider theme={theme}>
      <JsonViewerProvider createStore={createJsonViewerStore}>
        <JsonViewerInner {...props}/>
      </JsonViewerProvider>
    </ThemeProvider>
  )
}
