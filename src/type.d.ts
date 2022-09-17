import type { Dispatch, SetStateAction } from 'react'
import * as React from 'react'

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

export interface OldReactJsonViewProps {
  /**
   * This property contains your input JSON.
   *
   * Required.
   */
  src: object
  /**
   * Contains the name of your root node. Use null or false for no name.
   *
   * Default: "root"
   */
  name?: string | null | false
  /**
   * RJV supports base-16 themes. Check out the list of supported themes in the demo.
   * A custom "rjv-default" theme applies by default.
   *
   * Default: "rjv-default"
   */
  theme?: ThemeKeys | ThemeObject

  /**
   * Additional `className` string to append to the `className` of react-json-view's container.
   *
   * @default undefined
   */
  className?: string
  /**
   * Style attributes for react-json-view container.
   * Explicit style attributes will override attributes provided by a theme.
   *
   * Default: "rjv-default"
   */
  style?: React.CSSProperties
  /**
   * Style of expand/collapse icons. Accepted values are "circle", triangle" or "square".
   *
   * Default: {}
   */
  iconStyle?: 'circle' | 'triangle' | 'square'
  /**
   * Set the indent-width for nested objects.
   *
   * Default: 4
   */
  indentWidth?: number
  /**
   * When set to true, all nodes will be collapsed by default.
   * Use an integer value to collapse at a particular depth.
   *
   * Default: false
   */
  collapsed?: boolean | number
  /**
   * When an integer value is assigned, strings will be cut off at that length.
   * Collapsed strings are followed by an ellipsis.
   * String content can be expanded and collapsed by clicking on the string value.
   *
   * Default: false
   */
  collapseStringsAfterLength?: number | false
  /**
   * Callback function to provide control over what objects and arrays should be collapsed by default.
   * An object is passed to the callback containing name, src, type ("array" or "object") and namespace.
   *
   * Default: false
   */
  shouldCollapse?: false | ((field: CollapsedFieldProps) => boolean)
  /**
   * When an integer value is assigned, arrays will be displayed in groups by count of the value.
   * Groups are displayed with brakcet notation and can be expanded and collapsed by clickong on the brackets.
   *
   * Default: 100
   */
  groupArraysAfterLength?: number
  /**
   * When prop is not false, the user can copy objects and arrays to clipboard by clicking on the clipboard icon.
   * Copy callbacks are supported.
   *
   * Default: true
   */
  enableClipboard?: boolean | ((copy: OnCopyProps) => void)
  /**
   * When set to true, objects and arrays are labeled with size.
   *
   * Default: true
   */
  displayObjectSize?: boolean
  /**
   * When set to true, data type labels prefix values.
   *
   * Default: true
   */
  displayDataTypes?: boolean
  /**
   * set to false to remove quotes from keys (eg. "name": vs. name:)
   *
   * Default: true
   */
  quotesOnKeys?: boolean
  /**
   * When a callback function is passed in, edit functionality is enabled.
   * The callback is invoked before edits are completed. Returning false
   * from onEdit will prevent the change from being made. see: onEdit docs.
   *
   * Default: false
   */
  onEdit?: ((edit: InteractionProps) => false | any) | false
  /**
   * When a callback function is passed in, add functionality is enabled.
   * The callback is invoked before additions are completed.
   * Returning false from onAdd will prevent the change from being made. see: onAdd docs
   *
   * Default: false
   */
  onAdd?: ((add: InteractionProps) => false | any) | false
  /**
   * When a callback function is passed in, delete functionality is enabled.
   * The callback is invoked before deletions are completed.
   * Returning false from onDelete will prevent the change from being made. see: onDelete docs
   *
   * Default: false
   */
  onDelete?: ((del: InteractionProps) => false | any) | false
  /**
   * When a function is passed in, clicking a value triggers the onSelect method to be called.
   *
   * Default: false
   */
  onSelect?: ((select: OnSelectProps) => void) | false
  /**
   * Custom message for validation failures to onEdit, onAdd, or onDelete callbacks.
   *
   * Default: "Validation Error"
   */
  validationMessage?: string
  /**
   * Set to true to sort object keys.
   *
   * Default: false
   */
  sortKeys?: boolean
  /**
   * Set to a value to be used as defaultValue when adding new key to json
   *
   * Default: null
   */
  defaultValue?: TypeDefaultValue | TypeDefaultValue[] | null
}

export interface OnCopyProps {
  /**
   * The JSON tree source object
   */
  src: object
  /**
   * List of keys.
   */
  namespace: Array<string | null>
  /**
   * The last key in the namespace array.
   */
  name: string | null
}
