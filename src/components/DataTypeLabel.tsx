import React from 'react'

import { DataBox } from './mui/DataBox'

export type DataLabelProps = {
  dataType: string
  enable?: boolean
}

export const DataTypeLabel: React.FC<DataLabelProps> = ({
  dataType
  , enable = true
}) => {
  if (!enable) {
    return null
  }
  return (
    <DataBox
      className='data-type-label'
      sx={{
        mx: 0.5,
        fontSize: '0.7rem',
        opacity: 0.8
      }}
    >{dataType}</DataBox>
  )
}
