import { SvgIcon, SvgIconProps } from '@mui/material'
import type React from 'react'

const BaseIcon: React.FC<SvgIconProps> = ({ d, ...props }) => {
  return (
    <SvgIcon {...props}>
      <path d={d}/>
    </SvgIcon>
  )
}

export default BaseIcon
