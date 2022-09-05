import React, { useCallback, useState } from 'react'

import { toType } from '../../helpers/util'
import type { DataTypeProps } from '../../types/data-type'
// attribute store for storing collapsed state
import AttributeStore from './../../stores/ObjectAttributes'
// theme
import Theme from './../../themes/getStyle'
import { DataTypeLabel } from './DataTypeLabel'

export const JsonString: React.FC<DataTypeProps<string>> = (props) => {
  const [collapsed, setCollapsed] = useState<boolean>(() => AttributeStore.get(
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
  let value: string | React.ReactElement = props.value
  const collapsible = toType(collapseStringsAfterLength) === 'integer'
  const style = { style: { cursor: 'default' } }

  if (collapsible && value.length > Number(collapseStringsAfterLength)) {
    style.style.cursor = 'pointer'
    if (collapsed) {
      value = (
        <span>
          {value.substring(0, Number(collapseStringsAfterLength))}
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
