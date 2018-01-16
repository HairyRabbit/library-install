/**
 * @jest
 */

import path from 'path'
import resolve from '../lib/pluginResolver'

test('should return null when not find package.json', () => {
  jest.mock('pkg-up', () => null)
  expect(resolve()).toBe(null)
})

test('should return null, when can\'t find any plugins', () => {
  expect(resolve()).toBe(null)
})

test('resolve library', () => {
  jest.mock(path.resolve('./package.json'), () => {
    return {
      devDependencies: {
        "@rabbitcc/install-library-foo": "@rabbitcc/install-library-foo"
      }
    }
  }, { virtual: true })

  jest.mock('@rabbitcc/install-library-foo', () => {
    return {
      id: 'foo'
    }
  }, { virtual: true })

  expect(resolve()).toEqual({
    library: {
      foo: { id: 'foo' }
    }
  })
})