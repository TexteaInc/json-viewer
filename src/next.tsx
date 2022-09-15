import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { TreeItem, TreeItemClassKey, TreeView } from '@mui/lab'
import type { TreeViewClassKey } from '@mui/lab/TreeView/treeViewClasses'
import {
  Box,
  createTheme,
  ThemeProvider
} from '@mui/material'
import type { OverridesStyleRules } from '@mui/material/styles/overrides'
import { DevelopmentError } from '@textea/dev-kit/utils'
import type React from 'react'
import { useCallback, useDebugValue, useEffect, useMemo } from 'react'

import { DataKeyPair } from './components/next/DataKeyPair'
import {
  createJsonViewerStore, DEFAULT_INDENT_WIDTH,
  JsonViewerProvider, useJsonViewerStore, useJsonViewerStoreApi
} from './stores/JsonViewerStore'
import { matchType } from './stores/typeRegistry'
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

const ObjectJson: React.FC<DataProps> = ({
  value,
  isRoot,
  father
}) => {
  const type = useMemo(() => getType(value), [value])
  useDebugValue(type, type => `value type: ${type}`)
  const expanded = useJsonViewerStore(store => store.expanded)
  const setExpanded = useJsonViewerStore(store => store.setExpanded)
  const handleToggle = useCallback(
    (event: React.SyntheticEvent, nodeIds: string[]) => {
      setExpanded(nodeIds)
    }, [setExpanded])
  const elements = useMemo(() => {
    if (type === 'object') {
      if (isRoot) {
        return (
          <TreeView
            defaultCollapseIcon={<ExpandMoreIcon/>}
            defaultExpandIcon={<ChevronRightIcon/>}
            expanded={expanded}
            onNodeToggle={handleToggle}
          >
            <TreeItem nodeId='data-viewer-root' label='root'>
              <ObjectJson
                father='root'
                value={value}
                isRoot={false}
              />
            </TreeItem>
          </TreeView>
        )
      } else {
        return (
          Object.entries(value as object).map(([key, value]) => {
            const path = `${father}${father ? '.' : ''}${key}`
            const isExpend = expanded.includes(path)
            const shouldExpand = needExpand(value)
            if (shouldExpand) {
              return (
                <TreeItem
                  nodeId={path}
                  key={key}
                  label={isExpend
                    ? longPreviewKeyValuePair(key, value)
                    : shortPreviewKeyValuePair(key, value)}
                >
                  {
                    shouldExpand
                      ? (
                        <ObjectJson
                          father={key}
                          value={value}
                          isRoot={false}
                        />
                        )
                      : null
                  }
                  {shouldExpand && isExpend && (
                    <TreeItem nodeId={`${path}-ending`}
                              label={getEndingClosure(value)}/>
                  )}
                </TreeItem>
              )
            } else {
              return (
                <ObjectJson
                  key={key}
                  isRoot={false}
                  father={key}
                  value={value}
                />
              )
            }
          })
        )
      }
    } else {
      const DataType = matchType(value)
      if (DataType === undefined) {
        const path = `${father}${father ? '.' : ''}${value}`
        const type = getType(value)
        if (type === 'function') {
          const entire = (value as Function).toString()
          const label = entire.slice(entire.indexOf('{') + 1,
            entire.lastIndexOf('}'))
          return <TreeItem nodeId={path} label={label}/>
        } else {
          return <TreeItem nodeId={path} label={`${value}`}/>
        }
      } else {
        return <DataKeyPair key={father} dataKey={father} value={value}/>
      }
    }
  }, [expanded, father, handleToggle, isRoot, type, value])
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
      <ObjectJson
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
