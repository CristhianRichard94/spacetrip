import { describe, it, expect, vi, afterEach } from "vitest";
import { renderHook } from "@testing-library/react";
import useStaggerReveal from "./useStaggerReveal.js";

function installObserverMock({ observe, disconnect, unobserve, capture } = {}) {
  window.IntersectionObserver = class MockIntersectionObserver {
    constructor(callback) {
      if (capture) capture(callback);
    }

    observe(...args) {
      observe?.(...args);
    }

    unobserve(...args) {
      unobserve?.(...args);
    }

    disconnect(...args) {
      disconnect?.(...args);
    }
  };
}

describe("useStaggerReveal", () => {
  afterEach(() => {
    document.body.innerHTML = "";
    vi.restoreAllMocks();
  });

  it("observes the reveal sections that exist in the DOM", () => {
    document.body.innerHTML = `
      <section id="skills-section"></section>
      <section id="portfolio-section"></section>
    `;
    const observeSpy = vi.fn();
    installObserverMock({ observe: observeSpy });

    renderHook(() => useStaggerReveal());

    expect(observeSpy).toHaveBeenCalledTimes(2);
  });

  it("does nothing (no observer created) when none of the target sections exist", () => {
    document.body.innerHTML = "";
    const ctorSpy = vi.fn();
    installObserverMock({ capture: ctorSpy });

    renderHook(() => useStaggerReveal());

    expect(ctorSpy).not.toHaveBeenCalled();
  });

  it("adds .revealed once and stops observing that section", () => {
    document.body.innerHTML = `<section id="skills-section"></section>`;
    const section = document.getElementById("skills-section");
    const unobserveSpy = vi.fn();
    let capturedCallback;
    installObserverMock({
      capture: (cb) => (capturedCallback = cb),
      unobserve: unobserveSpy,
    });

    renderHook(() => useStaggerReveal());

    capturedCallback([{ target: section, isIntersecting: true }]);
    expect(section.classList.contains("revealed")).toBe(true);
    expect(unobserveSpy).toHaveBeenCalledWith(section);
  });

  it("disconnects the observer on unmount", () => {
    document.body.innerHTML = `<section id="skills-section"></section>`;
    const disconnectSpy = vi.fn();
    installObserverMock({ disconnect: disconnectSpy });

    const { unmount } = renderHook(() => useStaggerReveal());
    unmount();

    expect(disconnectSpy).toHaveBeenCalledTimes(1);
  });
});
