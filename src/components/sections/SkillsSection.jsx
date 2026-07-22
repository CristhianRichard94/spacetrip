import useTranslation from "../../hooks/useTranslation.js";

function SkillsSection() {
  const { t } = useTranslation();

  return (
    <section className="main-section align-right" id="skills-section">
      <h1>{t("skills.title")}</h1>
      <div className="text">
        <ul>
          <li>
            <p>{t("skills.frontend")}</p>
            <p>
              HTML5, CSS3, JavaScript, Typescript, Angular, React, Lit,
              Vue.Js, Three.js.
            </p>
            <p>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.credly.com/badges/1b998396-282e-4346-b358-28d81c9030f4/linked_in"
              >
                {t("skills.credlyBadge")}
              </a>
            </p>
          </li>
          <li>
            <p>{t("skills.backend")}</p>
            <p>Node.js, Python, .NET Framework, SQL, Mongo.</p>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default SkillsSection;
