import useTranslation from "../../hooks/useTranslation.js";

const DEGREE_KEYS = ["systemsAnalyst", "infoEngineer"];

function EducationSection() {
  const { t } = useTranslation();

  return (
    <section className="main-section align-right" id="education-section">
      <h1>{t("education.title")}</h1>
      <div className="text">
        <ul>
          <li>
            {t("education.institution")}
            <p>{t("education.bachelors")}</p>
            <ul>
              {DEGREE_KEYS.map((key) => (
                <li key={key}>
                  <p>{t(`education.items.${key}.title`)}</p>
                  <p>{t(`education.items.${key}.granted`)}</p>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <p>{t("education.highschool.degreeLabel")}</p>
            <p>{t("education.highschool.technician")}</p>
            <p>{t("education.highschool.term")}</p>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default EducationSection;
