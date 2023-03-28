import { Box } from '@mui/material'

import { useJsonViewerStore } from '../../stores/JsonViewerStore'
import type { DataType } from '../../type'
import { createEasyType } from './createEasyType'

export const nullType: DataType<null> = {
  is: (value) => value === null,
  ...createEasyType(
    'null',
    () => {
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
    },
    {
      colorKey: 'base08',
      displayTypeLabel: false
    }
  )
}
