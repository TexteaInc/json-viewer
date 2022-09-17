import { Box } from '@mui/material'
import React, { useMemo } from 'react'

import { useTextColor } from '../../hooks/useColor'
import { useJsonViewerStore } from '../../stores/JsonViewerStore'
import type { DataItemProps } from '../../type'

const lb = '{'
const rb = '}'

export const PreObjectType: React.FC<DataItemProps<object>> = (props) => {
  const metadataColor = useJsonViewerStore(store => store.colorNamespace.base04)
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
      {lb}
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
  const sizeOfValue = useMemo(
    () => !props.inspect ? `${Object.keys(props.value).length} Items` : '',
    [props.inspect, props.value]
  )
  return (
    <Box component='span' className='data-object-end'>
      {rb}
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

const KeyPair = React.lazy(() => import('../DataKeyPair').then(
  ({ DataKeyPair }) => ({ default: DataKeyPair })))

export const ObjectType: React.FC<DataItemProps<object>> = (props) => {
  const keyColor = useTextColor()
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
              Object.entries(props.value).map(([key, value]) => {
                const path = [...props.path, key]
                return <KeyPair key={key} path={path} value={value}/>
              })
            )
          : (
            <Box component='span' className='data-object-body'>
              ...
            </Box>
            )
      }
    </Box>
  )
}
