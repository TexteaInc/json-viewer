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
  path: Path,
  oldValue: U,
  newValue: U
  /*, type: ChangeType */
) => void

/**
 * @param path path to the target value
 * @param value
 * @param copy the function to copy the value to clipboard
 */
export type JsonViewerOnCopy = <U = unknown>(
  path: Path,
  value: U,
  copy: (value: string) => Promise<void>
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
  nestedIndex?: number
}

export type EditorProps<ValueType = unknown> = {
  value: ValueType
  setValue: Dispatch<ValueType>
  abortEditing: () => void
  commitEditing: (newValue: string) => void
}

/**
 * A data type definition, including methods for checking, serializing, and deserializing values, as well as components for rendering and editing values.
 *
 * @template ValueType The type of the value represented by this data type
 */
export type DataType<ValueType = unknown> = {
  /**
   * Determines whether a given value belongs to this data type.
   *
   * @param value The value to check
   * @param path The path to the value within the input data structure
   * @returns `true` if the value belongs to this data type, `false` otherwise
   */
  is: (value: unknown, path: Path) => boolean
  /**
   * Convert the value of this data type to a string for editing
   */
  serialize?: (value: ValueType) => string
  /**
   * Converts a string representation of a value back to a value of this data type.
   *
   * Throws an error if the input is invalid, in which case the editor will ignore the change.
   */
  deserialize?: (value: string) => ValueType
  /**
   * The main component used to render a value of this data type.
   */
  Component: ComponentType<DataItemProps<ValueType>>
  /**
   * An optional custom editor component for editing values of this data type.
   *
   * You must also provide a `serialize` and `deserialize` function to enable this feature.
   */
  Editor?: ComponentType<EditorProps<string>>
  /**
   * An optional component to render before the value.
   *
   * In collapsed mode, it will still be rendered as a prefix.
   */
  PreComponent?: ComponentType<DataItemProps<ValueType>>
  /**
   * An optional component to render after the value.
   *
   * In collapsed mode, it will still be rendered as a suffix.
   */
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
   *
   * @see https://mui.com/system/getting-started/the-sx-prop/
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
  /**
   * Customize the definition of data types.
   *
   * @see https://viewer.textea.io/how-to/data-types
   */
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
   * Provide a function to customize this behavior by returning a boolean based on the value and path.
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
   * Default inspect control for nested objects.
   *
   * Provide a function to customize which fields should be expanded by default.
   */
  defaultInspectControl?: (path: Path, value: unknown) => boolean
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
   * Whether display the size of `Object`, `Array`, `Map` and `Set`.
   *
   * Provide a function to customize this behavior by returning a boolean based on the value and path.
   *
   * @default true
   */
  displaySize?: boolean | ((path: Path, value: unknown) => boolean)

  /**
   * Whether to highlight updates.
   *
   * @default false
   */
  highlightUpdates?: boolean
}
