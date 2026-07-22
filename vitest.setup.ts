import '@testing-library/jest-dom'

// jsdom has no IntersectionObserver, which framer-motion's whileInView (Reveal,
// RevealLines) and the JourneyRail require. A no-op stub lets those components
// mount; visibility-driven behaviour itself is covered by the Playwright suite.
class IntersectionObserverStub implements IntersectionObserver {
  readonly root: Element | Document | null = null
  readonly rootMargin: string = '0px'
  readonly thresholds: ReadonlyArray<number> = [0]
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
  takeRecords(): IntersectionObserverEntry[] {
    return []
  }
}

if (typeof globalThis.IntersectionObserver === 'undefined') {
  globalThis.IntersectionObserver =
    IntersectionObserverStub as unknown as typeof IntersectionObserver
}
