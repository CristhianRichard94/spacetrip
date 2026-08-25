import { describe, it, expect, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import PortfolioSection from "./PortfolioSection.jsx";
import AboutSection from "./AboutSection.jsx";
import ExperienceSection from "./ExperienceSection.jsx";
import EducationSection from "./EducationSection.jsx";
import LanguagesSection from "./LanguagesSection.jsx";
import SkillsSection from "./SkillsSection.jsx";
import SocialsSection from "./SocialsSection.jsx";
import { LanguageProvider } from "../../context/LanguageContext.jsx";

const SECTIONS = [
  { Component: PortfolioSection, id: "portfolio-section" },
  { Component: AboutSection, id: "about-me-section" },
  { Component: ExperienceSection, id: "experience-section" },
  { Component: EducationSection, id: "education-section" },
  { Component: LanguagesSection, id: "languages-section" },
  { Component: SkillsSection, id: "skills-section" },
  { Component: SocialsSection, id: "socials-section" },
];

describe("section components", () => {
  afterEach(() => {
    window.localStorage.clear();
  });

  SECTIONS.forEach(({ Component, id }) => {
    it(`${Component.name} renders without crashing in English`, () => {
      const { container } = render(
        <LanguageProvider>
          <Component />
        </LanguageProvider>
      );
      expect(container.querySelector(`#${id}`)).toBeInTheDocument();
    });

    it(`${Component.name} renders without crashing in Spanish`, () => {
      window.localStorage.setItem("language.v1", "es");
      const { container } = render(
        <LanguageProvider>
          <Component />
        </LanguageProvider>
      );
      expect(container.querySelector(`#${id}`)).toBeInTheDocument();
      window.localStorage.clear();
    });
  });
});
