import { Box } from '@mui/material'
import { group } from 'group-items'
import React, { useMemo, useState } from 'react'

import { useTextColor } from '../../hooks/useColor'
import { useIsCycleReference } from '../../hooks/useIsCycleReference'
import { useJsonViewerStore } from '../../stores/JsonViewerStore'
import type { DataItemProps } from '../../type'
import { getValueSize } from '../../utils'
import { DataKeyPair } from '../DataKeyPair'
import { CircularArrowsIcon } from '../icons/CircularArrowsIcon'
import { DataBox } from '../mui/DataBox'

const objectLb = '{'
const arrayLb = '['
const objectRb = '}'
const arrayRb = ']'

function inspectMetadata (value: object) {
  const length = getValueSize(value)

  let name = ''
  if (value instanceof Map || value instanceof Set) {
    name = value[Symbol.toStringTag]
  }
  if (Object.prototype.hasOwnProperty.call(value, Symbol.toStringTag)) {
    name = (value as any)[Symbol.toStringTag]
  }
  return `${length} Items${name ? ` (${name})` : ''}`
}

export const PreObjectType: React.FC<DataItemProps<object>> = (props) => {
  const metadataColor = useJsonViewerStore(store => store.colorspace.base04)
  const textColor = useTextColor()
  const isArray = useMemo(() => Array.isArray(props.value), [props.value])
  const isEmptyValue = useMemo(() => getValueSize(props.value) === 0, [props.value])
  const sizeOfValue = useMemo(() => inspectMetadata(props.value), [props.inspect, props.value]
  )
  const displayObjectSize = useJsonViewerStore(store => store.displayObjectSize)
  const isTrap = useIsCycleReference(props.path, props.value)
  return (
    <Box
      component='span' className='data-object-start'
      sx={{
        letterSpacing: 0.5
      }}
    >
      {isArray ? arrayLb : objectLb}
      {displayObjectSize && props.inspect && !isEmptyValue && (
        <Box
          component='span'
          sx={{
            pl: 0.5,
            fontStyle: 'italic',
            color: metadataColor
          }}
        >
          {sizeOfValue}
        </Box>
      )}

      {isTrap && !props.inspect
        ? (
          <>
            <CircularArrowsIcon sx={{
              fontSize: 12,
              color: textColor,
              mx: 0.5
            }}/>
            {isTrap}
          </>
          )
        : null}
    </Box>
  )
}

export const PostObjectType: React.FC<DataItemProps<object>> = (props) => {
  const metadataColor = useJsonViewerStore(store => store.colorspace.base04)
  const isArray = useMemo(() => Array.isArray(props.value), [props.value])
  const displayObjectSize = useJsonViewerStore(store => store.displayObjectSize)
  const isEmptyValue = useMemo(() => getValueSize(props.value) === 0, [props.value])
  const sizeOfValue = useMemo(() => inspectMetadata(props.value), [props.inspect, props.value])

  return (
    <Box component='span' className='data-object-end'>
      {isArray ? arrayRb : objectRb}
      {displayObjectSize && (isEmptyValue || !props.inspect)
        ? (
          <Box
            component='span'
            sx={{
              pl: 0.5,
              fontStyle: 'italic',
              color: metadataColor
            }}
          >
            {sizeOfValue}
          </Box>
          )
        : null
      }
    </Box>
  )
}

function getIterator (value: any): value is Iterable<unknown> {
  return typeof value?.[Symbol.iterator] === 'function'
}

