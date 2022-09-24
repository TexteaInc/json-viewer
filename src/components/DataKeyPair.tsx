import {
  Check as CheckIcon,
  ChevronRight as ChevronRightIcon,
  Close as CloseIcon,
  ContentCopy as ContentCopyIcon,
  Edit as EditIcon,
  ExpandMore as ExpandMoreIcon
} from '@mui/icons-material'
import { Box, styled } from '@mui/material'
import type React from 'react'
import { useCallback, useMemo, useState } from 'react'

import { useTextColor } from '../hooks/useColor'
import { useClipboard } from '../hooks/useCopyToClipboard'
import { useInspect } from '../hooks/useInspect'
import { useJsonViewerStore } from '../stores/JsonViewerStore'
import { useTypeComponents } from '../stores/typeRegistry'
import type { DataItemProps } from '../type'
import { DataBox } from './mui/DataBox'

export type DataKeyPairProps = {
  value: unknown
  nestedIndex?: number
  editable?: boolean
  path: (string | number)[]
}

const IconBox = styled(props => <Box {...props} component='span'/>)`
  cursor: pointer;
  padding-left: 0.7rem;
` as typeof Box

export const DataKeyPair: React.FC<DataKeyPairProps> = (props) => {
  const { value, path, nestedIndex } = props
  const propsEditable = props.editable ?? false
  const storeEditable = useJsonViewerStore(store => store.editable)
  const editable = useMemo(() => {
    if (storeEditable === false) {
      return false
    }
    if (!propsEditable) {
      // props.editable is false which means we cannot provide the suitable way to edit it
      return false
    }
    if (typeof storeEditable === 'function') {
      return !!storeEditable(path, value)
    }
    return propsEditable
  }, [path, propsEditable, storeEditable, value])
  const [tempValue, setTempValue] = useState(typeof value === 'function' ? () => value : value)
  const depth = path.length
  const key = path[depth - 1]
  const hoverPath = useJsonViewerStore(store => store.hoverPath)
  const isHover = useMemo(() => {
    return hoverPath && path.every(
      (value, index) => value === hoverPath.path[index] && nestedIndex ===
        hoverPath.nestedIndex)
  }, [hoverPath, path, nestedIndex])
  const setHover = useJsonViewerStore(store => store.setHover)
  const root = useJsonViewerStore(store => store.value)
  const [inspect, setInspect] = useInspect(path, value, nestedIndex)
  const [editing, setEditing] = useState(false)
  const onChange = useJsonViewerStore(store => store.onChange)
  const keyColor = useTextColor()
  const numberKeyColor = useJsonViewerStore(store => store.colorspace.base0C)
  const { Component, expandable: isExpandable, PreComponent, PostComponent, Editor } = useTypeComponents(value)
  const quotesOnKeys = useJsonViewerStore(store => store.quotesOnKeys)
  const rootName = useJsonViewerStore(store => store.rootName)
  const isRoot = root === value
  const isNumberKey = Number.isInteger(Number(key))

  const enableClipboard = useJsonViewerStore(store => store.enableClipboard)
  const { copy, copied } = useClipboard()

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
          {enableClipboard && (
            <IconBox
              onClick={event => {
                event.preventDefault()
                try {
                  copy(
                    JSON.stringify(
                      typeof value === 'function' ? value.toString() : value,
                      null,
                      '  '
                    )
                  )
                } catch (e) {
                  // in some case, this will throw error
                  // for example: circular structure
                  // fixme: `useAlert` hook
                  console.error(e)
                }
              }}
            >
              {
                copied
                  ? (
                    <CheckIcon
                      sx={{
                        fontSize: '.8rem'
                      }}
                    />
                    )
                  : (
                    <ContentCopyIcon
                      sx={{
                        fontSize: '.8rem'
                      }}
                    />
                    )
              }
            </IconBox>
          )}
          {/* todo: support edit object */}
          {(Editor && editable) &&
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
  },
  [
    Editor,
    copied,
    copy,
    editable,
    editing,
    enableClipboard,
    onChange,
    path,
    tempValue,
    value
  ])

  const expandable = isExpandable || !!(PreComponent && PostComponent)
  const KeyRenderer = useJsonViewerStore(store => store.keyRenderer)
  const downstreamProps: DataItemProps = useMemo(() => ({
    path,
    inspect,
    setInspect,
    value
  }), [inspect, path, setInspect, value])
  return (
    <Box className='data-key-pair'
         data-testid={'data-key-pair' + path.join('.')}
         onMouseEnter={
           useCallback(() => setHover(path, nestedIndex),
             [setHover, path, nestedIndex])
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
          }, [setInspect])
        }
      >
        {
          expandable
            ? (inspect
                ? <ExpandMoreIcon sx={{
                  fontSize: '.8rem',
                  '&:hover': {cursor: 'pointer'},
                }}/>
                : <ChevronRightIcon sx={{
                  fontSize: '.8rem',
                  '&:hover': {cursor: 'pointer'},
                }}/>
              )
            : null
        }
        {
          (isRoot
              ? (
                  rootName !== false
                  ? (quotesOnKeys ? <>&quot;{rootName}&quot;</> : <>{rootName}</>)
                  : null
              )
              : KeyRenderer.when(downstreamProps)
                  ? <KeyRenderer {...downstreamProps} />
                  : nestedIndex === undefined && (
                    isNumberKey
                      ? <Box component='span' style={{ color: numberKeyColor }}>{key}</Box>
                      : quotesOnKeys ? <>&quot;{key}&quot;</> : <>{key}</>
                  )
          )
        }
        {
          (
            isRoot
              ? (rootName !== false
                  ? <DataBox sx={{ mx: 0.5 }}>:</DataBox>
                  : null)
              : nestedIndex === undefined && (
               <DataBox sx={{ mx: 0.5 }}>:</DataBox>
              )
          )
        }
        {PreComponent && <PreComponent {...downstreamProps} />}
        {(isHover && expandable && inspect) && actionIcons}
      </DataBox>
      {
        (editing && editable)
          ? (Editor && <Editor value={tempValue} setValue={setTempValue}/>)
          : (Component)
              ? <Component {...downstreamProps} />
              : <Box component='span'
                   className='data-value-fallback'>{`fallback: ${value}`}</Box>
      }
      {PostComponent && <PostComponent {...downstreamProps} />}
      {(isHover && expandable && !inspect) && actionIcons}
      {(isHover && !expandable) && actionIcons}
    </Box>
  )
}
