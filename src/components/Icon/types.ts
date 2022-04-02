import { StyleProp, TextStyle } from "react-native";
import { THEME } from "../../theme";

export enum IconGroup {
    Ionicons,
    FontAwesome,
    FontAwesome5,
    AntDesign,
    Entypo,
    MaterialIcons,
    Feather,
    Foundation
}

export type IconProps = {
    name: string;
    group: keyof typeof IconGroup;
    size?: number;
    color?: keyof typeof THEME.COLORS;
    customColor?: string;
    style?: StyleProp<TextStyle>;
}