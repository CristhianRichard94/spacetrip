import useTranslation from "../../hooks/useTranslation.js";

const EXPERIENCE_KEYS = ["freelance", "mediaMonks", "sidesys", "research"];

function ExperienceSection() {
  const { t } = useTranslation();

  return (
    <section className="main-section align-left" id="experience-section">
      <h2>{t("experience.title")}</h2>
      <div className="text">
        <ul>
          {EXPERIENCE_KEYS.map((key) => {
            const roles = t(`experience.items.${key}.roles`);
            if (Array.isArray(roles)) {
              return (
                <li key={key}>
                  <p>{t(`experience.items.${key}.company`)}</p>
                  <p>{t(`experience.items.${key}.term`)}</p>
                  <ul className="experience-roles">
                    {roles.map((role) => (
                      <li key={role.title}>
                        <p>{role.title}</p>
                        <p>{role.term}</p>
                        <ul className="experience-bullets">
                          {role.bullets.map((bullet) => (
                            <li key={bullet}>{bullet}</li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            }

            return (
              <li key={key}>
                <p>{t(`experience.items.${key}.title`)}</p>
                <p>{t(`experience.items.${key}.term`)}</p>
                <ul className="experience-bullets">
                  {t(`experience.items.${key}.bullets`).map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export default ExperienceSection;
