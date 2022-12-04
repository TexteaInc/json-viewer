import { InputBase } from '@mui/material'
import React, { useCallback } from 'react'

import { useJsonViewerStore } from '../../stores/JsonViewerStore'
import type { Colorspace } from '../../theme/base16'
import type { DataItemProps, DataType, EditorProps } from '../../type'
import { DataTypeLabel } from '../DataTypeLabel'
import { DataBox } from '../mui/DataBox'

export function createEasyType<Value> (
  type: string,
  renderValue: React.ComponentType<Pick<DataItemProps<Value>, 'value'>>,
  config: {
    colorKey: keyof Colorspace
    fromString?: (value: string) => Value
    displayTypeLabel?: boolean
  }
): Omit<DataType<Value>, 'is'> {
  const displayTypeLabel = config.displayTypeLabel ?? true
  const Render = React.memo(renderValue)
  const EasyType: React.FC<DataItemProps<Value>> = (props) => {
    const storeDisplayDataTypes = useJsonViewerStore(store => store.displayDataTypes)
    const color = useJsonViewerStore(
      store => store.colorspace[config.colorKey])
    return (
      <DataBox
        sx={{
          color
        }}
      >
        {(displayTypeLabel && storeDisplayDataTypes) && <DataTypeLabel dataType={type}/>}
        <DataBox className={`${type}-value`}>
          <Render value={props.value}/>
        </DataBox>
      </DataBox>
    )
  }
  EasyType.displayName = `easy-${type}-type`
  if (!config.fromString) {
    return {
      Component: EasyType
    }
  }
  const fromString = config.fromString
  const EasyTypeEditor: React.FC<EditorProps<Value>> = ({ value, setValue }) => {
    const color = useJsonViewerStore(
      store => store.colorspace[config.colorKey])
    return (
      <InputBase
        value={value}
        onChange={
          useCallback<React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>>(
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
