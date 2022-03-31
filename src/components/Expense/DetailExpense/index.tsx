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
import { useTranslation } from "../../../contexts/translation/useTranslation";

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
                            type="SUCCESS"
                            text={data?.id ? t("label.update") :t("label.create")}
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

                <Content>
                    <Box>
                        <Input
                            control={control} type="text" name="title" 
                            label={t("label.activity")}
                            placeholder={t("label.placeholder.activity.activity")}
                            error={errors?.title?.message}
                        />
                    </Box>

                    <Line shadow={2} marginVertical={12} />

                    <Box>
                        <Input
                            control={control} type="text" name="description" 
                            label={t("label.description")}
                            placeholder={t("label.placeholder.activity.description")}
                            error={errors?.description?.message}
                        />
                    </Box>

                    <Line shadow={2} marginVertical={12} />

                    <Box>
                        <DatePicker type="datetime" name="whenAt" control={control} label={t("label.when.to", "?")} />
                    </Box>

                    <Line shadow={2} marginVertical={12} />

                    <Box direction="row" justifyContent="space-between">
                        <Box>
                            <Title>{t("label.finished", "?")}</Title>
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
                            <Title>{t("label.has.problem", "?")}</Title>
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
                            control={control} type="text" name="comment" label={t("label.comment")}
                            placeholder={t("label.placeholder.activity.comment")}
                            error={errors?.comment?.message}
                        />
                    </Box>

                    <Line shadow={2} marginVertical={12} />

                    <Box direction="row" alignItems="center" justifyContent="space-between">
                        <Title>
                            {!!(data && data.createdAt) ? t("label.created.at"): t("label.created.at.in")}
                        </Title>
                        <Description style={{ marginBottom: 2 }}>
                            {formatDateTime(data?.createdAt || new Date())}
                        </Description>
                    </Box>

                    {!!(data?.updatedAt) && <Line shadow={2} marginVertical={12} />}

                    {!createdAsSameUpdated && (
                        <Box direction="row" alignItems="center" justifyContent="space-between">
                            <Title>{t("label.updated.at")}</Title>
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