import create from 'zustand'
import createContext from 'zustand/context'
import { combine } from 'zustand/middleware'

export const DEFAULT_INDENT_WIDTH = 4

// todo
export const createJsonViewerStore = () => create(combine({
  expanded: [] as string[],
  src: {} as any
}, (set) => ({
  setExpanded: (expanded: string[]) => {
    set({
      expanded
    })
  }
})))
export type JsonViewerStore = ReturnType<typeof createJsonViewerStore>

export const {
  useStore: useJsonViewerStore,
  useStoreApi: useJsonViewerStoreApi,
  Provider: JsonViewerProvider
} = createContext<JsonViewerStore>()
