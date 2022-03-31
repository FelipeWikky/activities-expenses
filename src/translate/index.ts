

export enum TRANSLATE_KEYS {
    "label.list.empty",
    "button.save",
    "button.update",
    "button.cancel",
    "label.activity",
    "label.placeholder.activity.activity",
    "label.placeholder.activity.description",
    "label.when.to",
    "label.finished",
    "label.has.problem",
    "label.activity.comment",
    "label.created.at.in",
    "label.created.at",
    "label.updated.at",
    "label.updated.at.in",
    "label.when",
    "label.placeholder.input.search",
    "label.pending",
    "label.problem",
    "label.have.when",
    "label.creation",
    "success.create",
    "error.creation",
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
    "button.signin",
    "label.delete",
    "button.signup"
}

export type TranslateWord = {
    [key in keyof typeof TRANSLATE_KEYS]?: string;
}