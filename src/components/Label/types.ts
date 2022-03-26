import { TextProps } from "react-native"

export enum LabelType {
    NORMAL = "NORMAL", NORMAL_SMALL = "NORMAL_SMALL",
    TITLE_MAIN = "TITLE_MAIN", TITLE = "TITLE",
    SUB_TITLE = "SUB_TITLE",
    SMALL = "SMALL",
    ERROR = "ERROR", ERROR_LOW = "ERROR_LOW",
    CUSTOM = "CUSTOM",
}

export type LabelProps = TextProps & {
    type: keyof typeof LabelType,
    isText?: boolean;
    /**
    * If true, use font weight Bold. Priority: 2. Default: Normal
    */
    bold?: boolean;
    /**
     * If true, use font weight Medium. Priority: 1.  Default: Normal
     */
    strong?: boolean;
}