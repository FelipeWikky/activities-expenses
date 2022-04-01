import { Text } from "native-base";

import { Container, Header, HeaderContent, Content, Footer, Item, Items } from "./styles";

import { Label } from "../../components/Label";
import { useTranslation } from "../../contexts/translation/useTranslation";
import { formatDate } from "../../utils/format";
import { ExpenseForm } from "../../components/Expense/ExpenseForm";
import { useForm } from "react-hook-form";
import { ExpenseItem } from "../../types/models/expenseItem";
import { useEffect, useMemo, useRef, useState } from "react";
import { ExpenseService } from "../../services/expense.service";
import { Dimensions, ScrollView } from "react-native";
import { Button } from "../../components/Button";
import { Icon } from "../../components/Icon";
import { Box } from "../../layout/Box";
import { useExpense } from "../../contexts/expense/useExpense";


export const Diary: React.FC = () => {
    const { t } = useTranslation();
    const { items } = useExpense();
    const { control } = useForm<ExpenseItem>();


    const WIDTH = useMemo(() => Number(Dimensions.get("window").width) * 0.75, [Dimensions]);
    const scrollRef = useRef<ScrollView>(null);
    const [scrollPressed, setScrollPressed] = useState(0);

    const onScrollToDown = () => {
        if (scrollPressed === 0) {
            setScrollPressed(items.length - 1);
            const x = ((WIDTH + 100) * ((items.length - 1) + 1));
            scrollRef.current?.scrollTo({ x, animated: true });
        }
        else {
            setScrollPressed(prev => prev - 1);
            const x = ((WIDTH + 100) * (scrollPressed - 1));

            scrollRef.current?.scrollTo({ x: x, animated: true });
        }
    }

    const onScrollToUp = () => {
        if (scrollPressed === items.length - 1) {
            setScrollPressed(0);
            scrollRef.current?.scrollTo({ x: 0, animated: true });
        }
        else {
            setScrollPressed(prev => prev + 1);
            const x = ((WIDTH + 100) * (scrollPressed + 1));

            scrollRef.current?.scrollTo({ x, animated: true });
        }
    }

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
                        <Item key={item.id}>
                            <ExpenseForm
                                control={control}
                                viewData={item}
                                createdAt={item.createdAt}
                                updatedAt={item.updatedAt}
                            />
                        </Item>
                    ))}
                </Items>
            </Content>

            <Box direction="row" alignItems="center" justifyContent="space-around" style={{ width: "100%", marginBottom: 32 }}>
                <Button empty onPress={onScrollToDown}>
                    <Icon group="FontAwesome" name="arrow-circle-left" color="LABEL" size={36} />
                </Button>
                <Label color="LABEL" type="NORMAL">
                    {PaginationInfo}
                </Label>
                <Button empty onPress={onScrollToUp}>
                    <Icon group="FontAwesome" name="arrow-circle-right" color="LABEL" size={36} />
                </Button>
            </Box>
        </Container>
    );
}