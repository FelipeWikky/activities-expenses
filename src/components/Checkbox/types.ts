import { TextInputProps } from "react-native";
import { Control } from "react-hook-form";
import { THEME } from "../../theme";

export type CheckboxProps = TextInputProps & {
    name: string;
    control: Control<any>;
    fillColor?: keyof typeof THEME.COLORS;
    icon?: CheckboxIconProps;
}

export type CheckboxIconProps = {
    color: keyof typeof THEME.COLORS;
    background: keyof typeof THEME.COLORS;
}