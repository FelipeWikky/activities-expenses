import styled from "styled-components/native";
import { FlatListProps } from "react-native";
import { AntDesign } from '@expo/vector-icons';

import { ExpenseItem } from "../../../types/models/expenseItem";
import { getColorByType } from "../../../utils/colors";

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
    width: 100%;
    justify-content: space-between;
    align-items: center;
`;

export const HeaderContent = styled.View`
    flex-direction: row;
    align-items: flex-end;
`;

export const EachItemList = styled.FlatList.attrs(props => ({
    showsVerticalScrollIndicator: false,
})) <FlatListProps<ExpenseItem>>`
    width: 100%;
`;

export const PlusIcon = styled(AntDesign).attrs((props) => ({
    name: "pluscircle",
    size: props.theme.SIZE.SUB_TITLE,
    color: getColorByType("SUCCESS")
}))`
    padding: 0px 16px;
`;