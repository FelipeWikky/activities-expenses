import styled from "styled-components/native";
import { Modalize } from "react-native-modalize";

export const Modal = styled(Modalize).attrs(props => {
    return {
        overlayStyle: { backgroundColor: props.theme.SHADOW[4] },
    }
})``;

export const Container = styled.View`
    padding: 12px;
`;

export const InputContainer = styled.View`
    margin-bottom: 24px;
`;