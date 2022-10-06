import type { SetStateAction } from 'react'
import create from 'zustand'
import createContext from 'zustand/context'
import { combine } from 'zustand/middleware'

import type { JsonViewerOnChange, JsonViewerProps, Path } from '..'
import type { Colorspace } from '../theme/base16'
import { lightColorspace } from '../theme/base16'
import type { JsonViewerKeyRenderer } from '../type'

const DefaultKeyRenderer: JsonViewerKeyRenderer = () => null
DefaultKeyRenderer.when = () => false

export type JsonViewerState<T = unknown> = {
  inspectCache: Record<string, boolean>
  hoverPath: { path: Path; nestedIndex?: number } | null
  indentWidth: number
  groupArraysAfterLength: number
  enableClipboard: boolean
  maxDisplayLength: number
  defaultInspectDepth: number
  collapseStringsAfterLength: number
  objectSortKeys: boolean | ((a: string, b: string) => number)
  quotesOnKeys: boolean
  colorspace: Colorspace
  editable: boolean | (<U>(path: Path, currentValue: U) => boolean)
  displayDataTypes: boolean
  rootName: false | string
  value: T
  onChange: JsonViewerOnChange
  keyRenderer: JsonViewerKeyRenderer
  displayObjectSize: boolean
}

export type JsonViewerActions = {
  getInspectCache: (path: Path, nestedIndex?: number) => boolean
  setInspectCache: (
    path: Path, action: SetStateAction<boolean>, nestedIndex?: number) => void
  setHover: (path: Path | null, nestedIndex?: number) => void
}

export const createJsonViewerStore = <T = unknown> (props: JsonViewerProps<T>) =>
  create(
    combine<JsonViewerState<T>, JsonViewerActions>(
      {
        // provided by user
        enableClipboard: props.enableClipboard ?? true,
        indentWidth: props.indentWidth ?? 3,
        groupArraysAfterLength: props.groupArraysAfterLength ?? 100,
        collapseStringsAfterLength:
          (props.collapseStringsAfterLength === false)
            ? Number.MAX_VALUE
            : props.collapseStringsAfterLength ?? 50,
        maxDisplayLength: props.maxDisplayLength ?? 30,
        rootName: props.rootName ?? 'root',
        onChange: props.onChange ?? (() => {}),
        keyRenderer: props.keyRenderer ?? DefaultKeyRenderer,
        editable: props.editable ?? false,
        defaultInspectDepth: props.defaultInspectDepth ?? 5,
        objectSortKeys: props.objectSortKeys ?? false,
        quotesOnKeys: props.quotesOnKeys ?? true,
        displayDataTypes: props.displayDataTypes ?? true,
        // internal state
        inspectCache: {},
        hoverPath: null,
        colorspace: lightColorspace,
        value: props.value,
        displayObjectSize: props.displayObjectSize ?? true
      },
      (set, get) => ({
        getInspectCache: (path, nestedIndex) => {
          const target = nestedIndex !== undefined
            ? path.join('.') +
            `[${nestedIndex}]nt`
            : path.join('.')
          return get().inspectCache[target]
        },
        setInspectCache: (path, action, nestedIndex) => {
          const target = nestedIndex !== undefined
            ? path.join('.') +
            `[${nestedIndex}]nt`
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
              ? ({
                  path,
                  nestedIndex
                })
              : null
          })
        }
      })
    )
  )
export type JsonViewerStore = ReturnType<typeof createJsonViewerStore>

export const {
  useStore: useJsonViewerStore,
  useStoreApi: useJsonViewerStoreApi,
  Provider: JsonViewerProvider
} = createContext<JsonViewerStore>()
