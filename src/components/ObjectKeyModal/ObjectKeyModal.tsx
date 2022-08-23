import React, { useState } from 'react'

import dispatcher from './../../helpers/dispatcher'
// global theme
import Theme from './../../themes/getStyle'
import { Add as Cancel, CheckCircle } from './../icons'

// this input appears when adding a new value to an object
export const ObjectKeyModal: React.FC<any> = ({ theme, isValid, rjvId, submit }) => {
  const [input, setInput] = useState('')
  const closeModal = () => {
    dispatcher.dispatch({
      rjvId,
      name: 'RESET'
    })
  }

  const handleSubmit = () => {
    submit(input)
  }

  const valid = isValid(input)
  return (
    <div
      className='key-modal-request'
      {...Theme(theme, 'key-modal-request')}
      onClick={closeModal}
    >
      <div
        {...Theme(theme, 'key-modal')}
        onClick={e => {
          e.stopPropagation()
        }}
      >
        <div {...Theme(theme, 'key-modal-label')}>Key Name:</div>
        <div style={{ position: 'relative' }}>
          <input
            {...Theme(theme, 'key-modal-input')}
            className='key-modal-input'
            ref={el => el && el.focus()}
            spellCheck={false}
            value={input}
            placeholder='...'
            onChange={e => {
              setInput(e.target.value)
            }}
            onKeyDown={e => {
              if (valid && e.key === 'Enter') {
                handleSubmit()
              } else if (e.key === 'Escape') {
                closeModal()
              }
            }}
          />
          {valid
            ? (
              <CheckCircle
                {...Theme(theme, 'key-modal-submit')}
                className='key-modal-submit'
                onClick={() => handleSubmit()}
              />
              )
            : null}
        </div>
        <span {...Theme(theme, 'key-modal-cancel')}>
                        <Cancel
                          {...Theme(theme, 'key-modal-cancel-icon')}
                          className='key-modal-cancel'
                          onClick={() => {
                            dispatcher.dispatch({
                              rjvId,
                              name: 'RESET'
                            })
                          }}
                        />
                    </span>
      </div>
    </div>
  )
}
