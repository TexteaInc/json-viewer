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
import type { HostPath, JsonViewerProps } from '../type'
import { useIsCycleReference } from './useIsCycleReference'

export function useInspect (
  path: HostPath['path'],
  value: JsonViewerProps['value'],
  nestedIndex?: HostPath['nestedIndex']
) {
  const depth = path.length
  const isTrap = useIsCycleReference(path, value)
  const defaultInspectDepth = useAtomValue(defaultInspectDepthAtom)
  const inspectCache = useAtomValue(getInspectCacheAtom({ path, nestedIndex }))
  const setInspectCache = useSetAtom(setInspectCacheAtom)
  useEffect(() => {
    if (inspectCache !== undefined) {
      return
    }
    if (nestedIndex !== undefined) {
      setInspectCache({ path, action: false, nestedIndex })
    } else {
      // do not inspect when it is a cycle reference, otherwise there will have a loop
      const inspect = isTrap
        ? false
        : depth < defaultInspectDepth
      setInspectCache({ path, action: inspect })
    }
  }, [defaultInspectDepth, depth, isTrap, nestedIndex, path, inspectCache, setInspectCache])
  const [inspect, set] = useState<boolean>(() => {
    if (inspectCache !== undefined) {
      return inspectCache
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
      setInspectCache({ path, action: newState, nestedIndex })
      return newState
    })
  }, [nestedIndex, path, setInspectCache])
  return [inspect, setInspect] as const
}
