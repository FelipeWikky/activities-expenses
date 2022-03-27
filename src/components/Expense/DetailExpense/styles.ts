import styled from "styled-components/native";
import { Modalize } from "react-native-modalize";

export const Modal = styled(Modalize)``;

export const Container = styled.View`
    padding: 16px 12px;
    justify-content: space-between;
`;

export const Content = styled.View`
`;

export const Title = styled.Text`
    /* margin-top: 12px; */
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

type HeaderProps = {
    showSave?: boolean;
}
export const Header = styled.View<HeaderProps>`
    flex-direction: row;
    width: 100%;
    justify-content: ${({ showSave }) => showSave ? "space-between" : "flex-end"};
    margin-bottom:  12px;
    align-items: center;
`;