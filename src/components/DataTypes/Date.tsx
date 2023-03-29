
import { createEasyType } from './createEasyType'

const displayOptions: Intl.DateTimeFormatOptions = {
  weekday: 'short',
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
}

export const dateType = createEasyType<Date>({
  is: (value) => value instanceof Date,
  type: 'date',
  colorKey: 'base0D',
  Renderer: ({ value }) => <>{value.toLocaleTimeString('en-us', displayOptions)}</>
})
