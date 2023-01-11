import type { SvgIconProps } from '@mui/material'
import type React from 'react'

import BaseIcon from './BaseIcon'

const Check = 'M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z'

const CheckIcon: React.FC<SvgIconProps> = (props) => {
  return <BaseIcon d={Check} {...props} />
}

export default CheckIcon
