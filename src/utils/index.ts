import type { ComponentType } from 'react'

import type { DataItemProps, EditorProps, Path } from '../type'

export const applyValue = (obj: any, path: (string | number)[], value: any) => {
  if (typeof obj !== 'object' || obj === null) {
    if (path.length !== 0) {
      throw new Error('path is incorrect')
    }
    return value
  }
  const arr: (string | number)[] = [...path]
  let key
  if (path.length > 0) {
    key = arr[0]
    if (key === '__proto__') {
      throw new TypeError('don\'t modify __proto__!!!')
    }
    if (arr.length > 1) {
      arr.shift()
      obj[key] = applyValue(obj[key], arr, value)
    } else {
      obj[key] = value
    }
  }
  return obj
}

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
  return {
    is,
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
