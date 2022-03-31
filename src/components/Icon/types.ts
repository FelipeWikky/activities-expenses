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
}

export type IconProps = {
    name: string;
    group: keyof typeof IconGroup;
    size?: number;
    color?: keyof typeof THEME.COLORS | string;
    style?: StyleProp<TextStyle>;
}