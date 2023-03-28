import { Box } from '@mui/material'

import { useJsonViewerStore } from '../../stores/JsonViewerStore'
import type { DataType } from '../../type'
import { createEasyType } from './createEasyType'

const isInt = (n: number) => n % 1 === 0

export const nanType: DataType<number> = {
  is: (value) => typeof value === 'number' && isNaN(value),
  ...createEasyType(
    'NaN',
    () => {
      const backgroundColor = useJsonViewerStore(store => store.colorspace.base02)
      return (
        <Box
          sx={{
            backgroundColor,
            fontSize: '0.8rem',
            fontWeight: 'bold',
            borderRadius: '3px'
          }}
        >
          NaN
        </Box>
      )
    },
    {
      colorKey: 'base08',
      displayTypeLabel: false
    }
  )
}

export const floatType: DataType<number> = {
  is: (value) => typeof value === 'number' && !isInt(value),
  ...createEasyType(
    'float',
    ({ value }) => <>{value}</>,
    {
      colorKey: 'base0B',
      fromString: value => parseFloat(value)
    }
  )
}

export const intType: DataType<number> = {
  is: (value) => typeof value === 'number' && isInt(value),
  ...createEasyType(
    'int',
    ({ value }) => <>{value}</>,
    {
      colorKey: 'base0F',
      fromString: value => parseInt(value)
    }
  )
}

export const bigIntType: DataType<bigint> = {
  is: (value) => typeof value === 'bigint',
  ...createEasyType(
    'bigint',
    ({ value }) => <>{`${value}n`}</>,
    {
      colorKey: 'base0F',
      fromString: value => BigInt(value.replace(/\D/g, ''))
    }
  )
}
