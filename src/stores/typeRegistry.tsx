import { Box } from '@mui/material'
import { DevelopmentError } from '@textea/dev-kit/utils'
import React, { memo, SetStateAction, useMemo, useState } from 'react'
import create from 'zustand'
import createStore from 'zustand/context'
import { combine } from 'zustand/middleware'

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
import type { DataItemProps, DataType } from '../type'
import { useJsonViewerStore } from './JsonViewerStore'

type TypeRegistryState = {
  registry: DataType<any>[]
}

type TypeRegistryActions = {
  registerTypes: (setState: SetStateAction<DataType<any>[]>) => void
}

export const createTypeRegistryStore = () => create(
  combine<TypeRegistryState, TypeRegistryActions>(
    {
      registry: []
    },
    (set) => ({
      registerTypes: (setState) => {
        set(state => ({
          registry:
            typeof setState === 'function'
              ? setState(state.registry)
              : setState
        }))
      }
    })
  )
)

export const {
  Provider: TypeRegistryProvider,
  useStore: useTypeRegistryStore,
  useStoreApi: useTypeRegistryStoreApi
} = createStore<ReturnType<typeof createTypeRegistryStore>>()

const objectType: DataType<object> = {
  is: (value) => typeof value === 'object',
  Component: ObjectType,
  PreComponent: PreObjectType,
  PostComponent: PostObjectType
}

export function matchTypeComponents<Value> (
  value: Value, registry: TypeRegistryState['registry']): DataType<Value> {
  let potential: DataType<Value> | undefined
  for (const T of registry) {
    if (T.is(value)) {
      potential = T
      if (typeof value === 'object') {
        // early return for case like `null`
        return T
      }
    }
  }
  if (potential === undefined) {
    if (typeof value === 'object') {
      return objectType as unknown as DataType<Value>
    }
    throw new DevelopmentError('this is not possible')
  }
  return potential
}

export function useTypeComponents (value: unknown) {
  const registry = useTypeRegistryStore(store => store.registry)
  return useMemo(() => matchTypeComponents(value, registry), [value, registry])
}

export function predefined (): DataType<any>[] {
  const types: DataType<any>[] = []

  function registerType<Type> (dataType: DataType<Type>): void {
    function compare (prevProps: Readonly<DataItemProps<Type>>, nextProps: Readonly<DataItemProps<Type>>) {
      return (
        Object.is(prevProps.value, nextProps.value) &&
        prevProps.inspect && nextProps.inspect &&
        prevProps.path?.join('.') === nextProps.path?.join('.')
      )
    }
    dataType.Component = memo(dataType.Component, compare)
    if (dataType.Editor) {
      dataType.Editor = memo(dataType.Editor)
    }
    if (dataType.PreComponent) {
      dataType.PreComponent = memo(dataType.PreComponent, compare)
    }
    if (dataType.PostComponent) {
      dataType.PostComponent = memo(dataType.PostComponent, compare)
    }
    types.push(dataType)
  }

  registerType<boolean>(
    {
      is: (value) => typeof value === 'boolean',
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
      is: (value) => value instanceof Date,
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
      is: (value) => value === null,
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
              borderRadius: '3px',
              padding: '0.5px 2px'
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
      is: (value) => value === undefined,
      ...createEasyType(
        'undefined',
        () => {
          const backgroundColor = useJsonViewerStore(
            store => store.colorspace.base02)
          return (
            <Box sx={{
              fontSize: '0.7rem',
              backgroundColor,
              borderRadius: '3px',
              padding: '0.5px 2px'
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
      is: (value) => typeof value === 'string',
      ...createEasyType(
        'string',
        (props) => {
          const [showRest, setShowRest] = useState(false)
          const collapseStringsAfterLength = useJsonViewerStore(
            store => store.collapseStringsAfterLength)
          const value = showRest
            ? props.value
            : props.value.slice(0,
              collapseStringsAfterLength)
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
      is: (value) => typeof value === 'function',
      Component: FunctionType,
      PreComponent: PreFunctionType,
      PostComponent: PostFunctionType
    }
  )

  const isInt = (n: number) => n % 1 === 0

  registerType<number>(
    {
      is: (value) => typeof value === 'number' && isNaN(value),
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
      is: (value) => typeof value === 'number' &&
        !isInt(value),
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
      is: (value) => typeof value === 'number' && isInt(value),
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
      is: (value) => typeof value === 'bigint',
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

  return types
}
