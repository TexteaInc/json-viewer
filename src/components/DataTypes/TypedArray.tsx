import { Box } from '@mui/material'
import type React from 'react'
import { memo, useMemo } from 'react'

import { useTextColor } from '../../hooks/useColor'
import { useJsonViewerStore } from '../../stores/JsonViewerStore'
import type { DataItemProps } from '../../type'

const piece = 0x00000004 as const

export type TypedArray = Int8Array | Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array | Uint8ClampedArray | Float32Array | Float64Array
export const TypedArrayType: React.FC<DataItemProps<TypedArray>> = memo(
  (props) => {
    const keyColor = useTextColor()
    const borderColor = useJsonViewerStore(store => store.colorspace.base02)
    const marginLeft = props.inspect ? 0.6 : 0
    const width = useJsonViewerStore(store => store.indentWidth)
    const indentWidth = props.inspect ? width - marginLeft : width

    useMemo(() => {
      const start = 0x00000000
      const value = props.value
      const byteLength = value.byteLength
      const length = value.length
      const itemLength = value.byteLength / value.length
      for (let i = 0; i < length; ++i) {
        const itemValue = value[i]
        console.log(itemValue)
      }
    }, [props.value])
    return (
    <Box
      className='data-typed-array'
      sx={{
        display: props.inspect ? 'block' : 'inline-block',
        pl: props.inspect ? indentWidth - 0.6 : 0,
        marginLeft,
        color: keyColor,
        borderLeft: props.inspect ? `1px solid ${borderColor}` : 'none'
      }}
    >
    </Box>
    )
  }
)
