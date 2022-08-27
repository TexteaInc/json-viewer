import type React from 'react'

import type { DataTypeProps } from '../../types/data-type'
// theme
import Theme from './../../themes/getStyle'

export const JsonUndefined: React.FC<DataTypeProps<undefined>> = (props) => {
  return (<div {...Theme(props.theme, 'undefined')}>undefined</div>)
}
