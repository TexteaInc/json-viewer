import { Box } from '@mui/material'
import type React from 'react'
import { useMemo, useState } from 'react'

import { useTextColor } from '../../../hooks/useColor'
import { useJsonViewerStore } from '../../../stores/JsonViewerStore'
import type { DataItemProps } from '../../../type'
import { DataKeyPair } from '../DataKeyPair'

const lb = '{'
const rb = '}'

export const ObjectType: React.FC<DataItemProps<object>> = (props) => {
  const [expanded, setExpand] = useState(false)
  const src = useJsonViewerStore(store => store.src)
  const isRoot = src === props.value
  const keyColor = useTextColor()
  const elements = useMemo(() => {
    console.log(props.value)
    return Object.entries(props.value).map(([key, value]) => {
      return <DataKeyPair key={key} dataKey={key} value={value}/>
    })
  }, [props.value])
  return (
    <Box
      className='data-object'
      sx={{
        display: expanded ? 'block' : 'inline-block',
        color: keyColor
      }}
    >
      <Box
        component='span' className='data-object-start'
        onClick={() => {
          setExpand(state => !state)
        }}
        sx={{
          letterSpacing: 0.5
        }}
      >
        {isRoot && '"root" :'}{lb}
      </Box>
      {
        expanded
          ? elements
          : (
            <Box component='span' className='data-object-body'>
              ...
            </Box>
            )}
      <Box component='span' className='data-object-end'>
        {rb}
      </Box>
    </Box>
  )
}
