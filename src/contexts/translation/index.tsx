import React, { createContext, useCallback, useState } from "react";
import { CountryCode, LanguageType, TRANSLATE_KEYS, LANGUAGES } from "../../translate";

type TranslationContextType = {
    language: LanguageType;
    countryCode: CountryCode;
    t: (key: keyof typeof TRANSLATE_KEYS, extraText?: string) => string;
    onChangeLanguage: (language: LanguageType, countryCode?: CountryCode) => void;
}

const TranslationContext = createContext<TranslationContextType>({} as TranslationContextType);

const DEFAULT_LANGUAGE: LanguageType = "en_US";
const DEFAULT_COUNTRY: CountryCode = "US";

export const TranslationProvider: React.FC = ({ children }) => {

    const [languageSelected, setLanguageSelected] = useState<LanguageType>(DEFAULT_LANGUAGE);
    const [countryCode, setCountryCode] = useState<CountryCode>(DEFAULT_COUNTRY);

    const translate = useCallback((key: keyof typeof TRANSLATE_KEYS, extraText?: string) => {
        const lang = LANGUAGES[languageSelected];
        const word = lang ? lang[key] : null;
        return `${word ? word : key}${extraText ? extraText : ""}`;
    }, [languageSelected]);

    const onChangeLanguage = useCallback((language: LanguageType, countryCode?: CountryCode) => {
        setLanguageSelected(language);
        if (countryCode) setCountryCode(countryCode);
    }, []);

    return (
        <TranslationContext.Provider
            value={{
                language: languageSelected,
                t: translate,
                countryCode,
                onChangeLanguage
            }}
        >
            {children}
        </TranslationContext.Provider>
    );
};

export default TranslationContext;