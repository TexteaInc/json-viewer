import type React from 'react'

import type { DataTypeProps } from '../../types/data-type'
// theme
import Theme from './../../themes/getStyle'
import { DataTypeLabel } from './DataTypeLabel'

export const JsonInteger: React.FC<DataTypeProps<number>> = (props) => {
  return (
    <div {...Theme(props.theme, 'integer')}>
      <DataTypeLabel {...props} type_name='integer'/>
      {props.value}
    </div>
  )
}
