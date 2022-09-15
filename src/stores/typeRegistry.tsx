import React from 'react'

import type { DataItemProps, DataType } from '../type'

const typeRegistry: DataType<any>[] = []

function registerType (type: DataType) {
  typeRegistry.push(type)
}

function matchType<Value> (value: Value): DataType<Value>[1] {
  for (const [is, C] of typeRegistry) {
    if (is(value)) {
      return C
    }
  }
  return function MatchTypeFallback (props: DataItemProps) {
    return <>{JSON.stringify(props.value)}</>
  }
}
