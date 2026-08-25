import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ChunkErrorBoundary from "./ChunkErrorBoundary.jsx";

function Bomb() {
  throw new Error("chunk load failed");
}

describe("ChunkErrorBoundary", () => {
  it("renders children when there is no error", () => {
    render(
      <ChunkErrorBoundary>
        <div>content</div>
      </ChunkErrorBoundary>
    );
    expect(screen.getByText("content")).toBeInTheDocument();
  });

  it("renders the fallback when a child throws", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    render(
      <ChunkErrorBoundary fallback={<div>fallback ui</div>}>
        <Bomb />
      </ChunkErrorBoundary>
    );
    expect(screen.getByText("fallback ui")).toBeInTheDocument();
    consoleSpy.mockRestore();
  });

  it("renders null when there is no fallback prop and a child throws", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const { container } = render(
      <ChunkErrorBoundary>
        <Bomb />
      </ChunkErrorBoundary>
    );
    expect(container).toBeEmptyDOMElement();
    consoleSpy.mockRestore();
  });
});
