
import type { DataType } from '../../type'
import { createEasyType } from './createEasyType'

const displayOptions: Intl.DateTimeFormatOptions = {
  weekday: 'short',
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
}

export const dateType: DataType<Date> = {
  is: (value) => value instanceof Date,
  ...createEasyType(
    'date',
    ({ value }) => <>{value.toLocaleTimeString('en-us', displayOptions)}</>,
    {
      colorKey: 'base0D'
    }
  )
}
