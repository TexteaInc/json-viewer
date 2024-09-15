import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  test: {
    setupFiles: './tests/setup.ts',
    globals: true,
    environment: 'jsdom',
    coverage: {
      include: ['src'],
      ignoreEmptyLines: false
    }
  }
})
