import { Box } from '@mui/material'
import React, { useMemo } from 'react'

import { useTextColor } from '../../hooks/useColor'
import { useJsonViewerStore } from '../../stores/JsonViewerStore'
import type { DataItemProps } from '../../type'
import { DataKeyPair } from '../DataKeyPair'

const arrayLb = '['
const arrayRb = ']'

export const PreArrayType: React.FC<DataItemProps<unknown[]>> = (props) => {
  const metadataColor = useJsonViewerStore(store => store.colorNamespace.base04)
  const sizeOfValue = useMemo(
    () => props.inspect ? `${Object.keys(props.value).length} Items` : '',
    [props.inspect, props.value]
  )
  return (
    <Box
      component='span' className='data-array-start'
      sx={{
        letterSpacing: 0.5
      }}
    >
      {arrayLb}
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

export const PostArrayType: React.FC<DataItemProps<unknown[]>> = (props) => {
  const metadataColor = useJsonViewerStore(store => store.colorNamespace.base04)
  const sizeOfValue = useMemo(
    () => !props.inspect ? `${Object.keys(props.value).length} Items` : '',
    [props.inspect, props.value]
  )
  return (
    <Box component='span' className='data-array-end'>
      {arrayRb}
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

export const ArrayType: React.FC<DataItemProps<unknown[]>> = (props) => {
  const keyColor = useTextColor()
  const groupArraysAfterLength = useJsonViewerStore(store => store.groupArraysAfterLength)
  const elements = useMemo(() => {
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
  }, [props.path, props.value, groupArraysAfterLength])
  return (
    <Box
      className='data-array'
      sx={{
        display: props.inspect ? 'block' : 'inline-block',
        pl: props.inspect ? 2 : 0,
        color: keyColor
      }}
    >
      {
        props.inspect
          ? elements
          : (
            <Box component='span' className='data-array-body'>
              ...
            </Box>
            )
      }
    </Box>
  )
}
