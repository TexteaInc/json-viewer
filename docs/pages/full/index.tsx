import type { SvgIconProps } from '@mui/material'
import {
  AppBar,
  Box,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  SvgIcon,
  Switch,
  TextField,
  Toolbar,
  Typography
} from '@mui/material'
import type {
  DataType,
  JsonViewerKeyRenderer,
  JsonViewerOnAdd,
  JsonViewerOnChange,
  JsonViewerOnDelete,
  JsonViewerTheme
} from '@textea/json-viewer'
import {
  applyValue,
  defineDataType,
  deleteValue,
  JsonViewer,
  stringType
} from '@textea/json-viewer'
import Image from 'next/image'
import Link from 'next/link'
import type { FC } from 'react'
import { useCallback, useEffect, useState } from 'react'

import { ocean } from '../../lib/shared'

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
  foo: 42,
  goo: 'Lorem Ipsum'
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
  avatar,
  string: 'Lorem ipsum dolor sit amet',
  integer: 42,
  url: new URL('https://example.com'),
  float: 114.514,
  bigint: 123456789087654321n,
  undefined,
  timer: 0,
  date: new Date('Tue Sep 13 2022 14:07:44 GMT-0500 (Central Daylight Time)'),
  link: 'http://example.com',
  emptyArray: [],
  array: [19, 19, 810, 'test', NaN],
  emptyObject: {},
  object: {
    foo: true,
    bar: false,
    last: null
  },
  emptyMap: new Map(),
  map,
  emptySet: new Set(),
  set,
  loopObject,
  loopArray,
  longArray,
  nestedArray: [
    [1, 2],
    [3, 4]
  ],
  superLongString,
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
  string_number: '1234'
}

const KeyRenderer: JsonViewerKeyRenderer = ({ path }) => {
  return (
    <del aria-label='I dont like this number'>&quot;{path.slice(-1)}&quot;</del>
  )
}
KeyRenderer.when = (props) => props.value === 114.514

const imageDataType = defineDataType<string>({
  is: (value) => {
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
  Component: (props) => {
    return (
      <Image
        height={48}
        width={48}
        src={props.value}
        alt={props.value}
        style={{ display: 'inline-block' }}
      />
    )
  }
})

const LinkIcon = (props: SvgIconProps) => (
  // <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' strokeWidth='2' stroke='currentColor' fill='none' strokeLinecap='round' strokeLinejoin='round'>
  <SvgIcon {...props}>
    <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
    <path stroke='currentcolor' d='M11 7h-5a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-5' fill='none'></path>
    <path stroke='currentcolor' d='M10 14l10 -10'></path>
    <path stroke='currentcolor' d='M15 4l5 0l0 5' fill='none'></path>
  </SvgIcon>
)

const linkType: DataType<string> = {
  ...stringType,
  is (value) {
    return typeof value === 'string' && value.startsWith('http')
  },
  PostComponent: (props) => (
    <Box sx={{
      display: 'inline-block',
      marginLeft: 1,
      color: 'primary.main',
      textDecoration: 'underline'
    }}
    >
      <Link href={props.value} target='_blank' rel='noopener noreferrer'>
        Open
        <LinkIcon sx={{ strokeWidth: 2 }} />
      </Link>
    </Box>
  )
}

const urlType = defineDataType<URL>({
  is: (data) => data instanceof URL,
  Component: (props) => {
    const url = props.value.toString()
    return (
      <a
        href={url}
        target='_blank'
        rel='noopener noreferrer'
        style={{
          cursor: 'pointer',
          color: '#1976d2',
          textDecoration: 'underline'
        }}
      >
        {url}
      </a>
    )
  }
})

const IndexPage: FC = () => {
  const [indent, setIndent] = useState(3)
  const [groupArraysAfterLength, setGroupArraysAfterLength] = useState(100)
  const [themeKey, setThemeKey] = useState<string>('light')
  const [theme, setTheme] = useState<JsonViewerTheme>('light')
  const [src, setSrc] = useState(() => example)
  const [displayDataTypes, setDisplayDataTypes] = useState(true)
  const [displaySize, setDisplaySize] = useState(true)
  const [editable, setEditable] = useState(true)
  const [highlightUpdates, setHighlightUpdates] = useState(true)
  useEffect(() => {
    const loop = () => {
      setSrc(src => ({
        ...src,
        timer: src.timer + 1
      }))
    }
    const id = setInterval(loop, 1000)
    return () => clearInterval(id)
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
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          width: '100%',
          gap: '10px',
          paddingX: '5px',
          paddingY: '10px',
          minHeight: '64px',
          marginTop: '64px'
        }}
      >
        <FormControlLabel
          control={(
            <Switch
              checked={editable}
              onChange={event => setEditable(event.target.checked)}
            />
          )}
          label='Editable'
        />
        <FormControlLabel
          control={(
            <Switch
              checked={highlightUpdates}
              onChange={event => setHighlightUpdates(event.target.checked)}
            />
          )}
          label='Highlight Updates'
        />
        <FormControlLabel
          control={(
            <Switch
              checked={displayDataTypes}
              onChange={event => setDisplayDataTypes(event.target.checked)}
            />
          )}
          label='DisplayDataTypes'
        />
        <FormControlLabel
          control={(
            <Switch
              checked={displaySize}
              onChange={event => setDisplaySize(event.target.checked)}
            />
          )}
          label='DisplayObjectSize'
        />
        <TextField
          label='indentWidth'
          value={indent}
          size='small'
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
          size='small'
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
        <FormControl
          size='small'
        >
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
      </Box>
      <JsonViewer
        value={src}
        editable={editable}
        highlightUpdates={highlightUpdates}
        indentWidth={indent}
        theme={theme}
        enableAdd={true}
        enableDelete={true}
        displayDataTypes={displayDataTypes}
        displaySize={displaySize}
        groupArraysAfterLength={groupArraysAfterLength}
        keyRenderer={KeyRenderer}
        valueTypes={[
          urlType,
          linkType,
          imageDataType
        ]}
        onAdd={
          useCallback<JsonViewerOnAdd>(
            (path) => {
              const key = prompt('Key:')
              if (key === null) return
              const value = prompt('Value:')
              if (value === null) return
              setSrc(src => applyValue(src, [...path, key], value))
            }, []
          )
        }
        onChange={
          useCallback<JsonViewerOnChange>(
            (path, oldValue, newValue) => {
              setSrc(src => applyValue(src, path, newValue))
            }, []
          )
        }
        onDelete={
          useCallback<JsonViewerOnDelete>(
            (path, value) => {
              setSrc(src => deleteValue(src, path, value))
            }, []
          )
        }
        sx={{
          paddingLeft: 2
        }}
      />
    </div>
  )
}

export default IndexPage
