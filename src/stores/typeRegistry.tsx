import { useMemo } from 'react'

import { BooleanType } from '../components/next/DataTypes/Boolean'
import { DateType } from '../components/next/DataTypes/Date'
import { NullType } from '../components/next/DataTypes/Null'
import {
  ObjectType,
  PostObjectType,
  PreObjectType
} from '../components/next/DataTypes/Object'
import type { DataType } from '../type'

const typeRegistry: DataType<any>[] = []

export function registerType<Value> (type: DataType<Value>) {
  typeRegistry.push(type)
}

export function matchTypeComponents<Value> (value: Value): [DataType<Value>[1], DataType<Value>[2], DataType<Value>[3]] | [] {
  for (const [is, C, Pre, Post] of typeRegistry) {
    if (is(value)) {
      return [C, Pre, Post]
    }
  }
  return []
}

export function useTypeComponents (value: unknown) {
  return useMemo(() => matchTypeComponents(value), [value])
}

registerType(
  [
    (value): value is boolean => typeof value === 'boolean',
    BooleanType
  ]
)

registerType(
  [
    (value): value is Date => value instanceof Date,
    DateType
  ]
)

registerType(
  [
    (value): value is null => value === null,
    NullType
  ]
)

// fallback for all data like 'object'
registerType(
  [
    (value): value is object => typeof value === 'object',
    ObjectType,
    PreObjectType,
    PostObjectType
  ]
)
