import { createContext, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "language.v1";

function readStoredLanguage() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === "en" || raw === "es") return raw;
  } catch (error) {
    // localStorage unavailable (private browsing / disabled)
  }
  return null;
}

function writeStoredLanguage(value) {
  try {
    window.localStorage.setItem(STORAGE_KEY, value);
  } catch (error) {
    // ignore, in-memory state still works for this session
  }
}

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => readStoredLanguage() || "en");

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => {
      const next = prev === "en" ? "es" : "en";
      writeStoredLanguage(next);
      return next;
    });
  };

  const value = useMemo(
    () => ({
      language,
      toggleLanguage,
    }),
    [language]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguageContext() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguageContext must be used within LanguageProvider");
  }
  return context;
}
