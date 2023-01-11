import type { SvgIconProps } from '@mui/material'
import type React from 'react'

import BaseIcon from './BaseIcon'

const Close = 'M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'

const CloseIcon: React.FC<SvgIconProps> = (props) => {
  return <BaseIcon d={Close} {...props} />
}

export default CloseIcon
