import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Navbar from "./Navbar.jsx";
import { LanguageProvider } from "../context/LanguageContext.jsx";
import { SceneModeProvider } from "../context/SceneModeContext.jsx";

function renderNavbar() {
  const audioRef = { current: null };
  return render(
    <LanguageProvider>
      <SceneModeProvider>
        <Navbar audioRef={audioRef} />
      </SceneModeProvider>
    </LanguageProvider>
  );
}

describe("Navbar", () => {
  it("renders a link for every section", () => {
    renderNavbar();
    expect(screen.getByRole("link", { name: /home/i })).toHaveAttribute("href", "#hero-section");
    expect(screen.getByRole("link", { name: /my portfolio/i })).toHaveAttribute(
      "href",
      "#portfolio-section"
    );
    expect(screen.getAllByRole("link").length).toBeGreaterThanOrEqual(8);
  });

  it("toggles the mobile menu open state on hamburger click", async () => {
    const user = userEvent.setup();
    renderNavbar();
    const toggleButton = screen.getByRole("button", { name: /toggle navigation menu/i });
    expect(toggleButton).toHaveAttribute("aria-expanded", "false");

    await user.click(toggleButton);
    expect(toggleButton).toHaveAttribute("aria-expanded", "true");
  });

  it("closes the menu after clicking a nav link", async () => {
    const user = userEvent.setup();
    renderNavbar();
    const toggleButton = screen.getByRole("button", { name: /toggle navigation menu/i });
    await user.click(toggleButton);
    expect(toggleButton).toHaveAttribute("aria-expanded", "true");

    await user.click(screen.getByRole("link", { name: /home/i }));
    expect(toggleButton).toHaveAttribute("aria-expanded", "false");
  });

  it("closes the menu when clicking outside the nav", async () => {
    const user = userEvent.setup();
    renderNavbar();
    const toggleButton = screen.getByRole("button", { name: /toggle navigation menu/i });
    await user.click(toggleButton);
    expect(toggleButton).toHaveAttribute("aria-expanded", "true");

    await user.click(document.body);
    expect(toggleButton).toHaveAttribute("aria-expanded", "false");
  });
});
