import useTranslation from "../../hooks/useTranslation.js";

const LANGUAGES = [
  { nameKey: "english", levelKey: "fluent" },
  { nameKey: "spanish", levelKey: "native" },
];

function LanguagesSection() {
  const { t } = useTranslation();

  return (
    <section className="main-section align-left" id="languages-section">
      <h2>{t("languagesSection.title")}</h2>
      <div className="text">
        <ul>
          {LANGUAGES.map((entry) => (
            <li key={entry.nameKey}>
              {t(`languagesSection.names.${entry.nameKey}`)}: {t(`languagesSection.levels.${entry.levelKey}`)}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default LanguagesSection;
