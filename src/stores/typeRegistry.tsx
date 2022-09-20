import { Box } from '@mui/material'
import { DevelopmentError } from '@textea/dev-kit/utils'
import React, { useMemo, useState } from 'react'

import { createEasyType } from '../components/DataTypes/createEasyType'
import {
  FunctionType,
  PostFunctionType,
  PreFunctionType
} from '../components/DataTypes/Function'
import {
  ObjectType,
  PostObjectType,
  PreObjectType
} from '../components/DataTypes/Object'
import type { DataType } from '../type'
import { useJsonViewerStore } from './JsonViewerStore'

const typeRegistry: DataType<any>[] = []

export function registerType<Value> (type: DataType<Value>) {
  typeRegistry.push(type)
}

const objectType: DataType<object> = {
  is: (value): value is object => typeof value === 'object',
  Component: ObjectType,
  PreComponent: PreObjectType,
  PostComponent: PostObjectType
}

export function matchTypeComponents<Value> (value: Value): DataType<Value> {
  let potential: DataType<Value> | undefined
  for (const T of typeRegistry) {
    if (T.is(value)) {
      potential = T
      if (typeof value === 'object') {
        // early return for case like `null`
        return T
      }
    }
  }
  if (potential === undefined && typeof value === 'object') {
    return objectType as unknown as DataType<Value>
  } else {
    if (potential === undefined) {
      throw new DevelopmentError('this is not possible')
    }
    return potential
  }
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
          store => store.colorspace.base02)
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
          store => store.colorspace.base02)
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
      (props) => {
        const [showRest, setShowRest] = useState(false)
        const collapseStringsAfterLength = useJsonViewerStore(
          store => store.collapseStringsAfterLength)
        const value = showRest ? props.value : props.value.slice(0, collapseStringsAfterLength)
        const hasRest = props.value.length > collapseStringsAfterLength
        return (
          <Box
            component='span'
            sx={{
              overflowWrap: 'break-word',
              cursor: hasRest ? 'pointer' : 'inherit'
            }}
            onClick={() => {
              setShowRest(value => !value)
            }}
          >
            &quot;
            {value}
            {hasRest && <span>...</span>}
            &quot;
          </Box>
        )
      },
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
          store => store.colorspace.base02)
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

registerType<bigint>(
  {
    is: (value): value is bigint => typeof value === 'bigint',
    ...createEasyType(
      'bigint',
      ({ value }) => <>{`${value}n`}</>,
      {
        colorKey: 'base0F',
        fromString: value => BigInt(value.replace(/\D/g, ''))
      }
    )
  }
)
