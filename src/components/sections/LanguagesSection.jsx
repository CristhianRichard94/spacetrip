import useTranslation from "../../hooks/useTranslation.js";

const LANGUAGES = [
  { nameKey: "english", levelKey: "fluent" },
  { nameKey: "spanish", levelKey: "native" },
  { nameKey: "deutsch", levelKey: "basic" },
];

function LanguagesSection() {
  const { t } = useTranslation();

  return (
    <section className="main-section align-left" id="languages-section">
      <h1>{t("languagesSection.title")}</h1>
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
