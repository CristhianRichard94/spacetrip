import useTranslation from "../../hooks/useTranslation.js";

function HeroSection() {
  const { t } = useTranslation();

  return (
    <section className="main-section" id="hero-section">
      <div className="text">
        <h1>{t("hero.title")}</h1>
        <p>{t("hero.description")}</p>
        <p className="footnote">{t("hero.footnote")}</p>
      </div>
    </section>
  );
}

export default HeroSection;
