import { Easing } from "react-native-reanimated";

export const Constants = {
    BUTTON_CLICK_OPACITY: 0.6,
    BEZIER: Easing.bezier(0.25, 0.1, 0.25, 1),

    STORAGE: {
        AUTH: "follow_expense_auth",
        LANGUAGE: "follow_expense_language",
        COUNTRY: "follow_expense_country",
    }
}