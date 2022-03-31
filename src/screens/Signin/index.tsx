import { useRef, forwardRef, ForwardRefRenderFunction, useImperativeHandle, useCallback, useMemo, useState } from "react";
import { Dimensions } from "react-native";
import { Modalize } from "react-native-modalize";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Modal, Container, InputContainer } from "./styles";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { getPercentageValue } from "../../utils";
import { useTranslation } from "../../contexts/translation/useTranslation";

export interface SigninHandles {
    openModal: () => void;
    closeModal: () => void;
}

type SigninProps = {}

type Input = {
    email?: string;
    password?: string;
}

const SigninComponent: ForwardRefRenderFunction<SigninHandles, SigninProps> = (_, ref) => {
    const modalizeRef = useRef<Modalize>(null);
    const { t } = useTranslation();

    const schema = yup.object().shape({
        email: yup.string().email().required(t("error.field.required")).typeError(t("error.field.required")),
        password: yup.string().min(3, t("error.field.character.minimum.3")).typeError(t("error.field.required"))
    })

    const { control, handleSubmit, formState: { errors } } = useForm<Input>({
        resolver: yupResolver(schema)
    });

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
        setInput(prev => ({ ...prev, [attribute]: value }));
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
                <InputContainer>
                    <Input
                        control={control}
                        name="email"
                        label={t("label.email")}
                        error={errors.email?.message}
                        // leftIcon={"user"}
                        placeholder={t("label.placeholder.signin.email")}
                    />
                </InputContainer>

                <InputContainer>
                    <Input
                        control={control}
                        name="password"
                        label={t("label.password")}
                        error={errors.password?.message}
                        type="password"
                        // leftIcon={"lock"}
                        placeholder={t("label.placeholder.signin.password")}
                    />
                </InputContainer>

                <Button type="DEFAULT" text={t("label.go")} />
            </Container>
        </Modal>
    );
};

export const Signin = forwardRef(SigninComponent);