import React, { useEffect, useState, useRef, useCallback } from "react";

import { Container, Loading, EachItemList, Header, HeaderContent, PlusIcon } from "./styles";

import { items as MOCK_ITEMS } from "../../../services/mock";
import { ExpenseItem } from "../../../types/models/expenseItem";
import { EachItem } from "../EachItem";
import { Label } from "../../Label";
import { formatDate } from "../../../utils/format";
import { DetailExpense, DetailExpenseHandles } from "../DetailExpense";
import { useExpenseContext } from "../../../contexts/expense/hook";
import { Button } from "../../Button";

export const ListItem: React.FC = () => {
    const { items: expenseItems } = useExpenseContext();

    const [items, setItems] = useState<ExpenseItem[]>(expenseItems);
    const [itemSelected, setItemSelected] = useState<ExpenseItem>();
    const [fetchingItems, setFetchingItems] = useState(false);


    // useEffect(() => {
    //     async function handleGetItems() {
    //         try {
    //             setFetchingItems(true);
    //             setItems([]);
    //             const data = await getItems();
    //             setItems(data);
    //         } catch (error) {
    //             setItems([]);
    //         } finally {
    //             setFetchingItems(false);
    //         }
    //     }
    //     handleGetItems();
    // }, []);

    const detailRef = useRef<DetailExpenseHandles>(null);

    const onSelectItemFromList = useCallback((item: ExpenseItem) => {
        setItemSelected(item);
        detailRef?.current?.open();
    }, [detailRef]);

    const onAddNewItemToList = useCallback(() => {
        detailRef?.current?.open();
    }, [detailRef]);

    return (
        <Container>
            <DetailExpense
                ref={detailRef}
                data={itemSelected}
                onlyView={false}
                onSave={item => console.log('save' , item)}
            />

            <Header>
                <Button empty onPress={onAddNewItemToList}>
                    <PlusIcon />
                </Button>

                <HeaderContent>
                    <Label type="SUB_TITLE">
                        Atividade
                    </Label>
                    <Label type="NORMAL_SMALL" style={{ marginBottom: 3 }}>
                        {" "} {formatDate(new Date())}
                    </Label>
                </HeaderContent>

                <Button empty onPress={onAddNewItemToList}>
                    <PlusIcon />
                </Button>
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