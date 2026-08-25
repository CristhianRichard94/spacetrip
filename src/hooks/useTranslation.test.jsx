import { describe, it, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import useTranslation from "./useTranslation.js";
import * as LanguageContextModule from "../context/LanguageContext.jsx";

function mockLanguageContext(language, toggleLanguage = vi.fn()) {
  vi.spyOn(LanguageContextModule, "useLanguageContext").mockReturnValue({
    language,
    toggleLanguage,
  });
}

describe("useTranslation", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("resolves a nested key for the current language", () => {
    mockLanguageContext("en");
    const { result } = renderHook(() => useTranslation());
    expect(result.current.t("hero.title")).toBe("Welcome");
  });

  it("resolves the same nested key translated for the other language", () => {
    mockLanguageContext("es");
    const { result } = renderHook(() => useTranslation());
    expect(result.current.t("hero.title")).toBe("Bienvenido");
  });

  it("falls back to English when the current language is not a known locale", () => {
    // translations[language] is undefined for an unsupported locale, so
    // lookup() short-circuits and t() must fall back to the en dictionary.
    mockLanguageContext("fr");
    const { result } = renderHook(() => useTranslation());
    expect(result.current.t("hero.title")).toBe("Welcome");
  });

  it("returns the raw key string when it exists in neither language", () => {
    mockLanguageContext("en");
    const { result } = renderHook(() => useTranslation());
    expect(result.current.t("this.key.does.not.exist")).toBe("this.key.does.not.exist");
  });

  it("returns array values as-is (e.g. bullet lists)", () => {
    mockLanguageContext("en");
    const { result } = renderHook(() => useTranslation());
    const bullets = result.current.t("experience.items.freelance.bullets");
    expect(Array.isArray(bullets)).toBe(true);
    expect(bullets.length).toBeGreaterThan(0);
  });

  it("exposes language and toggleLanguage from the context", () => {
    const toggleLanguage = vi.fn();
    mockLanguageContext("en", toggleLanguage);
    const { result } = renderHook(() => useTranslation());
    expect(result.current.language).toBe("en");
    expect(result.current.toggleLanguage).toBe(toggleLanguage);
  });
});
