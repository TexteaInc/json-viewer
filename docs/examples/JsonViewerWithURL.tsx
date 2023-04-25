import { defineDataType, JsonViewer } from '@textea/json-viewer'
import type { FC } from 'react'

import { useNextraTheme } from '../hooks/useTheme'

const urlType = defineDataType<URL>({
  is: (value) => value instanceof URL,
  Component: (props) => {
    const url = props.value.toString()
    return (
      <a
        href={url}
        target='_blank'
        rel='noopener noreferrer'
        style={{
          cursor: 'pointer',
          color: '#1976d2',
          textDecoration: 'underline'
        }}
      >
        {url}
      </a>
    )
  }
})

const value = {
  string: 'this is a string',
  url: new URL('https://example.com')
}

const Example: FC = () => {
  const theme = useNextraTheme()
  return (
    <JsonViewer
      rootName={false}
      displaySize={false}
      theme={theme}
      value={value}
      valueTypes={[urlType]}
    />
  )
}

export default Example
