import { Box } from '@mui/material'
import { useAtomValue, useSetAtom } from 'jotai'
import { useAtomCallback } from 'jotai/utils'
import type { ComponentProps, FC, MouseEvent } from 'react'
import { useCallback, useMemo, useState } from 'react'

import { useClipboard } from '../hooks/useCopyToClipboard'
import { useInspect } from '../hooks/useInspect'
import {
  colorspaceAtom,
  editableAtom,
  enableClipboardAtom,
  hoverPathAtom,
  keyRendererAtom,
  onChangeAtom,
  quotesOnKeysAtom,
  rootNameAtom,
  setHoverAtomFamily,
  valueAtom
} from '../state'
import { useTypeComponents } from '../stores/typeRegistry'
import type { DataItemProps } from '../type'
import { getValueSize } from '../utils'
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
  const { value, path, nestedIndex } = props
  const propsEditable = props.editable ?? undefined
  const storeEditable = useAtomValue(editableAtom)
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
  const [tempValue, setTempValue] = useState(typeof value === 'function' ? () => value : value)
  const depth = path.length
  const key = path[depth - 1]
  const hoverPath = useAtomValue(hoverPathAtom)
  const isHover = useMemo(() => {
    return hoverPath && path.every(
      (value, index) => value === hoverPath.path[index] && nestedIndex ===
        hoverPath.nestedIndex)
  }, [hoverPath, path, nestedIndex])
  const setHover = useAtomCallback(
    useCallback((get, set, arg) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useSetAtom(setHoverAtomFamily(arg))
    }, [])
  )
  const root = useAtomValue(valueAtom)
  const [inspect, setInspect] = useInspect(path, value, nestedIndex)
  const [editing, setEditing] = useState(false)
  const onChange = useAtomValue(onChangeAtom)
  const {
    base07: keyColor,
    base0C: numberKeyColor
  } = useAtomValue(colorspaceAtom)
  const { Component, PreComponent, PostComponent, Editor } = useTypeComponents(value, path)
  const quotesOnKeys = useAtomValue(quotesOnKeysAtom)
  const rootName = useAtomValue(rootNameAtom)
  const isRoot = root === value
  const isNumberKey = Number.isInteger(Number(key))

  const enableClipboard = useAtomValue(enableClipboardAtom)
  const { copy, copied } = useClipboard()

  const actionIcons = useMemo(() => {
    if (editing) {
      return (
        <>
          <IconBox>
            <CloseIcon
              sx={{ fontSize: '.8rem' }}
              onClick={() => {
                // abort editing
                setEditing(false)
                setTempValue(value)
              }}
            />
          </IconBox>
          <IconBox>
            <CheckIcon
              sx={{ fontSize: '.8rem' }}
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
                copy(path, value)
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
        {/* todo: support edit object */}
        {(Editor && editable) &&
            (
              <IconBox
                onClick={event => {
                  event.preventDefault()
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
  const KeyRenderer = useAtomValue(keyRendererAtom)
  const downstreamProps: DataItemProps = useMemo(() => ({
    path,
    inspect,
    setInspect,
    value
  }), [inspect, path, setInspect, value])
  return (
    <Box
      className='data-key-pair'
      data-testid={'data-key-pair' + path.join('.')}
      sx={{ userSelect: 'text' }}
      onMouseEnter={() => setHover({ path, nestedIndex })}
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
