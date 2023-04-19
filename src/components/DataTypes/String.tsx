import { Box } from '@mui/material'
import { useState } from 'react'

import { useJsonViewerStore } from '../../stores/JsonViewerStore'
import { defineEasyType } from './defineEasyType'

export const stringType = defineEasyType<string>({
  is: (value) => typeof value === 'string',
  type: 'string',
  colorKey: 'base09',
  serialize: value => value,
  deserialize: value => value,
  Renderer: (props) => {
    const [showRest, setShowRest] = useState(false)
    const collapseStringsAfterLength = useJsonViewerStore(store => store.collapseStringsAfterLength)
    const value = showRest
      ? props.value
      : props.value.slice(0, collapseStringsAfterLength)
    const hasRest = props.value.length > collapseStringsAfterLength
    return (
      <Box
        component='span'
        sx={{
          overflowWrap: 'anywhere',
          cursor: hasRest ? 'pointer' : 'inherit'
        }}
        onClick={() => {
          if (hasRest) {
            setShowRest(value => !value)
          }
        }}
      >
        &quot;
        {value}
        {hasRest && !showRest && (<Box component='span' sx={{ padding: 0.5 }}>…</Box>)}
        &quot;
      </Box>
    )
  }
})
