import { useRef, forwardRef, ForwardRefRenderFunction, useImperativeHandle, useCallback, useMemo, useState } from "react";
import { Dimensions } from "react-native";
import { Modalize } from "react-native-modalize";

import { Modal, Container } from "./styles";
import { Input } from "../../components/Input";
import { THEME } from "../../theme";
import { Button } from "../../components/Button";
import { getPercentageValue } from "../../utils";

export interface SigninHandles {
    openModal: () => void;
    closeModal: () => void;
}

type SigninProps = {

}

type Input = {
    email?: string;
    pwd?: string;
}

const SigninComponent: ForwardRefRenderFunction<SigninHandles, SigninProps> = (props, ref) => {
    const modalizeRef = useRef<Modalize>(null);

    const [input, setInput] = useState<Input>({});

    const openModal = useCallback(() => {
        modalizeRef.current.open();
    }, [modalizeRef]);

    const closeModal = useCallback(() => {
        modalizeRef.current.close();
    }, [modalizeRef]);

    useImperativeHandle(ref, () => ({
        openModal,
        closeModal
    }));

    const MODAL_HEIGHT = useMemo(() => getPercentageValue(Dimensions.get('window').height, 20), [Dimensions]);

    const onChangeText = useCallback((attribute: string, value: string) => {
        setInput(prev => ({...prev, [attribute]: value}));
    }, []);

    return (
        <Modal
            ref={modalizeRef}
            scrollViewProps={{
                showsHorizontalScrollIndicator: false,
                showsVerticalScrollIndicator: false,
                nestedScrollEnabled: true,
                scrollEnabled: false
            }}
            modalHeight={MODAL_HEIGHT}
        >
            <Container>
                <Input
                    name="email"
                    label="E-mail"
                    error={!(input?.email) && "Email obrigatório"}
                    leftIcon={"user"}
                    placeholder={'Informe seu E-mail'}
                    value={input?.email}
                    onChangeText={onChangeText}
                />

                <Input
                    name="pwd"
                    label="Password"
                    // error="Email obrigatório"
                    type="password"
                    leftIcon={"lock"}
                    placeholder={'Informe sua Senha'}
                    value={input?.pwd}
                    onChangeText={onChangeText}
                />

                <Button type="DEFAULT" text="Fazer login" size="md" />
            </Container>
        </Modal>
    );
};

export const Signin = forwardRef(SigninComponent);