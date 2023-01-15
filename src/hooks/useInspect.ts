import { useAtomValue, useSetAtom } from 'jotai'
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState
} from 'react'

import {
  defaultInspectDepthAtom,
  getInspectCacheAtom,
  setInspectCacheAtom
} from '../state'
import { useIsCycleReference } from './useIsCycleReference'

export function useInspect (path: (string | number)[], value: any, nestedIndex?: number) {
  const depth = path.length
  const isTrap = useIsCycleReference(path, value)
  const defaultInspectDepth = useAtomValue(defaultInspectDepthAtom)
  const getInspectCache = useSetAtom(getInspectCacheAtom)
  const setInspectCache = useSetAtom(setInspectCacheAtom)
  useEffect(() => {
    const inspect = getInspectCache({ path, nestedIndex })
    if (inspect !== undefined) {
      return
    }
    if (nestedIndex !== undefined) {
      setInspectCache({ path, action: false, nestedIndex })
    } else {
      // do not inspect when it is a cycle reference, otherwise there will have a loop
      const inspect = isTrap
        ? false
        : depth < defaultInspectDepth
      setInspectCache({ path, inspect })
    }
  }, [defaultInspectDepth, depth, isTrap, nestedIndex, path, getInspectCache, setInspectCache])
  const [inspect, set] = useState<boolean>(() => {
    const shouldInspect = getInspectCache({ path, nestedIndex })
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
      setInspectCache({ path, newState, nestedIndex })
      return newState
    })
  }, [nestedIndex, path, setInspectCache])
  return [inspect, setInspect] as const
}
