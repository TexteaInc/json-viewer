import { TextField } from '@mui/material'
import {
  applyValue,
  JsonViewer,
  JsonViewerOnChange
} from '@textea/json-viewer'
import type React from 'react'
import { useCallback, useEffect, useState } from 'react'

function aPlusB (a: number, b: number) {
  return a + b
}

const example = {
  string: 'this is a string',
  integer: 42,
  array: [19, 19, 810, 'test', NaN],
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
  date: new Date('Tue Sep 13 2022 14:07:44 GMT-0500 (Central Daylight Time)')
}

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
