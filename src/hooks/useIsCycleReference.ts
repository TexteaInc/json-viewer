import { useMemo } from 'react'

import { useJsonViewerStore } from '../stores/JsonViewerStore'
import { isCycleReference } from '../utils'

export function useIsCycleReference (path: (string | number)[], value: any) {
  const rootValue = useJsonViewerStore(store => store.value)
  return useMemo(
    () => isCycleReference(rootValue, path, value),
    [path, value, rootValue])
}
