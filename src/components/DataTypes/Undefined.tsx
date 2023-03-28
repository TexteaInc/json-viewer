import { Box } from '@mui/material'

import { useJsonViewerStore } from '../../stores/JsonViewerStore'
import type { DataType } from '../../type'
import { createEasyType } from './createEasyType'

export const undefinedType: DataType<undefined> = {
  is: (value) => value === undefined,
  ...createEasyType(
    'undefined',
    () => {
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
    },
    {
      colorKey: 'base05',
      displayTypeLabel: false
    }
  )
}
