import React from 'react'

import { toType } from '../helpers/util'
import dispatcher from './../helpers/dispatcher'
// theme
import Theme from './../themes/getStyle'
import CopyToClipboard from './CopyToClipboard'
// icons
import { AddCircle as Add, RemoveCircle as Remove } from './icons'

export default class extends React.PureComponent {
  getObjectSize = () => {
    const { size, theme, displayObjectSize } = this.props
    if (displayObjectSize) {
      return (
                <span className='object-size' {...Theme(theme, 'object-size')}>
                    {size} item{size === 1 ? '' : 's'}
                </span>
      )
    }
  }

  getAddAttribute = rowHovered => {
    const { theme, namespace, name, src, rjvId, depth } = this.props

    return (
            <span
                className='click-to-add'
                style={{
                  verticalAlign: 'top',
                  display: rowHovered ? 'inline-block' : 'none'
                }}
            >
                <Add
                    className='click-to-add-icon'
                    {...Theme(theme, 'addVarIcon')}
                    onClick={() => {
                      const request = {
                        name: depth > 0 ? name : null,
                        namespace: namespace.splice(
                          0,
                          namespace.length - 1
                        ),
                        existing_value: src,
                        variable_removed: false,
                        key_name: null
                      }
                      if (toType(src) === 'object') {
                        dispatcher.dispatch({
                          name: 'ADD_VARIABLE_KEY_REQUEST',
                          rjvId,
                          data: request
                        })
                      } else {
                        dispatcher.dispatch({
                          name: 'VARIABLE_ADDED',
                          rjvId,
                          data: {
                            ...request,
                            new_value: [...src, null]
                          }
                        })
                      }
                    }}
                />
            </span>
    )
  }

  getRemoveObject = rowHovered => {
    const { theme, namespace, name, src, rjvId } = this.props

    // don't allow deleting of root node
    if (namespace.length === 1) {
      return
    }
    return (
            <span
                className='click-to-remove'
                style={{
                  display: rowHovered ? 'inline-block' : 'none'
                }}
            >
                <Remove
                    className='click-to-remove-icon'
                    {...Theme(theme, 'removeVarIcon')}
                    onClick={() => {
                      dispatcher.dispatch({
                        name: 'VARIABLE_REMOVED',
                        rjvId,
                        data: {
                          name,
                          namespace: namespace.splice(
                            0,
                            namespace.length - 1
                          ),
                          existing_value: src,
                          variable_removed: true
                        }
                      })
                    }}
                />
            </span>
    )
  }

  render = () => {
    const {
      theme,
      onDelete,
      onAdd,
      enableClipboard,
      src,
      namespace,
      rowHovered
    } = this.props
    return (
            <div
                {...Theme(theme, 'object-meta-data')}
                className='object-meta-data'
                onClick={e => {
                  e.stopPropagation()
                }}
            >
                {/* size badge display */}
                {this.getObjectSize()}
                {/* copy to clipboard icon */}
                {enableClipboard
                  ? (
                    <CopyToClipboard
                        rowHovered={rowHovered}
                        clickCallback={enableClipboard}
                        {...{ src, theme, namespace }}
                    />
                    )
                  : null}
                {/* copy add/remove icons */}
                {onAdd !== false ? this.getAddAttribute(rowHovered) : null}
                {onDelete !== false ? this.getRemoveObject(rowHovered) : null}
            </div>
    )
  }
}
