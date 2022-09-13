import type React from 'react'

import Theme from './../themes/getStyle'

export const ObjectName: React.FC<any> = ({
  parent_type,
  namespace,
  quotesOnKeys,
  theme,
  jsvRoot,
  name,
  displayArrayKey
}) => {
  const display_name = name || ''

  if (jsvRoot && (name === false || name === null)) {
    return <span/>
  } else if (parent_type === 'array') {
    return displayArrayKey
      ? (
        <span {...Theme(theme, 'array-key')} key={namespace}>
          <span className='array-key'>{display_name}</span>
          <span {...Theme(theme, 'colon')}>:</span>
        </span>
        )
      : (<span/>)
  } else {
    return (
      <span {...Theme(theme, 'object-name')} key={namespace}>
        <span className='object-key'>
          {quotesOnKeys && (
            <span style={{ verticalAlign: 'top' }}>&quot;</span>
          )}
          <span>{display_name}</span>
          {quotesOnKeys && (
            <span style={{ verticalAlign: 'top' }}>&quot;</span>
          )}
        </span>
        <span {...Theme(theme, 'colon')}>:</span>
      </span>
    )
  }
}
