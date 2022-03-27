import { THEME } from "../../theme";

export type LineProps = {
    height?: string | number;
    width?: string | number;
    color?: string;
    shadow?: keyof typeof THEME.SHADOW;
    marginVertical?: string | number;
    marginHorizontal?: string | number;
}