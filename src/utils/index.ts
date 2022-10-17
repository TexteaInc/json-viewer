import type React from 'react'

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
  Component: React.ComponentType<DataItemProps<ValueType>>
): {
  is: (value: unknown, path: Path) => boolean
  Component: React.ComponentType<DataItemProps<ValueType>>
}
// case 2: you only render with a single component with editor
export function createDataType<ValueType = unknown> (
  is: (value: unknown, path: Path) => boolean,
  Component: React.ComponentType<DataItemProps<ValueType>>,
  Editor: React.ComponentType<EditorProps<ValueType>>
): {
  is: (value: unknown, path: Path) => boolean
  Component: React.ComponentType<DataItemProps<ValueType>>
  Editor: React.ComponentType<DataItemProps<ValueType>>
}
// case 3: you only render with a component with pre and post.
export function createDataType<ValueType = unknown> (
  is: (value: unknown, path: Path) => boolean,
  Component: React.ComponentType<DataItemProps<ValueType>>,
  Editor: undefined,
  PreComponent: React.ComponentType<DataItemProps<ValueType>>,
  PostComponent: React.ComponentType<DataItemProps<ValueType>>
): {
  is: (value: unknown, path: Path) => boolean
  Component: React.ComponentType<DataItemProps<ValueType>>
  PreComponent: React.ComponentType<DataItemProps<ValueType>>
  PostComponent: React.ComponentType<DataItemProps<ValueType>>
}
// case 4: need all of these
export function createDataType<ValueType = unknown> (
  is: (value: unknown, path: Path) => boolean,
  Component: React.ComponentType<DataItemProps<ValueType>>,
  Editor: React.ComponentType<EditorProps<ValueType>>,
  PreComponent: React.ComponentType<DataItemProps<ValueType>>,
  PostComponent: React.ComponentType<DataItemProps<ValueType>>
): {
  is: (value: unknown, path: Path) => boolean
  Component: React.ComponentType<DataItemProps<ValueType>>
  Editor: React.ComponentType<DataItemProps<ValueType>>
  PreComponent: React.ComponentType<DataItemProps<ValueType>>
  PostComponent: React.ComponentType<DataItemProps<ValueType>>
}

export function createDataType<ValueType = unknown> (
  is: (value: unknown, path: Path) => boolean,
  Component: React.ComponentType<DataItemProps<ValueType>>,
  Editor?: React.ComponentType<EditorProps<ValueType>> | undefined,
  PreComponent?: React.ComponentType<DataItemProps<ValueType>> | undefined,
  PostComponent?: React.ComponentType<DataItemProps<ValueType>> | undefined
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
