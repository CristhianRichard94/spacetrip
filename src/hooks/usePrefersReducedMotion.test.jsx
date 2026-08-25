import { describe, it, expect, vi, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import usePrefersReducedMotion from "./usePrefersReducedMotion.js";

function mockMatchMedia(initialMatches) {
  const listeners = new Set();
  const mql = {
    matches: initialMatches,
    addEventListener: (_, listener) => listeners.add(listener),
    removeEventListener: (_, listener) => listeners.delete(listener),
  };
  window.matchMedia = vi.fn().mockReturnValue(mql);
  return { mql, listeners };
}

describe("usePrefersReducedMotion", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns true immediately when the media query already matches", () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => usePrefersReducedMotion());
    expect(result.current).toBe(true);
  });

  it("returns false when the media query does not match", () => {
    mockMatchMedia(false);
    const { result } = renderHook(() => usePrefersReducedMotion());
    expect(result.current).toBe(false);
  });

  it("updates state when the media query change event fires", () => {
    const { listeners } = mockMatchMedia(false);
    const { result } = renderHook(() => usePrefersReducedMotion());
    expect(result.current).toBe(false);

    act(() => {
      listeners.forEach((listener) => listener({ matches: true }));
    });
    expect(result.current).toBe(true);
  });

  it("removes the change listener on unmount", () => {
    const { mql, listeners } = mockMatchMedia(false);
    const removeSpy = vi.spyOn(mql, "removeEventListener");
    const { unmount } = renderHook(() => usePrefersReducedMotion());
    expect(listeners.size).toBe(1);

    unmount();
    expect(removeSpy).toHaveBeenCalledTimes(1);
  });
});
