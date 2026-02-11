import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.spec.{js,jsx}',
        '**/*.test.{js,jsx}',
        '**/index.js',
        '**/index.jsx',
        'dist/',
        'e2e/',
        'scripts/',
        'public/',
        'vite.config.js',
        'vitest.config.js',
        'playwright.config.js'
      ],
      include: ['src/**/*.{js,jsx}'],
      all: true,
      lines: 80,
      functions: 80,
      branches: 80,
      statements: 80
    },
    include: ['src/**/*.{test,spec}.{js,jsx}'],
    testTimeout: 10000,
    hookTimeout: 10000
  }
})
