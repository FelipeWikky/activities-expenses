import { RFPercentage } from 'react-native-responsive-fontsize';
export const THEME = {
    COLORS: {
        COLOR_300: 'rgba(237, 245, 251, 1)',
        // COLOR_200: 'rgba(247, 247, 249, 1)',
        // COLOR_100: 'rgba(255, 255, 255, 1)',

        DEFAULT: 'rgba(48, 140, 219, 1)',
        DEFAULT_DISABLE: 'rgba(48, 140, 219, 0.5)',

        SUCCESS: 'rgba(50, 213, 131, 1)',
        SUCCESS_DISABLE: 'rgba(50, 213, 131, 0.5)',

        DANGER: 'rgba(240, 68, 56, 1)',
        DANGER_DISABLE: 'rgba(240, 68, 56, 0.5)',

        WHITE: 'rgba(237, 245, 251, 1)',
        BLACK: 'rgba(0, 0, 0, 1)',

        /**
         * Color used to fill background of input component
         */
        INPUT_BACKGROUND: '#FFFFFF',
        /**
         * Color used to tint the border of input component
         */
        INPUT_BORDER: 'rgba(156, 166, 175, 1)',
        /**
         * Color used to tint the icons of input component
         */
        INPUT_ICON: 'rgba(208, 213, 221, 1)',

        /**
         * Color for the texts
         */
        TEXT: 'rgba(70, 88, 105, 1)',
        /**
         * Label color for inputs
         */
        LABEL: 'rgba(48, 140, 219, 1)',
        /**
         * Error color for text with error
         */
        ERROR: 'rgba(217, 45, 32, 1)',
        /**
         * Error color to use in border of inputs
         */
        INPUT_ERROR: 'rgba(217, 45, 32, 0.5)',
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
    },

    SHADOW: {
        1: "rgba(0, 0, 0, .1)",
        2: "rgba(0, 0, 0, .2)",
        3: "rgba(0, 0, 0, .3)",
        4: "rgba(0, 0, 0, .4)",
        5: "rgba(0, 0, 0, .5)",
        6: "rgba(0, 0, 0, .6)",
        7: "rgba(0, 0, 0, .7)",
        8: "rgba(0, 0, 0, .8)",
        9: "rgba(0, 0, 0, .9)",
        10: "rgba(0, 0, 0, 1)",
    }
}