import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import HeroSection from "./HeroSection.jsx";
import { LanguageProvider } from "../../context/LanguageContext.jsx";

describe("HeroSection", () => {
  it("renders the English title by default", () => {
    render(
      <LanguageProvider>
        <HeroSection />
      </LanguageProvider>
    );
    expect(screen.getByRole("heading", { name: "Welcome" })).toBeInTheDocument();
  });

  it("renders the Spanish title when stored language is es", () => {
    window.localStorage.setItem("language.v1", "es");
    render(
      <LanguageProvider>
        <HeroSection />
      </LanguageProvider>
    );
    expect(screen.getByRole("heading", { name: "Bienvenido" })).toBeInTheDocument();
    window.localStorage.clear();
  });

  it("does not crash and renders a mailto link with the contact email", () => {
    render(
      <LanguageProvider>
        <HeroSection />
      </LanguageProvider>
    );
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "mailto:richardcristhian94@gmail.com"
    );
  });
});
