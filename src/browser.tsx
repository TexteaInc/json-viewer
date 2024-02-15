import type { Root } from 'react-dom/client'
import { createRoot } from 'react-dom/client'

import { JsonViewer as JsonViewerComponent } from '.'
import * as dataTypes from './components/DataTypes'
import * as base16 from './theme/base16'
import type { JsonViewerProps } from './type'
import { applyValue, defineDataType, deleteValue, isCycleReference, safeStringify } from './utils'

const getElementFromConfig = (el?: string | Element) => (el
  ? (typeof el === 'string' ? document.querySelector(el) : el)
  : document.getElementById('json-viewer'))

export default class JsonViewer {
  private props: JsonViewerProps
  private root?: Root

  static Component = JsonViewerComponent
  static DataTypes = dataTypes
  static Themes = base16
  static Utils = {
    applyValue,
    defineDataType,
    deleteValue,
    isCycleReference,
    safeStringify
  }

  constructor (props: JsonViewerProps) {
    this.props = props
  }

  render (el?: string | Element) {
    const container = getElementFromConfig(el)

    if (container) {
      this.root = createRoot(container)
      this.root.render(<JsonViewerComponent {...this.props} />)
    }
  }

  destroy () {
    if (this.root) {
      this.root.unmount()
    }
  }
}
