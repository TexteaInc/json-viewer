import { render } from '@testing-library/react'
import React from 'react'
import { test } from 'vitest'

import { JsonViewer } from '../src'

test('simple render', () => {
  render(<JsonViewer value={undefined}/>)
})
