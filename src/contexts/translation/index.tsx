import React, { createContext, useCallback, useEffect, useState } from "react";
import { LocalStorage } from "../../services/storage/local";
import { CountryCode, LanguageType, TRANSLATE_KEYS, LANGUAGES } from "../../translate";
import { Constants } from "../../utils/constants";

type TranslationContextType = {
    language: LanguageType;
    countryCode: CountryCode;
    t: (key: keyof typeof TRANSLATE_KEYS, extraText?: string) => string;
    onChangeLanguage: (language: LanguageType, countryCode?: CountryCode) => Promise<void>;
}

const TranslationContext = createContext<TranslationContextType>({} as TranslationContextType);

const DEFAULT_LANGUAGE: LanguageType = "en_US";
const DEFAULT_COUNTRY: CountryCode = "US";

export const TranslationProvider: React.FC = ({ children }) => {

    const [languageSelected, setLanguageSelected] = useState<LanguageType>(DEFAULT_LANGUAGE);
    const [countryCode, setCountryCode] = useState<CountryCode>(DEFAULT_COUNTRY);

    useEffect(() => {
        LocalStorage.getItem<LanguageType>(Constants.STORAGE.LANGUAGE)
            .then(language => language && setLanguageSelected(language))
            .catch(() => setLanguageSelected(DEFAULT_LANGUAGE));

        LocalStorage.getItem<CountryCode>(Constants.STORAGE.COUNTRY)
            .then(country => country && setCountryCode(country))
            .catch(() => setCountryCode(DEFAULT_COUNTRY));
    }, []);

    const translate = useCallback((key: keyof typeof TRANSLATE_KEYS, extraText?: string) => {
        const lang = LANGUAGES[languageSelected];
        const word = lang ? lang[key] : null;
        return `${word ? word : key}${extraText ? extraText : ""}`;
    }, [languageSelected]);

    const onChangeLanguage = useCallback(async (language: LanguageType, countryCode: CountryCode) => {
        await LocalStorage.setItem(Constants.STORAGE.LANGUAGE, language);
        await LocalStorage.setItem(Constants.STORAGE.COUNTRY, countryCode);

        setLanguageSelected(language);
        setCountryCode(countryCode);
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