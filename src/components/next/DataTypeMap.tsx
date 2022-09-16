import type React from 'react'

import {
  useTypeComponents
} from '../../stores/typeRegistry'
import type { DataItemProps } from '../../type'

export const DataTypeMap: React.FC<DataItemProps> = (props) => {
  const [Component] = useTypeComponents(props.value)
  return (
    Component
      ? <Component {...props}/>
      : <>{JSON.stringify(props.value)}</>
  )
}
