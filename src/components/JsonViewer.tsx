import type React from 'react'
import { useMemo } from 'react'

import type { ReactJsonViewProps } from '../type'
import ArrayGroup from './ArrayGroup'
import JsonObject from './DataTypes/Object'

type JsonViewerProps = ReactJsonViewProps & {
  src: object
  name: string
  theme: any
  type: string | undefined
  rjvId: string
}

export const JsonViewer: React.FC<JsonViewerProps> = (props) => {
  const namespace = [props.name]
  const ObjectComponent = useMemo(() => {
    if (Array.isArray(props.src) &&
      props.groupArraysAfterLength &&
      props.src.length > props.groupArraysAfterLength) {
      return ArrayGroup
    } else {
      return JsonObject
    }
  }, [props.groupArraysAfterLength, props.src])
  return (
    <div className='pretty-json-container object-container'>
      <div className='object-content'>
        <ObjectComponent
          namespace={namespace}
          depth={0}
          jsvRoot={true}
          {...props}
        />
      </div>
    </div>
  )
}
