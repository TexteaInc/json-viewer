import { render, screen } from '@testing-library/react'
import { expectTypeOf } from 'expect-type'
import React from 'react'
import { describe, expect, it } from 'vitest'

import { createDataType, JsonViewer } from '../src'

function aPlusB (a: number, b: number) {
  return a + b
}

const loopObject = {
  foo: 1,
  goo: 'string'
} as Record<string, any>

loopObject.self = loopObject

const loopArray = [
  loopObject
]

loopArray[1] = loopArray

const longArray = Array.from({ length: 1000 }).map((_, i) => i)
const map = new Map<any, any>()
map.set('foo', 1)
map.set('goo', 'hello')
map.set({}, 'world')

const set = new Set([1, 2, 3])

const superLongString = '1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111'

const full = {
  loopObject,
  loopArray,
  longArray,
  string: 'this is a string',
  integer: 42,
  array: [19, 19, 810, 'test', NaN],
  nestedArray: [
    [1, 2],
    [3, 4]
  ],
  map,
  set,
  float: 114.514,
  undefined,
  superLongString,
  object: {
    'first-child': true,
    'second-child': false,
    'last-child': null
  },
  fn: aPlusB,
  string_number: '1234',
  timer: 0,
  date: new Date('Tue Sep 13 2022 14:07:44 GMT-0500 (Central Daylight Time)'),
  bigint: 110101195306153019n
}

describe('render <JsonViewer/>', () => {
  it('render undefined', () => {
    render(<JsonViewer value={undefined}/>)
  })

  it('render null', () => {
    render(<JsonViewer value={null}/>)
  })

  it('render null', () => {
    render(<JsonViewer value={null}/>)
  })

  it('render NaN', () => {
    render(<JsonViewer value={NaN}/>)
  })

  it('render number', () => {
    render(<JsonViewer value={1}/>)
    render(<JsonViewer value={-0}/>)
    render(<JsonViewer value={+0}/>)
    render(<JsonViewer value={114514}/>)
    render(<JsonViewer value={114.514}/>)
    render(<JsonViewer value={Infinity}/>)
  })

  it('render bigint', () => {
    render(<JsonViewer value={114514n}/>)
  })

  it('render array', () => {
    render(<JsonViewer value={[1, '2', 3.0, Infinity]}/>)
    render(<JsonViewer value={new Array(1e5).fill(1)}/>)
  })

  it('render Set', () => {
    render(<JsonViewer value={new Set([1, '2', 3.0, Infinity])}/>)
  })

  it('render Map', () => {
    render(
      <JsonViewer
        value={new Map<string, number>([['foo', 1], ['goo', 2]])}/>
    )
    render(
      <JsonViewer
        value={new Map<any, number>([[[], 1], [{}, 2]])}/>
    )
  })

  it('render object', () => {
    render(<JsonViewer value={{}}/>)
    render(<JsonViewer value={{
      foo: '1',
      goo: 2,
      hoo: {
        foo: [1, 2, 3]
      }
    }}/>)
  })

  it('render function', () => {
    render(<JsonViewer value={function aPlusB (a: number, b: number) {
      return a + b
    }}/>)
    render(<JsonViewer value={(a: number, b: number) => a + b}/>)
  })

  it('render full', () => {
    render(<JsonViewer value={full}/>)
  })
})

describe('render <JsonViewer/> with props', () => {
  it('render with quotesOnKeys', () => {
    const selection = [true, false]
    selection.forEach(quotesOnKeys => {
      render(<JsonViewer value={full} quotesOnKeys={quotesOnKeys}/>)
    })
  })

  it('render with objectSortKeys', () => {
    const selection = [
      true,
      false,
      (a: string, b: string) => a.localeCompare(b)]
    selection.forEach(objectSortKeys => {
      render(<JsonViewer value={full} objectSortKeys={objectSortKeys}/>)
    })
  })

  it('render with rootName false', async () => {
    render(<JsonViewer value={undefined} rootName={false}/>)
    expect((await screen.findByTestId('data-key-pair')).innerText)
      .toEqual(undefined)
  })

  it('render with dataTypes', async () => {
    render(<JsonViewer value={undefined} valueTypes={[]}/>)
    render(<JsonViewer value={undefined} valueTypes={[
      {
        is: (value: unknown): value is string => typeof value === 'string',
        Component: (props) => {
          expectTypeOf(props.value).toMatchTypeOf<unknown>()
          return null
        }
      },
      createDataType<string>(
        (value) => typeof value === 'string',
        (props) => {
          expectTypeOf(props.value).toMatchTypeOf<string>()
          return null
        }
      )
    ]}/>)
  })
})
