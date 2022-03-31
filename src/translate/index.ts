export { CountryCode } from "react-native-country-picker-modal";

import { pt_BR } from "./languages/pt_BR";
import { en_US } from "./languages/en_US";


export type TranslateWord = {
    [key in keyof typeof TRANSLATE_KEYS]: string;
}

export const LANGUAGES = {
    pt_BR, en_US
}

export enum LANGUAGE_KEY {
    pt_BR = "pt_BR", en_US = "en_US"
}

export type LanguageType = keyof typeof LANGUAGES;

export enum TRANSLATE_KEYS {
    "label.go",
    "label.list.empty",
    "label.save",
    "label.update",
    "label.cancel",
    "label.activity",
    "label.description",
    "label.placeholder.activity.activity",
    "label.placeholder.activity.description",
    "label.placeholder.activity.comment",
    "label.when.to",
    "label.finished",
    "label.has.problem",
    "label.comment",
    "label.created.at.in",
    "label.created.at",
    "label.updated.at",
    "label.updated.at.in",
    "label.when",
    "label.placeholder.input.search",
    "label.pending",
    "label.problem",
    "label.have.when",
    "label.create",
    "success.create",
    "error.create",
    "success.update",
    "error.update",
    "error.delete",
    "success.delete",
    "label.version",
    "label.signin",
    "label.signup",
    "label.email",
    "label.password",
    "label.placeholder.signin.email",
    "label.placeholder.signin.password",
    "label.delete",
    "error.field.required",
    "error.field.character.minimum.3",
    "label.select.language",
    "label.welcome",
    "label.welcome.back",
}
