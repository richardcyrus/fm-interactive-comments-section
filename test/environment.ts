import type { Environment } from 'vitest'
import { builtinEnvironments } from 'vitest/environments'

export default <Environment>{
  name: 'custom_jsdom',
  transformMode: 'ssr',
  setup: (global, options) => {
    builtinEnvironments.jsdom.setup(global, options)

    global.structuredClone = structuredClone

    return {
      teardown() {
        // called after all tests with this env have been run
      },
    }
  },
}
