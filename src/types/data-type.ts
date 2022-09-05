import type { ReactJsonViewProps } from '../type'

type TODO = any
export type Theme = TODO

export type DataTypeLabelProps = {
  type_name: string
  displayDataTypes: boolean
  theme: Theme
}

export type DataTypeProps<Value = any> = DataTypeLabelProps & {
  rjvId: string
  namespace: string
  collapseStringsAfterLength: ReactJsonViewProps['collapseStringsAfterLength']
  theme: Theme
  value: Value
}
