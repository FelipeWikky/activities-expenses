import styled from "styled-components/native";
import { getColorByType } from "../../utils/colors";
import { Constants } from "../../utils/constants";
import { CheckboxProps } from "./types";

export const StyledCheckbox = styled.TouchableOpacity.attrs((_) => ({
    activeOpacity: Constants.BUTTON_CLICK_OPACITY
}))<CheckboxProps>`
    height: 24px;
    width: 24px;
    background-color: ${({ checked }) => checked ? getColorByType("DEFAULT") : "transparent"};
    border-width: ${({ checked }) => !checked ? 1 : 0};
    border-color: ${({ checked }) => !checked ? getColorByType("DEFAULT") : "transparent"};
    border-radius: 4px;
`;
