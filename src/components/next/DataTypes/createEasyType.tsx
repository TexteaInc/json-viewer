import React from 'react'

import { useJsonViewerStore } from '../../../stores/JsonViewerStore'
import type { ColorNamespace } from '../../../themes/base16/rjv-themes'
import type { DataItemProps } from '../../../type'
import { DataTypeLabel } from '../DataTypeLabel'
import { DataBox } from '../mui/DataBox'

export function createEasyType <Value> (
  type: string,
  renderValue: React.ComponentType<Pick<DataItemProps<Value>, 'value'>>,
  config: {
    colorKey: keyof ColorNamespace
    displayTypeLabel?: boolean
  }
): React.FC<DataItemProps<Value>> {
  const displayTypeLabel = config.displayTypeLabel ?? true
  const Render = React.memo(renderValue)
  const EasyType: React.FC<DataItemProps<Value>> = (props) => {
    const color = useJsonViewerStore(store => store.colorNamespace[config.colorKey])
    return (
      <DataBox
        sx={{
          color
        }}
      >
        {displayTypeLabel && <DataTypeLabel dataType={type} />}
        <DataBox className={`${type}-value`}>
          <Render value={props.value}/>
        </DataBox>
      </DataBox>
    )
  }
  EasyType.displayName = `easy-${type}-type`
  return EasyType
}
