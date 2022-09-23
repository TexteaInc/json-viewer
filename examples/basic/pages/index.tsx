import {
  AppBar,
  FormControl, FormControlLabel,
  InputLabel,
  MenuItem,
  Select, Switch,
  TextField, Toolbar, Typography
} from '@mui/material'
import {
  applyValue,
  createDataType,
  JsonViewer,
  JsonViewerKeyRenderer,
  JsonViewerOnChange,
  JsonViewerTheme
} from '@textea/json-viewer'
import Image from 'next/image'
import type React from 'react'
import { useCallback, useEffect, useState } from 'react'

import { ocean } from '../shared'

const allowedDomains = ['i.imgur.com']

// this url is copied from: https://beta.reactjs.org/learn/passing-props-to-a-component
const avatar = 'https://i.imgur.com/1bX5QH6.jpg'

function aPlusB (a: number, b: number) {
  return a + b
}
const aPlusBConst = function (a: number, b: number) {
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
  function: aPlusB,
  constFunction: aPlusBConst,
  anonymousFunction: function (a: number, b: number) {
    return a + b
  },
  shortFunction: (arg1: any, arg2: any) => console.log(arg1, arg2),
  shortLongFunction: (arg1: any, arg2: any) => {
    console.log(arg1, arg2)
    return '123'
  },
  string_number: '1234',
  timer: 0,
  avatar,
  date: new Date('Tue Sep 13 2022 14:07:44 GMT-0500 (Central Daylight Time)'),
  bigint: 123456789087654321n
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
  const [displayDataTypes, setDisplayDataTypes] = useState(true)
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
      <AppBar>
        <Toolbar>
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            JSON viewer
          </Typography>
          <a href='https://www.netlify.com' target='_blank' rel='noreferrer'>
            <Image
              width={114}
              height={51}
              src='https://www.netlify.com/v3/img/components/netlify-color-accent.svg'
              alt='Deploys by Netlify'
            />
          </a>
        </Toolbar>
      </AppBar>
      <Toolbar/>
      <FormControlLabel
        control={<Switch
          value={displayDataTypes}
          onChange={event => setDisplayDataTypes(event.target.checked)}
        />}
        label='DisplayDataTypes'
      />
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
        displayDataTypes={displayDataTypes}
        groupArraysAfterLength={groupArraysAfterLength}
        keyRenderer={KeyRenderer}
        valueTypes={[
          createDataType(
            (value) => {
              if (typeof value === 'string') {
                try {
                  const url = new URL(value)
                  return allowedDomains.includes(url.host) && url.pathname.endsWith('.jpg')
                } catch (_) {
                  return false
                }
              }
              return false
            },
            (props) => {
              return <Image height={50} width={50} src={props.value}
                            alt={props.value}/>
            }
          )
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
