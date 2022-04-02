import styled from "styled-components/native";
import { Box } from "../../../layout/Box";

export const Modal = styled.Modal.attrs(props => ({
    transparent: true,
    animationType: "fade"
}))`
    height: 100%;
`;

export const Container = styled.View`
    flex: 1;
    height: 100%;
    background-color: ${({ theme }) => theme.SHADOW[2]};
    align-items: center;
    justify-content: center;
`;

export const Content = styled.View`
    align-items: flex-start;
    background-color: ${({ theme }) => theme.COLORS.COLOR_300};
    height: 80%;
    width: 95%;
    border-radius: 15px;
    padding: 8px 16px;
`;

export const CloseContainer = styled(Box).attrs(props => ({
    alignItems: "flex-end",
    direction: "row",
    justifyContent: "space-between"
}))`
    width: 100%;
    margin-top: 8px;
    padding-bottom: 8px;
    border-bottom-width: 0.5px;
    border-bottom-color: ${({ theme }) => theme.SHADOW[3]}
`