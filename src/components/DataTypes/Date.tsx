import type React from 'react'

import type { DataTypeProps } from '../../types/data-type'
// theme
import Theme from './../../themes/getStyle'
import { DataTypeLabel } from './DataTypeLabel'

const display_options = {
  weekday: 'short',
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
} as const

export const JsonDate: React.FC<DataTypeProps<Date>> = (props) => {
  return (
    <div {...Theme(props.theme, 'date')}>
      <DataTypeLabel {...props} type_name='date'/>
      <span className='date-value' {...Theme(props.theme, 'date-value')}>
        {props.value.toLocaleTimeString('en-us', display_options)}
      </span>
    </div>
  )
}
