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
        /**
         * Xtreme large (sl)
         */
        TITLE_MAIN: RFPercentage(4),
        /**
        * Large (lg)
        */
        TITLE: RFPercentage(3.5),
        /**
         * Greater than medium and less than large (sl)
         */
        SUB_TITLE: RFPercentage(3),
        /**
         * Medium (md)
         */
        NORMAL: RFPercentage(2.5),
        /**
        * Normal small (ns)
        */
         NORMAL_SMALL: RFPercentage(2),
        /**
        * Small (sm)
        */
        SMALL: RFPercentage(1.5),

        /**
         * Xtreme small (xs)
         */
        VERY_SMALL: RFPercentage(1),

        // /**
        //  * Xtreme small
        //  */
        // xs: RFPercentage(1),
        // /**
        //  * Small
        //  */
        // sm: RFPercentage(1.5),
        // /**
        //  * Medium
        //  */
        // md: RFPercentage(2.5),
        // /**
        //  * Greater than medium and less than large
        //  */
        // sl: RFPercentage(3),
        // /**
        //  * Large
        //  */
        // lg: RFPercentage(3.5),
        // /**
        //  * Xtreme large
        //  */
        // xl: RFPercentage(4),
    },

    FONTS: {
        REGULAR: 'Roboto_400Regular',
        MEDIUM: 'Roboto_500Medium',
        BOLD: 'Roboto_700Bold'
    }
}