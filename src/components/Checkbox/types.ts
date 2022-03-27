import { TouchableOpacityProps } from "react-native";

export interface CheckboxProps extends Omit<TouchableOpacityProps, "onPress"> {
    name: string;
    checked?: boolean;
    onPress?: (name: string, checked?: boolean) => void;
}