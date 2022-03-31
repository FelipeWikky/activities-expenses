import { useContext } from "react";
import TranslationContext from "./";

export const useTranslation = () => {
    const { countryCode, language, onChangeLanguage, t } = useContext(TranslationContext);

    return {
        t,
        onChangeLanguage,
        countryCode,
        language
    }
}