import { useEffect, useMemo, useRef, useState } from "react";
import { PanGestureHandler, GestureDetector, Gesture } from "react-native-gesture-handler";

import { Container, Header, HeaderContent, Content, Item, Items } from "./styles";

import { Label } from "../../components/Label";
import { useTranslation } from "../../contexts/translation/useTranslation";
import { formatDate } from "../../utils/format";
import { ExpenseForm } from "../../components/Expense/ExpenseForm";
import { useForm } from "react-hook-form";
import { ExpenseItem } from "../../types/models/expenseItem";
import { Dimensions, ScrollView } from "react-native";
import { Button } from "../../components/Button";
import { Icon } from "../../components/Icon";
import { Box } from "../../layout/Box";
import { useExpense } from "../../contexts/expense/useExpense";

const BACK_ITEM_POSITION_TO_INITIAL_MS = 100;
const WAIT_TO_DRAG_ITEM_AGAIN_MS = 500;

export const Diary: React.FC = () => {
    const { t } = useTranslation();
    const { items } = useExpense();
    const { control } = useForm<ExpenseItem>();

    const WIDTH = useMemo(() => Number(Dimensions.get("window").width) * 0.75, [Dimensions]);
    const scrollRef = useRef<ScrollView>(null);
    const [scrollPressed, setScrollPressed] = useState(0);
    const [waitingSecondsToScroll, setWaitingSecondsToScroll] = useState(false);
    const [itemPosition, setItemPosition] = useState(0);

    const onScrollToLeft = (pressedByButtom?: boolean) => {
        if (waitingSecondsToScroll && !pressedByButtom) return;
        if (scrollPressed === 0) {
            setScrollPressed(items.length - 1);
            const x = ((WIDTH + 100) * ((items.length - 1) + 1));
            scrollRef.current?.scrollTo({ x, animated: true });
            setTimeout(() => setItemPosition(0), BACK_ITEM_POSITION_TO_INITIAL_MS)
        }
        else {
            setScrollPressed(prev => prev - 1);
            const x = ((WIDTH + 100) * (scrollPressed - 1));
            scrollRef.current?.scrollTo({ x: x, animated: true });
            setTimeout(() => setItemPosition(0), BACK_ITEM_POSITION_TO_INITIAL_MS)

        }
        setWaitingSecondsToScroll(true);
    }

    const onScrollToRight = (pressedByButtom?: boolean) => {
        if (waitingSecondsToScroll && !pressedByButtom) return;
        if (scrollPressed === items.length - 1) {
            setScrollPressed(0);
            scrollRef.current?.scrollTo({ x: 0, animated: true });
            setTimeout(() => setItemPosition(0), BACK_ITEM_POSITION_TO_INITIAL_MS)
        }
        else {
            setScrollPressed(prev => prev + 1);
            const x = ((WIDTH + 100) * (scrollPressed + 1));
            scrollRef.current?.scrollTo({ x, animated: true });
            setTimeout(() => setItemPosition(0), BACK_ITEM_POSITION_TO_INITIAL_MS)
        }
        setWaitingSecondsToScroll(true);
    }

    useEffect(() => {
        if (waitingSecondsToScroll) {
            setTimeout(() => setWaitingSecondsToScroll(false), WAIT_TO_DRAG_ITEM_AGAIN_MS);
        }
    }, [waitingSecondsToScroll]);

    const PaginationInfo = useMemo(() => {
        if (!items || items.length === 0) return "";

        return `${scrollPressed + 1}/${items.length}`;
    }, [items, scrollPressed]);

    return (
        <Container>
            <Header>
                <HeaderContent>
                    <Label type="SUB_TITLE">
                        {t("label.activity")}
                    </Label>
                    <Label type="NORMAL_SMALL" style={{ marginBottom: 3 }}>
                        {" "} {formatDate(new Date())}
                    </Label>
                </HeaderContent>
            </Header>

            <Content>
                <Items innerRef={scrollRef} scrollEnabled={false}>
                    {items.map(item => (
                        // TODO: entender pq ele ta dando essa trava quando vai fazer o drag
                        <PanGestureHandler
                            key={item.id}
                            onGestureEvent={event => {
                                const translationX = event.nativeEvent.translationX;
                                if (translationX > 150) onScrollToLeft();
                                else if (translationX < -150) onScrollToRight();
                                else setItemPosition(translationX * 0.8);
                            }}
                            onEnded={event => {
                                const translationX = event.nativeEvent.translationX;
                                if (translationX > 150) onScrollToLeft();
                                else if (translationX < -150) onScrollToRight();
                                else setItemPosition(0);
                            }}
                        >
                            <Item style={{ position: "relative", left: itemPosition }}>
                                <ExpenseForm
                                    control={control}
                                    viewData={item}
                                    createdAt={item.createdAt}
                                    updatedAt={item.updatedAt}
                                />
                            </Item>
                        </PanGestureHandler>
                    ))}
                </Items>
            </Content>

            <Box direction="row" alignItems="center" justifyContent="space-around" style={{ width: "100%", marginBottom: 32 }}>
                <Button empty onPress={() => onScrollToLeft(true)}>
                    <Icon group="FontAwesome" name="arrow-circle-left" color="LABEL" size={36} />
                </Button>
                <Label color="LABEL" type="NORMAL">
                    {PaginationInfo}
                </Label>
                <Button empty onPress={() => onScrollToRight(true)}>
                    <Icon group="FontAwesome" name="arrow-circle-right" color="LABEL" size={36} />
                </Button>
            </Box>
        </Container>
    );
}