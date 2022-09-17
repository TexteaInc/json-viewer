export const applyValue = (obj: any, path: string[], value: any) => {
  if (typeof obj !== 'object' || obj === null) {
    return value
  }
  const arr: string[] = [...path]
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
