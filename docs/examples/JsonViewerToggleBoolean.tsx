import type { JsonViewerOnChange } from '@textea/json-viewer'
import { applyValue, booleanType, defineDataType, defineEasyType, JsonViewer } from '@textea/json-viewer'
import type { FC } from 'react'
import { useCallback, useMemo, useState } from 'react'

import { useNextraTheme } from '../hooks/useTheme'

const value = {
  agree: true,
  disagree: false,
  description: 'Click the ✔️ ❌ to toggle the boolean value'
}

export const JsonViewerToggleBoolean1: FC = () => {
  const theme = useNextraTheme()
  const [src, setSrc] = useState(value)
  const onChange = useCallback<JsonViewerOnChange>(
    (path, oldValue, newValue) => {
      setSrc(src => applyValue(src, path, newValue))
    }, [])

  const toggleBoolType = useMemo(() => {
    return defineDataType<boolean>({
      ...booleanType,
      Component: ({ value, path }) => (
        <span onClick={() => onChange(path, value, !value)}>
          {value ? '✔️' : '❌'}
        </span>
      )
    })
  }, [onChange])

  return (
    <JsonViewer
      rootName={false}
      displaySize={false}
      theme={theme}
      value={src}
      onChange={onChange}
      valueTypes={[toggleBoolType]}
    />
  )
}

export const JsonViewerToggleBoolean2: FC = () => {
  const theme = useNextraTheme()
  const [src, setSrc] = useState(value)
  const onChange = useCallback<JsonViewerOnChange>(
    (path, oldValue, newValue) => {
      setSrc(src => applyValue(src, path, newValue))
    }, [])

  const toggleBoolType = useMemo(() => {
    return defineEasyType<boolean>({
      ...booleanType,
      type: 'bool',
      colorKey: 'base0E',
      Renderer: ({ value, path }) => (
        <span onClick={() => onChange(path, value, !value)}>
          {value ? '✔️' : '❌'}
        </span>
      )
    })
  }, [onChange])

  return (
    <JsonViewer
      rootName={false}
      displaySize={false}
      theme={theme}
      value={src}
      onChange={onChange}
      valueTypes={[toggleBoolType]}
    />
  )
}
