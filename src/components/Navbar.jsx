import { useEffect, useRef, useState } from "react";
import MusicToggle from "./MusicToggle.jsx";
import VisualModeToggle from "./VisualModeToggle.jsx";
import LangToggle from "./LangToggle.jsx";
import useTranslation from "../hooks/useTranslation.js";

const RESUME_URL = "/Cristhian_Richard_Resume.pdf";

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
  const navRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const handlePointerDown = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isOpen]);

  return (
    <nav className="navbar" ref={navRef}>
      <button
        type="button"
        className="navbar-toggle"
        aria-expanded={isOpen}
        aria-controls="navbar-links"
        aria-label={t("navbar.toggleMenu")}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span>{isOpen ? "✕" : "☰"}</span>
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
          <a
            className="navbar-resume-link download-resume"
            href={RESUME_URL}
            download
            target="_blank"
            rel="noreferrer"
          >
            ⬇ {t("chatbot.downloadResume")}
          </a>
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
