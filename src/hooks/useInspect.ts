import { useAtomValue, useSetAtom } from 'jotai'
import { useAtomCallback } from 'jotai/utils'
import {
  useCallback,
  useEffect,
  useState
} from 'react'

import {
  defaultInspectDepthAtom,
  getInspectCacheAtomFamily,
  setInspectCacheAtomFamily
} from '../state'
import { useIsCycleReference } from './useIsCycleReference'

export function useInspect (path: (string | number)[], value: any, nestedIndex?: number) {
  const depth = path.length
  const isTrap = useIsCycleReference(path, value)
  const defaultInspectDepth = useAtomValue(defaultInspectDepthAtom)

  const getInspectCache = useAtomCallback(
    useCallback((get, set, arg) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useAtomValue(getInspectCacheAtomFamily(arg))
    }, [])
  )
  const setInspectCache = useAtomCallback(
    useCallback((get, set, arg) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useSetAtom(setInspectCacheAtomFamily(arg))
    }, [])
  )
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
  const shouldInspect = useAtomValue(getInspectCacheAtomFamily({ path, nestedIndex }))
  const [inspect, setOriginal] = useState<boolean>(() => {
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
  const setInspect = useAtomCallback(
    useCallback((get, set, apply) => {
      setOriginal((oldState) => {
        const newState = typeof apply === 'boolean' ? apply : apply(oldState)
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useSetAtom(setInspectCacheAtomFamily(apply))
        return newState
      })
    }, [])
  )
  return [inspect, setInspect] as const
}
