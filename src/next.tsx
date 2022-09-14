import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { TreeItem, TreeView } from '@mui/lab'
import { Box, createTheme, ThemeProvider } from '@mui/material'
import type React from 'react'
import { useCallback, useDebugValue, useEffect, useMemo } from 'react'

import {
  createJsonViewerStore,
  JsonViewerProvider, useJsonViewerStore, useJsonViewerStoreApi
} from './stores/JsonViewerStore'
import type { ReactJsonViewProps } from './type'

export type DataProps<Data = unknown> = {
  father: string
  isRoot: boolean
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
    } else if (Array.isArray(value)) {
      return 'array'
    }
  }
  return type
}

const ObjectJson: React.FC<DataProps> = ({
  value,
  currentIndent,
  isRoot,
  father
}) => {
  const type = useMemo(() => getType(value), [value])
  useDebugValue(type, type => `value type: ${type}`)
  const indentWidth = useJsonViewerStore(store => store.indentWidth)
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
              {
                Object.entries(value as object).map(([key, value]) => {
                  const path = `${father}${father ? '.' : ''}${key}`
                  const isExpend = expanded.includes(path)
                  return (
                    <TreeItem
                      nodeId={path}
                      key={key}
                      label={isExpend ? path : `${key} : ${value}`}
                    >
                      <ObjectJson
                        father={key}
                        value={value}
                        currentIndent={currentIndent + indentWidth}
                        isRoot={false}
                      />
                    </TreeItem>
                  )
                })
              }
            </TreeItem>
          </TreeView>
        )
      } else {
        return (
          Object.entries(value as object).map(([key, value]) => {
            const path = `${father}${father ? '.' : ''}${key}`
            return (
              <TreeItem
                nodeId={path}
                key={key}
                label={`${value}`}
              >
                <ObjectJson
                  father={key}
                  value={value}
                  currentIndent={currentIndent + indentWidth}
                  isRoot={false}
                />
              </TreeItem>
            )
          })
        )
      }
    } else {
      const path = `${father}${father ? '.' : ''}${value}`
      return <TreeItem nodeId={path} label={`${value}`}/>
    }
  }, [currentIndent, expanded, father, handleToggle, indentWidth, isRoot, type, value])
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
        currentIndent={0}
        isRoot
        father=''
      />
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
