
import styled from "styled-components/native";
import { Button } from "../Button";
import { Label } from "../Label";
import { CheckerProps } from "./types";

export const StyledChecker = styled.View<CheckerProps>`
    height: 16px;
    width: 16px;
    position: ${({ absolute }) => absolute ? "absolute" : "absolute"};
    border-radius: 10px;
    border: 1px solid ${({fillColor, checked, error, theme }) =>
        (fillColor && checked) ? theme.COLORS[fillColor] :
            error ? "red" : checked ? "green" : theme.SHADOW[3]};
    background-color: ${({ fillColor, checked, error, theme }) =>
        (fillColor && checked) ? theme.COLORS[fillColor] :
            error ? "red" : checked ? "green" : "transparent"
    };
    right: ${({ absolute }) => absolute ? "4px" : 0};
    top: ${({ absolute }) => absolute ? "4px" : 0};
`;

export const CheckerContainer = styled(Button).attrs(props => ({
    empty: true,
})) <CheckerProps>`
    align-items: ${({ first }) => first === "check" ? "flex-start" : "center"};
    flex-direction: ${({ direction, first }) => direction && direction === "row"
        ? first === "check" ? "row-reverse" : "row"
        : first === "check" ? "column-reverse" : "column"};
    position: relative;
`;

export const CheckerLabel = styled(Label).attrs(props => ({
    type: "SMALL"
}))`
    margin-left: 4px;
    font-family: ${({ theme }) => theme.FONTS.MEDIUM};
    font-size: ${({ theme }) => theme.SIZE.SMALL}px;
    margin-right: 8px;
`;