import { useCallback, useState } from "react";
import { TRANSLATE_KEYS } from "../translate";
import { pt_BR } from "../translate/languages/pt_BR";
import { en_AU } from "../translate/languages/en_AU";

export const LANGUAGES = {
    pt_BR, en_AU
}

export const useTranslation = () => {
    const [languageSelected, setLanguageSelected] = useState<keyof typeof LANGUAGES>("en_AU");

    const translate = useCallback((key: keyof typeof TRANSLATE_KEYS) => {
        return LANGUAGES[languageSelected][key];
    }, [languageSelected]);

    const cangeLanguage = useCallback((language: keyof typeof LANGUAGES) => {
        setLanguageSelected(language);
    }, []);

    return {
        translate,
        cangeLanguage
    }
}