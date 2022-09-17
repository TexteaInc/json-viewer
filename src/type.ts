import type { Dispatch, SetStateAction } from 'react'
import type React from 'react'

export interface DataItemProps<ValueType = unknown> {
  inspect: boolean
  setInspect: Dispatch<SetStateAction<boolean>>
  value: ValueType
  path: string[]
}

export type EditorProps<ValueType = unknown> = {
  value: ValueType
  setValue: React.Dispatch<ValueType>
}

export type DataType<ValueType = unknown> = {
  is: (value: unknown) => value is ValueType
  Component: React.ComponentType<DataItemProps<ValueType>>
  Editor?: React.ComponentType<EditorProps<ValueType>>
  PreComponent?: React.ComponentType<DataItemProps<ValueType>>
  PostComponent?: React.ComponentType<DataItemProps<ValueType>>
}

export type JsonViewerProps<T = unknown> = {
  /**
   * any value
   */
  value: T
  /**
   * indent width for nested objects
   */
  indentWidth?: number
  /**
   *
   * @param path path to the target value
   * @param oldValue
   * @param newValue
   */
  onChange?: <U>(path: string[], oldValue: U, newValue: U) => void
  /**
   * collapsed depth, true for all collapsed, false for all expanded.
   *  number for depth that default expanded.
   * @default false
   */
  defaultCollapsed?: boolean | number
  className?: string
  style?: React.CSSProperties
}
