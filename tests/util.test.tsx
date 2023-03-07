import { expectTypeOf } from 'expect-type'
import type { ComponentType } from 'react'
import { describe, expect, test } from 'vitest'

import type { DataItemProps } from '../src'
import { applyValue, createDataType, isCycleReference } from '../src'
import { segmentArray } from '../src/utils'

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
      is:(value: unknown) => value is string
      Component: ComponentType<DataItemProps<string>>
    }>()
    const someValue: unknown = null
    expectTypeOf(dataType.is).returns.toBeBoolean()
    if (dataType.is(someValue)) {
      expectTypeOf(someValue).toMatchTypeOf<string>()
    } else {
      expectTypeOf(someValue).not.toMatchTypeOf<string>()
      expectTypeOf(someValue).toMatchTypeOf<unknown>()
    }
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
      is:(value: unknown) => value is string
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
      is:(value: unknown) => value is string
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
      is:(value: unknown) => value is string
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
