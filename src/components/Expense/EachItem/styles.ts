import styled from "styled-components/native";
import Swipeable from 'react-native-gesture-handler/Swipeable';

import { CheckerProps, TextProps } from "./types";
import { Button } from "../../Button";

export const Container = styled.View`
    border-top-width: 1px;
    border-bottom-width: 1px;
    border-style: solid;
    border-color: ${({ theme }) => theme.SHADOW[3]};
    margin-bottom: 12px;
    width: 100%;
    position: relative;
`;

export const DetailsButton = styled.TouchableOpacity`
    width: 100%;
    justify-content: space-between;
    padding: 8px 4px;
    min-height: 76px;
`;

export const SwipableButton = styled(Swipeable)`
    width: 100%;
    justify-content: space-between;
    padding: 8px 4px;
    min-height: 80px;
`;

export const RemoveButton = styled(Button).attrs(props => ({
    empty: true,
    type: "DANGER"
}))`
    width: 40px;
    background-color: ${({ theme }) => theme.COLORS.DANGER}
`;
export const FinishButton = styled(Button).attrs(props => ({
    empty: true,
    type: "SUCCESS"
}))`
    width: 40px;
    background-color: ${({ theme }) => theme.COLORS.SUCCESS}
`;

export const Title = styled.Text.attrs(props => ({numberOfLines: 1}))<TextProps>`
    padding: 2px 2px 4px;
    text-decoration: ${({ finished }) => finished ? "line-through" : ""};
    font-family: ${({ theme }) => theme.FONTS.MEDIUM};
    font-size: ${({ theme }) => theme.SIZE.NORMAL_SMALL}px;
`;

export const Description = styled.Text.attrs(props => ({numberOfLines: 1}))<TextProps>`
    padding: 4px 2px 2px;
    text-decoration: ${({ finished }) => finished ? "line-through" : ""};
    font-size: ${({ theme }) => theme.SIZE.SMALL}px;
    /* max-width: 80%; */
    max-height: 20px;
`;

export const Line = styled.View`
    height: 1px;
    width: 95%;
    background-color: ${({ theme }) => theme.SHADOW[1]};
    align-self: center;
`;

export const Checker = styled.View<CheckerProps>`
    height: 16px;
    width: 16px;
    position: absolute;
    border-radius: 10px;
    border: 1px solid ${({ checked, error, theme }) => error ? "red" : checked ? "green" : theme.SHADOW[3]};
    background-color: ${({ checked, error }) => error ? "red" : checked ? "green" : "transparent"};
    right: 4px;
    top: 4px;
`;

export const CreatedAt = styled.Text<TextProps>`
    padding: 4px 2px 2px;
    align-self: flex-end;
    font-size: ${({ theme }) => theme.SIZE.SMALL}px;
    color: ${({ theme }) => theme.SHADOW[4]}
`;