import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import VisualModeToggle from "./VisualModeToggle.jsx";
import { LanguageProvider } from "../context/LanguageContext.jsx";
import { SceneModeProvider } from "../context/SceneModeContext.jsx";

function renderToggle() {
  return render(
    <LanguageProvider>
      <SceneModeProvider>
        <VisualModeToggle />
      </SceneModeProvider>
    </LanguageProvider>
  );
}

describe("VisualModeToggle", () => {
  afterEach(() => {
    window.localStorage.clear();
    vi.restoreAllMocks();
  });

  it("renders nothing when WebGL is unavailable", () => {
    HTMLCanvasElement.prototype.getContext = () => null;
    delete window.WebGLRenderingContext;

    const { container } = renderToggle();
    expect(container).toBeEmptyDOMElement();
  });

  it("renders the toggle button when WebGL is available", async () => {
    window.WebGLRenderingContext = function WebGLRenderingContext() {};
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue({});
    Object.defineProperty(navigator, "hardwareConcurrency", { value: 8, configurable: true });
    window.matchMedia = vi.fn().mockReturnValue({
      matches: false,
      addEventListener: () => {},
      removeEventListener: () => {},
    });

    renderToggle();

    await waitFor(() => expect(screen.getByRole("button")).toBeInTheDocument());
  });

  it("toggles between enhanced and classic mode on click", async () => {
    window.WebGLRenderingContext = function WebGLRenderingContext() {};
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue({});
    Object.defineProperty(navigator, "hardwareConcurrency", { value: 8, configurable: true });
    window.matchMedia = vi.fn().mockReturnValue({
      matches: false,
      addEventListener: () => {},
      removeEventListener: () => {},
    });
    const user = userEvent.setup();

    renderToggle();

    const button = await screen.findByRole("button");
    await waitFor(() => expect(button).toHaveAttribute("aria-pressed", "true"));

    await user.click(button);
    expect(button).toHaveAttribute("aria-pressed", "false");
  });
});
