import create from 'zustand'
import createContext from 'zustand/context'
import { combine } from 'zustand/middleware'

export const DEFAULT_INDENT_WIDTH = 4

export type JsonViewerState = {
  expanded: string[]
  src: unknown
}

export type JsonViewerActions = {
  handleExpand: (path: string) => void
  handleShrink: (path: string) => void
  /**
   * @deprecated
   */
  setExpanded: (expanded: string[]) => void
}

// todo
export const createJsonViewerStore = () =>
  create(
    combine<JsonViewerState, JsonViewerActions>(
      {
        expanded: [],
        src: {}
      },
      (set) => ({
        handleExpand: () => {},
        handleShrink: () => {},
        setExpanded: (expanded) => {
          set({
            expanded
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
