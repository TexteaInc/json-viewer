import type React from 'react'

import dispatcher from './../helpers/dispatcher'
// global theme
import Theme from './../themes/getStyle'
import { Add as Clear } from './icons'

export type ValidationFailureProps = {
  message: string
  active: boolean
  theme: any
  rjvId: string
}

// this input appears when adding a new value to an object
export const ValidationFailure: React.FC<ValidationFailureProps> = ({
  message, active, theme, rjvId
}) => {
  if (!active) {
    return null
  }
  return (
    <div
      className='validation-failure'
      {...Theme(theme, 'validation-failure')}
      onClick={() => {
        dispatcher.dispatch({
          rjvId,
          name: 'RESET'
        })
      }}
    >
        <span {...Theme(theme, 'validation-failure-label')}>
          {message}
        </span>
      <Clear {...Theme(theme, 'validation-failure-clear')} />
    </div>
  )
}
