
import styled from "styled-components/native";

export const Content = styled.View`
`;

export const Title = styled.Text`
    margin-bottom: 4px;
    font-size: ${({ theme }) => theme.SIZE.NORMAL_SMALL}px;
    font-family: ${({ theme }) => theme.FONTS.MEDIUM};
    color: ${({ theme }) => theme.COLORS.LABEL};
`;
export const Description = styled.Text`
    font-size: ${({ theme }) => theme.SIZE.SMALL}px;
    font-family: ${({ theme }) => theme.FONTS.MEDIUM};
    color: ${({ theme }) => theme.COLORS.TEXT};
    margin-left: 4px;
`;