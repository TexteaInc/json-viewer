import create from 'zustand'
import createContext from 'zustand/context'
import { combine } from 'zustand/middleware'

// todo
export const createJsonViewerStore = () => create(combine({
  src: {}
}, () => ({
  get: () => {},
  set: () => {}
})))
export type JsonViewerStore = ReturnType<typeof createJsonViewerStore>

export const {
  useStore: useJsonViewerStore,
  useStoreApi: useJsonViewerStoreApi,
  Provider: JsonViewerProvider
} = createContext<JsonViewerStore>()
