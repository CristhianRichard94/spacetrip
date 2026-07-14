import MusicToggle from "./MusicToggle.jsx";
import VisualModeToggle from "./VisualModeToggle.jsx";

const NAV_LINKS = [
  { href: "#hero-section", label: "Home" },
  { href: "#about-me-section", label: "About me" },
  { href: "#experience-section", label: "Experience" },
  { href: "#education-section", label: "Education" },
  { href: "#languages-section", label: "Languages" },
  { href: "#skills-section", label: "Skills and tools" },
  { href: "#portfolio-section", label: "My portfolio" },
  { href: "#socials-section", label: "My socials" },
];

function Navbar({ audioRef }) {
  return (
    <nav className="navbar">
      <ul className="navbar-links">
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <a href={link.href}>{link.label}</a>
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
