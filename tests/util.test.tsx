import { expectTypeOf } from 'expect-type'
import type React from 'react'
import { describe, expect, test } from 'vitest'

import type { DataItemProps } from '../src'
import { createDataType } from '../src/utils'

describe('function createDataType', () => {
  test('case 1', () => {
    const dataType = createDataType<string>(
      (value) => {
        expectTypeOf(value).toBeUnknown()
        return true
      },
      (props) => {
        expectTypeOf(props.value).toBeString()
        return null
      }
    )
    expectTypeOf(dataType).toEqualTypeOf<{
      is:(value: unknown) => value is string
      Component: React.ComponentType<DataItemProps<string>>
    }>()
    const someValue: unknown = null
    expectTypeOf(dataType.is).returns.toBeBoolean()
    if (dataType.is(someValue)) {
      expectTypeOf(someValue).toMatchTypeOf<string>()
    } else {
      expectTypeOf(someValue).not.toMatchTypeOf<string>()
      expectTypeOf(someValue).toMatchTypeOf<unknown>()
    }
    expect(dataType.is).toBeTypeOf('function')
    expect(dataType.Component).toBeTypeOf('function')
  })
  test('case 2', () => {
    const dataType = createDataType<string>(
      (value) => {
        expectTypeOf(value).toBeUnknown()
        return true
      },
      (props) => {
        expectTypeOf(props.value).toBeString()
        return null
      },
      (props) => {
        expectTypeOf(props.value).toBeString()
        return null
      }
    )
    expectTypeOf(dataType).toEqualTypeOf<{
      is:(value: unknown) => value is string
      Component: React.ComponentType<DataItemProps<string>>
      Editor: React.ComponentType<DataItemProps<string>>
    }>()
    expectTypeOf(dataType.is).returns.toBeBoolean()
    expect(dataType.is).toBeTypeOf('function')
    expect(dataType.Component).toBeTypeOf('function')
    expect(dataType.Editor).toBeTypeOf('function')
  })
  test('case 3', () => {
    const dataType = createDataType<string>(
      (value) => {
        expectTypeOf(value).toBeUnknown()
        return true
      },
      (props) => {
        expectTypeOf(props.value).toBeString()
        return null
      },
      undefined,
      (props) => {
        expectTypeOf(props.value).toBeString()
        return null
      },
      (props) => {
        expectTypeOf(props.value).toBeString()
        return null
      }
    )
    expectTypeOf(dataType).toEqualTypeOf<{
      is:(value: unknown) => value is string
      Component: React.ComponentType<DataItemProps<string>>
      PreComponent: React.ComponentType<DataItemProps<string>>
      PostComponent: React.ComponentType<DataItemProps<string>>
    }>()
    expectTypeOf(dataType.is).returns.toBeBoolean()
    expect(dataType.is).toBeTypeOf('function')
    expect(dataType.Component).toBeTypeOf('function')
    expect(dataType.PreComponent).toBeTypeOf('function')
    expect(dataType.PostComponent).toBeTypeOf('function')
  })

  test('case 4', () => {
    const dataType = createDataType<string>(
      (value) => {
        expectTypeOf(value).toBeUnknown()
        return true
      },
      (props) => {
        expectTypeOf(props.value).toBeString()
        return null
      },
      (props) => {
        expectTypeOf(props.value).toBeString()
        return null
      },
      (props) => {
        expectTypeOf(props.value).toBeString()
        return null
      },
      (props) => {
        expectTypeOf(props.value).toBeString()
        return null
      }
    )
    expectTypeOf(dataType).toEqualTypeOf<{
      is:(value: unknown) => value is string
      Component: React.ComponentType<DataItemProps<string>>
      Editor: React.ComponentType<DataItemProps<string>>
      PreComponent: React.ComponentType<DataItemProps<string>>
      PostComponent: React.ComponentType<DataItemProps<string>>
    }>()
    expectTypeOf(dataType.is).returns.toBeBoolean()
    expect(dataType.is).toBeTypeOf('function')
    expect(dataType.Component).toBeTypeOf('function')
    expect(dataType.Editor).toBeTypeOf('function')
    expect(dataType.PreComponent).toBeTypeOf('function')
    expect(dataType.PostComponent).toBeTypeOf('function')
  })
})
