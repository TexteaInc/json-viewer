import React, { useCallback, useState } from 'react'

import { toType } from '../../helpers/util'
// attribute store for storing collapsed state
import AttributeStore from './../../stores/ObjectAttributes'
// theme
import Theme from './../../themes/getStyle'
import { DataTypeLabel } from './DataTypeLabel'

export const JsonString = (props) => {
  const [collapsed, setCollapsed] = useState(() => AttributeStore.get(
    props.rjvId,
    props.namespace,
    'collapsed',
    true
  ))
  const toggleCollapsed = useCallback(() => {
    setCollapsed(value => !value)
    AttributeStore.set(
      props.rjvId,
      props.namespace,
      'collapsed',
      collapsed
    )
  }, [collapsed, props.namespace, props.rjvId])
  const { collapseStringsAfterLength, theme } = props
  let { value } = props
  const collapsible = toType(collapseStringsAfterLength) === 'integer'
  const style = { style: { cursor: 'default' } }

  if (collapsible && value.length > collapseStringsAfterLength) {
    style.style.cursor = 'pointer'
    if (collapsed) {
      value = (
        <span>
          {value.substring(0, collapseStringsAfterLength)}
          <span {...Theme(theme, 'ellipsis')}> ...</span>
                    </span>
      )
    }
  }

  return (
    <div {...Theme(theme, 'string')}>
      <DataTypeLabel {...props} type_name='string'/>
      <span
        className='string-value'
        {...style}
        onClick={toggleCollapsed}
      >
                  &quot;{value}&quot;
                </span>
    </div>
  )
}
