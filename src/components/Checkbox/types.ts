import { TouchableOpacityProps } from "react-native";
import { Control } from "react-hook-form";
export interface CheckboxProps extends Omit<TouchableOpacityProps, "onPress"> {
    name: string;
    control: Control<any>;
    
    checked?: boolean;
    onPress?: <T>(name: keyof T, checked?: boolean) => void;
}