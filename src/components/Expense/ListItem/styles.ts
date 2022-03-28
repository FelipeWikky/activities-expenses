import styled from "styled-components/native";
import { FlatListProps } from "react-native";
import { AntDesign } from '@expo/vector-icons';

import { ExpenseItem } from "../../../types/models/expenseItem";
import { getColorByType } from "../../../utils/colors";
import { Icon } from "../../Icon";
import { Box } from "../../../layout/Box";
import Animated from "react-native-reanimated";
import { Button } from "../../Button";

export const Container = styled.View`
    flex: 1;
    width: 100%;
    align-items: center;
`;

export const Loading = styled.ActivityIndicator.attrs(props => ({
    size: 'large',
    color: props.theme.COLORS.LABEL,
}))`
    margin: 4px 0px;
`;

export const Header = styled.View`
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
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

export const FilterIndicatorIcon = styled(Icon).attrs(props => ({
    group: "FontAwesome",
    name: props.name,
    size: props.theme.SIZE.SUB_TITLE,
    color: props.theme.COLORS.LABEL
}))`
    padding: 0px 16px;
`;

export const SearchInput = styled.TextInput.attrs(props => ({
    autoCapitalize: "none",
    autoCorrect: false,
    autoCompleteType: "off"
}))`
    width: 90%;
    margin-left: 8px;
    height: 80%;
    border-bottom-width: 1px;
    border-bottom-color: ${({theme}) => theme.COLORS.INPUT_BORDER};
`;

export const Ticker = styled.Text`
    margin-left: 4px;
    font-family: ${({theme}) => theme.FONTS.MEDIUM};
    font-size: ${({theme}) => theme.SIZE.SMALL}px;
    margin-right: 16px;
`;