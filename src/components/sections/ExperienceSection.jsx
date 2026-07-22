import useTranslation from "../../hooks/useTranslation.js";

const EXPERIENCE_KEYS = ["freelance", "mediaMonks", "sidesys"];

function ExperienceSection() {
  const { t } = useTranslation();

  return (
    <section className="main-section align-left" id="experience-section">
      <h1>{t("experience.title")}</h1>
      <div className="text">
        <ul>
          {EXPERIENCE_KEYS.map((key) => (
            <li key={key}>
              <p>{t(`experience.items.${key}.title`)}</p>
              <p>{t(`experience.items.${key}.term`)}</p>
            </li>
          ))}
          <li>{t("experience.research")}</li>
        </ul>
      </div>
    </section>
  );
}

export default ExperienceSection;
