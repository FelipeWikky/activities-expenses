import styled from "styled-components/native";
import { CheckerProps, TextProps } from "./types";

const SHADOW = {
    1: "rgba(0, 0, 0, 0.1)",
    3: "rgba(0, 0, 0, .3)"
};

export const Container = styled.View`
    border-top-width: 1px;
    border-bottom-width: 1px;
    border-style: solid;
    border-color: ${({ theme }) => SHADOW[3]};
    margin-bottom: 12px;
    width: 100%;
    position: relative;
`;

export const DetailsButton = styled.TouchableOpacity`
    width: 100%;
    justify-content: space-between;
    padding: 8px 4px;
    min-height: 80px;
`;

export const Title = styled.Text<TextProps>`
    padding: 2px 2px 4px;
    text-decoration: ${({ finished }) => finished ? "line-through" : ""};
    font-family: ${({ theme }) => theme.FONTS.MEDIUM};
    font-size: ${({ theme }) => theme.SIZE.NORMAL_SMALL}px;
`;

export const Description = styled.Text<TextProps>`
    padding: 4px 2px 2px;
    text-decoration: ${({ finished }) => finished ? "line-through" : ""};
    font-size: ${({ theme }) => theme.SIZE.SMALL}px;
`;

export const Line = styled.View`
    height: 1px;
    width: 95%;
    background-color: ${SHADOW[1]};
    align-self: center;
`;

export const Checker = styled.View<CheckerProps>`
    height: 16px;
    width: 16px;
    position: absolute;
    border-radius: 10px;
    border: 1px solid ${({ checked, error }) => error ? "red" : checked ? "green" : SHADOW[3]};
    background-color: ${({ checked, error }) => error ? "red" : checked ? "green" : "transparent"};
    right: 4px;
    top: 4px;
`;