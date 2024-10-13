import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
  // If you want to keep running your existing tests in Node.js, uncomment the next line.
  // 'vite.config.ts',
  {
    extends: 'vite.config.ts',
    test: {
      name: 'unit',
      environment: 'jsdom',
      include: ['**/*.unit.test.ts'],
      setupFiles: ['./test/vitest-setup.ts'],
    },
  },
  {
    extends: 'vite.config.ts',
    test: {
      name: 'browser',
      include: ['**/*.browser.test.tsx'],
      browser: {
        enabled: true,
        name: 'chromium',
        provider: 'playwright',
        // https://playwright.dev
        providerOptions: {},
      },
    },
  },
])
