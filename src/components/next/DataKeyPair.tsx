import { Box } from '@mui/material'
import type React from 'react'
import { useCallback, useState } from 'react'

import { useTextColor } from '../../hooks/useColor'
import { useTypeComponents } from '../../stores/typeRegistry'
import type { DataItemProps } from '../../type'
import { DataBox } from './mui/DataBox'

export type DataKeyPairProps = {
  dataKey: string
  value: unknown
}

export const DataKeyPair: React.FC<DataKeyPairProps> = ({ dataKey, value }) => {
  const [shouldInspect, setShouldInspect] = useState(false)
  const keyColor = useTextColor()
  const [Component, PreComponent, PostComponent] = useTypeComponents(value)
  const downstreamProps: DataItemProps = {
    inspect: shouldInspect,
    value
  }
  return (
    <Box className='data-key-pair'>
      <DataBox
        component='span'
        className='data-key'
        sx={{
          color: keyColor,
          letterSpacing: 0.5,
          opacity: 0.8
        }}
        onClick={useCallback(() => {
          setShouldInspect(state => !state)
        }, [])}
      >
        &quot;{dataKey}&quot;
        <DataBox sx={{ mx: 0.5 }}>:</DataBox>
        {PreComponent && <PreComponent {...downstreamProps}/>}
      </DataBox>
      {
        Component
          ? <Component {...downstreamProps}/>
          : <>{JSON.stringify(value)}</>
      }
      {PostComponent && <PostComponent {...downstreamProps}/>}
    </Box>
  )
}
