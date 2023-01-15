import type { Atom } from 'jotai'
import type { SetStateAction } from 'react'

import type { JsonViewerProps, Path } from '..'
import {
  collapseStringsAfterLengthAtom,
  defaultInspectDepthAtom,
  displayDataTypesAtom,
  displayObjectSizeAtom,
  editableAtom,
  enableClipboardAtom,
  groupArraysAfterLengthAtom,
  indentWidthAtom,
  keyRendererAtom,
  maxDisplayLengthAtom,
  objectSortKeysAtom,
  onChangeAtom,
  onCopyAtom,
  onSelectAtom,
  quotesOnKeysAtom,
  rootNameAtom,
  valueAtom
} from '../state'
import type { JsonViewerKeyRenderer, JsonViewerState } from '../type'

export { Provider as JsonViewerProvider } from 'jotai'

const DefaultKeyRenderer: JsonViewerKeyRenderer = () => null
DefaultKeyRenderer.when = () => false

export type JsonViewerActions = {
  getInspectCache: (path: Path, nestedIndex?: number) => boolean
  setInspectCache: (
    path: Path, action: SetStateAction<boolean>, nestedIndex?: number) => void
  setHover: (path: Path | null, nestedIndex?: number) => void
}

export const createJsonViewerStore = <T = unknown> (props: JsonViewerProps<T>): Iterable<readonly [Atom<JsonViewerState[keyof JsonViewerState]>, JsonViewerState[keyof JsonViewerState]]> => [
  // provided by user
  [enableClipboardAtom, props.enableClipboard ?? true],
  [indentWidthAtom, props.indentWidth ?? 3],
  [groupArraysAfterLengthAtom, props.groupArraysAfterLength ?? 100],
  [collapseStringsAfterLengthAtom,
    (props.collapseStringsAfterLength === false)
      ? Number.MAX_VALUE
      : props.collapseStringsAfterLength ?? 50],
  [maxDisplayLengthAtom, props.maxDisplayLength ?? 30],
  [rootNameAtom, props.rootName ?? 'root'],
  [onChangeAtom, props.onChange ?? (() => {})],
  [onCopyAtom, props.onCopy ?? undefined],
  [onSelectAtom, props.onSelect ?? undefined],
  [keyRendererAtom, props.keyRenderer ?? DefaultKeyRenderer],
  [editableAtom, props.editable ?? false],
  [defaultInspectDepthAtom, props.defaultInspectDepth ?? 5],
  [objectSortKeysAtom, props.objectSortKeys ?? false],
  [quotesOnKeysAtom, props.quotesOnKeys ?? true],
  [displayDataTypesAtom, props.displayDataTypes ?? true],
  // internal state
  [valueAtom, props.value],
  [displayObjectSizeAtom, props.displayObjectSize ?? true]
]
export type JsonViewerStore = ReturnType<typeof createJsonViewerStore>
