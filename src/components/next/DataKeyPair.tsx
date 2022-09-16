import { Box } from '@mui/material'
import type React from 'react'
import { useCallback, useState } from 'react'

import { useTextColor } from '../../hooks/useColor'
import { useJsonViewerStore } from '../../stores/JsonViewerStore'
import { useTypeComponents } from '../../stores/typeRegistry'
import type { DataItemProps } from '../../type'
import { DataBox } from './mui/DataBox'

export type DataKeyPairProps = {
  value: unknown
  path: string[]
}

export const DataKeyPair: React.FC<DataKeyPairProps> = ({
  value,
  path
}) => {
  const key = path[path.length - 1]
  const [inspect, setInspect] = useState(
    !useJsonViewerStore(store => store.defaultCollapsed)
  )
  const keyColor = useTextColor()
  const numberKeyColor = useJsonViewerStore(
    store => store.colorNamespace.base0C)
  const [Component, PreComponent, PostComponent] = useTypeComponents(value)
  const rootName = useJsonViewerStore(store => store.rootName)
  const isRoot = useJsonViewerStore(store => store.value) === value
  const isNumberKey = Number.isInteger(Number(key))
  const displayKey = isRoot ? rootName : key
  const downstreamProps: DataItemProps = {
    path,
    inspect,
    setInspect,
    value
  }
  return (
    <Box className='data-key-pair'>
      <DataBox
        component='span'
        className='data-key'
        sx={{
          lineHeight: 1.5,
          color: keyColor,
          letterSpacing: 0.5,
          opacity: 0.8
        }}
        onClick={
          useCallback(() => {
            setInspect(state => !state)
          }, [])
        }
      >
        {isNumberKey
          ? <Box component='span'
                 style={{ color: numberKeyColor }}>{displayKey}</Box>
          : <>&quot;{displayKey}&quot;</>
        }
        <DataBox sx={{ mx: 0.5 }}>:</DataBox>
        {PreComponent && <PreComponent {...downstreamProps}/>}
      </DataBox>
      {
        Component
          ? <Component {...downstreamProps}/>
          : <Box component='span'
                 className='data-value-fallback'>{JSON.stringify(value)}</Box>
      }
      {PostComponent && <PostComponent {...downstreamProps}/>}
    </Box>
  )
}
