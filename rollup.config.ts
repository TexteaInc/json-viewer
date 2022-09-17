/// <reference types="node" />
import { basename, resolve } from 'node:path'

import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import type {
  ModuleFormat,
  OutputOptions,
  RollupCache,
  RollupOptions
} from 'rollup'
import dts from 'rollup-plugin-dts'
import { swc } from 'rollup-plugin-swc3'

let cache: RollupCache

const dtsOutput = new Set<[string, string]>()

const outputDir = resolve(__dirname, 'dist')

const external = [
  '@emotion/react',
  '@emotion/styled',
  '@mui/icons-material',
  '@mui/lab',
  '@mui/material',
  'copy-to-clipboard',
  'zustand',
  'react',
  'react-dom'
]
const outputMatrix = (
  name: string, format: ModuleFormat[] = ['es', 'umd']): OutputOptions[] => {
  const baseName = basename(name)
  return format.flatMap(format => ({
    file: resolve(outputDir, `${baseName}.${format === 'es' ? 'm' : ''}js`),
    sourcemap: true,
    name: 'JsonViewer',
    format,
    banner: `/// <reference types="./${baseName}.d.ts" />`,
    globals: external.reduce((object, module) => {
      object[module] = module
      return object
    }, {} as Record<string, string>)
  }))
}

const buildMatrix = (input: string, output: string): RollupOptions => {
  dtsOutput.add([input.replaceAll('.js', '.d.ts'), output])
  return {
    input,
    output: outputMatrix(output),
    cache,
    external,
    plugins: [
      swc(),
      commonjs({
        esmExternals: true
      }),
      nodeResolve({
        exportConditions: ['import', 'require', 'default']
      })
    ]
  }
}

const dtsMatrix = (): RollupOptions[] => {
  return [...dtsOutput.values()].flatMap(([input, output]) => ({
    input,
    cache,
    output: {
      file: resolve(outputDir, `${output}.d.ts`),
      format: 'es'
    },
    plugins: [
      dts()
    ]
  }))
}

const build: RollupOptions[] = [
  buildMatrix('./dist/out/index.js', 'index'),
  ...dtsMatrix()
]

export default build
