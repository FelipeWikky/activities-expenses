import React, { useEffect, useState, useRef, useCallback } from "react";

import { Container, Loading, EachItemList, Header, HeaderContent, PlusIcon } from "./styles";

import { ExpenseItem } from "../../../types/models/expenseItem";
import { EachItem } from "../EachItem";
import { Label } from "../../Label";
import { formatDate } from "../../../utils/format";
import { DetailExpense, DetailExpenseHandles } from "../DetailExpense";
import { useExpenseContext } from "../../../contexts/expense/hook";
import { Button } from "../../Button";
import { ExpenseService } from "../../../services/expense.service";
import { Alert } from "react-native";
import { sortByDate } from "../../../utils/sort";

export const ListItem: React.FC = () => {
    const { items: expenseItems } = useExpenseContext();

    const [items, setItems] = useState<ExpenseItem[]>(expenseItems);
    const [itemSelected, setItemSelected] = useState<ExpenseItem>();
    const [fetchingItems, setFetchingItems] = useState(false);

    const getAllExpenseItems = useCallback(async () => {
        setItems([]);
        setFetchingItems(true);
        const expenseItems = await ExpenseService.getAll();
        if (expenseItems) {
            setTimeout(() => {
                setItems(expenseItems)
                setFetchingItems(false);
            }, 2500);
        }
    }, []);

    useEffect(() => {
        getAllExpenseItems();
    }, []);

    const detailRef = useRef<DetailExpenseHandles>(null);

    const onSelectItemFromList = useCallback((item: ExpenseItem) => {
        setItemSelected(item);
        detailRef?.current?.open();
    }, [detailRef]);

    const onAddNewItemToList = useCallback(() => {
        detailRef?.current?.open();
    }, [detailRef]);

    const onSaveNewExpenseItem = useCallback(async (item: ExpenseItem) => {
        if (item?.id) onUpdateExpenseItem(item)
        else onCreateExpenseItem(item);
    }, []);

    const onCreateExpenseItem = useCallback(async (item: ExpenseItem) => {
        const saved = await ExpenseService.create(item);
        if (saved) {
            Alert.alert("Criação", "Criado com sucesso");
            detailRef?.current?.close();
            getAllExpenseItems();
        }
        else {
            Alert.alert("Criação", "Erro ao criar");
        }
    }, []);
    const onUpdateExpenseItem = useCallback(async (item: ExpenseItem) => {
        const saved = await ExpenseService.update(item);
        if (saved) {
            Alert.alert("Atualização", "Atualizado com sucesso");
            detailRef?.current?.close();
            getAllExpenseItems();
        }
        else {
            Alert.alert("Atualização", "Erro ao Atualizado");
        }
    }, []);

    const onCancelDetailExpense = useCallback(() => {
        setItemSelected(undefined);
        detailRef?.current?.close();
    }, []);

    const onRemoveItemFromList = useCallback((item: ExpenseItem) => {
        const removed = ExpenseService.remove(item);
        if (removed) {
            Alert.alert("Delete", "Deletado com sucesso");
            getAllExpenseItems();
        }
        else {
            Alert.alert("Delete", "Erro ao deletar");
        }
    }, []);

    return (
        <Container>
            <DetailExpense
                ref={detailRef}
                data={itemSelected}
                onlyView={false}
                onSave={onSaveNewExpenseItem}
                onCancel={onCancelDetailExpense}
                onCloseModal={() => setItemSelected(undefined)}
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
                data={sortByDate<ExpenseItem>(items, 'updatedAt')}
                keyExtractor={item => item.id ? item.id.toString() : item.title}
                renderItem={({ item }) => (
                    <EachItem
                        data={item}
                        onSelectItem={onSelectItemFromList}
                        onRemoveItem={onRemoveItemFromList}
                    />
                )}
            />
        </Container>
    );
}