import type {
  Dispatch,
  SetStateAction
} from 'react'
import {
  useCallback,
  useEffect,
  useState
} from 'react'

import { useJsonViewerStore } from '../stores/JsonViewerStore'
import { useIsCycleReference } from './useIsCycleReference'

export function useInspect (path: (string | number)[], value: any, nestedIndex?: number) {
  const depth = path.length
  const isTrap = useIsCycleReference(path, value)
  const getInspectCache = useJsonViewerStore(store => store.getInspectCache)
  const setInspectCache = useJsonViewerStore(store => store.setInspectCache)
  const defaultInspectDepth = useJsonViewerStore(store => store.defaultInspectDepth)
  const defaultInspectControl = useJsonViewerStore(store => store.defaultInspectControl)
  useEffect(() => {
    const inspect = getInspectCache(path, nestedIndex)
    if (inspect !== undefined) {
      return
    }

    // item with nestedIndex should not be inspected
    if (nestedIndex !== undefined) {
      setInspectCache(path, false, nestedIndex)
      return
    }

    // do not inspect when it is a cycle reference, otherwise there will have a loop
    const shouldInspect = isTrap
      ? false
      : typeof defaultInspectControl === 'function'
        ? defaultInspectControl(path, value)
        : depth < defaultInspectDepth
    setInspectCache(path, shouldInspect)
  }, [defaultInspectDepth, defaultInspectControl, depth, getInspectCache, isTrap, nestedIndex, path, value, setInspectCache])

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
      : typeof defaultInspectControl === 'function'
        ? defaultInspectControl(path, value)
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
