import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import App from "./App.jsx";

// The scene chunks pull in three.js/R3F which don't run meaningfully in
// jsdom. App.jsx lazy-loads them, so mock the modules it imports.
vi.mock("./components/scene/SceneRoot.jsx", () => ({
  default: () => <div data-testid="scene-root" />,
}));
vi.mock("./components/scene/SolarSystemScene.jsx", () => ({
  default: () => <div data-testid="classic-scene" />,
}));
vi.mock("./components/Chatbot.jsx", () => ({
  default: () => <div data-testid="chatbot" />,
}));

describe("App", () => {
  afterEach(() => {
    window.localStorage.clear();
    vi.restoreAllMocks();
  });

  it("mounts without throwing and renders the main landmark and nav", async () => {
    window.matchMedia = vi.fn().mockReturnValue({
      matches: false,
      addEventListener: () => {},
      removeEventListener: () => {},
    });

    render(<App />);

    expect(screen.getByRole("navigation")).toBeInTheDocument();
    await waitFor(() => expect(document.getElementById("main-content")).toBeInTheDocument());
  });

  it("renders a skip link pointing at the main content", () => {
    window.matchMedia = vi.fn().mockReturnValue({
      matches: false,
      addEventListener: () => {},
      removeEventListener: () => {},
    });

    render(<App />);
    expect(screen.getByText(/skip to main content/i)).toHaveAttribute("href", "#main-content");
  });

  it("renders all eight section headings/content once resolved", async () => {
    window.matchMedia = vi.fn().mockReturnValue({
      matches: false,
      addEventListener: () => {},
      removeEventListener: () => {},
    });

    render(<App />);

    await waitFor(() => expect(screen.getByRole("heading", { name: "Welcome" })).toBeInTheDocument());
    const main = document.getElementById("main-content");
    expect(main.querySelectorAll(".main-section").length).toBe(8);
  });
});
