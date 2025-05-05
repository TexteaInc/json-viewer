'use client'

import type { SvgIconProps } from '@mui/material'
import { Button, SvgIcon } from '@mui/material'
import { defineDataType, JsonViewer, stringType } from '@textea/json-viewer'
import type { FC } from 'react'

import { useNextraTheme } from '../hooks/useTheme'

const LinkIcon = (props: SvgIconProps) => (
  // <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' strokeWidth='2' stroke='currentColor' fill='none' strokeLinecap='round' strokeLinejoin='round'>
  <SvgIcon {...props}>
    <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
    <path stroke='currentcolor' d='M11 7h-5a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-5' fill='none'></path>
    <path stroke='currentcolor' d='M10 14l10 -10'></path>
    <path stroke='currentcolor' d='M15 4l5 0l0 5' fill='none'></path>
  </SvgIcon>
)

const linkType = defineDataType<string>({
  ...stringType,
  is (value) {
    return typeof value === 'string' && value.startsWith('http')
  },
  PostComponent: (props) => (
    <Button
      variant='contained'
      size='small'
      href={props.value}
      target='_blank'
      rel='noopener noreferrer'
      sx={{
        display: 'inline-block',
        marginLeft: 1
      }}
    >
      Open
      <LinkIcon sx={{ strokeWidth: 2 }} />
    </Button>
  )
})

const value = {
  link: 'http://example.com'
}

const Example: FC = () => {
  const theme = useNextraTheme()
  return (
    <JsonViewer
      rootName={false}
      displaySize={false}
      theme={theme}
      value={value}
      valueTypes={[linkType]}
    />
  )
}

export default Example
