import "@testing-library/jest-dom/vitest";

// This setup file also loads for node-environment test files (Netlify
// functions), where `window`/`HTMLCanvasElement` don't exist at all. Skip
// all browser-only shims in that case.
const isBrowserLike = typeof window !== "undefined";

// jsdom doesn't implement matchMedia at all — provide a default mock so any
// component/hook calling it doesn't crash. Individual tests can override
// `window.matchMedia` for specific matches/listener assertions.
if (isBrowserLike && !window.matchMedia) {
  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
}

// jsdom doesn't implement ResizeObserver, used by some layout-aware libs.
if (isBrowserLike && !window.ResizeObserver) {
  window.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}

// jsdom doesn't implement IntersectionObserver either (used by
// useSectionHighlight / useStaggerReveal).
if (isBrowserLike && !window.IntersectionObserver) {
  window.IntersectionObserver = class IntersectionObserver {
    constructor(callback) {
      this.callback = callback;
    }
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}

// jsdom's canvas has no WebGL support at all, and R3F/hasWebGL-adjacent code
// paths call getContext("webgl"). Stub it out to avoid "not implemented"
// errors without pulling in a real WebGL implementation.
if (isBrowserLike) {
  const originalGetContext = HTMLCanvasElement.prototype.getContext;
  HTMLCanvasElement.prototype.getContext = function mockGetContext(type, ...args) {
    if (type === "webgl" || type === "experimental-webgl" || type === "webgl2") {
      return null;
    }
    if (originalGetContext) {
      try {
        return originalGetContext.call(this, type, ...args);
      } catch (error) {
        return null;
      }
    }
    return null;
  };
}
