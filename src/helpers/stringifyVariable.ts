import { toType } from './util'

const stringifyVariable = (value: any) => {
  const type = toType(value)
  let string_value
  switch (type) {
    case 'undefined': {
      string_value = 'undefined'
      break
    }
    case 'nan':
      string_value = 'NaN'
      break
    case 'string':
      string_value = value
      break
    case 'date':
      string_value = value.toString()
      break
    case 'function':
      string_value = value.toString()
      break
    case 'regexp':
      string_value = value.toString()
      break
    default: {
      try {
        string_value = JSON.stringify(value, null, '  ')
      } catch (e) {
        console.error(`cannot stringify value: ${value}`)
        string_value = ''
      }
    }
  }

  return string_value
}

export default stringifyVariable
