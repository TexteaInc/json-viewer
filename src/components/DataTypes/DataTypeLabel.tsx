import type React from 'react'

import type { DataTypeLabelProps } from '../../types/data-type'
// theme
import Theme from './../../themes/getStyle'

export const DataTypeLabel: React.FC<DataTypeLabelProps> = ({
  type_name,
  displayDataTypes,
  theme
}) => {
  if (!displayDataTypes) {
    return null
  }
  return (
    <span
      className='data-type-label'{...Theme(theme, 'data-type-label')}
    >
      {type_name}
    </span>
  )
}
