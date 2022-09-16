import type React from 'react'

import {
  useTypeComponents
} from '../../stores/typeRegistry'
import type { DataItemProps } from '../../type'

export const DataTypeMap: React.FC<DataItemProps> = ({ value }) => {
  const [Component] = useTypeComponents(value)
  return (
    Component
      ? <Component value={value}/>
      : <>{JSON.stringify(value)}</>
  )
}
