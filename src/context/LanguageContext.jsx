import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../locales/translations.js';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('techfix_lang') || 'uz';
  });

  useEffect(() => {
    localStorage.setItem('techfix_lang', lang);
  }, [lang]);

  const t = (key) => {
    return translations[lang]?.[key] || translations['uz']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

