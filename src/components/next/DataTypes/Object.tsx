import { Box } from '@mui/material'
import type React from 'react'
import { useMemo } from 'react'

import { useTextColor } from '../../../hooks/useColor'
import type { DataItemProps } from '../../../type'
import { DataKeyPair } from '../DataKeyPair'

const lb = '{'
const rb = '}'

export const PreObjectType: React.FC<DataItemProps<object>> = (props) => {
  return (
    <Box
      component='span' className='data-object-start'
      sx={{
        letterSpacing: 0.5
      }}
    >
      {lb}
    </Box>
  )
}

export const PostObjectType: React.FC<DataItemProps<object>> = (props) => {
  return (
    <Box component='span' className='data-object-end'>
      {rb}
    </Box>
  )
}

export const ObjectType: React.FC<DataItemProps<object>> = (props) => {
  // todo: move expanded into props.inspect
  const keyColor = useTextColor()
  const elements = useMemo(() => {
    return Object.entries(props.value).map(([key, value]) => {
      return <DataKeyPair key={key} dataKey={key} value={value}/>
    })
  }, [props.value])
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
          : (
            <Box component='span' className='data-object-body'>
              ...
            </Box>
            )
      }
    </Box>
  )
}
