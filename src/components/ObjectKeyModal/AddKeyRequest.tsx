import type React from 'react'
import { useCallback } from 'react'

import type { ReactJsonViewProps } from '../../type'
import dispatcher from './../../helpers/dispatcher'
import ObjectAttributes from './../../stores/ObjectAttributes'
// global theme
import { ObjectKeyModal } from './ObjectKeyModal'

type AddKeyRequestProps = {
  active: boolean
  theme: string
  rjvId: string
  defaultValue: ReactJsonViewProps['defaultValue']
}

// this input appears when adding a new value to an object
export const AddKeyRequest: React.FC<AddKeyRequestProps> = (props) => {
  const rjvId = props.rjvId
  const isValid = useCallback((input: any) => {
    const request = ObjectAttributes.get(
      rjvId,
      'action',
      'new-key-request'
    )
    return (
      input !== '' &&
      Object.keys(request.existing_value).indexOf(input) === -1
    )
  }, [rjvId])

  const submit = useCallback((input: any) => {
    const request = ObjectAttributes.get(rjvId, 'action', 'new-key-request')
    request.new_value = { ...request.existing_value }
    request.new_value[input] = props.defaultValue
    dispatcher.dispatch({
      name: 'VARIABLE_ADDED',
      rjvId,
      data: request
    })
  }, [props.defaultValue, rjvId])

  return (
    <ObjectKeyModal
      rjvId={rjvId}
      theme={props.theme}
      isValid={isValid}
      submit={submit}
    />
  )
}
