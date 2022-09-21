import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material'
import {
  applyValue,
  JsonViewer,
  JsonViewerKeyRenderer,
  JsonViewerOnChange,
  JsonViewerTheme
} from '@textea/json-viewer'
import Image from 'next/image'
import type React from 'react'
import { useCallback, useEffect, useState } from 'react'

import { ocean } from '../shared'

// this url is copied from: https://beta.reactjs.org/learn/passing-props-to-a-component
const avatar = 'https://i.imgur.com/1bX5QH6.jpg'

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

const example = {
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
  avatar,
  date: new Date('Tue Sep 13 2022 14:07:44 GMT-0500 (Central Daylight Time)'),
  bigint: 110101195306153019n
}

const KeyRenderer: JsonViewerKeyRenderer = ({ path }) => {
  return <del aria-label='I dont like this number'>&quot;{path.slice(
    -1)}&quot;</del>
}
KeyRenderer.when = (props) => props.value === 114.514

const IndexPage: React.FC = () => {
  const [indent, setIndent] = useState(3)
  const [groupArraysAfterLength, setGroupArraysAfterLength] = useState(100)
  const [themeKey, setThemeKey] = useState<string>('light')
  const [theme, setTheme] = useState<JsonViewerTheme>('light')
  const [src, setSrc] = useState(() => example)
  useEffect(() => {
    const loop = () => {
      setSrc(src => ({
        ...src,
        timer: src.timer + 1
      }))
    }
    const id = setInterval(loop, 1000)
    return () => {
      clearInterval(id)
    }
  }, [])
  return (
    <div>
      <TextField
        label='indentWidth'
        value={indent}
        type='number'
        onChange={
          event => {
            const indent = parseInt(event.target.value)
            if (indent > -1 && indent < 10) {
              setIndent(indent)
            }
          }
        }
      />
      <TextField
        label='groupArraysAfterLength'
        value={groupArraysAfterLength}
        type='number'
        onChange={
          event => {
            const groupArraysAfterLength = parseInt(event.target.value)
            if (groupArraysAfterLength > -1 && groupArraysAfterLength < 500) {
              setGroupArraysAfterLength(groupArraysAfterLength)
            }
          }
        }
      />
      <FormControl>
        <InputLabel>Theme</InputLabel>
        <Select
          value={themeKey}
          label='Theme'
          onChange={(event) => {
            if (event.target.value === 'ocean') {
              setTheme(ocean)
              setThemeKey('ocean')
            } else {
              setTheme(event.target.value as any)
              setThemeKey(event.target.value as any)
            }
          }}
        >
          <MenuItem value='auto'>auto</MenuItem>
          <MenuItem value='light'>light</MenuItem>
          <MenuItem value='dark'>dark</MenuItem>
          <MenuItem value='ocean'>ocean</MenuItem>
        </Select>
      </FormControl>
      <JsonViewer
        value={src}
        indentWidth={indent}
        theme={theme}
        groupArraysAfterLength={groupArraysAfterLength}
        keyRenderer={KeyRenderer}
        valueTypes={[
          {
            is: (value): value is string => typeof value === 'string' &&
              value.startsWith('https://i.imgur.com'),
            Component: (props) => {
              return <Image height={50} width={50} src={props.value} alt={props.value}/>
            }
          }
        ]}
        onChange={
          useCallback<JsonViewerOnChange>(
            (path, oldValue, newValue) => {
              setSrc(src => applyValue(src, path, newValue))
            }, []
          )
        }
      />
    </div>
  )
}

export default IndexPage
