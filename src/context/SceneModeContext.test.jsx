import { describe, it, expect, afterEach, vi } from "vitest";
import { render, screen, waitFor, renderHook } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SceneModeProvider, useSceneModeContext } from "./SceneModeContext.jsx";

function Consumer() {
  const { mode, resolved, setMode, fallbackToClassic, fallbackNotice } = useSceneModeContext();
  return (
    <div>
      <span data-testid="mode">{resolved ? mode : "loading"}</span>
      <span data-testid="notice">{fallbackNotice ? "notice" : "none"}</span>
      <button onClick={() => setMode("classic", true)}>set-classic</button>
      <button onClick={() => setMode("enhanced", true)}>set-enhanced</button>
      <button onClick={fallbackToClassic}>fallback</button>
    </div>
  );
}

function setMatchMedia(matches) {
  window.matchMedia = vi.fn().mockReturnValue({
    matches,
    addEventListener: () => {},
    removeEventListener: () => {},
  });
}

describe("SceneModeContext", () => {
  afterEach(() => {
    window.localStorage.clear();
    vi.restoreAllMocks();
  });

  it("resolves to enhanced mode by default on a capable device", async () => {
    setMatchMedia(false);
    Object.defineProperty(navigator, "hardwareConcurrency", {
      value: 8,
      configurable: true,
    });

    render(
      <SceneModeProvider>
        <Consumer />
      </SceneModeProvider>
    );

    await waitFor(() => expect(screen.getByTestId("mode")).toHaveTextContent("enhanced"));
  });

  it("defaults to classic mode when the user prefers reduced motion", async () => {
    setMatchMedia(true);
    render(
      <SceneModeProvider>
        <Consumer />
      </SceneModeProvider>
    );

    await waitFor(() => expect(screen.getByTestId("mode")).toHaveTextContent("classic"));
  });

  it("defaults to classic mode on a low-end device (hardwareConcurrency <= 4)", async () => {
    setMatchMedia(false);
    Object.defineProperty(navigator, "hardwareConcurrency", {
      value: 4,
      configurable: true,
    });

    render(
      <SceneModeProvider>
        <Consumer />
      </SceneModeProvider>
    );

    await waitFor(() => expect(screen.getByTestId("mode")).toHaveTextContent("classic"));
  });

  it("setMode toggles between classic and enhanced and persists the choice", async () => {
    setMatchMedia(false);
    Object.defineProperty(navigator, "hardwareConcurrency", { value: 8, configurable: true });
    const user = userEvent.setup();

    render(
      <SceneModeProvider>
        <Consumer />
      </SceneModeProvider>
    );
    await waitFor(() => expect(screen.getByTestId("mode")).toHaveTextContent("enhanced"));

    await user.click(screen.getByText("set-classic"));
    expect(screen.getByTestId("mode")).toHaveTextContent("classic");
    expect(JSON.parse(window.localStorage.getItem("sceneMode.v2"))).toEqual({
      mode: "classic",
      explicit: true,
    });
  });

  it("fallbackToClassic switches to classic, marks it non-explicit, and shows the notice", async () => {
    setMatchMedia(false);
    Object.defineProperty(navigator, "hardwareConcurrency", { value: 8, configurable: true });
    const user = userEvent.setup();

    render(
      <SceneModeProvider>
        <Consumer />
      </SceneModeProvider>
    );
    await waitFor(() => expect(screen.getByTestId("mode")).toHaveTextContent("enhanced"));

    await user.click(screen.getByText("fallback"));

    expect(screen.getByTestId("mode")).toHaveTextContent("classic");
    expect(screen.getByTestId("notice")).toHaveTextContent("notice");
    expect(JSON.parse(window.localStorage.getItem("sceneMode.v2"))).toEqual({
      mode: "classic",
      explicit: false,
    });
  });

  it("throws when useSceneModeContext is used outside the provider", () => {
    const { result } = renderHook(() => {
      try {
        return useSceneModeContext();
      } catch (error) {
        return error;
      }
    });
    expect(result.current).toBeInstanceOf(Error);
  });
});
