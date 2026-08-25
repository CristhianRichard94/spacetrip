import { describe, it, expect, vi, afterEach } from "vitest";
import { renderHook } from "@testing-library/react";
import useVariableSpin from "./useVariableSpin.js";

describe("useVariableSpin", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("does nothing when the ref has no current node", () => {
    const rafSpy = vi.spyOn(window, "requestAnimationFrame");
    const ref = { current: null };

    renderHook(() => useVariableSpin(ref));

    expect(rafSpy).not.toHaveBeenCalled();
  });

  it("does nothing when active is false", () => {
    const rafSpy = vi.spyOn(window, "requestAnimationFrame");
    const ref = { current: document.createElement("div") };

    renderHook(() => useVariableSpin(ref, { active: false }));

    expect(rafSpy).not.toHaveBeenCalled();
  });

  it("starts a rAF loop and writes a rotate transform onto the node", () => {
    const node = document.createElement("div");
    const ref = { current: node };
    let rafCallback;
    vi.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
      rafCallback = cb;
      return 1;
    });
    vi.spyOn(window, "cancelAnimationFrame").mockImplementation(() => {});
    vi.spyOn(performance, "now").mockReturnValue(0);

    renderHook(() => useVariableSpin(ref));

    expect(typeof rafCallback).toBe("function");
    performance.now.mockReturnValue(16);
    rafCallback(16);

    expect(node.style.transform).toMatch(/^translate\(-50%, -50%\) rotate\(-?[\d.]+deg\)$/);
  });

  it("cancels the animation frame on unmount", () => {
    const node = document.createElement("div");
    const ref = { current: node };
    vi.spyOn(window, "requestAnimationFrame").mockReturnValue(42);
    const cancelSpy = vi.spyOn(window, "cancelAnimationFrame").mockImplementation(() => {});

    const { unmount } = renderHook(() => useVariableSpin(ref));
    unmount();

    expect(cancelSpy).toHaveBeenCalledWith(42);
  });
});
