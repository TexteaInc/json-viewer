import { Box } from '@mui/material'
import React, { useMemo } from 'react'

import { createEasyType } from '../components/next/DataTypes/createEasyType'
import {
  FunctionType, PostFunctionType,
  PreFunctionType
} from '../components/next/DataTypes/Function'
import {
  ObjectType,
  PostObjectType,
  PreObjectType
} from '../components/next/DataTypes/Object'
import type { DataType } from '../type'
import { useJsonViewerStore } from './JsonViewerStore'

const typeRegistry: DataType<any>[] = []

export function registerType<Value> (type: DataType<Value>) {
  typeRegistry.push(type)
}

export function getIsCheck<Value> (value: Value): DataType<Value>[0] | null {
  for (const [is] of typeRegistry) {
    if (is(value)) {
      return is
    }
  }
  return null
}

export function useIsCheck (value: unknown) {
  useMemo(() => getIsCheck(value), [value])
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
      ({ value }) => <>{value ? 'true' : 'false'}</>,
      { colorKey: 'base0E' }
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
      ({ value }) => <>{value.toLocaleTimeString('en-us', displayOptions)}</>,
      { colorKey: 'base0D' }
    )
  ]
)

registerType<null>(
  [
    (value): value is null => value === null,
    createEasyType(
      'null',
      () => {
        const backgroundColor = useJsonViewerStore(
          store => store.colorNamespace.base02)
        return (
          <Box sx={{
            fontSize: '0.8rem',
            backgroundColor,
            fontWeight: 'bold',
            borderRadius: '3px'
          }}>
            NULL
          </Box>
        )
      },
      { colorKey: 'base08', displayTypeLabel: false }
    )
  ]
)

registerType<undefined>(
  [
    (value): value is undefined => value === undefined,
    createEasyType(
      'undefined',
      () => {
        const backgroundColor = useJsonViewerStore(
          store => store.colorNamespace.base02)
        return (
          <Box sx={{
            fontSize: '0.7rem',
            backgroundColor,
            borderRadius: '3px'
          }}>
            undefined
          </Box>
        )
      },
      {
        colorKey: 'base05',
        displayTypeLabel: false
      }
    )
  ]
)

registerType<string>(
  [
    (value): value is string => typeof value === 'string',
    createEasyType(
      'string',
      ({ value }) => <>&quot;{`${value}`}&quot;</>,
      {
        colorKey: 'base09'
      }
    )
  ]
)

registerType<Function>(
  [
    (value): value is Function => typeof value === 'function',
    FunctionType,
    PreFunctionType,
    PostFunctionType
  ]
)

const isInt = (n: number) => n % 1 === 0

registerType<number>(
  [
    (value): value is number => typeof value === 'number' && isNaN(value),
    createEasyType(
      'NaN',
      () => {
        const backgroundColor = useJsonViewerStore(
          store => store.colorNamespace.base02)
        return (
          <Box sx={{
            backgroundColor,
            fontSize: '0.8rem',
            fontWeight: 'bold',
            borderRadius: '3px'
          }}>
            NaN
          </Box>
        )
      },
      {
        colorKey: 'base08',
        displayTypeLabel: false
      }
    )
  ]
)

registerType<number>(
  [
    (value): value is number => typeof value === 'number' && !isInt(value),
    createEasyType(
      'float',
      ({ value }) => <>{`${value}`}</>,
      {
        colorKey: 'base0B'
      }
    )
  ]
)

registerType<number>(
  [
    (value): value is number => typeof value === 'number' && isInt(value),
    createEasyType(
      'int',
      ({ value }) => <>{`${value}`}</>,
      {
        colorKey: 'base0F'
      }
    )
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
