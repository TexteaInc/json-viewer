import type { SvgIconProps } from '@mui/material'
import type React from 'react'

import BaseIcon from './BaseIcon'

const ContentCopy = 'M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z'

const ContentCopyIcon: React.FC<SvgIconProps> = (props) => {
  return <BaseIcon d={ContentCopy} {...props} />
}

export default ContentCopyIcon
