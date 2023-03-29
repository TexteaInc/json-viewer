import { Box } from '@mui/material'

import { useJsonViewerStore } from '../../stores/JsonViewerStore'
import { createEasyType } from './createEasyType'

export const nullType = createEasyType<null>({
  is: (value) => value === null,
  type: 'null',
  colorKey: 'base08',
  displayTypeLabel: false,
  Renderer: () => {
    const backgroundColor = useJsonViewerStore(store => store.colorspace.base02)
    return (
      <Box
        sx={{
          fontSize: '0.8rem',
          backgroundColor,
          fontWeight: 'bold',
          borderRadius: '3px',
          padding: '0.5px 2px'
        }}
      >
        NULL
      </Box>
    )
  }
})
