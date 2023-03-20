import { useAtomValue } from 'jotai'
import { useMemo } from 'react'

import { valueAtom } from '../state'
import { isCycleReference } from '../utils'

export function useIsCycleReference (path: (string | number)[], value: any) {
  const rootValue = useAtomValue(valueAtom)
  return useMemo(
    () => isCycleReference(rootValue, path, value),
    [path, value, rootValue]
  )
}
