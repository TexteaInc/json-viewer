import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState
} from 'react'

import {
  useJsonViewerStore
} from '../stores/JsonViewerStore'
import { useIsCycleReference } from './useIsCycleReference'

export function useInspect (path: (string | number)[], value: any, nestedIndex?: number) {
  const depth = path.length
  const isTrap = useIsCycleReference(path, value)
  const getInspectCache = useJsonViewerStore(store => store.getInspectCache)
  const setInspectCache = useJsonViewerStore(store => store.setInspectCache)
  const defaultInspectDepth = useJsonViewerStore(
    store => store.defaultInspectDepth)
  useEffect(() => {
    const inspect = getInspectCache(path, nestedIndex)
    if (inspect !== undefined) {
      return
    }
    if (nestedIndex !== undefined) {
      setInspectCache(path, false, nestedIndex)
    } else {
      // do not inspect when it is a cycle reference, otherwise there will have a loop
      const inspect = isTrap
        ? false
        : depth < defaultInspectDepth
      setInspectCache(path, inspect)
    }
  }, [defaultInspectDepth, depth, getInspectCache, isTrap, nestedIndex, path, setInspectCache])
  const [inspect, set] = useState<boolean>(() => {
    const shouldInspect = getInspectCache(path, nestedIndex)
    if (shouldInspect !== undefined) {
      return shouldInspect
    }
    if (nestedIndex !== undefined) {
      return false
    }
    return isTrap
      ? false
      : depth < defaultInspectDepth
  })
  const setInspect = useCallback<Dispatch<SetStateAction<boolean>>>((apply) => {
    set((oldState) => {
      const newState = typeof apply === 'boolean' ? apply : apply(oldState)
      setInspectCache(path, newState, nestedIndex)
      return newState
    })
  }, [nestedIndex, path, setInspectCache])
  return [inspect, setInspect] as const
}
