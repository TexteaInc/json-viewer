import type { Dispatch, SetStateAction } from 'react'
import type React from 'react'

export interface DataItemProps<ValueType = unknown> {
  inspect: boolean
  setInspect: Dispatch<SetStateAction<boolean>>
  value: ValueType
  path: (string | number)[]
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
  onChange?: <U>(path: (string | number)[], oldValue: U, newValue: U) => void
  /**
   * Inspect depth by default.
   * Do not set the number too large, otherwise there will have performance issue
   * @default 50
   */
  defaultInspectDepth?: number
  /**
   * When an integer value is assigned, arrays will be displayed in groups by count of the value.
   * Groups are displayed with bracket notation and can be expanded and collapsed by clicking on the brackets.
   * @default 100
   */
  groupArraysAfterLength?: number
  className?: string
  style?: React.CSSProperties
}
