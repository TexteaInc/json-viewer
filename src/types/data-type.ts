type TODO = any
export type Theme = TODO

export type DataTypeLabelProps = {
  type_name: string
  displayDataTypes: boolean
  theme: Theme
}

export type DataTypeProps<Value = any> = DataTypeLabelProps & {
  theme: Theme
  value: Value
}
