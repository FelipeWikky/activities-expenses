import { useCallback, useImperativeHandle, useMemo, useRef, forwardRef, useEffect, Props } from "react";
import { Modalize } from "react-native-modalize";
import { Dimensions } from "react-native";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Modal, Container, Content, Header, Title, Description } from "./styles";

import { Box } from "../../../layout/Box";
import { Line } from "../../../layout/Line";

import { Button } from "../../Button";
import { Checkbox } from "../../Checkbox";

import { ExpenseItem } from "../../../types/models/expenseItem";
import { getPercentageValue } from "../../../utils";
import { formatDateTime } from "../../../utils/format";
import { Input } from "../../Input";
import { DatePicker } from "../../DatePicker";

export type DetailExpenseHandles = {
    open: () => void;
    close: () => void;
}

type DetailExpenseProps = {
    data?: ExpenseItem;
    onlyView?: boolean;

    onSave?: (item?: ExpenseItem) => void;
    onCancel?: (item?: ExpenseItem) => void;
    onCloseModal?: () => void;
}

const schema = yup.object().shape({
    title: yup.string().required("Este campo é obrigatório").min(3, "Mínimo de 3 caracteres"),
    description: yup.string().required("Este campo é obrigatório").min(3, "Mínimo de 3 caracteres"),
});

const DetailExpenseComponent: React.ForwardRefRenderFunction<DetailExpenseHandles, DetailExpenseProps> = ({ onlyView = true, onSave, onCancel, onCloseModal, data }, ref) => {
    const modalizeRef = useRef<Modalize>(null);

    const { control, handleSubmit, setValue, reset, getValues, formState: { errors, } } = useForm<ExpenseItem>({
        resolver: yupResolver(schema),
        defaultValues: data,
        shouldFocusError: true,
    });

    useEffect(() => {
        if (data) {
            for (const key of Object.keys(data)) {
                setValue(key as any, data[key]);
            }
        } else {
            setValue("finished", false);
            setValue("hasError", false);
        }
    }, [data]);

    const open = useCallback(() => {
        modalizeRef.current.open();
    }, [modalizeRef]);

    const close = useCallback(() => {
        modalizeRef.current.close();
    }, [modalizeRef]);

    useImperativeHandle(ref, () => ({
        open,
        close
    }));

    const MODAL_HEIGHT = useMemo(() => getPercentageValue(Dimensions.get('window').height, 20), [Dimensions]);

    const idFormatted = useMemo(() => {
        const id = data?.id;
        if (id) return `# ${id}`;
        return '';
    }, [data]);

    const onSavePress = useCallback((data: ExpenseItem) => {
        if (onSave) {
            onSave(data);
            resetFields();
        }
    }, []);

    const resetFields = () => {
        reset({
            id: '', title: '', description: '', comment: '', finished: false, hasError: false, createdAt: '', whenAt: ''
        });
    }

    const onCancelPress = useCallback((fireCancel = true) => {
        if (onCancel && fireCancel) {
            onCancel();
        }
        resetFields();
    }, []);

    const createdAsSameUpdated = useMemo(() => {
        if (data?.createdAt === data?.updatedAt) return true;
        return false;
    }, [data?.createdAt, data?.updatedAt]);

    return (
        <Modal
            ref={modalizeRef}
            modalHeight={MODAL_HEIGHT}

            onClosed={() => {
                if (onCloseModal) onCloseModal();
                resetFields();
            }}
            scrollViewProps={{
                showsHorizontalScrollIndicator: false,
                showsVerticalScrollIndicator: false,
                nestedScrollEnabled: true,
                scrollEnabled: false
            }}
        >
            <Container>
                <Header showSave={!onlyView}>
                    {!onlyView && (
                        <Button
                            type="SUCCESS" text={data?.id ? "Atualizar" : "Salvar"} textSize="NORMAL_SMALL"
                            onPress={handleSubmit(onSavePress)}
                        />
                    )}
                    {!!(idFormatted) && <Title>{idFormatted}</Title>}
                    <Button
                        type="DANGER" text="Cancelar" textSize="NORMAL_SMALL"
                        onPress={() => onCancelPress()}
                    />
                </Header>

                <Content>
                    <Box>
                        <Input
                            control={control} type="text" name="title" label="Atividade"
                            placeholder="Do que se trata esta atividade?"
                            error={errors?.title?.message}
                        />
                    </Box>

                    <Line shadow={2} marginVertical={12} />

                    <Box>
                        <Input
                            control={control} type="text" name="description" label="Descrição"
                            placeholder="Uma breve descrição da atividade"
                            error={errors?.description?.message}
                        />
                    </Box>

                    <Line shadow={2} marginVertical={12} />

                    <Box>
                        <DatePicker type="datetime" name="whenAt" control={control} label="Para quando?" />
                    </Box>

                    <Line shadow={2} marginVertical={12} />

                    <Box direction="row" justifyContent="space-between">
                        <Box>
                            <Title>
                                Finalizado?
                            </Title>
                            <Checkbox
                                control={control}
                                name="finished"
                                icon={{
                                    background: "SUCCESS",
                                    color: "WHITE"
                                }}
                            />
                        </Box>
                        <Box>
                            <Title>
                                Houve algum erro?
                            </Title>
                            <Checkbox
                                control={control}
                                name="hasError"
                                icon={{
                                    background: "DANGER",
                                    color: "WHITE"
                                }}
                            />
                        </Box>
                    </Box>

                    <Line shadow={2} marginVertical={12} />

                    <Box>
                        <Input
                            control={control} type="text" name="comment" label="Comentário"
                            placeholder="Algum comentário para este item?"
                            error={errors?.comment?.message}
                        />
                    </Box>

                    <Line shadow={2} marginVertical={12} />

                    <Box direction="row" alignItems="center" justifyContent="space-between">
                        <Title>
                            {!!(data && data.createdAt) ? "Criado em " : "Criando em"}
                        </Title>
                        <Description style={{ marginBottom: 2 }}>
                            {formatDateTime(data?.createdAt || new Date())}
                        </Description>
                    </Box>

                    {!!(data?.updatedAt) && <Line shadow={2} marginVertical={12} />}

                    {!createdAsSameUpdated && (
                        <Box direction="row" alignItems="center" justifyContent="space-between">
                            <Title>
                                Atualizado em
                            </Title>
                            <Description style={{ marginBottom: 2 }}>
                                {formatDateTime(data?.updatedAt)}
                            </Description>
                        </Box>
                    )}

                </Content>
            </Container>
        </Modal >
    );
}

export const DetailExpense = forwardRef(DetailExpenseComponent)