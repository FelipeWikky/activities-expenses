import { RFPercentage } from 'react-native-responsive-fontsize';
export const THEME = {
    COLORS: {
        ALERT: '#73074D',

        BACKGROUND: '#8257E6',

        COLOR_300: 'rgba(237, 245, 251, 1)',
        COLOR_200: 'rgba(247, 247, 249, 1)',
        COLOR_100: 'rgba(255, 255, 255, 1)',

        BG_LOW: 'rgba(237, 245, 251, 1)',
        BG_MED: 'rgba(255, 255, 255, 1)',
        BG_HIG: 'rgba(237, 245, 251, 1)',

        TEXT: 'rgba(70, 88, 105, 1)',

        DEFAULT: 'rgba(48, 140, 219, 1)',
        DEFAULT_HOVER: 'rgba(54, 156, 243, 1)',
        DEFAULT_CLICK: 'rgba(3, 86, 158, 1)',
        DEFAULT_DISABLE: 'rgba(48, 140, 219, 0.5)',

        SUCCESS: 'rgba(50, 213, 131, 1)',
        SUCCESS_HOVER: 'rgba(108, 233, 166, 1)',
        SUCCESS_CLICK: 'rgba(18, 183, 106, 1)',
        SUCCESS_DISABLE: 'rgba(50, 213, 131, 0.5)',

        DANGER: 'rgba(240, 68, 56, 1)',
       
        WHITE: 'rgba(237, 245, 251, 1)',
        BLACK: 'rgba(0, 0, 0, 1)',
        SHADOW: 'rgba(0, 0, 0, 0.3)',

        INPUT_TEXT: 'rgba(70, 88, 105, 1)',
        INPUT_BACKGROUND: '#FFFFFF',
        INPUT_PLACEHOLDER: 'rgba(156, 166, 175, 1)',
        INPUT_BORDER: '#E4E7EC',
        INPUT_ICON: 'rgba(208, 213, 221, 1)',

        LABEL: 'rgba(48, 140, 219, 1)',
        ERROR: 'rgba(217, 45, 32, 1)',
        ERROR_LOW: 'rgba(217, 45, 32, 0.5)',
    },

    SIZE: {
        xs: RFPercentage(2),
        sm: RFPercentage(3.5),
        md: RFPercentage(5),
        lg: RFPercentage(6.5),
        xl: RFPercentage(10),

        S1: RFPercentage(1),
        S1_5: RFPercentage(1.5),
        S2: RFPercentage(2),
        S2_5: RFPercentage(2.5),
        S3: RFPercentage(3),
        S3_5: RFPercentage(3.5),
        S4: RFPercentage(4),
        S4_5: RFPercentage(4.5),
        S5: RFPercentage(5),
    },

    FONTS: {
        REGULAR: 'Roboto_400Regular',
        MEDIUM: 'Roboto_500Medium',
        BOLD: 'Roboto_700Bold'
    }
}