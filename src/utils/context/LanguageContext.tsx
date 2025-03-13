import React, { useContext, createContext, useState, useEffect, useRef } from "react";
import { fetchUserCountry } from '../countryOrigin.ts';

export type LanguageContextItem = {
    language: string,
}

export type LanguageContextValue = {
    language: LanguageContextItem,
    registerLanguage: (language: LanguageContextItem) => void,
    validateSupportedLanguage: (selectedLanguage: string) => boolean,
    country: Country,
}

export type Country = {
    name: string,
    countryCode2: string,
    countryCode3: string
}

const supportedLanguages = ["en", "fr"];

const LanguageContext = createContext<LanguageContextValue | undefined>( undefined );


export const LanguageContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<LanguageContextItem>({language: "en"});
    const [country, setCountry] = useState<Country>({name: "", countryCode2: "", countryCode3: ""});
    const hasRun = useRef(false);

    useEffect(() => {
        async function getCountry() {
            const country_res = await fetchUserCountry();
            if(country_res) {
                setCountry({name: country_res.name, countryCode2: country_res.country, countryCode3: country_res.country_3})
            }
        }

        if(!hasRun.current) {
            let currLang = navigator.language.split('-')[0] || "en";
            if (!validateSupportedLanguage(currLang)) {
                currLang = "en";
            }

            setLanguage({language: currLang})
            getCountry();
            hasRun.current = true;
        }
    },)

    const registerLanguage = (language: LanguageContextItem) => {
        setLanguage(language);
    };

    const validateSupportedLanguage = (selectedLanguage: string) => {
        return supportedLanguages.includes(selectedLanguage);
    }

    return (
        <LanguageContext.Provider value={{ language, country, registerLanguage, validateSupportedLanguage }}>
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