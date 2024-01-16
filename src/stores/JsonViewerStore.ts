import type { SetStateAction } from 'react'
import { createContext, useContext } from 'react'
import type { StoreApi } from 'zustand'
import { create, useStore } from 'zustand'

import type {
  JsonViewerOnChange,
  JsonViewerOnCopy,
  JsonViewerOnSelect,
  JsonViewerProps,
  Path
} from '..'
import type { Colorspace } from '../theme/base16'
import { lightColorspace } from '../theme/base16'
import type { JsonViewerKeyRenderer, JsonViewerOnAdd, JsonViewerOnDelete } from '../type'

const DefaultKeyRenderer: JsonViewerKeyRenderer = () => null
DefaultKeyRenderer.when = () => false

export type JsonViewerState<T = unknown> = {
  rootName: false | string
  indentWidth: number
  keyRenderer: JsonViewerKeyRenderer
  enableAdd: boolean | (<U>(path: Path, currentValue: U) => boolean)
  enableDelete: boolean | (<U>(path: Path, currentValue: U) => boolean)
  enableClipboard: boolean
  editable: boolean | (<U>(path: Path, currentValue: U) => boolean)
  onChange: JsonViewerOnChange
  onCopy: JsonViewerOnCopy | undefined
  onSelect: JsonViewerOnSelect | undefined
  onAdd: JsonViewerOnAdd | undefined
  onDelete: JsonViewerOnDelete | undefined
  defaultInspectDepth: number
  defaultInspectControl?: (path: Path, value: unknown) => boolean
  maxDisplayLength: number
  groupArraysAfterLength: number
  collapseStringsAfterLength: number
  objectSortKeys: boolean | ((a: string, b: string) => number)
  quotesOnKeys: boolean
  displayDataTypes: boolean
  displaySize: boolean | ((path: Path, value: unknown) => boolean)
  highlightUpdates: boolean

  inspectCache: Record<string, boolean>
  hoverPath: { path: Path; nestedIndex?: number } | null
  colorspace: Colorspace
  value: T
  prevValue: T | undefined

  getInspectCache: (path: Path, nestedIndex?: number) => boolean
  setInspectCache: (path: Path, action: SetStateAction<boolean>, nestedIndex?: number) => void
  setHover: (path: Path | null, nestedIndex?: number) => void
}

export const createJsonViewerStore = <T = unknown> (props: JsonViewerProps<T>) => {
  return create<JsonViewerState>()((set, get) => ({
    // provided by user
    rootName: props.rootName ?? 'root',
    indentWidth: props.indentWidth ?? 3,
    keyRenderer: props.keyRenderer ?? DefaultKeyRenderer,
    enableAdd: props.enableAdd ?? false,
    enableDelete: props.enableDelete ?? false,
    enableClipboard: props.enableClipboard ?? true,
    editable: props.editable ?? false,
    onChange: props.onChange ?? (() => {}),
    onCopy: props.onCopy ?? undefined,
    onSelect: props.onSelect ?? undefined,
    onAdd: props.onAdd ?? undefined,
    onDelete: props.onDelete ?? undefined,
    defaultInspectDepth: props.defaultInspectDepth ?? 5,
    defaultInspectControl: props.defaultInspectControl ?? undefined,
    maxDisplayLength: props.maxDisplayLength ?? 30,
    groupArraysAfterLength: props.groupArraysAfterLength ?? 100,
    collapseStringsAfterLength:
    (props.collapseStringsAfterLength === false)
      ? Number.MAX_VALUE
      : props.collapseStringsAfterLength ?? 50,
    objectSortKeys: props.objectSortKeys ?? false,
    quotesOnKeys: props.quotesOnKeys ?? true,
    displayDataTypes: props.displayDataTypes ?? true,
    displaySize: props.displaySize ?? true,
    highlightUpdates: props.highlightUpdates ?? false,

    // internal state
    inspectCache: {},
    hoverPath: null,
    colorspace: lightColorspace,
    value: props.value,
    prevValue: undefined,

    getInspectCache: (path, nestedIndex) => {
      const target = nestedIndex !== undefined
        ? path.join('.') + `[${nestedIndex}]nt`
        : path.join('.')
      return get().inspectCache[target]
    },
    setInspectCache: (path, action, nestedIndex) => {
      const target = nestedIndex !== undefined
        ? path.join('.') + `[${nestedIndex}]nt`
        : path.join('.')
      set(state => ({
        inspectCache: {
          ...state.inspectCache,
          [target]: typeof action === 'function'
            ? action(
              state.inspectCache[target])
            : action
        }
      }))
    },
    setHover: (path, nestedIndex) => {
      set({
        hoverPath: path
          ? ({ path, nestedIndex })
          : null
      })
    }
  }))
}

// @ts-expect-error we intentionally want to pass undefined to the context
// See https://github.com/DefinitelyTyped/DefinitelyTyped/pull/24509#issuecomment-382213106
export const JsonViewerStoreContext = createContext<StoreApi<JsonViewerState>>(undefined)

export const JsonViewerProvider = JsonViewerStoreContext.Provider

export const useJsonViewerStore = <U extends unknown>(selector: (state: JsonViewerState) => U, equalityFn?: (a: U, b: U) => boolean) => {
  const store = useContext(JsonViewerStoreContext)
  return useStore(store, selector, equalityFn)
}
