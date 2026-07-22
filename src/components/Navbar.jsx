import { useState } from "react";
import MusicToggle from "./MusicToggle.jsx";
import VisualModeToggle from "./VisualModeToggle.jsx";
import LangToggle from "./LangToggle.jsx";
import useTranslation from "../hooks/useTranslation.js";

const NAV_LINKS = [
  { href: "#hero-section", key: "navbar.home" },
  { href: "#portfolio-section", key: "navbar.portfolio" },
  { href: "#about-me-section", key: "navbar.aboutMe" },
  { href: "#experience-section", key: "navbar.experience" },
  { href: "#education-section", key: "navbar.education" },
  { href: "#languages-section", key: "navbar.languages" },
  { href: "#skills-section", key: "navbar.skills" },
  { href: "#socials-section", key: "navbar.socials" },
];

function Navbar({ audioRef }) {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <nav className="navbar">
      <button
        type="button"
        className="navbar-toggle"
        aria-expanded={isOpen}
        aria-controls="navbar-links"
        aria-label={t("navbar.toggleMenu")}
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? "✕" : "☰"}
      </button>
      <ul id="navbar-links" className={`navbar-links${isOpen ? " open" : ""}`}>
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <a href={link.href} onClick={() => setIsOpen(false)}>
              {t(link.key)}
            </a>
          </li>
        ))}
        <li className="controls-stack">
          <div className="visual-mode-player">
            <VisualModeToggle />
          </div>
          <div className="music-player">
            <MusicToggle audioRef={audioRef} />
          </div>
          <div className="lang-toggle-player">
            <LangToggle />
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
