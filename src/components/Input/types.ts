import { TextInputProps } from 'react-native';

export enum InputTypes {
    text = 'text', password = 'password'
}

export enum IconNames {
    user, lock
}

export type InputProps = Omit<TextInputProps, 'onChangeText'> & {
    name: string;
    label?: string;
    error?: string;
    leftIcon?: keyof typeof IconNames;
    rightIcon?: keyof typeof IconNames;
    type?: keyof typeof InputTypes;
    onChangeText?: (attribute: string, value: string) => void;
}