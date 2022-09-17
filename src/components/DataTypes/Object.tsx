import { Box } from '@mui/material'
import React, { useMemo } from 'react'

import { useTextColor } from '../../hooks/useColor'
import { useJsonViewerStore } from '../../stores/JsonViewerStore'
import type { DataItemProps } from '../../type'
import { isCycleReference } from '../../utils'
import { DataKeyPair } from '../DataKeyPair'
import { CircularArrowsIcon } from '../icons/CircularArrowsIcon'

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
  const rootValue = useJsonViewerStore(store => store.value)
  const isTrap = useMemo(
    () => isCycleReference(rootValue, props.path, props.value),
    [props.path, props.value, rootValue])
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
      {isTrap
        ? <CircularArrowsIcon
          sx={{ fontSize: 12, color: textColor, pl: sizeOfValue ? 0.5 : 0 }}/>
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
  const rootValue = useJsonViewerStore(store => store.value)
  const isTrap = useMemo(
    () => isCycleReference(rootValue, props.path, props.value),
    [props.path, props.value, rootValue]
  )
  const elements = useMemo(() => {
    if (Array.isArray(props.value)) {
      if (props.value.length <= groupArraysAfterLength) {
        return props.value.map((value, index) => {
          const path = [...props.path, index]
          return (
            <DataKeyPair key={index} path={path} value={value}/>
          )
        })
      }
      const value = props.value.reduce<unknown[][]>((array, value, index) => {
        const target = Math.floor(index / groupArraysAfterLength)
        if (array[target]) {
          array[target].push(value)
        } else {
          array[target] = [value]
        }
        return array
      }, [])

      return value.map((list, index) => {
        const path = [...props.path]
        return (
          <DataKeyPair key={index} path={path} value={list} nested/>
        )
      })
    } else {
      return Object.entries(props.value).map(([key, value]) => {
        const path = [...props.path, key]
        return (
          <DataKeyPair key={key} path={path} value={value}/>
        )
      })
    }
  }, [props.value, props.path, groupArraysAfterLength])
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
