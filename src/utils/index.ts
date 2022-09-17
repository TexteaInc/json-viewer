export const applyValue = (obj: any, path: (string | number)[], value: any) => {
  if (typeof obj !== 'object' || obj === null) {
    return value
  }
  const arr: (string | number)[] = [...path]
  let key
  if (path.length > 0) {
    key = arr[0]
    if (arr.length > 1) {
      arr.shift()
      obj[key] = applyValue(obj[key], arr, value)
    } else {
      obj[key] = value
    }
  }
  return obj
}

export const isCycleReference = (root: any, path: (string | number)[], value: unknown): boolean => {
  if (root === null || value === null) {
    return false
  }
  if (typeof root !== 'object') {
    return false
  }
  if (typeof value !== 'object') {
    return false
  }
  if (Object.is(root, value) && path.length !== 0) {
    return true
  }
  const arr = [...path]
  let currentRoot = root
  while (currentRoot !== value || arr.length !== 0) {
    if (typeof currentRoot !== 'object' || currentRoot === null) {
      return false
    }
    const target = arr.shift()!
    if (Object.is(currentRoot, value)) {
      return true
    }
    currentRoot = currentRoot[target]
  }
  return false
}
