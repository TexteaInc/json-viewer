import { Box } from '@mui/material'
import type React from 'react'
import { useMemo } from 'react'

import { useJsonViewerStore } from '../../stores/JsonViewerStore'
import { matchType } from '../../stores/typeRegistry'
import { DataBox } from './mui/DataBox'

export type DataKeyPairProps = {
  dataKey: string
  value: unknown
}

export const DataKeyPair: React.FC<DataKeyPairProps> = ({ dataKey, value }) => {
  const keyColor = useJsonViewerStore(store => store.colorNamespace.base07)
  const CellType = useMemo(() => matchType(value), [value])
  return (
    <Box>
      <DataBox component='span' className='data-key' sx={{
        color: keyColor,
        letterSpacing: 0.5,
        opacity: 0.8
      }}>
        &quot;{dataKey}&quot;
      </DataBox>
      <DataBox sx={{ mx: 0.5 }} >:</DataBox>
      <DataBox className='data-value'>
        {
          CellType
            ? <CellType value={value}/>
            : <>{JSON.stringify(value)}</>
        }
      </DataBox>
    </Box>
  )
}
