import type { JsonViewerProps } from '@ewe/json-viewer'
import { JsonViewer } from '@ewe/json-viewer'
import React from 'react'

export const JsonViewerPreview: React.FC<JsonViewerProps> = (props) => {
  return (
    <JsonViewer
      theme='auto'
      style={{
        fontSize: 12
      }}
      value={props.value}
    />
  )
}
