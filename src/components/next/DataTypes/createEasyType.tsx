import React, { useMemo } from 'react'

import { useJsonViewerStore } from '../../../stores/JsonViewerStore'
import type { ColorNamespace } from '../../../themes/base16/rjv-themes'
import type { DataItemProps } from '../../../type'
import { DataTypeLabel } from '../DataTypeLabel'
import { DataBox } from '../mui/DataBox'

export function createEasyType <Value> (
  type: string,
  renderValue: (value: Value) => string,
  colorKey: keyof ColorNamespace
): React.FC<DataItemProps<Value>> {
  const EasyType: React.FC<DataItemProps<Value>> = (props) => {
    const color = useJsonViewerStore(store => store.colorNamespace[colorKey])
    const value = useMemo(() => renderValue(props.value), [props.value])
    return (
      <DataBox
        sx={{
          color
        }}
      >
        <DataTypeLabel dataType={type} />
        <DataBox className={`${type}-value`}>
          {value}
        </DataBox>
      </DataBox>
    )
  }
  EasyType.displayName = `easy-${type}-type`
  return EasyType
}
