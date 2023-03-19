import { expectTypeOf } from 'expect-type'
import type { ComponentType } from 'react'
import { describe, expect, test } from 'vitest'

import type { DataItemProps, Path } from '../src'
import { applyValue, createDataType, isCycleReference } from '../src'
import { safeStringify, segmentArray } from '../src/utils'

describe('function applyValue', () => {
  const patches: any[] = [{}, undefined, 1, '2', 3n, 0.4]
  test('incorrect arguments', () => {
    expect(() => {
      applyValue({}, ['not', 'exist'], 1)
    }).toThrow()
    expect(() => {
      applyValue(1, ['not', 'exist'], 1)
    }).toThrow()
  })

  test('undefined', () => {
    patches.forEach(patch => {
      const newValue = applyValue(undefined, [], patch)
      expect(newValue).is.eq(patch)
    })
  })

  test('null', () => {
    patches.forEach(patch => {
      const newValue = applyValue(null, [], patch)
      expect(newValue).is.eq(patch)
    })
  })

  test('number', () => {
    patches.forEach(patch => {
      const newValue = applyValue(1, [], patch)
      expect(newValue).is.eq(patch)
    })
    patches.forEach(patch => {
      const newValue = applyValue(114514, [], patch)
      expect(newValue).is.eq(patch)
    })
  })

  test('string', () => {
    patches.forEach(patch => {
      const newValue = applyValue('', [], patch)
      expect(newValue).is.eq(patch)
    })
  })

  test('object', () => {
    const original = {
      foo: 1
    }
    const newValue = applyValue(original, ['foo'], 2)
    expect(newValue).is.deep.eq({
      foo: 2
    })
  })
})

describe('function isCycleReference', () => {
  test('root is leaf', () => {
    const root = {
      leaf: {}
    }
    root.leaf = root
    expect(isCycleReference(root, ['leaf'], root.leaf)).to.eq('')
  })

  test('branch is leaf', () => {
    const root = {
      a: {
        b: {
          c: {}
        }
      }
    }
    root.a.b.c = root.a.b
    expect(isCycleReference(root, ['a', 'b', 'c'], root.a.b.c)).to.eq('a.b')
  })
})

describe('function createDataType', () => {
  test('case 1', () => {
    const dataType = createDataType<string>(
      (value) => {
        expectTypeOf(value).toBeUnknown()
        return true
      },
      (props) => {
        expectTypeOf(props.value).toBeString()
        return null
      }
    )
    expectTypeOf(dataType).toEqualTypeOf<{
      is:(value: unknown, path: Path) => value is string
      Component: ComponentType<DataItemProps<string>>
    }>()
    expectTypeOf(dataType.is).returns.toBeBoolean()
    expect(dataType.is).toBeTypeOf('function')
    expect(dataType.Component).toBeTypeOf('function')
  })
  test('case 2', () => {
    const dataType = createDataType<string>(
      (value) => {
        expectTypeOf(value).toBeUnknown()
        return true
      },
      (props) => {
        expectTypeOf(props.value).toBeString()
        return null
      },
      (props) => {
        expectTypeOf(props.value).toBeString()
        return null
      }
    )
    expectTypeOf(dataType).toEqualTypeOf<{
      is:(value: unknown, path: Path) => value is string
      Component: ComponentType<DataItemProps<string>>
      Editor: ComponentType<DataItemProps<string>>
    }>()
    expectTypeOf(dataType.is).returns.toBeBoolean()
    expect(dataType.is).toBeTypeOf('function')
    expect(dataType.Component).toBeTypeOf('function')
    expect(dataType.Editor).toBeTypeOf('function')
  })
  test('case 3', () => {
    const dataType = createDataType<string>(
      (value) => {
        expectTypeOf(value).toBeUnknown()
        return true
      },
      (props) => {
        expectTypeOf(props.value).toBeString()
        return null
      },
      undefined,
      (props) => {
        expectTypeOf(props.value).toBeString()
        return null
      },
      (props) => {
        expectTypeOf(props.value).toBeString()
        return null
      }
    )
    expectTypeOf(dataType).toEqualTypeOf<{
      is:(value: unknown, path: Path) => value is string
      Component: ComponentType<DataItemProps<string>>
      PreComponent: ComponentType<DataItemProps<string>>
      PostComponent: ComponentType<DataItemProps<string>>
    }>()
    expectTypeOf(dataType.is).returns.toBeBoolean()
    expect(dataType.is).toBeTypeOf('function')
    expect(dataType.Component).toBeTypeOf('function')
    expect(dataType.PreComponent).toBeTypeOf('function')
    expect(dataType.PostComponent).toBeTypeOf('function')
  })

  test('case 4', () => {
    const dataType = createDataType<string>(
      (value) => {
        expectTypeOf(value).toBeUnknown()
        return true
      },
      (props) => {
        expectTypeOf(props.value).toBeString()
        return null
      },
      (props) => {
        expectTypeOf(props.value).toBeString()
        return null
      },
      (props) => {
        expectTypeOf(props.value).toBeString()
        return null
      },
      (props) => {
        expectTypeOf(props.value).toBeString()
        return null
      }
    )
    expectTypeOf(dataType).toEqualTypeOf<{
      is:(value: unknown, path: Path) => value is string
      Component: ComponentType<DataItemProps<string>>
      Editor: ComponentType<DataItemProps<string>>
      PreComponent: ComponentType<DataItemProps<string>>
      PostComponent: ComponentType<DataItemProps<string>>
    }>()
    expectTypeOf(dataType.is).returns.toBeBoolean()
    expect(dataType.is).toBeTypeOf('function')
    expect(dataType.Component).toBeTypeOf('function')
    expect(dataType.Editor).toBeTypeOf('function')
    expect(dataType.PreComponent).toBeTypeOf('function')
    expect(dataType.PostComponent).toBeTypeOf('function')
  })
})

