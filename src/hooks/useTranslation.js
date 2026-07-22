import { useLanguageContext } from "../context/LanguageContext.jsx";
import { translations } from "../i18n/translations.js";

function lookup(dictionary, key) {
  return key
    .split(".")
    .reduce(
      (value, segment) =>
        value && typeof value === "object" ? value[segment] : undefined,
      dictionary
    );
}

export function useTranslation() {
  const { language, toggleLanguage } = useLanguageContext();

  const t = (key) => {
    const value = lookup(translations[language], key);
    if (typeof value === "string") return value;

    const fallback = lookup(translations.en, key);
    if (typeof fallback === "string") return fallback;

    return key;
  };

  return { t, language, toggleLanguage };
}

export default useTranslation;
