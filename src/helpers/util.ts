// source: http://stackoverflow.com/questions/7390426/better-way-to-get-type-of-a-javascript-variable/7390612#7390612
function getType (obj: any) {
  return {}.toString.call(obj).match(/\s([a-zA-Z]+)/)?.[1].toLowerCase()
}

// returns a string "type" of input object
export function toType (obj: any) {
  let type = getType(obj)
  // some extra disambiguation for numbers
  if (type === 'number') {
    if (isNaN(obj)) {
      type = 'nan'
    } else if (Number.isInteger(obj)) {
      type = 'integer'
    } else {
      // bitwise OR produces integers
      type = 'float'
    }
  }
  return type
}

// validation for base-16 themes
export function isTheme (theme: any) {
  const theme_keys = [
    'base00',
    'base01',
    'base02',
    'base03',
    'base04',
    'base05',
    'base06',
    'base07',
    'base08',
    'base09',
    'base0A',
    'base0B',
    'base0C',
    'base0D',
    'base0E',
    'base0F'
  ]
  if (toType(theme) === 'object') {
    for (let i = 0; i < theme_keys.length; i++) {
      if (!(theme_keys[i] in theme)) {
        return false
      }
    }
    return true
  }
  return false
}
