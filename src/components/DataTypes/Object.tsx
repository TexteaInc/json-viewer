import { Box } from '@mui/material'
import React, { useMemo } from 'react'

import { useTextColor } from '../../hooks/useColor'
import { useJsonViewerStore } from '../../stores/JsonViewerStore'
import type { DataItemProps } from '../../type'
import { DataKeyPair } from '../DataKeyPair'

const objectLb = '{'
const arrayLb = '['
const objectRb = '}'
const arrayRb = ']'

export const PreObjectType: React.FC<DataItemProps<object>> = (props) => {
  const metadataColor = useJsonViewerStore(store => store.colorNamespace.base04)
  const isArray = useMemo(() => Array.isArray(props.value), [props.value])
  const sizeOfValue = useMemo(
    () => props.inspect ? `${Object.keys(props.value).length} Items` : '',
    [props.inspect, props.value]
  )
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
  const metadataColor = useJsonViewerStore(store => store.colorNamespace.base04)
  const groupArraysAfterLength = useJsonViewerStore(store => store.groupArraysAfterLength)
  const [keyValues, rest] =
    useMemo(() => {
      const keyValues = Object.entries(props.value)
      const rest = keyValues.length - groupArraysAfterLength
      return Array.isArray(props.value)
        ? [
            keyValues.slice(0, groupArraysAfterLength),
            rest
          ]
        : [
            keyValues, 0
          ]
    }, [groupArraysAfterLength, props.value]
    )
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
          ? (
              keyValues.map(([key, value]) => {
                const path = [...props.path, key]
                return (
                  <DataKeyPair key={key} path={path} value={value}/>
                )
              })
            )
          : (
            <Box component='span' className='data-object-body'>
              ...
            </Box>
            )
      }
      {
        props.inspect && rest > 0
          ? (
          <Box
            component='span' className='data-array-rest'
            sx={{
              color: metadataColor
            }}
          >
            ... {rest} Items
          </Box>
            )
          : null
      }
    </Box>
  )
}
