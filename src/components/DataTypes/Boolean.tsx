import type React from 'react'

import type { DataTypeProps } from '../../types/data-type'
// theme
import Theme from './../../themes/getStyle'
import { DataTypeLabel } from './DataTypeLabel'

export const Boolean: React.FC<DataTypeProps<boolean>> = (props) => {
  return (
    <div {...Theme(props.theme, 'boolean')}>
      <DataTypeLabel {...props} type_name='bool'/>
      {props.value ? 'true' : 'false'}
    </div>
  )
}
