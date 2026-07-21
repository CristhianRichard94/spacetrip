import { useState } from "react";
import MusicToggle from "./MusicToggle.jsx";
import VisualModeToggle from "./VisualModeToggle.jsx";

const NAV_LINKS = [
  { href: "#hero-section", label: "Home" },
  { href: "#portfolio-section", label: "My portfolio" },
  { href: "#about-me-section", label: "About me" },
  { href: "#experience-section", label: "Experience" },
  { href: "#education-section", label: "Education" },
  { href: "#languages-section", label: "Languages" },
  { href: "#skills-section", label: "Skills and tools" },
  { href: "#socials-section", label: "My socials" },
];

function Navbar({ audioRef }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <button
        type="button"
        className="navbar-toggle"
        aria-expanded={isOpen}
        aria-controls="navbar-links"
        aria-label="Toggle navigation menu"
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? "✕" : "☰"}
      </button>
      <ul id="navbar-links" className={`navbar-links${isOpen ? " open" : ""}`}>
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <a href={link.href} onClick={() => setIsOpen(false)}>
              {link.label}
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
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
