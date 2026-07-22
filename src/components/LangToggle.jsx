import { useEffect, useState } from "react";
import useTranslation from "../hooks/useTranslation.js";

function LangToggle() {
  const { t, language, toggleLanguage } = useTranslation();
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => setShowTooltip(true), 500);
    const hideTimer = setTimeout(() => setShowTooltip(false), 6000);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  const targetLanguage = language === "en" ? "es" : "en";
  const targetLabel = targetLanguage === "es" ? "ES" : "EN";
  const targetText =
    targetLanguage === "es"
      ? t("langToggle.switchToSpanish")
      : t("langToggle.switchToEnglish");

  const handleClick = () => {
    setShowTooltip(false);
    toggleLanguage();
  };

  return (
    <>
      <button
        className="lang-toggle"
        aria-label={targetText}
        aria-pressed={language === "es"}
        type="button"
        onClick={handleClick}
      >
        {targetLabel}
      </button>
      <span className={`lang-toggle-tooltip${showTooltip ? " show" : ""}`}>
        {targetText}
      </span>
    </>
  );
}

export default LangToggle;
