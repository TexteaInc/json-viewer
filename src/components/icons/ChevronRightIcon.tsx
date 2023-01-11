import type { SvgIconProps } from '@mui/material'
import type React from 'react'

import BaseIcon from './BaseIcon'

const ChevronRight = 'M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z'

const ChevronRightIcon: React.FC<SvgIconProps> = (props) => {
  return <BaseIcon d={ChevronRight} {...props} />
}

export default ChevronRightIcon
