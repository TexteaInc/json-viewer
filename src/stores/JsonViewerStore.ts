import type { SetStateAction } from 'react'
import create from 'zustand'
import createContext from 'zustand/context'
import { combine } from 'zustand/middleware'

import type { JsonViewerOnChange } from '..'
import type { ColorNamespace } from '../theme/base16'
import { lightColorNamespace } from '../theme/base16'
import type { JsonViewerKeyRenderer } from '../type'

const DefaultKeyRenderer: JsonViewerKeyRenderer = () => null
DefaultKeyRenderer.when = () => false

export type JsonViewerState = {
  inspectCache: Record<string, boolean>
  hoverPath: (string | number)[] | null
  groupArraysAfterLength: number
  defaultInspectDepth: number
  colorNamespace: ColorNamespace
  expanded: string[]
  rootName: string
  value: unknown
  onChange: JsonViewerOnChange
  keyRenderer: JsonViewerKeyRenderer
}

export type JsonViewerActions = {
  getInspectCache: (path: (string | number)[]) => boolean
  setInspectCache: (path: (string | number)[], action: SetStateAction<boolean>) => void
  setHover: (path: (string | number)[] | null) => void
}

export const createJsonViewerStore = () =>
  create(
    combine<JsonViewerState, JsonViewerActions>(
      {
        inspectCache: {},
        hoverPath: null,
        groupArraysAfterLength: 100,
        rootName: 'root',
        defaultInspectDepth: 10,
        colorNamespace: lightColorNamespace,
        expanded: ['data-viewer-root'],
        value: {},
        onChange: () => {},
        keyRenderer: DefaultKeyRenderer
      },
      (set, get) => ({
        getInspectCache: (path) => {
          return get().inspectCache[path.join('.')]
        },
        setInspectCache: (path, action) => {
          const target = path.join('.')
          set(state => ({
            inspectCache: {
              ...state.inspectCache,
              [target]: typeof action === 'function' ? action(state.inspectCache[target]) : action
            }
          }))
        },
        setHover: (path) => {
          set({
            hoverPath: path
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
