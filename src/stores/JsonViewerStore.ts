import create from 'zustand'
import createContext from 'zustand/context'
import { combine } from 'zustand/middleware'

import type { JsonViewerOnChange } from '../next'
import type { ColorNamespace } from '../themes/base16/rjv-themes'
import { defaultColorNamespace } from '../themes/base16/rjv-themes'

export const DEFAULT_INDENT_WIDTH = 4

export type JsonViewerState = {
  hoverPath: string[] | null
  defaultCollapsed: number | boolean
  colorNamespace: ColorNamespace
  expanded: string[]
  rootName: string
  value: unknown
  onChange: JsonViewerOnChange
}

export type JsonViewerActions = {
  setHover: (path: string[] | null) => void
}

// todo
export const createJsonViewerStore = () =>
  create(
    combine<JsonViewerState, JsonViewerActions>(
      {
        hoverPath: null,
        rootName: 'root',
        defaultCollapsed: false,
        colorNamespace: defaultColorNamespace,
        expanded: ['data-viewer-root'],
        value: {},
        onChange: () => {}
      },
      (set) => ({
        setHover: (path) => {
          set({
            hoverPath: path
          })
        }
      })
    )
  )
export type JsonViewerStore = ReturnType<typeof createJsonViewerStore>

export const {
  useStore: useJsonViewerStore,
  useStoreApi: useJsonViewerStoreApi,
  Provider: JsonViewerProvider
} = createContext<JsonViewerStore>()
