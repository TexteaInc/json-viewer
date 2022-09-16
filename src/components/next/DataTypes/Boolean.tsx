import type React from 'react'
import { useMemo } from 'react'

import { useJsonViewerStore } from '../../../stores/JsonViewerStore'
import type { DataItemProps } from '../../../type'
import { DataTypeLabel } from '../DataTypeLabel'
import { DataBox } from '../mui/DataBox'

export const BooleanType: React.FC<DataItemProps<boolean>> = (props) => {
  const color = useJsonViewerStore(store => store.colorNamespace.base0E)
  const value = useMemo(() => props.value ? 'true' : 'false', [props.value])
  return (
    <DataBox
      sx={{
        color
      }}
    >
      <DataTypeLabel dataType='bool'/>
      <DataBox className='boolean-value'>
        {value}
      </DataBox>
    </DataBox>
  )
}
