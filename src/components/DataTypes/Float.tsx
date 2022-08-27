import type React from 'react'

import type { DataTypeProps } from '../../types/data-type'
// theme
import Theme from './../../themes/getStyle'
import { DataTypeLabel } from './DataTypeLabel'

export const JsonFloat: React.FC<DataTypeProps<number>> = (props) => {
  return (
    <div {...Theme(props.theme, 'float')}>
      <DataTypeLabel {...props} type_name='float'/>
      {props.value}
    </div>
  )
}
