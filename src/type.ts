import type { Dispatch, SetStateAction } from 'react'
import type React from 'react'

export type Path = (string | number)[]

export interface DataItemProps<ValueType = unknown> {
  inspect: boolean
  setInspect: Dispatch<SetStateAction<boolean>>
  value: ValueType
  path: Path
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

export interface JsonViewerKeyRenderer extends React.FC<DataItemProps> {
  when(props: DataItemProps): boolean
}

export type JsonViewerTheme = 'light' | 'dark' | 'auto'

export type JsonViewerProps<T = unknown> = {
  /**
   * Name of the root value
   *
   * @default "root"
   */
  rootName?: false | string
  /**
   * Any value, `object`, `Array`, primitive type, even `Map` or `Set`.
   */
  value: T
  /**
   * Indent width for nested objects
   * @default 2
   */
  indentWidth?: number
  /**
   * Customize a key, if `keyRenderer.when` returns `true`.
   */
  keyRenderer?: JsonViewerKeyRenderer
  valueTypes?: DataType<any>[]
  /**
   *
   * @param path path to the target value
   * @param oldValue
   * @param newValue
   */
  onChange?: <U>(path: Path, oldValue: U, newValue: U) => void
  /**
   * Inspect depth by default.
   * Do not set the number too large, otherwise there will have performance issue
   * @default 5
   */
  defaultInspectDepth?: number
  /**
   * Hide items after reaching the count.
   * Array and object will be affected.
   *
   * If `Object.keys(value).length` is large also, this will cause a performance issue.
   * @default 30
   */
  maxDisplayLength?: number
  /**
   * When an integer value is assigned, arrays will be displayed in groups by count of the value.
   * Groups are displayed with bracket notation and can be expanded and collapsed by clicking on the brackets.
   * @default 100
   */
  groupArraysAfterLength?: number
  /**
   * When an integer value is assigned, strings will be cut off at that length.
   * Collapsed strings are followed by an ellipsis.
   *
   * String content can be expanded and collapsed by clicking on the string value.
   *
   * @default 100
   */
  collapseStringsAfterLength?: number
  className?: string
  style?: React.CSSProperties
  /**
   *
   * @default 'light'
   */
  theme?: JsonViewerTheme
}
