import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { Button } from "../../components/Button";
import { Icon } from "../../components/Icon";
import { Line } from "../../layout/Line";

export const Container = styled(SafeAreaView)`
    flex: 1;
    padding: 12px;
`;

export const Welcome = styled.Text`
    font-size: ${({ theme }) => theme.SIZE.NORMAL}px;
    color: ${({ theme }) => theme.COLORS.TEXT};
    font-family: ${({ theme }) => theme.FONTS.MEDIUM};
    margin-left: 12px;
`;

export const OptionButton = styled(Button).attrs(props => ({
    empty: true,
}))`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const OptionText = styled.Text`
    font-size: ${({ theme }) => theme.SIZE.NORMAL_SMALL}px;
    color: ${({ theme }) => theme.COLORS.TEXT};
    font-family: ${({ theme }) => theme.FONTS.MEDIUM};
`;

export const Spacer = styled(Line).attrs(props => ({
    height: 1,
    shadow: 2
}))`
    margin: 12px 0px;
`;

export const LogoutIcon = styled(Icon).attrs(props => ({
    group: "MaterialIcons",
    name: "logout",
    color: "TEXT",
    size: 28
}))`
    margin-right: 8px;
`;

export const UserIconBadge = styled.View`
    background-color: ${({theme}) => theme.COLORS.LABEL};
    border-radius: 20px;
    align-items: center;
    justify-content: center;
    height: 32px;
    width: 32px;
`;

export const UserIcon = styled(Icon).attrs(props => ({
    group: "AntDesign",
    name: "user",
    color: "COLOR_300",
    size: 24
}))``;