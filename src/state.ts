import { atom } from 'jotai'
import { atomFamily } from 'jotai/utils'

import type { JsonViewerState, TypeRegistryState } from './type'

export const valueAtom = atom<JsonViewerState['value'] | undefined>(undefined)
export const editableAtom = atom<JsonViewerState['editable'] | undefined>(undefined)
export const indentWidthAtom = atom<JsonViewerState['indentWidth'] | undefined>(undefined)
export const onChangeAtom = atom<JsonViewerState['onChange'] | undefined>(undefined)
export const groupArraysAfterLengthAtom = atom<JsonViewerState['groupArraysAfterLength'] | undefined>(undefined)
export const keyRendererAtom = atom<JsonViewerState['keyRenderer'] | undefined>(undefined)
export const maxDisplayLengthAtom = atom<JsonViewerState['maxDisplayLength'] | undefined>(undefined)
export const enableClipboardAtom = atom<JsonViewerState['enableClipboard'] | undefined>(undefined)
export const rootNameAtom = atom<JsonViewerState['rootName'] | undefined>(undefined)
export const displayDataTypesAtom = atom<JsonViewerState['displayDataTypes'] | undefined>(undefined)
export const displayObjectSizeAtom = atom<JsonViewerState['displayObjectSize'] | undefined>(undefined)
export const onCopyAtom = atom<JsonViewerState['onCopy'] | undefined>(undefined)
export const onSelectAtom = atom<JsonViewerState['onSelect'] | undefined>(undefined)
export const colorspaceAtom = atom<JsonViewerState['colorspace'] | undefined>(undefined)
export const collapseStringsAfterLengthAtom = atom<JsonViewerState['collapseStringsAfterLength'] | undefined>(undefined)
export const defaultInspectDepthAtom = atom<JsonViewerState['defaultInspectDepth'] | undefined>(undefined)
export const objectSortKeysAtom = atom<JsonViewerState['objectSortKeys'] | undefined>(undefined)
export const quotesOnKeysAtom = atom<JsonViewerState['quotesOnKeys'] | undefined>(undefined)
export const inspectCacheAtom = atom<JsonViewerState['inspectCache'] | undefined>(undefined)
export const hoverPathAtom = atom<JsonViewerState['hoverPath'] | undefined>(undefined)
export const registryAtom = atom<TypeRegistryState['registry'] | undefined>(undefined)

export const getInspectCacheAtomFamily = atomFamily(({ path, nestedIndex }) => {
  const target = nestedIndex === undefined
    ? path.join('.')
    : `${path.join('.')}[${nestedIndex}]nt`
  return atom((get) => get(inspectCacheAtom)[target])
})
export const setInspectCacheAtomFamily = atomFamily(({ path, action, nestedIndex }) => atom((get, set) => {
  const target = nestedIndex === undefined
    ? path.join('.')
    : `${path.join('.')}[${nestedIndex}]nt`
  const inspectCache = get(inspectCacheAtom)
  return set(inspectCacheAtom, {
    ...inspectCache,
    [target]: typeof action === 'function'
      ? action(inspectCache[target])
      : action
  })
}))
export const setHoverAtomFamily = atomFamily(({ path, nestedIndex }) => atom(
  (get, set) => set(hoverPathAtom, path
    ? { path, nestedIndex }
    : null
  )
))
export const registryTypesAtomFamily = atomFamily((setState) => atom(
  (get, set) => {
    if (typeof setState === 'function') {
      set(registryAtom, setState)
      return
    }
    return setState
  }
))
