import copyToClipboard from 'copy-to-clipboard'
import type { ComponentType } from 'react'

import type { DataItemProps, DataType, EditorProps, Path } from '../type'

// reference: https://github.com/immerjs/immer/blob/main/src/utils/common.ts
const objectCtorString = Object.prototype.constructor.toString()
export function isPlainObject (value: any): boolean {
  if (!value || typeof value !== 'object') return false

  const proto = Object.getPrototypeOf(value)
  if (proto === null) return true

  const Ctor = Object.hasOwnProperty.call(proto, 'constructor') && proto.constructor
  if (Ctor === Object) return true

  return typeof Ctor === 'function' && Function.toString.call(Ctor) === objectCtorString
}

function shouldShallowCopy (value: any) {
  if (!value) return false

  return (
    isPlainObject(value) ||
    Array.isArray(value) ||
    value instanceof Map ||
    value instanceof Set
  )
}

function shallowCopy (value: any) {
  if (Array.isArray(value)) return Array.prototype.slice.call(value)
  if (value instanceof Set) return new Set(value)
  if (value instanceof Map) return new Map(value)
  if (typeof value === 'object' && value !== null) {
    return Object.assign({}, value)
  }
  return value
}

/**
 * Apply a value to a given path of an object.
 */
export function applyValue (input: any, path: (string | number)[], value: any) {
  if (typeof input !== 'object' || input === null) {
    if (path.length !== 0) {
      throw new Error('path is incorrect')
    }
    return value
  }

  const shouldCopy = shouldShallowCopy(input)
  if (shouldCopy) input = shallowCopy(input)

  const [key, ...restPath] = path
  if (key !== undefined) {
    if (key === '__proto__') {
      throw new TypeError('Modification of prototype is not allowed')
    }
    if (restPath.length > 0) {
      input[key] = applyValue(input[key], restPath, value)
    } else {
      input[key] = value
    }
  }
  return input
}

/**
 * Delete a value from a given path of an object.
 */
export function deleteValue (input: any, path: (string | number)[], value: any) {
  if (typeof input !== 'object' || input === null) {
    if (path.length !== 0) {
      throw new Error('path is incorrect')
    }
    return value
  }

  const shouldCopy = shouldShallowCopy(input)
  if (shouldCopy) input = shallowCopy(input)

  const [key, ...restPath] = path
  if (key !== undefined) {
    if (key === '__proto__') {
      throw new TypeError('Modification of prototype is not allowed')
    }
    if (restPath.length > 0) {
      input[key] = deleteValue(input[key], restPath, value)
    } else {
      if (Array.isArray(input)) {
        input.splice(Number(key), 1)
      } else {
        delete input[key]
      }
    }
  }
  return input
}

/**
 * @deprecated use `defineDataType` instead
 */
// case 1: you only render with a single component
export function createDataType<ValueType = unknown> (
  is: (value: unknown, path: Path) => boolean,
  Component: ComponentType<DataItemProps<ValueType>>
): {
  is: (value: unknown, path: Path) => boolean
  Component: ComponentType<DataItemProps<ValueType>>
}
/**
 * @deprecated use `defineDataType` instead
 */
// case 2: you only render with a single component with editor
export function createDataType<ValueType = unknown> (
  is: (value: unknown, path: Path) => boolean,
  Component: ComponentType<DataItemProps<ValueType>>,
  Editor: ComponentType<EditorProps<ValueType>>
): {
  is: (value: unknown, path: Path) => boolean
  Component: ComponentType<DataItemProps<ValueType>>
  Editor: ComponentType<DataItemProps<ValueType>>
}
/**
 * @deprecated use `defineDataType` instead
 */
// case 3: you only render with a component with pre and post.
export function createDataType<ValueType = unknown> (
  is: (value: unknown, path: Path) => boolean,
  Component: ComponentType<DataItemProps<ValueType>>,
  Editor: undefined,
  PreComponent: ComponentType<DataItemProps<ValueType>>,
  PostComponent: ComponentType<DataItemProps<ValueType>>
): {
  is: (value: unknown, path: Path) => boolean
  Component: ComponentType<DataItemProps<ValueType>>
  PreComponent: ComponentType<DataItemProps<ValueType>>
  PostComponent: ComponentType<DataItemProps<ValueType>>
}
/**
 * @deprecated use `defineDataType` instead
 */
// case 4: need all of these
export function createDataType<ValueType = unknown> (
  is: (value: unknown, path: Path) => boolean,
  Component: ComponentType<DataItemProps<ValueType>>,
  Editor: ComponentType<EditorProps<ValueType>>,
  PreComponent: ComponentType<DataItemProps<ValueType>>,
  PostComponent: ComponentType<DataItemProps<ValueType>>
): {
  is: (value: unknown, path: Path) => boolean
  Component: ComponentType<DataItemProps<ValueType>>
  Editor: ComponentType<DataItemProps<ValueType>>
  PreComponent: ComponentType<DataItemProps<ValueType>>
  PostComponent: ComponentType<DataItemProps<ValueType>>
}
/**
 * @deprecated use `defineDataType` instead
 */
