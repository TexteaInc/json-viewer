import { Box } from '@mui/material'
import type React from 'react'

import { useJsonViewerStore } from '../../../stores/JsonViewerStore'
import type { DataItemProps } from '../../../type'
import { DataTypeLabel } from '../DataTypeLabel'

const functionBody = (func: Function) => {
  const funcString = func.toString()

  return funcString.substring(
    funcString.indexOf('{', funcString.indexOf(')')) + 1,
    funcString.lastIndexOf('}')
  )
}

const functionName = (func: Function) => {
  return func.toString()
    .slice(9, -1)
    .replace(/\{[\s\S]+/, '')
}

const lb = '{'
const rb = '}'

export const PreFunctionType: React.FC<DataItemProps<Function>> = (props) => {
  return (
    <Box
      component='span' className='data-object-start'
      sx={{
        letterSpacing: 0.5
      }}
    >
      <DataTypeLabel dataType='function'/>
      {functionName(props.value)}
      {lb}
    </Box>
  )
}

export const PostFunctionType: React.FC<DataItemProps<Function>> = () => {
  return (
    <Box component='span' className='data-object-end'>
      {rb}
    </Box>
  )
}

export const FunctionType: React.FC<DataItemProps<Function>> = (props) => {
  const functionColor = useJsonViewerStore(store => store.colorNamespace.base05)
  return (
    <Box
      className='data-function'
      sx={{
        display: props.inspect ? 'block' : 'inline-block',
        pl: props.inspect ? 2 : 0,
        color: functionColor
      }}
    >
      {props.inspect
        ? functionBody(props.value)
        : (
          <Box component='span' className='data-object-body'>
            ...
          </Box>
          )
      }
    </Box>
  )
}
