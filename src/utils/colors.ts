import { ButtonType, ButtonState } from "../components/Button/types";
import { THEME } from "../theme";

export const getColorByType = (type: keyof typeof ButtonType, state = ButtonState.NORMAL) => {
    switch (type) {
        case 'SUCCESS':
        case 'SUCCESS_DISABLE':
        case 'DANGER':
        case 'DANGER_DISABLE':
        case 'DEFAULT':
        case 'DEFAULT_DISABLE':
            return THEME.COLORS[type];
        case 'TEXT':
            return THEME.COLORS.TEXT;
        default:
            return THEME.COLORS.DEFAULT;
    };
}

export const getColorByState = (state: keyof typeof ButtonState) => {

}