

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
    "error.field.character.minimum.3"
}

export type TranslateWord = {
    [key in keyof typeof TRANSLATE_KEYS]: string;
}