import styled from "styled-components/native";
import { Entypo } from '@expo/vector-icons';

import { getColorByType } from "../../utils/colors";
import { CheckboxProps } from "./types";
import { THEME } from "../../theme";

export const StyledCheckbox = styled.TextInput<CheckboxProps>`
    height: 24px;
    width: 24px;
    background-color: ${({ value }) => (value === "true") ? getColorByType("TEXT") : "transparent"};
    border-width: ${({ value }) => !(value === "true") ? "1px" : 0};
    border-color: ${({ value }) => !(value === "true") ? getColorByType("TEXT") : "transparent"};
    border-radius: 4px;
    color: transparent;
`;

export const StyledCheckboxIcon = styled.View<CheckboxProps>`
    height: 24px;
    width: 24px;
    border-width: ${({ value }) => !(value) ? "1px" : 0};
    border-color: ${({ theme, value, icon: { background } }) => !(value) ? theme.COLORS[background] : "transparent"};
    background-color: ${({ value, theme, icon: { background } }) => !!(value) ? theme.COLORS[background] : "transparent"};
    
    border-radius: 4px;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 0;
`;

export const StyledCheckIcon = styled(Entypo).attrs(props => ({
    name: "check",
    size: 22,
    color: THEME.COLORS[props.color]
}))`

`;