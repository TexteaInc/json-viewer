import type React from 'react'

import type { DataTypeProps } from '../../types/data-type'
// theme
import Theme from './../../themes/getStyle'
import { DataTypeLabel } from './DataTypeLabel'

export const JsonRegExp: React.FC<DataTypeProps<RegExp>> = (props) => {
  return (
    <div {...Theme(props.theme, 'regexp')}>
      <DataTypeLabel {...props} type_name='regexp'/>
      {props.value.toString()}
    </div>
  )
}
