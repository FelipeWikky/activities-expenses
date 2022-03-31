import styled from "styled-components/native";
import { Box } from "../../layout/Box";
import { Button } from "../Button";
import { Icon } from "../Icon";
import { Label } from "../Label";


export const Modal = styled.Modal.attrs(props => ({
    animationType: "slide",
    visible: props.visible
}))`
    height: 100%;
`;

export const Container = styled.View`
    flex: 1;
    height: 100%;
    background-color: ${({ theme }) => theme.SHADOW[5]};
    align-items: center;
    justify-content: center;
`;

export const Content = styled.View`
    align-items: flex-start;
    justify-content: space-around;
    background-color: ${({ theme }) => theme.COLORS.COLOR_300};
    min-height: 30%;
    width: 75%;
    border-radius: 15px;
    padding: 24px 32px;
`;

export const Title = styled(Label).attrs(props => ({
    type: "NORMAL",
    color: "LABEL",
    strong: true
}))`
    margin-bottom: 24px;
    text-align: center;
    align-self: center;
`;

export const CloseIconButton = styled(Button).attrs(props => ({
    empty: true
}))`
    position: absolute;
    right: -20px;
    top: -20px;
`;

export const CloseIcon = styled(Icon).attrs(props => ({
    group: "Ionicons",
    name: "close-circle",
    color: "LABEL",
    size: 28
}))`

`
