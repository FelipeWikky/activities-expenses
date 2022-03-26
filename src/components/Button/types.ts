import { TouchableOpacityProps } from "react-native";

export enum ButtonType {
    DEFAULT = 'DEFAULT', SUCCESS = 'SUCCESS', DANGER = 'DANGER',
}

export enum ButtonState {
    NORMAL = 'NORMAL', HOVER = 'HOVER', CLICK = 'CLICK', DISABLE = 'DISABLE',
}

export enum ButtonSize {
    xs = 'xs',
    sm = 'sm',
    md = 'md',
    lg = 'lg',
    xl = 'xl',
}

export type ButtonTextProps = TouchableOpacityProps & {
    text?: string;
    size?: keyof typeof ButtonSize;
    type?: keyof typeof ButtonType;
}