import type { SvgIconProps } from '@mui/material'
import type React from 'react'

import BaseIcon from './BaseIcon'

const ExpandMore = 'M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z'

const ExpandMoreIcon: React.FC<SvgIconProps> = (props) => {
  return <BaseIcon d={ExpandMore} {...props} />
}

export default ExpandMoreIcon
