/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { configDefaults } from 'vitest/config'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTests.js',
    silent: true, // Disable console.log output
    coverage: {
      reporter: ['text', 'json', 'html', 'text-summary'],
      include: ['src/components/hooks/*/*.{js,jsx,tsx}'], 
      exclude: [
        'node_modules',
        'src/components/context/**',
        'src/components/layout/**',
        'src/components/routes/**',
        'src/components/views/Public/Game',
        'src/components/services/**',
        'src/components/styles/**',
        'src/components/types/**',
      ],
    },
  },
})