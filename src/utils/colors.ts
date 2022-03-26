import { ButtonType, ButtonState } from "../components/Button/types";
import { THEME } from "../theme";

export const getColorByType = (type: keyof typeof ButtonType, state = ButtonState.NORMAL) => {
    switch(type) {
        case 'SUCCESS': return THEME.COLORS.SUCCESS;
        case 'DANGER': return THEME.COLORS.DANGER;
        case 'DEFAULT': return THEME.COLORS.DEFAULT;
        default: return THEME.COLORS.DEFAULT;
    };
}

export const getColorByState = (state: keyof typeof ButtonState) => {
    
}