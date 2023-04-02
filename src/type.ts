import type { SxProps, Theme } from '@mui/material/styles'
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
  newValue: U /*, type: ChangeType */) => void

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
  prevValue: ValueType | undefined
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

export interface JsonViewerKeyRenderer extends FC<DataItemProps> {
  when (props: DataItemProps): boolean
}

export type JsonViewerTheme = 'light' | 'dark' | 'auto' | Colorspace

export type JsonViewerProps<T = unknown> = {
  /**
   * Any value, `object`, `Array`, primitive type, even `Map` or `Set`.
   */
  value: T

  /**
   * Name of the root value
   *
   * @default "root"
   */
  rootName?: false | string

  /**
   * Color theme.
   *
   * @default 'light'
   */
  theme?: JsonViewerTheme
  className?: string
  style?: CSSProperties
  /**
   * [The `sx` prop](https://mui.com/system/getting-started/the-sx-prop/) lets you style elements inline, using values from the theme.
   * @See https://mui.com/system/getting-started/the-sx-prop/
   */
  sx?: SxProps<Theme>

  /**
   * Indent width for nested objects
   *
   * @default 3
   */
  indentWidth?: number
  /**
   * Customize a key, if `keyRenderer.when` returns `true`.
   */
  keyRenderer?: JsonViewerKeyRenderer
  valueTypes?: DataType<any>[]
  /** Callback when value changed. */
  onChange?: JsonViewerOnChange
  /** Callback when value copied, you can use it to customize the copy behavior.<br />\*Note: you will have to write the data to the clipboard by yourself. */
  onCopy?: JsonViewerOnCopy
  /** Callback when value selected. */
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
   * Default inspect depth for nested objects.
   * _If the number is set too large, it could result in performance issues._
   *
   * @default 5
   */
  defaultInspectDepth?: number
  /**
   * Hide items after reaching the count.
   * `Array` and `Object` will be affected.
   *
   * _If the number is set too large, it could result in performance issues._
   *
   * @default 30
   */
  maxDisplayLength?: number
  /**
   * When an integer value is assigned, arrays will be displayed in groups by count of the value.
   * Groups are displayed with bracket notation and can be expanded and collapsed by clicking on the brackets.
   *
   * @default 100
   */
  groupArraysAfterLength?: number
  /**
   * Cut off the string after reaching the count.
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
   * Whether add quotes on keys.
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

  /**
   * Whether display the size of array and object
   *
   * @default true
   */
  displayObjectSize?: boolean

  /**
   * Whether to highlight updates.
   *
   * @default false
   */
  highlightUpdates?: boolean
}
