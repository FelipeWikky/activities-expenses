import { useCallback, useImperativeHandle, useMemo, useRef, forwardRef, useEffect, Props } from "react";
import { Modalize } from "react-native-modalize";
import { Dimensions } from "react-native";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Random from 'expo-random';

import { Modal, Container, Content, Header, Title, Description } from "./styles";

import { Box } from "../../../layout/Box";
import { Line } from "../../../layout/Line";

import { Button } from "../../Button";
import { Checkbox } from "../../Checkbox";

import { ExpenseItem } from "../../../types/models/expenseItem";
import { getPercentageValue } from "../../../utils";
import { formatDate, formatDateTime } from "../../../utils/format";
import { Input } from "../../Input";

export type DetailExpenseHandles = {
    open: () => void;
    close: () => void;
}

type DetailExpenseProps = {
    data?: ExpenseItem;
    onlyView?: boolean;

    onSave?: (item?: ExpenseItem) => void;
    onCancel?: (item?: ExpenseItem) => void;
}

const schema = yup.object().shape({
    title: yup.string().required("Este campo é obrigatório").min(3, "Mínimo de 3 caracteres"),
    description: yup.string().required("Este campo é obrigatório").min(3, "Mínimo de 3 caracteres"),
});

const DetailExpenseComponent: React.ForwardRefRenderFunction<DetailExpenseHandles, DetailExpenseProps> = (props, ref) => {

    const { onlyView = true, onSave, onCancel } = props;
    const modalizeRef = useRef<Modalize>(null);

    const { control, handleSubmit, setValue, reset, getValues, formState: {  errors, } } = useForm<ExpenseItem>({
        resolver: yupResolver(schema),
        defaultValues: props?.data,
        shouldFocusError: true,
    });

    useEffect(() => {
        console.log('props.data ', props?.data)
        if (props?.data) {
            for (const key of Object.keys(props.data)) {
                setValue(key as any, props.data[key]);
            }
        }
    }, [props?.data]);

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

    const dateFormatted = useMemo(() => {
        const createdAt = props?.data?.createdAt;
        if (createdAt) return formatDateTime(createdAt);
        return 'dd/mm/yyyy';
    }, [props?.data]);

    const idFormatted = useMemo(() => {
        const id = props?.data?.id;
        if (id) return `# ${id}`;
        return '';
    }, [props?.data]);

    const onSavePress = useCallback((data: ExpenseItem) => {
        if (onSave) {
            data.createdAt = new Date();
            onSave(data);
            resetFields();
        }
    }, []);

    const resetFields = () => {
        reset({
            id: '', title: '', description: '', comment: '', finished: false, hasError: false, createdAt: ''
        });
    }

    const onCancelPress = useCallback((fireCancel = true) => {
        if (onCancel && fireCancel) {
            onCancel();
        }
        resetFields();
    }, []);

    return (
        <Modal
            ref={modalizeRef}
            modalHeight={MODAL_HEIGHT}
            onClosed={() => onCancelPress(false)}
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
                            type="SUCCESS" text="Salvar" textSize="NORMAL_SMALL"
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

                    <Box direction="row" justifyContent="space-between">
                        <Box>
                            <Title>
                                Finalizado?
                            </Title>
                            <Checkbox
                                control={control}
                                name="finished"
                            />
                        </Box>
                        <Box>
                            <Title>
                                Houve algum erro?
                            </Title>
                            <Checkbox
                                control={control}
                                name="hasError"
                            />
                        </Box>
                    </Box>

                    <Line shadow={2} marginVertical={12} />

                    <Box>
                        <Title>
                            Comentários
                        </Title>
                        <Description>
                            {getValues("comment")}
                        </Description>
                    </Box>

                    <Line shadow={2} marginVertical={12} />

                    <Box direction="row" alignItems="center">
                        <Title>
                            Criado em
                        </Title>
                        <Description style={{ marginBottom: 2 }}>
                            {dateFormatted}
                        </Description>
                    </Box>

                </Content>
            </Container>
        </Modal >
    );
}

export const DetailExpense = forwardRef(DetailExpenseComponent)