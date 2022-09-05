import React, { useCallback, useState } from 'react'

import type { DataTypeProps } from '../../types/data-type'
// attribute store for storing collapsed state
import AttributeStore from './../../stores/ObjectAttributes'
// theme
import Theme from './../../themes/getStyle'
import { DataTypeLabel } from './DataTypeLabel'

export const JsonFunction: React.FC<DataTypeProps<Function>> = (props) => {
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

  return (
    <div {...Theme(props.theme, 'function')}>
      <DataTypeLabel {...props} type_name='function'/>
      <span
        {...Theme(props.theme, 'function-value')}
        className='rjv-function-container'
        onClick={toggleCollapsed}
      >
        {collapsed
          ? (
            <span>
              {props.value.toString()
                .slice(9, -1)
                .replace(/\{[\s\S]+/, '')}<span
              className='function-collapsed'
              style={{ fontWeight: 'bold' }}><span>{'{'}</span><span {...Theme(
                props.theme,
                'ellipsis')}>...</span><span>{'}'}</span></span></span>
            )
          : props.value.toString().slice(9)}
      </span>
    </div>
  )
}
