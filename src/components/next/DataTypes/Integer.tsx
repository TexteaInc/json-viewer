import type React from 'react'

import { useJsonViewerStore } from '../../../stores/JsonViewerStore'
import type { DataItemProps } from '../../../type'
import { DataTypeLabel } from '../DataTypeLabel'
import { DataBox } from '../mui/DataBox'

export const IntegerType: React.FC<DataItemProps<number>> = (props) => {
  const color = useJsonViewerStore(store => store.colorNamespace.base0F)
  const value = props.value
  return (
    <DataBox sx={{
      color
    }}>
      <DataTypeLabel dataType='integer'/>
      <DataBox className='date-value'>
        {value}
      </DataBox>
    </DataBox>
  )
}
