import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import EnhancedSceneErrorBoundary from "./EnhancedSceneErrorBoundary.jsx";

function Bomb() {
  throw new Error("scene render failed");
}

describe("EnhancedSceneErrorBoundary", () => {
  it("renders children when there is no error", () => {
    render(
      <EnhancedSceneErrorBoundary>
        <div>scene</div>
      </EnhancedSceneErrorBoundary>
    );
    expect(screen.getByText("scene")).toBeInTheDocument();
  });

  it("renders nothing and calls onError when a child throws", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const onError = vi.fn();
    const { container } = render(
      <EnhancedSceneErrorBoundary onError={onError}>
        <Bomb />
      </EnhancedSceneErrorBoundary>
    );
    expect(container).toBeEmptyDOMElement();
    expect(onError).toHaveBeenCalledTimes(1);
    expect(onError.mock.calls[0][0]).toBeInstanceOf(Error);
    consoleSpy.mockRestore();
  });

  it("resets the error state when resetKey changes", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const { rerender, container } = render(
      <EnhancedSceneErrorBoundary resetKey={1}>
        <Bomb />
      </EnhancedSceneErrorBoundary>
    );
    expect(container).toBeEmptyDOMElement();

    rerender(
      <EnhancedSceneErrorBoundary resetKey={2}>
        <div>recovered</div>
      </EnhancedSceneErrorBoundary>
    );
    expect(screen.getByText("recovered")).toBeInTheDocument();
    consoleSpy.mockRestore();
  });
});
