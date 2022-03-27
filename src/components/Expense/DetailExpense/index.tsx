import { useCallback, useImperativeHandle, useMemo, useRef, forwardRef, useState, useEffect } from "react";
import { Modalize } from "react-native-modalize";

import { Modal, Container, Content, Header, Title, Description } from "./styles";

import { ExpenseItem } from "../../../types/models/expenseItem";
import { getPercentageValue } from "../../../utils";
import { Dimensions, Text } from "react-native";
import { formatDate } from "../../../utils/format";
import { Button } from "../../Button";
import { Checkbox } from "../../Checkbox";
import { Box } from "../../../layout/Box";
import { Line } from "../../../layout/Line";

export type DetailExpenseHandles = {
    open: () => void;
    close: () => void;
}

type DetailExpenseProps = {
    data?: ExpenseItem;
    onlyView?: boolean;

    onSavePress?: (item?: ExpenseItem) => void;
    onCancelPress?: (item?: ExpenseItem) => void;
}

const DetailExpenseComponent: React.ForwardRefRenderFunction<DetailExpenseHandles, DetailExpenseProps> = (props, ref) => {
    const { onlyView = true, onSavePress, onCancelPress } = props;
    const modalizeRef = useRef<Modalize>(null);

    const [data, setData] = useState<ExpenseItem>();

    useEffect(() => {
        if (props?.data && props?.data.id) {
            setData(props.data);
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
        if (data?.createdAt) return formatDate(data.createdAt);
        return '';
    }, [data?.createdAt]);

    const idFormatted = useMemo(() => {
        if (data?.id) return '# ' + data.id;
        return '';
    }, [data?.id]);

    const onUpdateData = useCallback((attribute: string, value: string | number | boolean | Date) => {
        setData(prev => ({ ...prev, [attribute]: value }));
    }, []);

    return (
        <Modal
            ref={modalizeRef}
            modalHeight={MODAL_HEIGHT}
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
                            onPress={() => {
                                if (onSavePress) {
                                    onSavePress(data);
                                }
                                close();
                            }}
                        />
                    )}
                    {idFormatted && <Title>{idFormatted}</Title>}
                    <Button
                        type="DANGER" text="Cancelar" textSize="NORMAL_SMALL"
                        onPress={() => {
                            if (onCancelPress) {
                                onCancelPress(data);
                            }
                            close();
                        }}
                    />
                </Header>

                <Content>
                    <Box>
                        <Title>
                            Atividade
                        </Title>
                        <Description>
                            {data?.title}
                        </Description>
                    </Box>

                    <Line shadow={2} marginVertical={12} />

                    <Box>
                        <Title>
                            Descrição
                        </Title>
                        <Description>
                            {data?.description}
                        </Description>
                    </Box>

                    <Line shadow={2} marginVertical={12} />

                    <Box direction="row" justifyContent="space-between">
                        <Box>
                            <Title>
                                Finalizado?
                            </Title>
                            <Checkbox
                                name="finished"
                                checked={data?.finished}
                                onPress={(attribute, value) => onUpdateData(attribute, !value)}
                            />
                        </Box>
                        <Box>
                            <Title>
                                Houve algum erro?
                            </Title>
                            <Checkbox
                                name="hasError"
                                checked={data?.hasError}
                                onPress={(attribute, value) => onUpdateData(attribute, !value)}
                            />
                        </Box>
                    </Box>

                    <Line shadow={2} marginVertical={12} />

                    <Box>
                        <Title>
                            Comentários
                        </Title>
                        <Description>
                            {data?.comment}
                        </Description>
                    </Box>

                    <Line shadow={2} marginVertical={12} />

                    <Box direction="row" alignItems="center">
                        <Title>
                            Criado em
                        </Title>
                        <Description style={{marginBottom: 2}}>
                            {dateFormatted}
                        </Description>
                    </Box>

                </Content>
            </Container>
        </Modal>
    );
}

export const DetailExpense = forwardRef(DetailExpenseComponent)