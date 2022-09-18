import { TextField } from '@mui/material'
import {
  applyValue,
  JsonViewer,
  JsonViewerKeyRenderer,
  JsonViewerOnChange
} from '@textea/json-viewer'
import type React from 'react'
import { useCallback, useEffect, useState } from 'react'

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

const example = {
  loopObject,
  loopArray,
  string: 'this is a string',
  integer: 42,
  array: [19, 19, 810, 'test', NaN],
  nestedArray: [
    [1, 2],
    [3, 4]
  ],
  float: 114.514,
  undefined,
  object: {
    'first-child': true,
    'second-child': false,
    'last-child': null
  },
  fn: aPlusB,
  string_number: '1234',
  timer: 0,
  avatar,
  date: new Date('Tue Sep 13 2022 14:07:44 GMT-0500 (Central Daylight Time)')
}

const KeyRenderer: JsonViewerKeyRenderer = ({ path }) => {
  return <del aria-label='I dont like this number'>&quot;{path.slice(-1)}&quot;</del>
}
KeyRenderer.when = (props) => props.value === 114.514

const IndexPage: React.FC = () => {
  const [indent, setIndent] = useState(2)
  const [groupArraysAfterLength, setGroupArraysAfterLength] = useState(100)
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
      <JsonViewer
        value={src}
        indentWidth={indent}
        groupArraysAfterLength={groupArraysAfterLength}
        keyRenderer={KeyRenderer}
        valueTypes={[
          {
            is: (value): value is string => typeof value === 'string' && value.startsWith('https://i.imgur.com'),
            Component: (props) => {
              return <img height='50px' src={props.value} alt={props.value}/>
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
