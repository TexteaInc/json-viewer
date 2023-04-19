import { Box } from '@mui/material'

import { useJsonViewerStore } from '../../stores/JsonViewerStore'
import { defineEasyType } from './defineEasyType'

export const undefinedType = defineEasyType<undefined>({
  is: (value) => value === undefined,
  type: 'undefined',
  colorKey: 'base05',
  displayTypeLabel: false,
  Renderer: () => {
    const backgroundColor = useJsonViewerStore(store => store.colorspace.base02)
    return (
      <Box
        sx={{
          fontSize: '0.7rem',
          backgroundColor,
          borderRadius: '3px',
          padding: '0.5px 2px'
        }}
      >
        undefined
      </Box>
    )
  }
})
