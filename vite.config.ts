import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'
import { defineConfig } from 'vitest/config'

import { dependencies, peerDependencies } from './package.json'

const externals = Object.assign(peerDependencies, dependencies)

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    minify: process.env.NODE_ENV === 'production',
    lib: {
      formats: ['es', 'cjs', 'umd'],
      entry: resolve(__dirname, 'src/index.tsx'),
      name: 'JsonViewer',
      fileName: 'index'
    },
    rollupOptions: {
      external: Object.keys(externals),
      output: {
        globals: Object.keys(externals).reduce(
          (result, value) => Object.assign(result, { [value]: value }),
          {}
        )
      }
    }
  },
  plugins: [
    react(),
    dts()
  ]
})
