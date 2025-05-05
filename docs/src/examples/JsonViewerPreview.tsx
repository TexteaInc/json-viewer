'use client'

import type { JsonViewerProps } from '@textea/json-viewer'
import { JsonViewer } from '@textea/json-viewer'
import type { FC } from 'react'

import { useNextraTheme } from '../hooks/useTheme'

export const JsonViewerPreview: FC<JsonViewerProps> = (props) => {
  const theme = useNextraTheme()
  return (
    <JsonViewer
      theme={theme}
      sx={{
        fontSize: 12
      }}
      value={props.value}
    />
  )
}
