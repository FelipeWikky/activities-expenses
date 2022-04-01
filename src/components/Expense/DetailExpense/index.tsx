import { useCallback, useImperativeHandle, useMemo, useRef, forwardRef, useEffect, Props } from "react";
import { Modalize } from "react-native-modalize";
import { Dimensions } from "react-native";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Modal, Container, Header, Title } from "./styles";

import { Button } from "../../Button";
import { ExpenseItem } from "../../../types/models/expenseItem";
import { getPercentageValue } from "../../../utils";
import { useTranslation } from "../../../contexts/translation/useTranslation";
import { ExpenseForm } from "../ExpenseForm";

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

const DetailExpenseComponent: React.ForwardRefRenderFunction<DetailExpenseHandles, DetailExpenseProps> = ({ onlyView = true, onSave, onCancel, onCloseModal, data }, ref) => {
    const modalizeRef = useRef<Modalize>(null);
    const { t } = useTranslation();

    const schema = yup.object().shape({
        title: yup.string().required(t("error.field.required")).min(3, t("error.field.character.minimum.3")),
        description: yup.string().required(t("error.field.required")).min(3, t("error.field.character.minimum.3")),
    });

    const { control, handleSubmit, setValue, reset, formState: { errors, } } = useForm<ExpenseItem>({
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
                            type="SUCCESS"
                            text={data?.id ? t("label.update") : t("label.create")}
                            textSize="NORMAL_SMALL"
                            onPress={handleSubmit(onSavePress)}
                        />
                    )}
                    {!!(idFormatted) && <Title>{idFormatted}</Title>}
                    <Button
                        type="DANGER"
                        text={t("label.cancel")}
                        textSize="NORMAL_SMALL"
                        onPress={() => onCancelPress()}
                    />
                </Header>

                <ExpenseForm
                    control={control}
                    errors={errors}
                    createdAt={data?.createdAt}
                    updatedAt={data?.updatedAt}
                />


            </Container>
        </Modal >
    );
}

export const DetailExpense = forwardRef(DetailExpenseComponent)