import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { Box } from '@mui/material'
import copy from 'copy-to-clipboard'
import type React from 'react'
import { useCallback, useMemo, useState } from 'react'

import { useTextColor } from '../../hooks/useColor'
import { useJsonViewerStore } from '../../stores/JsonViewerStore'
import { useTypeComponents } from '../../stores/typeRegistry'
import type { DataItemProps } from '../../type'
import { DataBox } from './mui/DataBox'

export type DataKeyPairProps = {
  value: unknown
  path: string[]
}

export const DataKeyPair: React.FC<DataKeyPairProps> = ({
  value,
  path
}) => {
  const key = path[path.length - 1]
  const hoverPath = useJsonViewerStore(store => store.hoverPath)
  const isHover = useMemo(() => {
    return hoverPath && path.every((value, index) => value === hoverPath[index])
  }, [hoverPath, path])
  const setHover = useJsonViewerStore(store => store.setHover)
  const [inspect, setInspect] = useState(
    !useJsonViewerStore(store => store.defaultCollapsed)
  )
  const keyColor = useTextColor()
  const numberKeyColor = useJsonViewerStore(
    store => store.colorNamespace.base0C)
  const [Component, PreComponent, PostComponent] = useTypeComponents(value)
  const rootName = useJsonViewerStore(store => store.rootName)
  const isRoot = useJsonViewerStore(store => store.value) === value
  const isNumberKey = Number.isInteger(Number(key))
  const displayKey = isRoot ? rootName : key
  const downstreamProps: DataItemProps = {
    path,
    inspect,
    setInspect,
    value
  }
  const copyIcon = useMemo(() => {
    return (
      <Box
        component='span'
        sx={{
          cursor: 'pointer',
          pl: 0.7
        }}
        onClick={event => {
          copy(
            JSON.stringify(
              value,
              null,
              '  '
            )
          )
          event.preventDefault()
        }}
      >
        <ContentCopyIcon
          sx={{
            fontSize: '.8rem'
          }}
        />
      </Box>
    )
  }, [value])

  const components = useTypeComponents(value)
  const expandable = components[1] && components[2]

  return (
    <Box className='data-key-pair'
         onMouseEnter={
           useCallback(() => setHover(path), [setHover, path])
         }
    >
      <DataBox
        component='span'
        className='data-key'
        sx={{
          lineHeight: 1.5,
          color: keyColor,
          letterSpacing: 0.5,
          opacity: 0.8
        }}
        onClick={
          useCallback((event: React.MouseEvent<HTMLSpanElement>) => {
            if (event.isDefaultPrevented()) {
              return
            }
            setInspect(state => !state)
          }, [])
        }
      >
        {isNumberKey
          ? <Box component='span'
                 style={{ color: numberKeyColor }}>{displayKey}</Box>
          : <>&quot;{displayKey}&quot;</>
        }
        <DataBox sx={{ mx: 0.5 }}>:</DataBox>
        {PreComponent && <PreComponent {...downstreamProps}/>}
        {(isHover && expandable && inspect) && copyIcon}
      </DataBox>
      {
        Component
          ? <Component {...downstreamProps}/>
          : <Box component='span'
                 className='data-value-fallback'>{JSON.stringify(value)}</Box>
      }
      {PostComponent && <PostComponent {...downstreamProps}/>}
      {(isHover && expandable && !inspect) && copyIcon}
      {(isHover && !expandable) && copyIcon}
    </Box>
  )
}
