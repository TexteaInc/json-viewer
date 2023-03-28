
import type { DataType } from '../../type'
import { createEasyType } from './createEasyType'

export const booleanType: DataType<boolean> = {
  is: (value) => typeof value === 'boolean',
  ...createEasyType(
    'bool',
    ({ value }) => <>{value ? 'true' : 'false'}</>,
    {
      colorKey: 'base0E',
      fromString: value => Boolean(value)
    }
  )
}
