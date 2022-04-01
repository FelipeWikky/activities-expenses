import { TextInputProps } from 'react-native';
import { Control } from "react-hook-form";

export enum InputTypes {
    text = 'text', password = 'password'
}

export enum IconNames {
    user, lock
}

export type InputProps = Omit<TextInputProps, 'onChangeText'> & {
    control: Control<any>;
    name: string;
    label?: string;
    error?: string;
    leftIcon?: keyof typeof IconNames;
    rightIcon?: keyof typeof IconNames;
    type?: keyof typeof InputTypes;
    onChangeText?: (attribute: string, value: string) => void;
    /**
     * If send value on this property, not shown the input and show a label with this value
     */
    viewValue?: string;
}