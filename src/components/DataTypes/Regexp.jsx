import React from 'react'

// theme
import Theme from './../../themes/getStyle'
import { DataTypeLabel } from './DataTypeLabel'

export default class extends React.PureComponent {
  render () {
    const type_name = 'regexp'
    const { props } = this
    return (
            <div {...Theme(props.theme, 'regexp')}>
                <DataTypeLabel type_name={type_name} {...props} />
                {this.props.value.toString()}
            </div>
    )
  }
}
