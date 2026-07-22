import useTranslation from "../../hooks/useTranslation.js";

const ABOUT_LINE_KEYS = ["graduated", "proactive", "friendly", "sports"];

function AboutSection() {
  const { t } = useTranslation();

  return (
    <section className="main-section align-right" id="about-me-section">
      <h1>{t("about.title")}</h1>
      <div className="text">
        {ABOUT_LINE_KEYS.map((key) => (
          <p key={key}>{t(`about.lines.${key}`)}</p>
        ))}
      </div>
    </section>
  );
}

export default AboutSection;
