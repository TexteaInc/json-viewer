import { defineDataType, JsonViewer } from '@textea/json-viewer'
import type { FC } from 'react'

import { useNextraTheme } from '../hooks/useTheme'

const imageType = defineDataType<string>({
  is: (value) => {
    if (typeof value !== 'string') return false
    try {
      const url = new URL(value)
      return url.pathname.endsWith('.jpg')
    } catch {
      return false
    }
  },
  Component: (props) => {
    return (
      <img
        height={48}
        width={48}
        src={props.value}
        alt={props.value}
        style={{ display: 'inline-block' }}
      />
    )
  }
})

const value = {
  image: 'https://i.imgur.com/1bX5QH6.jpg'
}

const Example: FC = () => {
  const theme = useNextraTheme()
  return (
    <JsonViewer
      rootName={false}
      displaySize={false}
      theme={theme}
      value={value}
      valueTypes={[imageType]}
    />
  )
}

export default Example
