import type { JsonViewerProps } from '@textea/json-viewer'
import { JsonViewer } from '@textea/json-viewer'
import type { FC } from 'react'

export const JsonViewerPreview: FC<JsonViewerProps> = (props) => {
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
