import { InputBase } from '@mui/material'
import type { ChangeEventHandler, ComponentType, FC } from 'react'
import { memo, useCallback } from 'react'

import { useJsonViewerStore } from '../../stores/JsonViewerStore'
import type { Colorspace } from '../../theme/base16'
import type { DataItemProps, DataType, EditorProps } from '../../type'
import { DataTypeLabel } from '../DataTypeLabel'
import { DataBox } from '../mui/DataBox'

type EasyTypeConfig<Value> = Pick<DataType<Value>, 'is' | 'serialize' | 'deserialize'> & {
  type: string
  colorKey: keyof Colorspace
  displayTypeLabel?: boolean
  Renderer: ComponentType<Pick<DataItemProps<Value>, 'value'>>
}
export function createEasyType<Value> ({
  is,
  serialize,
  deserialize,
  type,
  colorKey,
  displayTypeLabel = true,
  Renderer
}: EasyTypeConfig<Value>): DataType<Value> {
  const Render = memo(Renderer)
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

  if (!serialize || !deserialize) {
    return {
      is,
      Component: EasyType
    }
  }

  const EasyTypeEditor: FC<EditorProps<string>> = ({ value, setValue }) => {
    const color = useJsonViewerStore(store => store.colorspace[colorKey])
    return (
      <InputBase
        value={value}
        onChange={
          useCallback<ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>>(
            (event) => {
              setValue(event.target.value)
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
    is,
    serialize,
    deserialize,
    Component: EasyType,
    Editor: EasyTypeEditor
  }
}
