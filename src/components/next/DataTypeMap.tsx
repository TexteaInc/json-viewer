import type React from 'react'
import { useMemo } from 'react'

import { matchType } from '../../stores/typeRegistry'
import type { DataItemProps } from '../../type'

export const DataTypeMap: React.FC<DataItemProps> = ({ value }) => {
  const CellType = useMemo(() => matchType(value), [value])
  return (
    CellType
      ? <CellType value={value}/>
      : <>{JSON.stringify(value)}</>
  )
}
