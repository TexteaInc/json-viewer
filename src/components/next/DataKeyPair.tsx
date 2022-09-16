import { Box } from '@mui/material'
import type React from 'react'

import { useTextColor } from '../../hooks/useColor'
import { DataTypeMap } from './DataTypeMap'
import { DataBox } from './mui/DataBox'

export type DataKeyPairProps = {
  dataKey: string
  value: unknown
}

export const DataKeyPair: React.FC<DataKeyPairProps> = ({ dataKey, value }) => {
  const keyColor = useTextColor()
  return (
    <Box className='data-key-pair'>
      <DataBox component='span' className='data-key' sx={{
        color: keyColor,
        letterSpacing: 0.5,
        opacity: 0.8
      }}>
        &quot;{dataKey}&quot;
        <DataBox sx={{ mx: 0.5 }}>:</DataBox>
      </DataBox>
      <DataTypeMap value={value}/>
    </Box>
  )
}
