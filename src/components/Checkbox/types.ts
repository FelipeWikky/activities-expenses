import { TextInputProps } from "react-native";
import { Control } from "react-hook-form";

export type CheckboxProps = TextInputProps & {
    name: string;
    control: Control<any>;
}