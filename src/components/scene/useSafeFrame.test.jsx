import { describe, it, expect, vi, afterEach } from "vitest";
import { renderHook } from "@testing-library/react";
import useSafeFrame from "./useSafeFrame.js";

const useFrameMock = vi.fn();
vi.mock("@react-three/fiber", () => ({
  useFrame: (...args) => useFrameMock(...args),
}));

const sceneModeContextMock = vi.fn();
vi.mock("../../context/SceneModeContext.jsx", () => ({
  useSceneModeContext: (...args) => sceneModeContextMock(...args),
}));

describe("useSafeFrame", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("invokes the wrapped callback with useFrame's arguments", () => {
    const fallbackToClassic = vi.fn();
    sceneModeContextMock.mockReturnValue({ fallbackToClassic });
    const callback = vi.fn();

    renderHook(() => useSafeFrame(callback, []));
    const registeredFrameHandler = useFrameMock.mock.calls[0][0];
    registeredFrameHandler("state", 0.16, 1);

    expect(callback).toHaveBeenCalledWith("state", 0.16, 1);
    expect(fallbackToClassic).not.toHaveBeenCalled();
  });

  it("catches errors thrown by the callback and falls back to classic mode", () => {
    const fallbackToClassic = vi.fn();
    sceneModeContextMock.mockReturnValue({ fallbackToClassic });
    const error = new Error("frame boom");
    const callback = vi.fn().mockImplementation(() => {
      throw error;
    });
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    renderHook(() => useSafeFrame(callback, []));
    const registeredFrameHandler = useFrameMock.mock.calls[0][0];

    expect(() => registeredFrameHandler("state", 0.16, 1)).not.toThrow();
    expect(fallbackToClassic).toHaveBeenCalledTimes(1);
    consoleSpy.mockRestore();
  });

  it("stops invoking the callback after it has already failed once", () => {
    const fallbackToClassic = vi.fn();
    sceneModeContextMock.mockReturnValue({ fallbackToClassic });
    const callback = vi.fn().mockImplementation(() => {
      throw new Error("boom");
    });
    vi.spyOn(console, "error").mockImplementation(() => {});

    renderHook(() => useSafeFrame(callback, []));
    const registeredFrameHandler = useFrameMock.mock.calls[0][0];

    registeredFrameHandler();
    registeredFrameHandler();
    registeredFrameHandler();

    expect(callback).toHaveBeenCalledTimes(1);
    expect(fallbackToClassic).toHaveBeenCalledTimes(1);
  });
});
