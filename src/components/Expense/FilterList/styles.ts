import styled from "styled-components/native";
import { Checker } from "../../Checker";

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

export const FilterChecker = styled(Checker).attrs(props => ({
    labelProps: {
        type: "SMALL",
        color: "TEXT",
        strong: true
    },
    first: "check",
    direction: "row",
}))``;