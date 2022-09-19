import type { SetStateAction } from 'react'
import create from 'zustand'
import createContext from 'zustand/context'
import { combine } from 'zustand/middleware'

import type { JsonViewerOnChange, JsonViewerProps, Path } from '..'
import type { ColorNamespace } from '../theme/base16'
import { lightColorNamespace } from '../theme/base16'
import type { JsonViewerKeyRenderer } from '../type'

const DefaultKeyRenderer: JsonViewerKeyRenderer = () => null
DefaultKeyRenderer.when = () => false

export type JsonViewerState<T = unknown> = {
  inspectCache: Record<string, boolean>
  hoverPath: { path: Path; nestedIndex?: number } | null
  groupArraysAfterLength: number
  maxDisplayLength: number
  defaultInspectDepth: number
  colorNamespace: ColorNamespace
  expanded: string[]
  rootName: string
  value: T
  onChange: JsonViewerOnChange
  keyRenderer: JsonViewerKeyRenderer
}

export type JsonViewerActions = {
  getInspectCache: (path: Path, nestedIndex?: number) => boolean
  setInspectCache: (
    path: Path, action: SetStateAction<boolean>, nestedIndex?: number) => void
  setHover: (path: Path | null, nestedIndex?: number) => void
}

export const createJsonViewerStore = <T = unknown>(props: JsonViewerProps<T>) =>
  create(
    combine<JsonViewerState<T>, JsonViewerActions>(
      {
        inspectCache: {},
        hoverPath: null,
        groupArraysAfterLength: props.groupArraysAfterLength ?? 100,
        maxDisplayLength: props.maxDisplayLength ?? 30,
        rootName: 'root',
        defaultInspectDepth: 10,
        colorNamespace: lightColorNamespace,
        expanded: ['data-viewer-root'],
        value: props.value,
        onChange: props.onChange ?? (() => {}),
        keyRenderer: props.keyRenderer ?? DefaultKeyRenderer
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
