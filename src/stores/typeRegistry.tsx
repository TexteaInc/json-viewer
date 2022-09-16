import { useMemo } from 'react'

import { createEasyType } from '../components/next/DataTypes/createEasyType'
import { FloatType } from '../components/next/DataTypes/Float'
import { IntegerType } from '../components/next/DataTypes/Integer'
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

registerType<boolean>(
  [
    (value): value is boolean => typeof value === 'boolean',
    createEasyType(
      'bool',
      (value) => value ? 'true' : 'false',
      'base0E'
    )
  ]
)

const displayOptions: Intl.DateTimeFormatOptions = {
  weekday: 'short',
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
}

registerType<Date>(
  [
    (value): value is Date => value instanceof Date,
    createEasyType(
      'date',
      (value) => value.toLocaleTimeString('en-us', displayOptions),
      'base0D'
    )
  ]
)

registerType(
  [
    (value): value is null => value === null,
    NullType
  ]
)

const isInt = (n: number) => n % 1 === 0

registerType(
  [
    (value): value is number => typeof value === 'number' && isInt(value),
    IntegerType
  ]
)

registerType(
  [
    (value): value is number => typeof value === 'number' && !isInt(value),
    FloatType
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
