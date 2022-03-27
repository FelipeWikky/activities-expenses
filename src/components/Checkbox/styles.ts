import styled from "styled-components/native";
import { getColorByType } from "../../utils/colors";
import { Constants } from "../../utils/constants";
import { CheckboxProps } from "./types";

export const StyledCheckbox = styled.TouchableOpacity.attrs((_) => ({
    activeOpacity: Constants.BUTTON_CLICK_OPACITY
}))<CheckboxProps>`
    height: 24px;
    width: 24px;
    background-color: ${({ checked }) => checked ? getColorByType("TEXT") : "transparent"};
    border-width: ${({ checked }) => !checked ? "1px" : 0};
    border-color: ${({ checked }) => !checked ? getColorByType("TEXT") : "transparent"};
    border-radius: 4px;
`;