export const ObjectType: React.FC<DataItemProps<object>> = (props) => {
  const keyColor = useTextColor()
  const borderColor = useJsonViewerStore(store => store.colorspace.base02)
  const groupArraysAfterLength = useJsonViewerStore(store => store.groupArraysAfterLength)
  const isTrap = useIsCycleReference(props.path, props.value)
  const [displayLength, setDisplayLength] = useState(useJsonViewerStore(store => store.maxDisplayLength))
  const objectSortKeys = useJsonViewerStore(store => store.objectSortKeys)
  const elements = useMemo(() => {
    if (!props.inspect) {
      return null
    }
    const value: unknown[] | object = props.value
    const iterator = getIterator(value)
    // Array also has iterator, we skip it and treat it as an array as normal.
    if (iterator && !Array.isArray(value)) {
      const elements = []
      if (value instanceof Map) {
        for (const item of value) {
          // fixme: key might be a object, array, or any value for the `Map<any, any>`
          const [k, value] = item
          const key = `${k}`
          elements.push(
            <DataKeyPair key={key} path={[...props.path, key]} value={value}
                         editable={false}/>
          )
        }
      } else {
        let count = 0
        for (const item of value) {
          elements.push(
            <DataKeyPair key={count} path={[...props.path, `iterator:${count}`]}
                         value={item} nestedIndex={count} editable={false}/>
          )
          count++
        }
      }
      return elements
    }
    if (Array.isArray(value)) {
      // unknown[]
      if (value.length <= groupArraysAfterLength) {
        const elements = value.slice(0, displayLength).map((value, index) => {
          const path = [...props.path, index]
          return (
            <DataKeyPair key={index} path={path} value={value}/>
          )
        })
        if (value.length > displayLength) {
          const rest = value.length - displayLength
          elements.push(
            <DataBox
              sx={{
                cursor: 'pointer',
                lineHeight: 1.5,
                color: keyColor,
                letterSpacing: 0.5,
                opacity: 0.8
              }}
              key='last'
              onClick={() => setDisplayLength(length => length * 2)}
            >
              hidden {rest} items…
            </DataBox>
          )
        }
        return elements
      }

      const elements: unknown[][] = group<unknown>(value)
        .by((_, index) => Math.floor(index / groupArraysAfterLength))
        .asArrays()

      return elements.map((list, index) => {
        const path = [...props.path]
        return (
          <DataKeyPair key={index} path={path} value={list}
                       nestedIndex={index}/>
        )
      })
    }
    // object
    let entries: [key: string, value: unknown][] = Object.entries(value)
    if (objectSortKeys) {
      entries = objectSortKeys === true
        ? entries.sort(([a], [b]) => a.localeCompare(b))
        : entries.sort(([a], [b]) => objectSortKeys(a, b))
    }
    const elements = entries.slice(0, displayLength).map(([key, value]) => {
      const path = [...props.path, key]
      return (
        <DataKeyPair key={key} path={path} value={value}/>
      )
    })
    if (entries.length > displayLength) {
      const rest = entries.length - displayLength
      elements.push(
        <DataBox
          sx={{
            cursor: 'pointer',
            lineHeight: 1.5,
            color: keyColor,
            letterSpacing: 0.5,
            opacity: 0.8
          }}
          key='last'
          onClick={() => setDisplayLength(length => length * 2)}
        >
          hidden {rest} items…
        </DataBox>
      )
    }
    return elements
  }, [
    props.inspect,
    props.value,
    props.path,
    groupArraysAfterLength,
    displayLength,
    keyColor,
    objectSortKeys
  ])
  const marginLeft = props.inspect ? 0.6 : 0
  const width = useJsonViewerStore(store => store.indentWidth)
  const indentWidth = props.inspect ? width - marginLeft : width
  const isEmptyValue = useMemo(() => getValueSize(props.value) === 0, [props.value])
  if (isEmptyValue) {
    return null
  }
  return (
    <Box
      className='data-object'
      sx={{
        display: props.inspect ? 'block' : 'inline-block',
        pl: props.inspect ? indentWidth - 0.6 : 0,
        marginLeft,
        color: keyColor,
        borderLeft: props.inspect ? `1px solid ${borderColor}` : 'none'
      }}
    >
      {
        props.inspect
          ? elements
          : !isTrap
              ? (
              <Box component='span' className='data-object-body'
                 onClick={() => props.setInspect(true)}
                 sx={{
                   '&:hover': { cursor: 'pointer' },
                   padding: 0.5
                 }}
              >
                …
              </Box>
                )
              : null
      }
    </Box>
  )
}
