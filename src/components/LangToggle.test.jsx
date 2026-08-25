import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LangToggle from "./LangToggle.jsx";
import { LanguageProvider } from "../context/LanguageContext.jsx";

describe("LangToggle", () => {
  afterEach(() => {
    window.localStorage.clear();
    vi.useRealTimers();
  });

  it("shows the target language label (ES when currently English)", () => {
    render(
      <LanguageProvider>
        <LangToggle />
      </LanguageProvider>
    );
    expect(screen.getByRole("button", { name: /ver en español/i })).toHaveTextContent("ES");
  });

  it("toggles the app language when clicked", async () => {
    const user = userEvent.setup();
    render(
      <LanguageProvider>
        <LangToggle />
      </LanguageProvider>
    );
    await user.click(screen.getByRole("button"));
    expect(screen.getByRole("button", { name: /view in english/i })).toHaveTextContent("EN");
  });

  it("sets aria-pressed to reflect the current (not target) language", async () => {
    const user = userEvent.setup();
    render(
      <LanguageProvider>
        <LangToggle />
      </LanguageProvider>
    );
    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "false");
    await user.click(screen.getByRole("button"));
    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "true");
  });
});