export function createDataType<ValueType = unknown> (
  is: (value: unknown, path: Path) => boolean,
  Component: ComponentType<DataItemProps<ValueType>>,
  Editor?: ComponentType<EditorProps<ValueType>> | undefined,
  PreComponent?: ComponentType<DataItemProps<ValueType>> | undefined,
  PostComponent?: ComponentType<DataItemProps<ValueType>> | undefined
): any {
  if (process.env.NODE_ENV !== 'production') {
    console.warn('createDataType is deprecated, please use `defineDataType` instead. See https://viewer.textea.io/migration/migration-v3#use-definedatatype-instead-of-createdatatype for more information.')
  }
  return {
    is,
    Component,
    Editor,
    PreComponent,
    PostComponent
  }
}

/**
 * Define custom data types for any data structure
 */
export function defineDataType<ValueType = unknown> ({
  is,
  serialize,
  deserialize,
  Component,
  Editor,
  PreComponent,
  PostComponent
}: {
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
}): DataType<ValueType> {
  return {
    is,
    serialize,
    deserialize,
    Component,
    Editor,
    PreComponent,
    PostComponent
  }
}

export const isCycleReference = (
  root: any, path: (string | number)[], value: unknown): false | string => {
  if (root === null || value === null) {
    return false
  }
  if (typeof root !== 'object') {
    return false
  }
  if (typeof value !== 'object') {
    return false
  }
  if (Object.is(root, value) && path.length !== 0) {
    return ''
  }
  const currentPath = []
  const arr = [...path]
  let currentRoot = root
  while (currentRoot !== value || arr.length !== 0) {
    if (typeof currentRoot !== 'object' || currentRoot === null) {
      return false
    }
    if (Object.is(currentRoot, value)) {
      return currentPath.reduce<string>((path, value, currentIndex) => {
        if (typeof value === 'number') {
          return path + `[${value}]`
        }
        return path + `${currentIndex === 0 ? '' : '.'}${value}`
      }, '')
    }
    const target = arr.shift()!
    currentPath.push(target)
    currentRoot = currentRoot[target]
  }
  return false
}

export function getValueSize (value: any): number {
  if (value === null || undefined) {
    return 0
  } else if (Array.isArray(value)) {
    return value.length
  } else if (value instanceof Map || value instanceof Set) {
    return value.size
  } else if (value instanceof Date) {
    return 1
  } else if (typeof value === 'object') {
    return Object.keys(value).length
  } else if (typeof value === 'string') {
    return value.length
  }
  return 1
}

export function segmentArray<T> (arr: T[], size: number): T[][] {
  const result: T[][] = []
  let index = 0
  while (index < arr.length) {
    result.push(arr.slice(index, index + size))
    index += size
  }
  return result
}

/**
 * A safe version of `JSON.stringify` that handles circular references and BigInts.
 *
 * *This function might be changed in the future to support more types. Use it with caution.*
 *
 * @param obj A JavaScript value, usually an object or array, to be converted.
 * @param space Adds indentation, white space, and line break characters to the return-value JSON text to make it easier to read.
 * @returns
 */
export function safeStringify (obj: any, space?: string | number) {
  const seenValues: any[] = []

  function replacer (key: string | number, value: any) {
    // https://github.com/GoogleChromeLabs/jsbi/issues/30
    if (typeof value === 'bigint') return value.toString()

    // Map and Set are not supported by JSON.stringify
    if (value instanceof Map) {
      if ('toJSON' in value && typeof value.toJSON === 'function') return value.toJSON()
      if (value.size === 0) return {}

      if (seenValues.includes(value)) return '[Circular]'
      seenValues.push(value)

      const entries = Array.from(value.entries())
      if (entries.every(([key]) => typeof key === 'string' || typeof key === 'number')) {
        return Object.fromEntries(entries)
      }

      // if keys are not string or number, we can't convert to object
      // fallback to default behavior
      return {}
    }
    if (value instanceof Set) {
      if ('toJSON' in value && typeof value.toJSON === 'function') return value.toJSON()

      if (seenValues.includes(value)) return '[Circular]'
      seenValues.push(value)

      return Array.from(value.values())
    }

    // https://stackoverflow.com/a/72457899
    if (typeof value === 'object' && value !== null && Object.keys(value).length) {
      const stackSize = seenValues.length
      if (stackSize) {
        // clean up expired references
        for (let n = stackSize - 1; n >= 0 && seenValues[n][key] !== value; --n) { seenValues.pop() }
        if (seenValues.includes(value)) return '[Circular]'
      }
      seenValues.push(value)
    }
    return value
  }

  return JSON.stringify(obj, replacer, space)
}

export async function copyString (value: string) {
  if ('clipboard' in navigator) {
    try {
      await navigator.clipboard.writeText(value)
    } catch {
      // When navigator.clipboard throws an error, fallback to copy-to-clipboard package
    }
  }

  // fallback to copy-to-clipboard when navigator.clipboard is not available
  copyToClipboard(value)
}
