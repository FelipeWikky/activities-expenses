import styled from "styled-components/native";

export const Loading = styled.ActivityIndicator.attrs(props => ({
    size: 'large',
    color: props.theme.COLORS.LABEL,
}))`
    margin: 4px 0px;
`;