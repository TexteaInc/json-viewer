import React, { useMemo } from 'react'

import { useJsonViewerStore } from '../../../stores/JsonViewerStore'
import type { DataItemProps } from '../../../type'
import { DataTypeLabel } from '../DataTypeLabel'
import { DataBox } from '../mui/DataBox'

const displayOptions: Intl.DateTimeFormatOptions = {
  weekday: 'short',
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
}

export const DateType: React.FC<DataItemProps<Date>> = (props) => {
  const color = useJsonViewerStore(store => store.colorNamespace.base0D)
  const value = useMemo(
    () => props.value.toLocaleTimeString('en-us', displayOptions),
    [props.value]
  )
  return (
    <DataBox sx={{
      color
    }}>
      <DataTypeLabel dataType='date'/>
      <DataBox className='date-value'>
        {value}
      </DataBox>
    </DataBox>
  )
}
