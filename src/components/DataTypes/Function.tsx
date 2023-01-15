/**
 * Use NoSsr on function value.
 *  Because in Next.js SSR, the function will be translated to other type
 */
import { Box, NoSsr } from '@mui/material'
import React from 'react'

import { useJsonViewerStore } from '../../stores/JsonViewerStore'
import type { DataItemProps } from '../../type'
import { DataTypeLabel } from '../DataTypeLabel'

const functionBody = (func: Function) => {
  const funcString = func.toString()

  let isUsualFunction = true
  const parenthesisPos = funcString.indexOf(')')
  const arrowPos = funcString.indexOf('=>')
  if (arrowPos !== -1 && arrowPos > parenthesisPos) {
    isUsualFunction = false
  }
  if (isUsualFunction) {
    return funcString.substring(
      funcString.indexOf('{', parenthesisPos) + 1,
      funcString.lastIndexOf('}')
    )
  }

  return funcString.substring(funcString.indexOf('=>') + 2)
}

const functionName = (func: Function) => {
  const funcString = func.toString()
  const isUsualFunction = funcString.indexOf('function') !== -1
  if (isUsualFunction) {
    return funcString.substring(8, funcString.indexOf('{')).trim()
  }

  return funcString.substring(0, funcString.indexOf('=>') + 2).trim()
}

const lb = '{'
const rb = '}'

export const PreFunctionType: React.FC<DataItemProps<Function>> = (props) => {
  return (
    <NoSsr>
      <DataTypeLabel dataType='function'/>
      <Box
        component='span' className='data-function-start'
        sx={{
          letterSpacing: 0.5
        }}
      >
        {functionName(props.value)}
        {' '}{lb}
      </Box>
    </NoSsr>
  )
}

export const PostFunctionType: React.FC<DataItemProps<Function>> = () => {
  return (
    <NoSsr>
      <Box component='span' className='data-function-end'>
        {rb}
      </Box>
    </NoSsr>
  )
}

export const FunctionType: React.FC<DataItemProps<Function>> = (props) => {
  const functionColor = useJsonViewerStore(store => store.colorspace.base05)
  return (
    <NoSsr>
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
            <Box component='span' className='data-function-body'
                 onClick={() => props.setInspect(true)}
                 sx={{
                   '&:hover': { cursor: 'pointer' },
                   padding: 0.5
                 }}
            >
              …
            </Box>
            )
        }
      </Box>
    </NoSsr>
  )
}
