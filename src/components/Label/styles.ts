import styled from "styled-components/native";
import { THEME } from "../../theme";
import { LabelProps, LabelType } from "./types";

type Type = keyof typeof LabelType;

export const StyledLabel = styled.Text<LabelProps>`
    color: ${({ theme, type }) => type === LabelType.ERROR || type === LabelType.ERROR_LOW ? theme.COLORS.ERROR : theme.COLORS.LABEL};
    font-family: ${({ type, bold, strong }) => getFontFamilyByType(type, bold, strong)};
    font-size: ${({ type }) => getFontSizeByType(type)}px;
`;

const getFontFamilyByType = (type: Type, isBold?: boolean, isStrong?: boolean) => {
    if (isBold) return THEME.FONTS.BOLD;
    if (isStrong) return THEME.FONTS.MEDIUM;
    
    switch (type) {
        case LabelType.TITLE_MAIN:
        case LabelType.TITLE:
            return THEME.FONTS.BOLD;
        case LabelType.SUB_TITLE:
        case LabelType.ERROR:
            return THEME.FONTS.MEDIUM;

        case LabelType.ERROR_LOW:
        case LabelType.NORMAL:
        default:
            return THEME.FONTS.REGULAR;
    }
}

const getFontSizeByType = (type: Type) => {
    switch (type) {
        case LabelType.TITLE_MAIN:
        case LabelType.TITLE:
        case LabelType.SUB_TITLE:
        case LabelType.NORMAL_SMALL:
        case LabelType.NORMAL:
            return THEME.SIZE[type];

        case LabelType.SMALL:
        case LabelType.ERROR_LOW:
            return THEME.SIZE.SMALL;

        case LabelType.ERROR:
        case LabelType.CUSTOM:
        default:
            return THEME.SIZE.NORMAL;
    }
}

// const getFontSizeByType = (type: Type) => {
//     switch (type) {
//         case LabelType.TITLE_MAIN:
//             return THEME.SIZE.xl;
//         case LabelType.TITLE:
//             return THEME.SIZE.lg;
//         case LabelType.SUB_TITLE:
//             return THEME.SIZE.sl;

//         case LabelType.ERROR_LOW:
//             return THEME.SIZE.sm;

//         case LabelType.NORMAL:
//         case LabelType.ERROR:
//         case LabelType.CUSTOM:
//         default:
//             return THEME.SIZE.md;
//     }
// }