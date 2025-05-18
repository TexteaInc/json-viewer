'use client'

import { defineEasyType, JsonViewer } from '@textea/json-viewer'
import type { FC } from 'react'

const myDateType = defineEasyType<Date>({
  is: (value) => value instanceof Date,
  type: 'date',
  colorKey: 'base0D',
  Renderer: ({ value }) => <>{value.toISOString().split('T')[0]}</>
})

const value = {
  date: new Date('2023/04/12 12:34:56')
}

const Example: FC = () => {
  return (
    <JsonViewer
      rootName={false}
      displaySize={false}
      value={value}
      valueTypes={[myDateType]}
    />
  )
}

export default Example
