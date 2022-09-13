import { JsonBoolean } from './Boolean'
import { JsonDate } from './Date'
import { JsonFloat } from './Float'
import { JsonFunction } from './Function'
import { JsonInteger } from './Integer'
import { JsonNaN } from './NaN'
import { JsonNull } from './Null'
import { JsonRegExp } from './RegExp'
import { JsonString } from './String'
import { JsonUndefined } from './Undefined'

export const dataTypes = {
  string: JsonString,
  integer: JsonInteger,
  float: JsonFloat,
  boolean: JsonBoolean,
  function: JsonFunction,
  null: JsonNull,
  nan: JsonNaN,
  undefined: JsonUndefined,
  date: JsonDate,
  regexp: JsonRegExp
  // don't import JsonObject here
} as const
