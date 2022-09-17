import {
  Check as CheckIcon,
  Close as CloseIcon,
  ContentCopy as ContentCopyIcon,
  Edit as EditIcon
} from '@mui/icons-material'
import { Box, styled } from '@mui/material'
import copy from 'copy-to-clipboard'
import type React from 'react'
import { useCallback, useMemo, useState } from 'react'

import { useTextColor } from '../hooks/useColor'
import { useJsonViewerStore } from '../stores/JsonViewerStore'
import { useTypeComponents } from '../stores/typeRegistry'
import type { DataItemProps } from '../type'
import { isCycleReference } from '../utils'
import { DataBox } from './mui/DataBox'

export type DataKeyPairProps = {
  value: unknown
  nested?: boolean
  path: (string | number)[]
}

const IconBox = styled(props => <Box {...props} component='span'/>)`
  cursor: pointer;
  padding-left: 0.7rem;
` as typeof Box

export const DataKeyPair: React.FC<DataKeyPairProps> = (props) => {
  const { value, path } = props
  const [tempValue, setTempValue] = useState(value)
  const key = path[path.length - 1]
  const hoverPath = useJsonViewerStore(store => store.hoverPath)
  const isHover = useMemo(() => {
    return hoverPath && path.every((value, index) => value === hoverPath[index])
  }, [hoverPath, path])
  const setHover = useJsonViewerStore(store => store.setHover)
  const root = useJsonViewerStore(store => store.value)
  const isTrap = useMemo(() => isCycleReference(root, path, value), [path, root, value])
  const defaultCollapsed = useJsonViewerStore(store => store.defaultCollapsed)
  // do not inspect when it is a cycle reference, otherwise there will have a loop
  const [inspect, setInspect] = useState(
    isTrap
      ? false
      : !defaultCollapsed
  )
  const [editing, setEditing] = useState(false)
  const onChange = useJsonViewerStore(store => store.onChange)
  const keyColor = useTextColor()
  const numberKeyColor = useJsonViewerStore(
    store => store.colorNamespace.base0C)
  const { Component, PreComponent, PostComponent, Editor } = useTypeComponents(
    value)
  const rootName = useJsonViewerStore(store => store.rootName)
  const isRoot = root === value
  const isNumberKey = Number.isInteger(Number(key))
  const displayKey = isRoot ? rootName : key
  const downstreamProps: DataItemProps = useMemo(() => ({
    path,
    inspect,
    setInspect,
    value
  }), [inspect, path, value])
  const actionIcons = useMemo(() => {
    if (editing) {
      return (
        <>
          <IconBox>
            <CloseIcon
              sx={{
                fontSize: '.8rem'
              }}
              onClick={() => {
                // abort editing
                setEditing(false)
                setTempValue(value)
              }}
            />
          </IconBox>
          <IconBox>
            <CheckIcon
              sx={{
                fontSize: '.8rem'
              }}
              onClick={() => {
                // finish editing, save data
                setEditing(false)
                onChange(path, value, tempValue)
              }}
            />
          </IconBox>
        </>
      )
    }
    return (
      <>
        <IconBox
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
        </IconBox>
        {/* todo: support edit object */}
        {Editor &&
          (
            <IconBox
              onClick={event => {
                event.preventDefault()
                setEditing(true)
              }}
            >
              <EditIcon
                sx={{
                  fontSize: '.8rem'
                }}
              />
            </IconBox>
          )
        }
      </>
    )
  }, [Editor, editing, onChange, path, tempValue, value])

  const expandable = PreComponent && PostComponent

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
        {
          !props.nested && (
            isNumberKey
              ? <Box component='span'
                   style={{ color: numberKeyColor }}>{displayKey}</Box>
              : <>&quot;{displayKey}&quot;</>
          )
        }
        {
          !props.nested && (
            <DataBox sx={{ mx: 0.5 }}>:</DataBox>
          )
        }
        {PreComponent && <PreComponent {...downstreamProps}/>}
        {(isHover && expandable && inspect) && actionIcons}
      </DataBox>
      {
        editing
          ? (Editor && <Editor value={tempValue} setValue={setTempValue}/>)
          : (Component)
              ? <Component {...downstreamProps}/>
              : <Box component='span'
                 className='data-value-fallback'>{JSON.stringify(value)}</Box>
      }
      {PostComponent && <PostComponent {...downstreamProps}/>}
      {(isHover && expandable && !inspect) && actionIcons}
      {(isHover && !expandable) && actionIcons}
    </Box>
  )
}
