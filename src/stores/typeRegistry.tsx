import { BooleanType } from '../components/next/DataTypes/Boolean'
import { DateType } from '../components/next/DataTypes/Date'
import { NullType } from '../components/next/DataTypes/Null'
import { ObjectType } from '../components/next/DataTypes/Object'
import type { DataType } from '../type'

const typeRegistry: DataType<any>[] = []

export function registerType<Value> (type: DataType<Value>) {
  typeRegistry.push(type)
}

export function matchType<Value> (value: Value): DataType<Value>[1] | undefined {
  for (const [is, C] of typeRegistry) {
    if (is(value)) {
      return C
    }
  }
  return undefined
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
    ObjectType
  ]
)
