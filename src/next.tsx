import type { TreeItemClassKey } from '@mui/lab'
import type { TreeViewClassKey } from '@mui/lab/TreeView/treeViewClasses'
import {
  Box,
  createTheme,
  ThemeProvider
} from '@mui/material'
import type { OverridesStyleRules } from '@mui/material/styles/overrides'
import type React from 'react'
import { useMemo } from 'react'

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

const JsonViewerInner: React.FC<ReactJsonViewProps> = (props) => {
  const api = useJsonViewerStoreApi()
  api.setState(() => ({
    src: props.src,
    indentWidth: props.indentWidth
  }))
  return (
    <Box sx={{
      fontFamily: 'monospace'
    }}>
      <DataKeyPair dataKey='root' value={props.src}/>
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
