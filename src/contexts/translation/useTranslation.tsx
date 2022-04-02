import { useContext } from "react";
import TranslationContext from "./";

export const useTranslation = () => {
    const context = useContext(TranslationContext);

    return context;
}