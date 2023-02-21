import type { JsonViewerProps } from '@ojemuyiwa/json-viewer'
import { JsonViewer } from '@ojemuyiwa/json-viewer'
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
