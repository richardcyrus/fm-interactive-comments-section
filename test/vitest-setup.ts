import * as matchers from '@testing-library/jest-dom/matchers'
import 'fake-indexeddb/auto'
import { expect } from 'vitest'

expect.extend(matchers)
window.HTMLElement.prototype.scrollIntoView = vi.fn()
window.HTMLElement.prototype.hasPointerCapture = vi.fn()
window.HTMLElement.prototype.releasePointerCapture = vi.fn()
window.PointerEvent = MouseEvent as typeof window.PointerEvent
class ResizeObserver {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cb: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(cb: any) {
    this.cb = cb
  }

  // @ts-expect-error ts(6133)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  observe(cb: any) {
    this.cb([{ borderBoxSize: { inlineSize: 0, blockSize: 0 } }])
  }
  unobserve() {}
  disconnect() {}
}
global.ResizeObserver = ResizeObserver
global.DOMRect = {
  // @ts-expect-error ts(2379)
  fromRect: () => ({
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: 0,
    height: 0,
  }),
}
