import { Box } from '@mui/material'
import React, { useMemo, useState } from 'react'

import { useTextColor } from '../../hooks/useColor'
import { useIsCycleReference } from '../../hooks/useIsCycleReference'
import { useJsonViewerStore } from '../../stores/JsonViewerStore'
import type { DataItemProps } from '../../type'
import { DataKeyPair } from '../DataKeyPair'
import { CircularArrowsIcon } from '../icons/CircularArrowsIcon'
import { DataBox } from '../mui/DataBox'

const objectLb = '{'
const arrayLb = '['
const objectRb = '}'
const arrayRb = ']'

export const PreObjectType: React.FC<DataItemProps<object>> = (props) => {
  const metadataColor = useJsonViewerStore(store => store.colorNamespace.base04)
  const textColor = useTextColor()
  const isArray = useMemo(() => Array.isArray(props.value), [props.value])
  const sizeOfValue = useMemo(
    () => props.inspect ? `${Object.keys(props.value).length} Items` : '',
    [props.inspect, props.value]
  )
  const isTrap = useIsCycleReference(props.path, props.value)
  return (
    <Box
      component='span' className='data-object-start'
      sx={{
        letterSpacing: 0.5
      }}
    >
      {isArray ? arrayLb : objectLb}
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
      {isTrap && !props.inspect
        ? (
          <>
            <CircularArrowsIcon sx={{
              fontSize: 12,
              color: textColor,
              mx: sizeOfValue ? 0.5 : 0
            }}/>
            {isTrap}
          </>
          )
        : null}
    </Box>
  )
}

export const PostObjectType: React.FC<DataItemProps<object>> = (props) => {
  const metadataColor = useJsonViewerStore(store => store.colorNamespace.base04)
  const isArray = useMemo(() => Array.isArray(props.value), [props.value])
  const sizeOfValue = useMemo(
    () => !props.inspect ? `${Object.keys(props.value).length} Items` : '',
    [props.inspect, props.value]
  )
  return (
    <Box component='span' className='data-object-end'>
      {isArray ? arrayRb : objectRb}
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
    </Box>
  )
}

export const ObjectType: React.FC<DataItemProps<object>> = (props) => {
  const keyColor = useTextColor()
  const groupArraysAfterLength = useJsonViewerStore(
    store => store.groupArraysAfterLength)
  const isTrap = useIsCycleReference(props.path, props.value)
  const [displayLength, setDisplayLength] = useState(
    useJsonViewerStore(store => store.maxDisplayLength)
  )
  const elements = useMemo(() => {
    if (!props.inspect) {
      return null
    }
    const value: unknown[] | object = props.value
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
              hidden {rest} items...
            </DataBox>
          )
        }
        return elements
      }
      const elements = value.reduce<unknown[][]>((array, value, index) => {
        const target = Math.floor(index / groupArraysAfterLength)
        if (array[target]) {
          array[target].push(value)
        } else {
          array[target] = [value]
        }
        return array
      }, [])

      return elements.map((list, index) => {
        const path = [...props.path]
        return (
          <DataKeyPair key={index} path={path} value={list}
                       nestedIndex={index}/>
        )
      })
    } else {
      // object
      const entries = Object.entries(value)
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
            hidden {rest} items...
          </DataBox>
        )
      }
      return elements
    }
  }, [props.inspect, props.value, props.path, groupArraysAfterLength, displayLength, keyColor])
  return (
    <Box
      className='data-object'
      sx={{
        display: props.inspect ? 'block' : 'inline-block',
        pl: props.inspect ? 2 : 0,
        color: keyColor
      }}
    >
      {
        props.inspect
          ? elements
          : !isTrap
              ? (
              <Box component='span' className='data-object-body'>
                ...
              </Box>
                )
              : null
      }
    </Box>
  )
}
