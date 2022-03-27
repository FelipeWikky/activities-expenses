import { TouchableOpacityProps } from "react-native";

export interface CheckboxProps extends Omit<TouchableOpacityProps, "onPress"> {
    name: string;
    checked?: boolean;
    onPress?:<T>(name: keyof T, checked?: boolean) => void;
}