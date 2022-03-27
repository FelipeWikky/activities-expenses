import styled from "styled-components/native";
import { getColorByType } from "../../utils/colors";
import { CheckboxProps } from "./types";

export const StyledCheckbox = styled.TextInput<CheckboxProps>`
    height: 24px;
    width: 24px;
    background-color: ${({ value }) => (value === "true") ? getColorByType("TEXT") : "transparent"};
    border-width: ${({ value }) => !(value === "true") ? "1px" : 0};
    border-color: ${({ value }) => !(value === "true") ? getColorByType("TEXT") : "transparent"};
    border-radius: 4px;
    color: transparent;
`;
