import type { JsonViewerProps, JsonViewerTheme } from '@textea/json-viewer'
import { JsonViewer } from '@textea/json-viewer'
import { useTheme } from 'nextra-theme-docs'
import type { FC } from 'react'

export const JsonViewerPreview: FC<JsonViewerProps> = (props) => {
  const { theme, systemTheme } = useTheme()
  const currentTheme = (theme === 'system' ? systemTheme : theme) as JsonViewerTheme
  return (
    <JsonViewer
      theme={currentTheme}
      sx={{
        fontSize: 12
      }}
      value={props.value}
    />
  )
}
