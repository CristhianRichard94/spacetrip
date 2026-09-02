import useTranslation from "../../hooks/useTranslation.js";

const PROJECTS = [
  { key: "financialAssistant", href: "/financial-assistant" },
  { key: "taskGrid", href: "/task-grid" },
  { key: "aiEngineerPath", href: "/ai-engineer-path" },
  { key: "roomigos", href: "/roomigos" },
  { key: "futsalBooking", href: "/futsal-manager" },
  { key: "automakers", href: "/automakers" },
  { key: "spotifyCodeGen", href: "/spotify-code-gen" },
];

const OLDER_PROJECTS = [
  { key: "oldResume", href: "/angular-resume" },
  { key: "tweetCollector", href: "https://github.com/GIBD/tweets-harvester" },
  { key: "edm", href: "/edm" },
  { key: "skyResume", href: "/sky-resume" },
];

function PortfolioSection() {
  const { t } = useTranslation();

  return (
    <section className="main-section align-left" id="portfolio-section">
      <h2>{t("portfolio.title")}</h2>
      <div className="text">
        <details open>
          <summary>{t("portfolio.projects")}</summary>
          <ul>
            {PROJECTS.map((project) => (
              <li key={project.href}>
                <a href={project.href} target="_blank" rel="noreferrer">
                  {t(`portfolio.items.${project.key}`)}
                </a>
              </li>
            ))}
          </ul>
        </details>
        <details>
          <summary>{t("portfolio.olderProjects")}</summary>
          <ul>
            {OLDER_PROJECTS.map((project) => (
              <li key={project.href}>
                <a href={project.href} target="_blank" rel="noreferrer">
                  {t(`portfolio.items.${project.key}`)}
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
