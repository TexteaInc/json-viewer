import type { SetStateAction } from 'react'
import { createContext, memo, useContext, useMemo } from 'react'
import type { StoreApi } from 'zustand'
import { createStore, useStore } from 'zustand'

import {
  bigIntType,
  booleanType,
  dateType,
  floatType,
  functionType,
  intType,
  nanType,
  nullType,
  objectType,
  stringType,
  undefinedType
} from '../components/DataTypes'
import type { DataItemProps, DataType, Path } from '../type'

type TypeRegistryState = {
  registry: DataType<any>[]

  registerTypes: (setState: SetStateAction<DataType<any>[]>) => void
}

export const createTypeRegistryStore = () => {
  return createStore<TypeRegistryState>()((set) => ({
    registry: [],

    registerTypes: (setState) => {
      set(state => ({
        registry:
          typeof setState === 'function'
            ? setState(state.registry)
            : setState
      }))
    }
  }))
}

// @ts-expect-error we intentionally want to pass undefined to the context
// See https://github.com/DefinitelyTyped/DefinitelyTyped/pull/24509#issuecomment-382213106
export const TypeRegistryStoreContext = createContext<StoreApi<TypeRegistryState>>(undefined)

export const TypeRegistryProvider = TypeRegistryStoreContext.Provider

export const useTypeRegistryStore = <U extends unknown>(selector: (state: TypeRegistryState) => U, equalityFn?: (a: U, b: U) => boolean) => {
  const store = useContext(TypeRegistryStoreContext)
  return useStore(store, selector, equalityFn)
}

function matchTypeComponents<Value> (
  value: Value, path: Path, registry: TypeRegistryState['registry']): DataType<Value> {
  let potential: DataType<Value> | undefined
  for (const T of registry) {
    if (T.is(value, path)) {
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
    throw new Error('this is not possible')
  }
  return potential
}

export function useTypeComponents (value: unknown, path: Path) {
  const registry = useTypeRegistryStore(store => store.registry)
  return useMemo(() => matchTypeComponents(value, path, registry), [value, path, registry])
}

function memorizeDataType<Type> (dataType: DataType<Type>): DataType<Type> {
  function compare (prevProps: Readonly<DataItemProps<Type>>, nextProps: Readonly<DataItemProps<Type>>) {
    return (
      Object.is(prevProps.value, nextProps.value) &&
      prevProps.inspect && nextProps.inspect &&
      prevProps.path?.join('.') === nextProps.path?.join('.')
    )
  }
  dataType.Component = memo(dataType.Component, compare)
  if (dataType.Editor) {
    dataType.Editor = memo(dataType.Editor, function compare (prevProps, nextProps) {
      return Object.is(prevProps.value, nextProps.value)
    })
  }
  if (dataType.PreComponent) {
    dataType.PreComponent = memo(dataType.PreComponent, compare)
  }
  if (dataType.PostComponent) {
    dataType.PostComponent = memo(dataType.PostComponent, compare)
  }
  return dataType
}

export const predefinedTypes :DataType<any>[] = [
  memorizeDataType(booleanType),
  memorizeDataType(dateType),
  memorizeDataType(nullType),
  memorizeDataType(undefinedType),
  memorizeDataType(stringType),
  memorizeDataType(functionType),
  memorizeDataType(nanType),
  memorizeDataType(intType),
  memorizeDataType(floatType),
  memorizeDataType(bigIntType)
]
