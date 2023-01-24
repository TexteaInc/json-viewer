/// <reference types="node" />
import { basename, resolve } from 'node:path'

import alias from '@rollup/plugin-alias'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import type {
  ModuleFormat,
  OutputOptions,
  RollupOptions
} from 'rollup'
import dts from 'rollup-plugin-dts'
import { defineRollupSwcOption, swc } from 'rollup-plugin-swc3'
import { fileURLToPath } from 'url'

const outputDir = fileURLToPath(new URL('dist', import.meta.url))

const externalDeps = [
  '@emotion/react',
  '@emotion/styled',
  '@emotion/react/jsx-runtime',
  '@emotion/react/jsx-dev-runtime',
  '@mui/material',
  /@mui\/material\/.*/,
  'copy-to-clipboard',
  'zustand',
  'zustand/context',
  'zustand/middleware',
  'react',
  'react/jsx-runtime',
  'react-dom',
  'react-dom/client'
]

const aliasPlugin = alias({
  entries: [
    { find: 'react', replacement: '@emotion/react' },
    { find: 'react/jsx-runtime', replacement: '@emotion/react/jsx-runtime' },
    { find: 'react/jsx-dev-runtime', replacement: '@emotion/react/jsx-dev-runtime' }
  ]
})

const replacePlugin = replace({
  preventAssignment: true,
  'process.env.NODE_ENV': JSON.stringify('production'),
  'typeof window': JSON.stringify('object')
})

const esmTransformImportsPlugin: [string, Record<string, any>] = [
  '@swc/plugin-transform-imports',
  {
    '@mui/material': { transform: '@mui/material/{{member}}' },
    '@mui/material/styles': { transform: '@mui/material/styles/{{member}}' }
  }
]

const cjsTransformImportsPlugin: [string, Record<string, any>] = [
  '@swc/plugin-transform-imports',
  {
    '@mui/material': { transform: '@mui/material/node/{{member}}' },
    '@mui/material/styles': { transform: '@mui/material/node/styles/{{member}}' }
  }
]

const outputMatrix = (
  name: string, format: ModuleFormat[]): OutputOptions[] => {
  const baseName = basename(name)
  return format.map(format => ({
    file: resolve(outputDir, `${baseName}.${format === 'es' ? 'm' : ''}js`),
    sourcemap: false,
    name: 'JsonViewer',
    format,
    banner: `/// <reference types="./${baseName}.d.ts" />`,
    globals: externalDeps.reduce((object, module) => {
      if (typeof module === 'string') {
        object[module] = module
      }
      return object
    }, {} as Record<string, string>)
  }))
}

const buildMatrix = (input: string, output: string, config: {
  format: ModuleFormat[]
  browser: boolean
}): RollupOptions[] => {
  return [
    ...config.format.map(format => ({
      input,
      output: outputMatrix(output, [format]),
      external: config.browser ? [] : externalDeps,

      plugins: [
        !config.browser && aliasPlugin,
        config.browser && replacePlugin,
        commonjs(),
        nodeResolve(),
        swc(defineRollupSwcOption({
          jsc: {
            externalHelpers: true,
            parser: {
              syntax: 'typescript',
              tsx: true
            },
            transform: {
              react: {
                runtime: 'automatic',
                importSource: '@emotion/react'
              }
            },
            experimental: {
              plugins: config.browser
                ? []
                : format === 'es'
                  ? [esmTransformImportsPlugin]
                  : [cjsTransformImportsPlugin]
            }
          }
        }))
      ]
    })),
    {
      input,
      output: {
        file: resolve(outputDir, `${output}.d.ts`),
        format: 'es'
      },
      plugins: [
        dts()
      ]
    }
  ]
}

const build: RollupOptions[] = [
  ...buildMatrix('./src/index.tsx', 'index', {
    format: ['es', 'cjs'],
    browser: false
  }),
  ...buildMatrix('./src/browser.tsx', 'browser', {
    format: ['es', 'umd'],
    browser: true
  })
]

export default build
