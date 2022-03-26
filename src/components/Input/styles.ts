import styled from "styled-components/native";
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { getColorByType } from "../../utils/colors";
import { THEME } from "../../theme";

export const Container = styled.View`

`;

export const Content = styled.View<{hasError?: boolean}>`
    margin: 2px 0px;
    flex-direction: row;
    align-items: center;
    padding: 0px 4px;
    border: 1px solid ${({ theme, hasError }) => hasError ? theme.COLORS.ERROR_LOW : theme.COLORS.INPUT_BORDER};
    background-color: ${({ theme }) => theme.COLORS.INPUT_BACKGROUND};
    border-radius: 8px;
`;

export const StyledInput = styled.TextInput`
    min-height: 36px;
    padding-left: 5px;
    color: ${({ theme }) => theme.COLORS.INPUT_TEXT};
    font-family: ${({ theme }) => theme.FONTS.REGULAR};
    font-size: ${({ theme }) => theme.SIZE.S2}px;
    flex: 1;
`;

export const Label = styled.Text`
    color: ${({ theme }) => theme.COLORS.LABEL};
    font-family: ${({ theme }) => theme.FONTS.MEDIUM};
    font-size: ${({ theme }) => theme.SIZE.S2}px;
`;

export const Error = styled.Text`
    color: ${({ theme }) => theme.COLORS.ERROR};
    font-family: ${({ theme }) => theme.FONTS.REGULAR};
    font-size: ${({ theme }) => theme.SIZE.S1_5}px;
    margin-bottom: 4px;
`;

export const IOIcon = styled(Ionicons).attrs(props => ({
    size: 26,

}))`
    color: ${({ theme }) => theme.COLORS.INPUT_ICON};
`;

export const FAIcon = styled(FontAwesome).attrs((props: any) => ({
    size: props?.size || 26,
    color: props?.filled ? getColorByType("DEFAULT") : THEME.COLORS.INPUT_ICON
}))``;