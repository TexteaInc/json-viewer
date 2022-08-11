import type React from 'react'
import JsonViewer from '@textea/json-viewer'

const example = {
  string: 'this is a test string',
  integer: 42,
  array: [1, 2, 3, 'test', NaN],
  float: 3.14159,
  undefined: undefined,
  object: {
    'first-child': true,
    'second-child': false,
    'last-child': null
  },
  string_number: '1234',
  date: new Date()
}

const IndexPage: React.FC = () => {
  return (
    <div>
      <JsonViewer src={example}/>
    </div>
  )
}

export default IndexPage
