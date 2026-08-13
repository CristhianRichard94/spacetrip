import useTranslation from "../../hooks/useTranslation.js";

function HeroSection() {
  const { t } = useTranslation();

  return (
    <section className="main-section" id="hero-section">
      <div className="text">
        <h1>{t("hero.title")}</h1>
        <p className="hero-role">{t("hero.role")}</p>
        <p>{t("hero.description")}</p>
        <p className="hero-contact">
          {t("hero.location")} ·{" "}
          <a href={`mailto:${t("hero.email")}`}>{t("hero.email")}</a>
        </p>
      </div>
      <p className="footnote">{t("hero.footnote")}</p>
    </section>
  );
}

export default HeroSection;
