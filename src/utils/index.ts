import type { ComponentType } from 'react'

import type { DataItemProps, DataType, EditorProps, Path } from '../type'

// reference: https://github.com/immerjs/immer/blob/main/src/utils/common.ts
const objectCtorString = Object.prototype.constructor.toString()
function isPlainObject (value: any): boolean {
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
export function createDataType<ValueType = unknown> (
  is: (value: unknown, path: Path) => boolean,
  Component: ComponentType<DataItemProps<ValueType>>,
  Editor?: ComponentType<EditorProps<ValueType>> | undefined,
  PreComponent?: ComponentType<DataItemProps<ValueType>> | undefined,
  PostComponent?: ComponentType<DataItemProps<ValueType>> | undefined
): any {
  if (process.env.NODE_ENV !== 'production') {
    console.warn('createDataType is deprecated, please use `defineDataType` instead')
  }
  return {
    is,
    Component,
    Editor,
    PreComponent,
    PostComponent
  }
}

export function defineDataType<ValueType = unknown> ({
  is,
  serialize,
  deserialize,
  Component,
  Editor,
  PreComponent,
  PostComponent
}: {
  is: (value: unknown, path: Path) => boolean
  /**
   * transform the value to a string for editing
   */
  serialize?: (value: ValueType) => string
  /**
   * parse the string back to a value
   * throw an error if the input is invalid
   * and the editor will ignore the change
   */
  deserialize?: (value: string) => ValueType
  Component: ComponentType<DataItemProps<ValueType>>
  Editor?: ComponentType<EditorProps<string>>
  PreComponent?: ComponentType<DataItemProps<ValueType>>
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
