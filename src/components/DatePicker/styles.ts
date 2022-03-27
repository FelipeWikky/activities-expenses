import styled from "styled-components/native";
import DateTimePickerRN from "react-native-modal-datetime-picker";
import { Box } from "../../layout/Box";
import { Button } from "../Button";
import { Label } from "../Label";

export const DateTimeBox = styled(Box).attrs(props => ({
    direction: "row"
}))`
    margin-left: 4px;
    margin-top: 4px;
`;

export const DateTimePicker = styled(DateTimePickerRN).attrs(props => ({
    minimumDate: new Date(),
    is24Hour: true,
    isVisible: !!(props.mode)
}))``;

export const DateTimeButton = styled(Button).attrs(props => ({
    empty: true,
    disabled: props.disabled
}))`
    margin-right: 4px;
`;

export const DateTimeLabel = styled(Label).attrs(props => ({
    type: "NORMAL_SMALL",
    color: props.color || "TEXT",
    strong: props.strong || false
}))``;