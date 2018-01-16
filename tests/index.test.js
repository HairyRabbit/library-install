/**
 * @jest
 */

import path from 'path'
import { D, O, P } from '../lib/flag'
import install from '../lib'

jest.mock('../lib/cmder', () => {
  return () => {
    return {
      install(libs, options) {
        return Promise.resolve({ libs, options })
      }
    }
  }
})

/**
 * options
 */
test('should override options', () => {
  return expect(install(['jquery'], { flag: O })).resolves.toEqual({
    libs: [
      'jquery'
    ],
    options: {
      flag: O,
      addOptions: [],
      spawnOptions: {}
    }
  })
})

test('should override options by user options', () => {
  return expect(install(['jquery', 'babel.'], { flag: O })).resolves.toEqual({
    libs: [
      'jquery',
      '@babel/core',
      '@babel/preset-env',
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-export-default-from',
      '@babel/plugin-proposal-export-namespace-from',
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-proposal-throw-expressions'
    ],
    options: {
      flag: O,
      addOptions: [],
      spawnOptions: {}
    }
  })
})

/**
 * install
 */

test('install normal module', () => {
  return expect(install(['jquery'])).resolves.toEqual({
    libs: ['jquery'],
    options: {
      flag: P,
      addOptions: [],
      spawnOptions: {}
    }
  })
})

test('install library', () => {
  return expect(install(['babel.'])).resolves.toEqual({
    libs: [
      '@babel/core',
      '@babel/preset-env',
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-export-default-from',
      '@babel/plugin-proposal-export-namespace-from',
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-proposal-throw-expressions'
    ],
    options: {
      flag: D,
      addOptions: [],
      spawnOptions: {}
    }
  })
})

test('install multi module, mixed library and normal module', () => {
  return expect(install(['babel.', 'jquery'])).resolves.toEqual({
    libs: [
      '@babel/core',
      '@babel/preset-env',
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-export-default-from',
      '@babel/plugin-proposal-export-namespace-from',
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-proposal-throw-expressions',
      'jquery',
    ],
    options: {
      flag: D,
      addOptions: [],
      spawnOptions: {}
    }
  })
})

test('install multi library', () => {
  return expect(install(['babel.', 'webpack.'])).resolves.toEqual({
    libs: [
      '@babel/core',
      '@babel/preset-env',
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-export-default-from',
      '@babel/plugin-proposal-export-namespace-from',
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-proposal-throw-expressions',
      'babel-loader',
      'webpack',
      'webpack-dev-server',
      'webpack-cli',
      'css-loader',
      'style-loader',
      'file-loader',
      'url-loader',
      'extract-text-webpack-plugin',
      'html-webpack-plugin',
      'html-webpack-template',
      'uglifyjs-webpack-plugin'
    ],
    options: {
      flag: D,
      addOptions: [],
      spawnOptions: {}
    }
  })
})

test('shoule run hook for installed library', () => {
  jest.doMock(path.resolve('./package.json'), () => {
    return {
      devDependencies: {
        "webpack": "42"
      }
    }
  }, { virtual: true })
  return expect(install(['babel.'])).resolves.toEqual({
    libs: [
      '@babel/core',
      '@babel/preset-env',
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-export-default-from',
      '@babel/plugin-proposal-export-namespace-from',
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-proposal-throw-expressions',
      'babel-loader'
    ],
    options: {
      flag: D,
      addOptions: [],
      spawnOptions: {}
    }
  })
})

test('install multi modules, mixed multi library and normal modules', () => {
  return expect(install(['babel.', 'jquery', 'webpack.', 'vue'])).resolves.toEqual({
    libs: [
      '@babel/core',
      '@babel/preset-env',
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-export-default-from',
      '@babel/plugin-proposal-export-namespace-from',
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-proposal-throw-expressions',
      'babel-loader',
      'jquery',
      'webpack',
      'webpack-dev-server',
      'webpack-cli',
      'css-loader',
      'style-loader',
      'file-loader',
      'url-loader',
      'extract-text-webpack-plugin',
      'html-webpack-plugin',
      'html-webpack-template',
      'uglifyjs-webpack-plugin',
      'vue'
    ],
    options: {
      flag: D,
      addOptions: [],
      spawnOptions: {}
    }
  })
})

test('should do uniq', () => {
  return expect(install(['babel.', 'webpack.', 'babel.'])).resolves.toEqual({
    libs: [
      '@babel/core',
      '@babel/preset-env',
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-export-default-from',
      '@babel/plugin-proposal-export-namespace-from',
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-proposal-throw-expressions',
      'babel-loader',
      'webpack',
      'webpack-dev-server',
      'webpack-cli',
      'css-loader',
      'style-loader',
      'file-loader',
      'url-loader',
      'extract-text-webpack-plugin',
      'html-webpack-plugin',
      'html-webpack-template',
      'uglifyjs-webpack-plugin',
    ],
    options: {
      flag: D,
      addOptions: [],
      spawnOptions: {}
    }
  })
})
