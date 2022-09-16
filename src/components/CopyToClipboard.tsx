import copy from 'copy-to-clipboard'
import React, { useCallback, useEffect, useMemo, useState } from 'react'

import { toType } from '../helpers/util'
// theme
import Theme from '../themes/getStyle'
// clibboard icon
import { Clippy } from './icons'

export const CopyToClipboard: React.FC<any> = React.memo((props) => {
  const { theme, hidden, rowHovered } = props

  const [copied, setCopied] = useState(false)
  useEffect(() => {
    if (copied) {
      const number = setTimeout(() => {
        setCopied(false)
      }, 5500)
      return () => {
        clearTimeout(number)
      }
    }
    return () => {}
  }, [copied])
  const handleCopy = useCallback(() => {
    const clipboardValue = (value: any) => {
      const type = toType(value)
      switch (type) {
        case 'function':
        case 'regexp':
          return value.toString()
        default:
          return value
      }
    }
    const { clickCallback, src, namespace } = props
    copy(
      JSON.stringify(
        clipboardValue(src),
        null,
        '  '
      )
    )
    setCopied(true)
    if (typeof clickCallback === 'function') {
      clickCallback({
        src,
        namespace,
        name: namespace[namespace.length - 1]
      })
    }
  }, [props])
  const style = useMemo(() => Theme(theme, 'copy-to-clipboard').style, [theme])
  const display = hidden ? 'none' : 'inline'
  return (
    <span
      className='copy-to-clipboard-container'
      title='Copy to clipboard'
      style={{
        verticalAlign: 'top',
        display: rowHovered ? 'inline-block' : 'none'
      }}
    >
      <span
        style={{
          ...style,
          display
        }}
        onClick={handleCopy}
      >
        {copied
          ? (
            <span>
            <Clippy className='copy-icon' {...Theme(theme,
              'copy-icon')} />
            <span {...Theme(theme, 'copy-icon-copied')}>✔</span>
          </span>
            )
          : (
            <Clippy className='copy-icon' {...Theme(theme, 'copy-icon')} />
            )}
      </span>
    </span>
  )
})
