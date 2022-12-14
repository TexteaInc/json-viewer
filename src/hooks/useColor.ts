import { useJsonViewerStore } from '../stores/JsonViewerStore'

export const useTextColor = () => {
  return useJsonViewerStore(store => store.colorspace.base07)
}
