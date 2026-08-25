import { describe, it, expect, vi, afterEach } from "vitest";
import hasWebGL from "./hasWebGL.js";

describe("hasWebGL", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns true when a WebGL context is available", () => {
    window.WebGLRenderingContext = function WebGLRenderingContext() {};
    vi.spyOn(document, "createElement").mockReturnValue({
      getContext: (type) => (type === "webgl" ? {} : null),
    });

    expect(hasWebGL()).toBe(true);
  });

  it("returns false when WebGLRenderingContext is not defined", () => {
    const original = window.WebGLRenderingContext;
    delete window.WebGLRenderingContext;

    expect(hasWebGL()).toBe(false);

    window.WebGLRenderingContext = original;
  });

  it("returns false when getContext returns null for both webgl variants", () => {
    window.WebGLRenderingContext = function WebGLRenderingContext() {};
    vi.spyOn(document, "createElement").mockReturnValue({
      getContext: () => null,
    });

    expect(hasWebGL()).toBe(false);
  });

  it("returns false instead of throwing when canvas creation throws", () => {
    vi.spyOn(document, "createElement").mockImplementation(() => {
      throw new Error("canvas creation blocked");
    });

    expect(() => hasWebGL()).not.toThrow();
    expect(hasWebGL()).toBe(false);
  });
});
