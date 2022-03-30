import React, { useEffect, useState, useRef, useCallback } from "react";
import Animated, { withTiming, useSharedValue, useAnimatedStyle } from "react-native-reanimated";

import {
    Container, Loading, EachItemList, Header, HeaderContent, PlusIcon,
    FilterIndicatorIcon
} from "./styles";

import { ExpenseItem } from "../../../types/models/expenseItem";
import { EachItem } from "../EachItem";
import { Label } from "../../Label";
import { formatDate } from "../../../utils/format";
import { DetailExpense, DetailExpenseHandles } from "../DetailExpense";
import { Button } from "../../Button";
import { ExpenseFilter, ExpenseService } from "../../../services/expense.service";
import { Alert, Text, View } from "react-native";
import { sortByDate } from "../../../utils/sort";
import { Constants } from "../../../utils/constants";
import { FilterList } from "../FilterList";
import { isEmpty } from "../../../utils";
import { useToast } from "../../../hooks/useToast";

export const ListItem: React.FC = () => {
    const toast = useToast();

    const [rootItems, setRootItems] = useState<ExpenseItem[]>([]);
    const [items, setItems] = useState<ExpenseItem[]>([]);
    const [itemSelected, setItemSelected] = useState<ExpenseItem>();
    const [fetchingItems, setFetchingItems] = useState(false);

    const getAllExpenseItems = useCallback(async () => {
        setItems([]);
        setFetchingItems(true);
        const expenseItems = await ExpenseService.getAll();
        if (expenseItems) {
            setItems(expenseItems);
            setRootItems(expenseItems);
            setFetchingItems(false);
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
            toast.show("Atualizado com sucesso", "success");
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

    const onRemoveItemFromList = useCallback(async (item: ExpenseItem) => {
        const removed = await ExpenseService.remove(item);
        if (removed) {
            getAllExpenseItems();
        }
        else {
            Alert.alert("Delete", "Erro ao deletar");
        }
    }, []);

    const onFinishItem = useCallback(async (item: ExpenseItem) => {
        item.finished = true;
        const updated = await ExpenseService.update(item);
        if (updated) getAllExpenseItems();
    }, []);
    const onAddErrorItem = useCallback(async (item: ExpenseItem) => {
        item.hasError = true;
        const updated = await ExpenseService.update(item);
        if (updated) getAllExpenseItems();
    }, []);

    const [filterShowed, setFilterShowed] = useState(false);
    const handleShowFilter = useCallback(() => setFilterShowed(prev => !prev), []);

    const filterHeight = useSharedValue(0);
    const filterDisplay = useSharedValue<number | "none" | "flex">("none");
    const filterStyles = useAnimatedStyle(() => ({
        display: filterDisplay.value,
        height: withTiming(filterHeight.value, {
            duration: 600, easing: Constants.BEZIER
        }),
        width: "100%",
        marginBottom: 16
    }));
    useEffect(() => {
        if (filterShowed) {
            filterHeight.value = 40;
            filterDisplay.value = "flex";
        } else {
            filterHeight.value = 0;
            setTimeout(() => {
                filterDisplay.value = "none";
            }, 500);
        }
    }, [filterShowed]);

    const [filters, setFilters] = useState<ExpenseFilter>({} as ExpenseFilter);

    useEffect(() => {
        async function listWithQuery() {
            if (!filters || isEmpty(filters)) {
                getAllExpenseItems();
            } else {
                const filtereds = await ExpenseService.getWithFilter(filters);
                if (filtereds) setItems(filtereds);
            }
        }
        listWithQuery();
    }, [filters]);

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

                <Button empty onPress={handleShowFilter}>
                    <FilterIndicatorIcon name={filterShowed ? "arrow-circle-up" : "arrow-circle-down"} />
                </Button>
            </Header>

            <Animated.View style={filterStyles}>
                <FilterList
                    handleFilter={setFilters}
                />
            </Animated.View>

            {fetchingItems && <Loading />}
            <EachItemList
                data={sortByDate<ExpenseItem>(items, 'updatedAt')}
                keyExtractor={item => item.id ? item.id.toString() : item.title}
                renderItem={({ item }) => (
                    <EachItem
                        data={item}
                        actions={{
                            onSelect: onSelectItemFromList,
                            onRemove: onRemoveItemFromList,
                            onAddError: onAddErrorItem,
                            onFinish: onFinishItem
                        }}
                    />
                )}
                ListEmptyComponent={() => (
                    <View>
                        <Text>Registros não encontrados</Text>
                    </View>
                )}
            />
        </Container>
    );
}