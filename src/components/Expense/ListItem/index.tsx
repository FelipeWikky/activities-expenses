import React, { useEffect, useState, useRef, useCallback } from "react";
import Animated, { withTiming, useSharedValue, useAnimatedStyle } from "react-native-reanimated";

import {
    Container, Loading, EachItemList, Header, HeaderContent, PlusIcon,
    FilterIndicatorIcon, EmptyContainer, EmptyLabel
} from "./styles";

import { ExpenseItem } from "../../../types/models/expenseItem";
import { EachItem } from "../EachItem";
import { Label } from "../../Label";
import { formatDate } from "../../../utils/format";
import { DetailExpense, DetailExpenseHandles } from "../DetailExpense";
import { Button } from "../../Button";
import { ExpenseFilter, ExpenseService } from "../../../services/expense.service";
import { sortByDate } from "../../../utils/sort";
import { Constants } from "../../../utils/constants";
import { FilterList } from "../FilterList";
import { isEmpty } from "../../../utils";
import { useToast } from "../../../hooks/useToast";
import { useTranslation } from "../../../hooks/useTranslation";

export const ListItem: React.FC = () => {
    const toast = useToast();
    const { t } = useTranslation();

    const [_, setRootItems] = useState<ExpenseItem[]>([]);
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
            toast.show(t("success.create"), toast.STATUS.SUCCESS);
            detailRef?.current?.close();
            getAllExpenseItems();
        }
        else {
            toast.show(t("error.create"), toast.STATUS.ERROR);
        }
    }, []);
    const onUpdateExpenseItem = useCallback(async (item: ExpenseItem) => {
        const saved = await ExpenseService.update(item);
        if (saved) {
            toast.show(t("success.update"), toast.STATUS.SUCCESS);
            detailRef?.current?.close();
            getAllExpenseItems();
        }
        else {
            toast.show(t("error.update"), toast.STATUS.ERROR);
        }
    }, []);

    const onCancelDetailExpense = useCallback(() => {
        setItemSelected(undefined);
        detailRef?.current?.close();
    }, []);

    const onRemoveItemFromList = useCallback(async (item: ExpenseItem) => {
        const removed = await ExpenseService.remove(item);
        if (removed) {
            toast.show(t("success.delete"), toast.STATUS.SUCCESS);
            getAllExpenseItems();
        }
        else {
            toast.show(t("error.delete"), toast.STATUS.ERROR);
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
                        {t("label.activity")}
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
                    <EmptyContainer>
                        <EmptyLabel>{t("label.list.empty")}</EmptyLabel>
                    </EmptyContainer>
                )}
            />
        </Container>
    );
}