describe('function segmentArray', () => {
  test('case 1', () => {
    const array = [1, 2, 3, 4, 5]
    const result = segmentArray(array, 2)
    expect(result).to.deep.eq([
      [1, 2],
      [3, 4],
      [5]
    ])
  })

  test('case 2', () => {
    const array = [1, 2, 3, 4, 5]
    const result = segmentArray(array, 3)
    expect(result).to.deep.eq([
      [1, 2, 3],
      [4, 5]
    ])
  })

  test('case 3', () => {
    const array = [1, 2, 3, 4, 5]
    const result = segmentArray(array, 5)
    expect(result).to.deep.eq([
      [1, 2, 3, 4, 5]
    ])
  })

  test('case 4', () => {
    const array = [1, 2, 3, 4, 5]
    const result = segmentArray(array, 6)
    expect(result).to.deep.eq([
      [1, 2, 3, 4, 5]
    ])
  })
})

describe('function circularStringify', () => {
  test('should works as JSON.stringify', () => {
    const obj = { foo: 1, bar: 2 }
    expect(safeStringify(obj)).to.eq(JSON.stringify(obj))
  })

  test('should works with circular reference in object', () => {
    const obj = {
      foo: 1,
      bar: {
        foo: 2,
        bar: null
      }
    }
    obj.bar.bar = obj.bar
    expect(safeStringify(obj)).to.eq('{"foo":1,"bar":{"foo":2,"bar":"[Circular]"}}')
  })

  test('should works with circular reference in array', () => {
    const array = [1, 2, 3, 4, 5]
    // @ts-expect-error ignore
    array[2] = array
    expect(safeStringify(array)).to.eq('[1,2,"[Circular]",4,5]')
  })

  test('should works with complex circular object', () => {
    const obj = {
      a: {
        b: {
          c: 1,
          d: 2
        }
      },
      e: {
        f: 3,
        g: 4
      }
    }
    // @ts-expect-error ignore
    obj.a.b.e = obj.e
    // @ts-expect-error ignore
    obj.e.g = obj.a.b
    expect(safeStringify(obj)).to.eq('{"a":{"b":{"c":1,"d":2,"e":{"f":3,"g":"[Circular]"}}},"e":{"f":3,"g":"[Circular]"}}')
  })

  test('should works with ES6 Map', () => {
    const map = new Map()
    map.set('foo', 1)
    map.set('bar', 2)
    expect(safeStringify(map)).to.eq('{"foo":1,"bar":2}')
  })

  test('should works with ES6 Set', () => {
    const set = new Set()
    set.add(1)
    set.add(2)
    expect(safeStringify(set)).to.eq('[1,2]')
  })

  test('should works with ES6 Map with circular reference', () => {
    const map = new Map()
    map.set('foo', 1)
    map.set('bar', map)
    expect(safeStringify(map)).to.eq('{"foo":1,"bar":"[Circular]"}')
  })

  test('should works with ES6 Set with circular reference', () => {
    const set = new Set()
    set.add(1)
    set.add(set)
    expect(safeStringify(set)).to.eq('[1,"[Circular]"]')
  })
})
