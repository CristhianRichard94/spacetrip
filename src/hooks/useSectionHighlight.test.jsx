import { describe, it, expect, vi, afterEach } from "vitest";
import { renderHook } from "@testing-library/react";
import useSectionHighlight from "./useSectionHighlight.js";

function installObserverMock({ observe, disconnect, capture } = {}) {
  window.IntersectionObserver = class MockIntersectionObserver {
    constructor(callback) {
      if (capture) capture(callback);
    }

    observe(...args) {
      observe?.(...args);
    }

    unobserve() {}

    disconnect(...args) {
      disconnect?.(...args);
    }
  };
}

describe("useSectionHighlight", () => {
  afterEach(() => {
    document.body.innerHTML = "";
    vi.restoreAllMocks();
  });

  it("observes every .main-section element on mount", () => {
    document.body.innerHTML = `
      <section class="main-section" id="a"></section>
      <section class="main-section" id="b"></section>
      <section id="c"></section>
    `;
    const observeSpy = vi.fn();
    installObserverMock({ observe: observeSpy });

    renderHook(() => useSectionHighlight());

    expect(observeSpy).toHaveBeenCalledTimes(2);
  });

  it("toggles the in-view class based on intersection entries", () => {
    document.body.innerHTML = `<section class="main-section" id="a"></section>`;
    const section = document.getElementById("a");
    let capturedCallback;
    installObserverMock({ capture: (cb) => (capturedCallback = cb) });

    renderHook(() => useSectionHighlight());

    capturedCallback([{ target: section, isIntersecting: true }]);
    expect(section.classList.contains("in-view")).toBe(true);

    capturedCallback([{ target: section, isIntersecting: false }]);
    expect(section.classList.contains("in-view")).toBe(false);
  });

  it("disconnects the observer on unmount", () => {
    document.body.innerHTML = `<section class="main-section" id="a"></section>`;
    const disconnectSpy = vi.fn();
    installObserverMock({ disconnect: disconnectSpy });

    const { unmount } = renderHook(() => useSectionHighlight());
    unmount();

    expect(disconnectSpy).toHaveBeenCalledTimes(1);
  });
});
