import { createContext, useState, useEffect } from "react";

export const LanguageContext = createContext();

export const LanguageContextProvider = ({ children }) => {
    const languageCache = localStorage.getItem('languageCache');
    const [language, setLanguage] = useState(languageCache !== null ? JSON.parse(languageCache) : "ES"); // State to check if the language is catalan, spanish or english, catalan default

    useEffect(() => {
        localStorage.setItem('languageCache', JSON.stringify(language));
    }, [language]);

    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};