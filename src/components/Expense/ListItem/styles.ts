import styled from "styled-components/native";
import { FlatListProps } from "react-native";
import { ExpenseItem } from "../../../types/models/expenseItem";

export const Container = styled.View`
    flex: 1;
    width: 100%;
    align-items: center;
`;

export const Loading = styled.ActivityIndicator.attrs(props => ({
    size: 'large',
    color: props.theme.COLORS.DANGER,
}))`
    margin: 4px 0px;
`;

export const Header = styled.View`
    flex-direction: row;
    align-items: flex-end;
`;

export const EachItemList = styled.FlatList.attrs(props => ({
    showsVerticalScrollIndicator: false,
}))<FlatListProps<ExpenseItem>>`
    width: 100%;
`;