import { ViewProps } from "react-native";
import { THEME } from "../../theme";

export type LineProps = ViewProps & {
    height?: string | number;
    width?: string | number;
    color?: string;
    shadow?: keyof typeof THEME.SHADOW;
    marginVertical?: string | number;
    marginHorizontal?: string | number;
}