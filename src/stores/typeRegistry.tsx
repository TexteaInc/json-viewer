import { Box } from '@mui/material'
import { DevelopmentError } from '@textea/dev-kit/utils'
import React, { useMemo } from 'react'

import { createEasyType } from '../components/DataTypes/createEasyType'
import {
  FunctionType, PostFunctionType,
  PreFunctionType
} from '../components/DataTypes/Function'
import type { DataType } from '../type'
import { useJsonViewerStore } from './JsonViewerStore'

const typeRegistry: DataType<any>[] = []

export function registerType<Value> (type: DataType<Value>) {
  typeRegistry.push(type)
}

export function matchTypeComponents<Value> (value: Value): DataType<Value> {
  for (const T of typeRegistry) {
    if (T.is(value)) {
      return T
    }
  }
  throw new DevelopmentError('this is not possible')
}

export function useTypeComponents (value: unknown) {
  return useMemo(() => matchTypeComponents(value), [value])
}

registerType<boolean>(
  {
    is: (value): value is boolean => typeof value === 'boolean',
    ...createEasyType(
      'bool',
      ({ value }) => <>{value ? 'true' : 'false'}</>,
      {
        colorKey: 'base0E',
        fromString: value => Boolean(value)
      }
    )
  }
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
  {
    is: (value): value is Date => value instanceof Date,
    ...createEasyType(
      'date',
      ({ value }) => <>{value.toLocaleTimeString('en-us', displayOptions)}</>,
      {
        colorKey: 'base0D'
      }
    )
  }
)

registerType<null>(
  {
    is: (value): value is null => value === null,
    ...createEasyType(
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
  }
)

registerType<undefined>(
  {
    is: (value): value is undefined => value === undefined,
    ...createEasyType(
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
  }
)

registerType<string>(
  {
    is: (value): value is string => typeof value === 'string',
    ...createEasyType(
      'string',
      ({ value }) => <>&quot;{`${value}`}&quot;</>,
      {
        colorKey: 'base09',
        fromString: value => value
      }
    )
  }
)

registerType<Function>(
  {
    is: (value): value is Function => typeof value === 'function',
    Component: FunctionType,
    PreComponent: PreFunctionType,
    PostComponent: PostFunctionType
  }
)

const isInt = (n: number) => n % 1 === 0

registerType<number>(
  {
    is: (value): value is number => typeof value === 'number' && isNaN(value),
    ...createEasyType(
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
  }
)

registerType<number>(
  {
    is: (value): value is number => typeof value === 'number' && !isInt(value),
    ...createEasyType(
      'float',
      ({ value }) => <>{`${value}`}</>,
      {
        colorKey: 'base0B',
        fromString: value => parseFloat(value)
      }
    )
  }
)

registerType<number>(
  {
    is: (value): value is number => typeof value === 'number' && isInt(value),
    ...createEasyType(
      'int',
      ({ value }) => <>{`${value}`}</>,
      {
        colorKey: 'base0F',
        fromString: value => parseInt(value)
      }
    )
  }
)
