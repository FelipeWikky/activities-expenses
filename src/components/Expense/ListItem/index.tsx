import React, { useEffect, useState, useRef, useCallback } from "react";

import { Container, Loading, EachItemList, Header } from "./styles";

import { items as MOCK_ITEMS } from "../../../services/mock";
import { ExpenseItem } from "../../../types/models/expenseItem";
import { EachItem } from "../EachItem";
import { Label } from "../../Label";
import { formatDate } from "../../../utils/format";
import { DetailExpense, DetailExpenseHandles } from "../DetailExpense";

export const ListItem: React.FC = () => {
    const [items, setItems] = useState<ExpenseItem[]>([]);
    const [itemSelected, setItemSelected] = useState<ExpenseItem>();
    const [fetchingItems, setFetchingItems] = useState(false);

    useEffect(() => {
        async function handleGetItems() {
            try {
                setFetchingItems(true);
                setItems([]);
                const data = await getItems();
                setItems(data);
            } catch (error) {
                setItems([]);
            } finally {
                setFetchingItems(false);
            }
        }
        handleGetItems();
    }, []);

    const detailRef = useRef<DetailExpenseHandles>(null);

    const onSelectItemFromList = useCallback((item: ExpenseItem) => {
        setItemSelected(item);
        detailRef?.current?.open();
    }, []);

    return (
        <Container>
            <DetailExpense
                ref={detailRef}
                data={itemSelected}
                onlyView={false}
            />

            <Header>
                <Label type="SUB_TITLE">
                    Atividade
                </Label>
                <Label type="NORMAL_SMALL" style={{ marginBottom: 3 }}>
                    {" "} {formatDate(new Date())}
                </Label>
            </Header>

            {fetchingItems && <Loading />}
            <EachItemList
                data={items}
                keyExtractor={item => item.id ? item.id.toString() : item.title}
                renderItem={({ item, }) => <EachItem data={item} onSelectItem={onSelectItemFromList} />}
            />
        </Container>
    );
}

async function getItems() {
    return new Promise<ExpenseItem[]>((resolve, reject) => {
        setTimeout(() => {
            resolve(MOCK_ITEMS)
        }, 1500);
    });
}