import { describe, it, expect, afterEach } from "vitest";
import { render, screen, renderHook, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  LanguageProvider,
  useLanguageContext,
} from "./LanguageContext.jsx";

function Consumer() {
  const { language, toggleLanguage } = useLanguageContext();
  return (
    <button onClick={toggleLanguage} data-testid="lang">
      {language}
    </button>
  );
}

describe("LanguageContext", () => {
  afterEach(() => {
    window.localStorage.clear();
  });

  it("defaults to English when nothing is stored", () => {
    render(
      <LanguageProvider>
        <Consumer />
      </LanguageProvider>
    );
    expect(screen.getByTestId("lang")).toHaveTextContent("en");
  });

  it("reads a previously stored language on init", () => {
    window.localStorage.setItem("language.v1", "es");
    render(
      <LanguageProvider>
        <Consumer />
      </LanguageProvider>
    );
    expect(screen.getByTestId("lang")).toHaveTextContent("es");
  });

  it("ignores an invalid stored value and falls back to en", () => {
    window.localStorage.setItem("language.v1", "fr");
    render(
      <LanguageProvider>
        <Consumer />
      </LanguageProvider>
    );
    expect(screen.getByTestId("lang")).toHaveTextContent("en");
  });

  it("toggleLanguage flips the language and updates all consumers", async () => {
    const user = userEvent.setup();
    render(
      <LanguageProvider>
        <Consumer />
      </LanguageProvider>
    );
    expect(screen.getByTestId("lang")).toHaveTextContent("en");

    await user.click(screen.getByTestId("lang"));
    expect(screen.getByTestId("lang")).toHaveTextContent("es");
  });

  it("persists the toggled language to localStorage", async () => {
    const user = userEvent.setup();
    render(
      <LanguageProvider>
        <Consumer />
      </LanguageProvider>
    );
    await user.click(screen.getByTestId("lang"));
    expect(window.localStorage.getItem("language.v1")).toBe("es");
  });

  it("sets document.documentElement.lang to the current language", async () => {
    const user = userEvent.setup();
    render(
      <LanguageProvider>
        <Consumer />
      </LanguageProvider>
    );
    expect(document.documentElement.lang).toBe("en");
    await user.click(screen.getByTestId("lang"));
    expect(document.documentElement.lang).toBe("es");
  });

  it("throws when useLanguageContext is used outside the provider", () => {
    const { result } = renderHook(() => {
      try {
        return useLanguageContext();
      } catch (error) {
        return error;
      }
    });
    expect(result.current).toBeInstanceOf(Error);
  });
});
