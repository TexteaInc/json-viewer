import type { ComponentType, CSSProperties, Dispatch, FC, SetStateAction } from 'react'

import type { Colorspace } from './theme/base16'

export type Path = (string | number)[]

/**
 * @param path path to the target value
 * @param oldValue
 * @param newValue
 */
export type JsonViewerOnChange = <U = unknown>(
  path: Path, oldValue: U,
  newValue: U /*, type: ChangeType */
) => void

/**
 *  @param path path to the target value
 *  @param value
 */
export type JsonViewerOnCopy = <U = unknown>(
  path: Path,
  value: U
) => unknown | Promise<unknown>

/**
 * @param path path to the target value
 * @param value
 */
export type JsonViewerOnSelect = <U = unknown>(
  path: Path,
  value: U,
) => void

export interface DataItemProps<ValueType = unknown> {
  inspect: boolean
  setInspect: Dispatch<SetStateAction<boolean>>
  value: ValueType
  path: Path
}

export type EditorProps<ValueType = unknown> = {
  value: ValueType
  setValue: Dispatch<ValueType>
}

export type DataType<ValueType = unknown> = {
  /**
   * Whether the value belongs to the data type
   */
  is: (value: unknown, path: Path) => boolean
  Component: ComponentType<DataItemProps<ValueType>>
  Editor?: ComponentType<EditorProps<ValueType>>
  PreComponent?: ComponentType<DataItemProps<ValueType>>
  PostComponent?: ComponentType<DataItemProps<ValueType>>
}

export type TypeRegistryState = {
  registry: DataType<any>[]
}

export interface JsonViewerKeyRenderer extends FC<DataItemProps> {
  when (props: DataItemProps): boolean
}

export type JsonViewerTheme = 'light' | 'dark' | 'auto' | Colorspace

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
   * @default 3
   */
  indentWidth?: number
  /**
   * Customize a key, if `keyRenderer.when` returns `true`.
   */
  keyRenderer?: JsonViewerKeyRenderer
  valueTypes?: DataType<any>[]
  onChange?: JsonViewerOnChange
  onCopy?: JsonViewerOnCopy
  onSelect?: JsonViewerOnSelect
  /**
   * Whether enable clipboard feature.
   *
   * @default true
   */
  enableClipboard?: boolean
  /**
   * Whether this value can be edited.
   *
   * Pass `false` to turn off the edit feature.
   * Pass a function to customize the result.
   *
   * @default false
   */
  editable?: boolean | (<U = unknown>(path: Path, currentValue: U) => boolean)
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
   * @default 50
   */
  collapseStringsAfterLength?: number | false

  /**
   * Whether sort keys through `String.prototype.localeCompare()`
   *
   * @default false
   */
  objectSortKeys?: boolean | ((a: string, b: string) => number)

  /**
   * set `false` to remove quotes from keys
   *
   * true for `"name"`, false for `name`
   *
   * @default true
   */
  quotesOnKeys?: boolean

  /**
   * Whether display data type labels
   *
   * @default true
   */
  displayDataTypes?: boolean

  className?: string
  style?: CSSProperties
  /**
   *
   * @default 'light'
   */
  theme?: JsonViewerTheme

  /**
   * Whether display the size of array and object
   *
   * @default true
   */
  displayObjectSize?: boolean
}

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
  onCopy: JsonViewerOnCopy | undefined
  onSelect: JsonViewerOnCopy | undefined
  keyRenderer: JsonViewerKeyRenderer
  displayObjectSize: boolean
}
