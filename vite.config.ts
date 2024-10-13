import react from '@vitejs/plugin-react'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'
import { configDefaults } from 'vitest/config'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vitejs.dev/config/
export default defineConfig({
  base: '/fm-interactive-comments-section',
  plugins: [
    svgr({
      svgrOptions: {
        exportType: 'default',
        ref: true,
        titleProp: true,
        plugins: [
          '@svgr/plugin-svgo',
          '@svgr/plugin-jsx',
          '@svgr/plugin-prettier',
        ],
        dimensions: false,
        typescript: false,
        svgoConfig: {
          plugins: [
            {
              name: 'preset-default',
              params: { overrides: { removeViewBox: false } },
            },
            { name: 'removeDimensions' },
          ],
        },
      },
      include: '**/*.svg',
    }),
    react(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    passWithNoTests: true,
    exclude: [
      ...configDefaults.exclude,
      '**/build/**',
      '**/e2e/**',
      '**/*.browser.test.ts',
    ],
  },
})
