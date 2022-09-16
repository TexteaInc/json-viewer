import type { TreeItemClassKey } from '@mui/lab'
import type { TreeViewClassKey } from '@mui/lab/TreeView/treeViewClasses'
import {
  Box,
  createTheme,
  ThemeProvider
} from '@mui/material'
import type { OverridesStyleRules } from '@mui/material/styles/overrides'
import { NotImplementedError } from '@textea/dev-kit/utils'
import type React from 'react'
import { useEffect, useMemo } from 'react'

import { DataKeyPair } from './components/next/DataKeyPair'
import {
  createJsonViewerStore,
  DEFAULT_INDENT_WIDTH,
  JsonViewerProvider,
  useJsonViewerStoreApi
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
  value: Data
}

const RootObjectJson: React.FC<DataProps> = ({
  value
}) => {
  if (typeof value === 'object') {
    return <DataKeyPair dataKey='root' value={value as object}/>
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
