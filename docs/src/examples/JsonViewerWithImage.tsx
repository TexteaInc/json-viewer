'use client'

import { defineDataType, JsonViewer } from '@textea/json-viewer'
import type { FC } from 'react'

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
  return (
    <JsonViewer
      rootName={false}
      displaySize={false}
      value={value}
      valueTypes={[imageType]}
    />
  )
}

export default Example
