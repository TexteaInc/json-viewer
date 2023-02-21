import Box from '@mui/material/Box'
import type { ComponentProps } from 'react'
import React from 'react'

type DataBoxProps = ComponentProps<typeof Box>

export const DataBox: React.FC<DataBoxProps> = props => (
  <Box
    component='div'
    {...props}
    sx={{
      display: 'inline-block',
      ...props.sx
    }}
  />
)
