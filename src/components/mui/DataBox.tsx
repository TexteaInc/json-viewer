import { Box } from '@mui/material'
import type { ComponentProps, ElementType, FC } from 'react'

type DataBoxProps = ComponentProps<typeof Box> & {
  component?: ElementType
}

export const DataBox: FC<DataBoxProps> = props => (
  <Box
    component='div'
    {...props}
    sx={{
      display: 'inline-block',
      ...props.sx
    }}
  />
)
