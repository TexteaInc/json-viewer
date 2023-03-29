import { Box } from '@mui/material'
import type { ComponentProps, FC, MouseEvent } from 'react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { useTextColor } from '../hooks/useColor'
import { useClipboard } from '../hooks/useCopyToClipboard'
import { useInspect } from '../hooks/useInspect'
import { useJsonViewerStore } from '../stores/JsonViewerStore'
import { useTypeComponents } from '../stores/typeRegistry'
import type { DataItemProps } from '../type'
import { copyString, getValueSize } from '../utils'
import {
  CheckIcon,
  ChevronRightIcon,
  CloseIcon,
  ContentCopyIcon,
  EditIcon,
  ExpandMoreIcon
} from './Icons'
import { DataBox } from './mui/DataBox'

export type DataKeyPairProps = {
  value: unknown
  prevValue?: unknown
  nestedIndex?: number
  editable?: boolean
  path: (string | number)[]
}

type IconBoxProps = ComponentProps<typeof Box>

const IconBox: FC<IconBoxProps> = (props) => (
  <Box
    component='span'
    {...props}
    sx={{
      cursor: 'pointer',
      paddingLeft: '0.7rem',
      ...props.sx
    }}
  />
)

export const DataKeyPair: FC<DataKeyPairProps> = (props) => {
  const { value, prevValue, path, nestedIndex } = props
  const { Component, PreComponent, PostComponent, Editor, serialize, deserialize } = useTypeComponents(value, path)

  const propsEditable = props.editable ?? undefined
  const storeEditable = useJsonViewerStore(store => store.editable)
  const editable = useMemo(() => {
    if (storeEditable === false) {
      return false
    }
    if (propsEditable === false) {
      // props.editable is false which means we cannot provide the suitable way to edit it
      return false
    }
    if (typeof storeEditable === 'function') {
      return !!storeEditable(path, value)
    }
    return storeEditable
  }, [path, propsEditable, storeEditable, value])
  const [tempValue, setTempValue] = useState<string>('')
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
  const highlightColor = useJsonViewerStore(store => store.colorspace.base0A)
  const quotesOnKeys = useJsonViewerStore(store => store.quotesOnKeys)
  const rootName = useJsonViewerStore(store => store.rootName)
  const isRoot = root === value
  const isNumberKey = Number.isInteger(Number(key))

  const enableClipboard = useJsonViewerStore(store => store.enableClipboard)
  const { copy, copied } = useClipboard()

  const highlightUpdates = useJsonViewerStore(store => store.highlightUpdates)
  const isHighlight = useMemo(() => {
    if (!highlightUpdates || prevValue === undefined) return false

    // highlight if value type changed
    if (typeof value !== typeof prevValue) {
      return true
    }

    if (typeof value === 'number') {
      // notice: NaN !== NaN
      if (isNaN(value) && isNaN(prevValue as number)) return false
      return value !== prevValue
    }

    // highlight if isArray changed
    if (Array.isArray(value) !== Array.isArray(prevValue)) {
      return true
    }

    // not highlight object/function
    // deep compare they will be slow
    if (typeof value === 'object' || typeof value === 'function') {
      return false
    }

    // highlight if not equal
    if (value !== prevValue) {
      return true
    }

    return false
  }, [highlightUpdates, prevValue, value])
  const highlightContainer = useRef<HTMLElement>()
  useEffect(() => {
    if (highlightContainer.current && isHighlight && 'animate' in highlightContainer.current) {
      highlightContainer.current.animate(
        [
          { backgroundColor: highlightColor },
          { backgroundColor: '' }
        ],
        {
          duration: 1000,
          easing: 'ease-in'
        }
      )
    }
  }, [highlightColor, isHighlight, prevValue, value])

  const actionIcons = useMemo(() => {
    if (editing && deserialize) {
      return (
        <>
          <IconBox>
            <CloseIcon
              sx={{ fontSize: '.8rem' }}
              onClick={() => {
                // abort editing
                setEditing(false)
                setTempValue('')
              }}
            />
          </IconBox>
          <IconBox>
            <CheckIcon
              sx={{ fontSize: '.8rem' }}
              onClick={() => {
                // finish editing, save data
                setEditing(false)
                try {
                  const newValue = deserialize(tempValue)
                  onChange(path, value, newValue)
                } catch (e) {
                  // do nothing when deserialize failed
                }
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
                copy(path, value, copyString)
              } catch (e) {
                // in some case, this will throw error
                // fixme: `useAlert` hook
                console.error(e)
              }
            }}
          >
            {
              copied
                ? <CheckIcon sx={{ fontSize: '.8rem' }} />
                : <ContentCopyIcon sx={{ fontSize: '.8rem' }} />
            }
          </IconBox>
        )}
        {(Editor && editable && serialize && deserialize) &&
            (
              <IconBox
                onClick={event => {
                  event.preventDefault()
                  setTempValue(serialize(value))
                  setEditing(true)
                }}
              >
                <EditIcon sx={{ fontSize: '.8rem' }} />
              </IconBox>
            )}
      </>
    )
  },
  [
    Editor,
    serialize,
    deserialize,
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

  const isEmptyValue = useMemo(() => getValueSize(value) === 0, [value])
  const expandable = !isEmptyValue && !!(PreComponent && PostComponent)
  const KeyRenderer = useJsonViewerStore(store => store.keyRenderer)
  const downstreamProps: DataItemProps = useMemo(() => ({
    path,
    inspect,
    setInspect,
    value,
    prevValue
  }), [inspect, path, setInspect, value, prevValue])
  return (
    <Box
      className='data-key-pair'
      data-testid={'data-key-pair' + path.join('.')}
      sx={{ userSelect: 'text' }}
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
          useCallback((event: MouseEvent<HTMLSpanElement>) => {
            if (event.isDefaultPrevented()) {
              return
            }
            if (!isEmptyValue) {
              setInspect(state => !state)
            }
          }, [isEmptyValue, setInspect])
        }
      >
        {
          expandable
            ? (inspect
                ? (
                  <ExpandMoreIcon
                    sx={{
                      fontSize: '.8rem',
                      '&:hover': { cursor: 'pointer' }
                    }}
                  />
                  )
                : (
                  <ChevronRightIcon
                    sx={{
                      fontSize: '.8rem',
                      '&:hover': { cursor: 'pointer' }
                    }}
                  />
                  )
              )
            : null
        }
        <Box ref={highlightContainer} component='span'>
          {
            (isRoot
              ? rootName !== false
                ? (quotesOnKeys ? <>&quot;{rootName}&quot;</> : <>{rootName}</>)
                : null
              : KeyRenderer.when(downstreamProps)
                ? <KeyRenderer {...downstreamProps} />
                : nestedIndex === undefined && (
                  isNumberKey
                    ? <Box component='span' style={{ color: numberKeyColor }}>{key}</Box>
                    : quotesOnKeys ? <>&quot;{key}&quot;</> : <>{key}</>
                )
            )
          }
        </Box>
        {
          (
            isRoot
              ? (rootName !== false && <DataBox sx={{ mr: 0.5 }}>:</DataBox>)
              : nestedIndex === undefined && (
                <DataBox sx={{ mr: 0.5 }}>:</DataBox>
              )
          )
        }
        {PreComponent && <PreComponent {...downstreamProps} />}
        {(isHover && expandable && inspect) && actionIcons}
      </DataBox>
      {
        (editing && editable)
          ? (Editor && <Editor value={tempValue} setValue={setTempValue} />)
          : (Component)
              ? <Component {...downstreamProps} />
              : (
                <Box component='span' className='data-value-fallback'>
                  {`fallback: ${value}`}
                </Box>
                )
      }
      {PostComponent && <PostComponent {...downstreamProps} />}
      {(isHover && expandable && !inspect) && actionIcons}
      {(isHover && !expandable) && actionIcons}
    </Box>
  )
}
