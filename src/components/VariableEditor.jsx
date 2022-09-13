import TextareaAutosize from '@mui/material/TextareaAutosize'
import React from 'react'

import { parseInput } from '../helpers/parseInput'
import { stringifyVariable } from '../helpers/stringifyVariable'
import dispatcher from './../helpers/dispatcher'
// theme
import Theme from './../themes/getStyle'
import CopyToClipboard from './CopyToClipboard'
// data type components
import {
  dataTypes
} from './DataTypes/DataTypes'
// clipboard icon
import { CheckCircle, Edit, RemoveCircle as Remove } from './icons'

class VariableEditor extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      editMode: false,
      editValue: '',
      hovered: false,
      renameKey: false,
      parsedInput: {
        type: false,
        value: null
      }
    }
  }

  render () {
    const {
      variable,
      singleIndent,
      type,
      theme,
      namespace,
      indentWidth,
      enableClipboard,
      onEdit,
      onDelete,
      onSelect,
      displayArrayKey,
      quotesOnKeys
    } = this.props
    const { editMode } = this.state
    return (
            <div
                {...Theme(theme, 'objectKeyVal', {
                  paddingLeft: indentWidth * singleIndent
                })}
                onMouseEnter={() =>
                  this.setState({ ...this.state, hovered: true })
                }
                onMouseLeave={() =>
                  this.setState({ ...this.state, hovered: false })
                }
                className='variable-row'
                key={variable.name}
            >
                {type === 'array'
                  ? (
                      displayArrayKey
                        ? (
                        <span
                            {...Theme(theme, 'array-key')}
                            key={variable.name + '_' + namespace}
                        >
                            {variable.name}
                            <div {...Theme(theme, 'colon')}>:</div>
                        </span>
                          )
                        : null
                    )
                  : (
                    <span>
                        <span
                            {...Theme(theme, 'object-name')}
                            className='object-key'
                            key={variable.name + '_' + namespace}
                        >
                            {!!quotesOnKeys && (
                                <span style={{ verticalAlign: 'top' }}>&quot;</span>
                            )}
                            <span style={{ display: 'inline-block' }}>
                                {variable.name}
                            </span>
                            {!!quotesOnKeys && (
                                <span style={{ verticalAlign: 'top' }}>&quot;</span>
                            )}
                        </span>
                        <span {...Theme(theme, 'colon')}>:</span>
                    </span>
                    )}
                <div
                    className='variable-value'
                    onClick={
                        onSelect === false && onEdit === false
                          ? null
                          : e => {
                            const location = [...namespace]
                            if (
                              (e.ctrlKey || e.metaKey) &&
                                      onEdit !== false
                            ) {
                              this.prepopInput(variable)
                            } else if (onSelect !== false) {
                              location.shift()
                              onSelect({
                                ...variable,
                                namespace: location
                              })
                            }
                          }
                    }
                    {...Theme(theme, 'variableValue', {
                      cursor: onSelect === false ? 'default' : 'pointer'
                    })}
                >
                    {this.getValue(variable, editMode)}
                </div>
                {enableClipboard
                  ? (
                    <CopyToClipboard
                        rowHovered={this.state.hovered}
                        hidden={editMode}
                        src={variable.value}
                        clickCallback={enableClipboard}
                        {...{ theme, namespace: [...namespace, variable.name] }}
                    />
                    )
                  : null}
                {onEdit !== false && editMode === false
                  ? this.getEditIcon()
                  : null}
                {onDelete !== false && editMode === false
                  ? this.getRemoveIcon()
                  : null}
            </div>
    )
  }

  getEditIcon = () => {
    const { variable, theme } = this.props

    return (
            <div
                className='click-to-edit'
                style={{
                  verticalAlign: 'top',
                  display: this.state.hovered ? 'inline-block' : 'none'
                }}
            >
                <Edit
                    className='click-to-edit-icon'
                    {...Theme(theme, 'editVarIcon')}
                    onClick={() => {
                      this.prepopInput(variable)
                    }}
                />
            </div>
    )
  }

  prepopInput = variable => {
    if (this.props.onEdit !== false) {
      const stringifiedValue = stringifyVariable(variable.value)
      const detected = parseInput(stringifiedValue)
      this.setState({
        editMode: true,
        editValue: stringifiedValue,
        parsedInput: {
          type: detected.type,
          value: detected.value
        }
      })
    }
  }

  getRemoveIcon = () => {
    const { variable, namespace, theme, rjvId } = this.props

    return (
            <div
                className='click-to-remove'
                style={{
                  verticalAlign: 'top',
                  display: this.state.hovered ? 'inline-block' : 'none'
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
                          name: variable.name,
                          namespace,
                          existing_value: variable.value,
                          variable_removed: true
                        }
                      })
                    }}
                />
            </div>
    )
  }

  getValue = (variable, editMode) => {
    const type = editMode ? false : variable.type
    const { props } = this
    switch (type) {
      case false:
        return this.getEditInput()
      default: {
        const JsonComponent = dataTypes[type]
        if (!JsonComponent) {
          // catch-all for types that weren't anticipated
          return (
            <div className='object-value'>
              {JSON.stringify(variable.value)}
            </div>
          )
        } else {
          return <JsonComponent {...props} value={variable.value}/>
        }
      }
    }
  }

  getEditInput = () => {
    const { theme } = this.props
    const { editValue } = this.state

    return (
            <div>
                <TextareaAutosize
                    type='text'
                    inputRef={input => input && input.focus()}
                    value={editValue}
                    className='variable-editor'
                    onChange={event => {
                      const value = event.target.value
                      const detected = parseInput(value)
                      this.setState({
                        editValue: value,
                        parsedInput: {
                          type: detected.type,
                          value: detected.value
                        }
                      })
                    }}
                    onKeyDown={e => {
                      switch (e.key) {
                        case 'Escape': {
                          this.setState({
                            editMode: false,
                            editValue: ''
                          })
                          break
                        }
                        case 'Enter': {
                          if (e.ctrlKey || e.metaKey) {
                            this.submitEdit(true)
                          }
                          break
                        }
                      }
                      e.stopPropagation()
                    }}
                    placeholder='update this value'
                    minRows={2}
                    {...Theme(theme, 'edit-input')}
                />
                <div {...Theme(theme, 'edit-icon-container')}>
                    <Remove
                        className='edit-cancel'
                        {...Theme(theme, 'cancel-icon')}
                        onClick={() => {
                          this.setState({ editMode: false, editValue: '' })
                        }}
                    />
                    <CheckCircle
                        className='edit-check string-value'
                        {...Theme(theme, 'check-icon')}
                        onClick={() => {
                          this.submitEdit()
                        }}
                    />
                    <div>{this.showDetected()}</div>
                </div>
            </div>
    )
  }

  submitEdit = submit_detected => {
    const { variable, namespace, rjvId } = this.props
    const { editValue, parsedInput } = this.state
    let new_value = editValue
    if (submit_detected && parsedInput.type) {
      new_value = parsedInput.value
    }
    this.setState({
      editMode: false
    })
    dispatcher.dispatch({
      name: 'VARIABLE_UPDATED',
      rjvId,
      data: {
        name: variable.name,
        namespace,
        existing_value: variable.value,
        new_value,
        variable_removed: false
      }
    })
  }

  showDetected = () => {
    const { theme } = this.props
    const detected = this.getDetectedInput()
    if (detected) {
      return (
                <div>
                    <div {...Theme(theme, 'detected-row')}>
                        {detected}
                        <CheckCircle
                            className='edit-check detected'
                            style={{
                              verticalAlign: 'top',
                              paddingLeft: '3px',
                              ...Theme(theme, 'check-icon').style
                            }}
                            onClick={() => {
                              this.submitEdit(true)
                            }}
                        />
                    </div>
                </div>
      )
    }
  }

  getDetectedInput = () => {
    const { parsedInput } = this.state
    const { type, value } = parsedInput
    const { props } = this
    const { theme } = props

    if (typeof type === 'string') {
      const JsonComponent = dataTypes[type]
      switch (type) {
        case 'object':
          return (
                        <span>
                            <span
                                style={{
                                  ...Theme(theme, 'brace').style,
                                  cursor: 'default'
                                }}
                            >
                                {'{'}
                            </span>
                            <span
                                style={{
                                  ...Theme(theme, 'ellipsis').style,
                                  cursor: 'default'
                                }}
                            >
                                ...
                            </span>
                            <span
                                style={{
                                  ...Theme(theme, 'brace').style,
                                  cursor: 'default'
                                }}
                            >
                                {'}'}
                            </span>
                        </span>
          )
        case 'array':
          return (
                        <span>
                            <span
                                style={{
                                  ...Theme(theme, 'brace').style,
                                  cursor: 'default'
                                }}
                            >
                                {'['}
                            </span>
                            <span
                                style={{
                                  ...Theme(theme, 'ellipsis').style,
                                  cursor: 'default'
                                }}
                            >
                                ...
                            </span>
                            <span
                                style={{
                                  ...Theme(theme, 'brace').style,
                                  cursor: 'default'
                                }}
                            >
                                {']'}
                            </span>
                        </span>
          )
        default: {
          return <JsonComponent {...props} value={value}/>
        }
      }
    }
  }
}

// export component
export default VariableEditor
