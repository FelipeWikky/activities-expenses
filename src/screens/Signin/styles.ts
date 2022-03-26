import styled from "styled-components/native";
import { Modalize } from "react-native-modalize";

export const Modal = styled(Modalize).attrs(props => {
    return {
        // rootStyle: { backgroundColor: props.theme.COLORS.BG_LOW },
        overlayStyle: { backgroundColor: props.theme.COLORS.SHADOW },
        handleStyle: { backgroundColor: props.theme.COLORS.BLACK },
        childrenStyle: { backgroundColor: props.theme.COLORS.BG_LOW },
    }
})``;

export const Container = styled.View`
    padding: 12px;
`;

export const InputContainer = styled.View`
    margin-bottom: 8px;
`;