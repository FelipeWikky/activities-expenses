import { LabelProps } from "../Label/types";

export type CheckerProps = {
    checked?: boolean;
    error?: boolean;
    absolute?: boolean;

    onPress?: () => void;

    label?: string;
    labelProps?: LabelProps;

    direction?: "row" | "column";
    first?: "check" | "label"
}