const PROJECTS = [
  { label: "Roomigos: Room finder Application", href: "/roomigos" },
  { label: "Futsal Booking Application", href: "/futsal-manager" },
  {
    label: "AI Engineer Path: Project showcasing AI Skills",
    href: "/ai-engineer-path",
  },
  { label: "Automakers: Landing page", href: "/automakers" },
  { label: "Spotify Code Generator: STL 3D print generator", href: "/spotify-code-gen" },
];

const OLDER_PROJECTS = [
  { label: "Old resume app", href: "/angular-resume" },
  {
    label: "Tweet collector app",
    href: "https://github.com/GIBD/tweets-harvester",
  },
  { label: "Electronic Dance Music Demo", href: "/edm" },
  { label: "Sky Resume Experience", href: "/sky-resume" },
];

function PortfolioSection() {
  return (
    <section className="main-section align-left" id="portfolio-section">
      <h1>My portfolio</h1>
      <div className="text">
        <details open>
          <summary>Projects</summary>
          <ul>
            {PROJECTS.map((project) => (
              <li key={project.href}>
                <a href={project.href} target="_blank" rel="noreferrer">
                  {project.label}
                </a>
              </li>
            ))}
          </ul>
        </details>
        <details>
          <summary>Older Projects</summary>
          <ul>
            {OLDER_PROJECTS.map((project) => (
              <li key={project.href}>
                <a href={project.href} target="_blank" rel="noreferrer">
                  {project.label}
                </a>
              </li>
            ))}
          </ul>
        </details>
      </div>
    </section>
  );
}

export default PortfolioSection;
