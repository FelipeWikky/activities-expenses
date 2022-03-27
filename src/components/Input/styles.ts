import styled from "styled-components/native";
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { getColorByType } from "../../utils/colors";
import { THEME } from "../../theme";
import { Label } from "../Label";

export const Container = styled.View``;

export const Content = styled.View<{ hasError?: boolean }>`
    flex-direction: row;
    align-items: center;
    padding: 0px 4px;
    border-bottom-width: 1px;
    border-bottom-color: ${({ theme, hasError }) => hasError ? theme.COLORS.INPUT_ERROR : theme.COLORS.INPUT_BORDER};
    border-radius: 8px;
    width: 100%;
    position: relative;
    min-height: 42px;
`;

export const DynamicLabel = styled(Label).attrs(props => ({
    type: "NORMAL_SMALL",
    strong: true
}))`
    position: absolute;
    top: 0px;
    left : 8px;
    width: 100%
`;

export const StyledInput = styled.TextInput`
    align-self: flex-end;
    padding-left: 4px;
    padding-bottom: 4px;
    color: ${({ theme }) => theme.COLORS.TEXT};
    font-family: ${({ theme }) => theme.FONTS.REGULAR};
    font-size: ${({ theme }) => theme.SIZE.NORMAL_SMALL}px;
    flex: 1;
    width: 100%;
    z-index: 1;
`;

export const IOIcon = styled(Ionicons).attrs(props => ({
    size: props.theme.SIZE.SUB_TITLE,
}))`
    color: ${({ theme }) => theme.COLORS.INPUT_ICON};
`;

export const FAIcon = styled(FontAwesome).attrs((props: any) => ({
    size: props?.size || props.theme.SIZE.NORMAL,
    color: props?.filled ? getColorByType("DEFAULT") : THEME.COLORS.INPUT_ICON
}))``;