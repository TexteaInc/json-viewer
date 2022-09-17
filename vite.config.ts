import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'
import { defineConfig } from 'vitest/config'

import { peerDependencies } from './package.json'

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
      external: Object.keys(peerDependencies),
      output: {
        globals: Object.keys(peerDependencies).reduce(
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
