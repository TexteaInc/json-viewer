
import { defineEasyType } from './defineEasyType'

export const booleanType = defineEasyType<boolean>({
  is: (value) => typeof value === 'boolean',
  type: 'bool',
  colorKey: 'base0E',
  serialize: value => value.toString(),
  deserialize: value => {
    if (value === 'true') return true
    if (value === 'false') return false
    throw new Error('Invalid boolean value')
  },
  Renderer: ({ value }) => <>{value ? 'true' : 'false'}</>
})
