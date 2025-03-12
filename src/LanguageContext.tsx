import React, { useContext, createContext, useState, useEffect, useRef } from "react";

export type LanguageContextItem = {
    language: string,
}

export type LanguageContextValue = {
    language: LanguageContextItem,
    registerLanguage: (language: LanguageContextItem) => void,
    validateSupportedLanguage: (selectedLanguage: string) => boolean
}

const supportedLanguages = ["en", "fr"];

const LanguageContext = createContext<LanguageContextValue | undefined>( undefined );


export const LanguageContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<LanguageContextItem>({language: "en"});
    const hasRun = useRef(false);

    useEffect(() => {
        if(!hasRun.current) {
            let currLang = navigator.language.split('-')[0] || "en";
            if (!validateSupportedLanguage(currLang)) {
                currLang = "en";
            }

            setLanguage({language: currLang})
            hasRun.current = true;
        }
    
    }, [])

    const registerLanguage = (language: LanguageContextItem) => {
        setLanguage(language);
    };

    const validateSupportedLanguage = (selectedLanguage: string) => {
        return supportedLanguages.includes(selectedLanguage);
    }

    return (
        <LanguageContext.Provider value={{ language, registerLanguage, validateSupportedLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};


export const useLanguageContext = (): LanguageContextValue => {
    const context = useContext(LanguageContext);

    if (!context) {
        throw new Error(
            'useLanguageContext must be used within a <LanguageContextProvider>.'
        );
    }
    return context;
};