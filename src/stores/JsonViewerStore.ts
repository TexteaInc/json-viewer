import type { SetStateAction } from 'react'
import create from 'zustand'
import createContext from 'zustand/context'
import { combine } from 'zustand/middleware'

import type { JsonViewerOnChange } from '..'
import type { JsonViewerKeyRenderer } from '../type'

export type ColorNamespace = {
  base00: string
  base01: string
  base02: string
  base03: string
  base04: string
  base05: string
  base06: string
  base07: string
  base08: string
  base09: string
  base0A: string
  base0B: string
  base0C: string
  base0D: string
  base0E: string
  base0F: string
}

export const defaultColorNamespace: ColorNamespace = {
  base00: 'rgba(0, 0, 0, 0)',
  base01: 'rgb(245, 245, 245)',
  base02: 'rgb(235, 235, 235)',
  base03: '#93a1a1',
  base04: 'rgba(0, 0, 0, 0.3)',
  base05: '#586e75',
  base06: '#073642',
  base07: '#002b36',
  base08: '#d33682',
  base09: '#cb4b16',
  base0A: '#dc322f',
  base0B: '#859900',
  base0C: '#6c71c4',
  base0D: '#586e75',
  base0E: '#2aa198',
  base0F: '#268bd2'
}

export const darkNamespace: ColorNamespace = {
  base00: 'rgba(1, 1, 1, 0)',
  base01: 'rgba(1, 1, 1, 0.1)',
  base02: 'rgba(0, 0, 0, 0.2)',
  base03: 'rgba(1, 1, 1, 0.3)',
  base04: 'rgba(0, 0, 0, 0.4)',
  base05: 'rgba(1, 1, 1, 0.5)',
  base06: 'rgba(1, 1, 1, 0.6)',
  base07: 'rgba(1, 1, 1, 0.7)',
  base08: 'rgba(1, 1, 1, 0.8)',
  base09: 'rgba(1, 1, 1, 0.8)',
  base0A: 'rgba(1, 1, 1, 0.8)',
  base0B: 'rgba(1, 1, 1, 0.8)',
  base0C: 'rgba(1, 1, 1, 0.8)',
  base0D: 'rgba(1, 1, 1, 0.8)',
  base0E: 'rgba(1, 1, 1, 0.8)',
  base0F: 'rgba(1, 1, 1, 0.8)'
}

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
        colorNamespace: defaultColorNamespace,
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
