import create from 'zustand'
import createContext from 'zustand/context'
import { combine } from 'zustand/middleware'

// todo
const createJsonViewerStore = (src: any) => create(combine({
  src
}, () => ({
  get: () => {},
  set: () => {}
})))
type JsonViewerStore = ReturnType<typeof createJsonViewerStore>

export const {
  useStore: useJsonViewerStore,
  useStoreApi: useJsonViewerStoreApi,
  Provider: JsonViewerProvider
} = createContext<JsonViewerStore>()
