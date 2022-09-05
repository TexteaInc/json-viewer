export interface ColorMap {
  backgroundColor: string
  ellipsisColor: string
  braceColor: string
  expandedIcon: string
  collapsedIcon: string
  keyColor: string
  arrayKeyColor: string
  objectSize: string
  copyToClipboard: string
  copyToClipboardCheck: string
  objectBorder: string
  dataTypes: {
    boolean: string
    date: string
    float: string
    function: string
    integer: string
    string: string
    nan: string
    null: string
    undefined: string
    regexp: string
    background: string
  }
  editVariable: {
    editIcon: string
    cancelIcon: string
    removeIcon: string
    addIcon: string
    checkIcon: string
    background: string
    color: string
    border: string
  }
  addKeyModal: {
    background: string
    border: string
    color: string
    labelColor: string
  }
  validationFailure: {
    background: string
    iconColor: string
    fontColor: string
  }
}
