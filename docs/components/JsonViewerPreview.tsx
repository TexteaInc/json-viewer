import { JsonViewer, JsonViewerProps } from '@textea/json-viewer'
import type React from 'react'

export const JsonViewerPreview: React.FC<JsonViewerProps> = (props) => {
  return (
    <JsonViewer
      style={{
        fontSize: 12
      }}
      value={props.value}
    />
  )
}
