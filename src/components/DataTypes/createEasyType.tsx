import { InputBase } from '@mui/material'
import type { ChangeEventHandler, ComponentType, FC } from 'react'
import { memo, useCallback } from 'react'

import { useJsonViewerStore } from '../../stores/JsonViewerStore'
import type { Colorspace } from '../../theme/base16'
import type { DataItemProps, DataType, EditorProps } from '../../type'
import { DataTypeLabel } from '../DataTypeLabel'
import { DataBox } from '../mui/DataBox'

export function createEasyType<Value> (
  type: string,
  renderValue: ComponentType<Pick<DataItemProps<Value>, 'value'>>,
  config: {
    colorKey: keyof Colorspace
    fromString?: (value: string) => Value
    displayTypeLabel?: boolean
  }
): Omit<DataType<Value>, 'is'> {
  const { fromString, colorKey, displayTypeLabel = true } = config

  const Render = memo(renderValue)
  const EasyType: FC<DataItemProps<Value>> = (props) => {
    const storeDisplayDataTypes = useJsonViewerStore(store => store.displayDataTypes)
    const color = useJsonViewerStore(store => store.colorspace[colorKey])
    const onSelect = useJsonViewerStore(store => store.onSelect)

    return (
      <DataBox onClick={() => onSelect?.(props.path, props.value)} sx={{ color }}>
        {(displayTypeLabel && storeDisplayDataTypes) && <DataTypeLabel dataType={type} />}
        <DataBox className={`${type}-value`}>
          <Render value={props.value} />
        </DataBox>
      </DataBox>
    )
  }
  EasyType.displayName = `easy-${type}-type`

  if (!fromString) {
    return {
      Component: EasyType
    }
  }

  const EasyTypeEditor: FC<EditorProps<Value>> = ({ value, setValue }) => {
    const color = useJsonViewerStore(store => store.colorspace[colorKey])
    return (
      <InputBase
        value={value}
        onChange={
          useCallback<ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>>(
            (event) => {
              const value = fromString(event.target.value)
              setValue(value)
            }, [setValue]
          )
        }
        size='small'
        multiline
        sx={{
          color,
          padding: 0.5,
          borderStyle: 'solid',
          borderColor: 'black',
          borderWidth: 1,
          fontSize: '0.8rem',
          fontFamily: 'monospace',
          display: 'inline-flex'
        }}
      />
    )
  }
  EasyTypeEditor.displayName = `easy-${type}-type-editor`

  return {
    Component: EasyType,
    Editor: EasyTypeEditor
  }
}
