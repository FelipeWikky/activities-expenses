import React, { useEffect, useState, useRef, useCallback } from "react";
import Animated, { withTiming, useSharedValue, useAnimatedStyle } from "react-native-reanimated";

import {
    Container, EachItemList, Header, HeaderContent, PlusIcon,
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
import { useTranslation } from "../../../contexts/translation/useTranslation";
import { Loading } from "../../Loading";
import { useExpense } from "../../../contexts/expense/useExpense";
import { Line } from "../../../layout/Line";

type ListItemsProps = {
    fromItems?: ExpenseItem[];
}

export const ListItem: React.FC<ListItemsProps> = ({ fromItems }) => {
    const toast = useToast();
    const { t } = useTranslation();
    const { items: expenseItems, loadingItems, onRefetchItems } = useExpense();

    const [items, setItems] = useState<ExpenseItem[]>(fromItems || []);
    const [itemSelected, setItemSelected] = useState<ExpenseItem>();

    useEffect(() => {
        if (expenseItems && !fromItems) setItems(expenseItems);
    }, [expenseItems, fromItems]);

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
            onRefetchItems();
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
            onRefetchItems();
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
            onRefetchItems();
        }
        else {
            toast.show(t("error.delete"), toast.STATUS.ERROR);
        }
    }, []);

    const onFinishItem = useCallback(async (item: ExpenseItem) => {
        item.finished = true;
        const updated = await ExpenseService.update(item);
        if (updated) onRefetchItems();
    }, []);
    const onAddErrorItem = useCallback(async (item: ExpenseItem) => {
        item.hasError = true;
        const updated = await ExpenseService.update(item);
        if (updated) onRefetchItems();
    }, []);

    const [filterShowed, setFilterShowed] = useState(false);
    const handleShowFilter = useCallback(() => setFilterShowed(prev => !prev), []);

    const filterHeight = useSharedValue(0);
    const filterDisplay = useSharedValue<number | "none" | "flex">("none");

    const filterStyles = useAnimatedStyle(() => ({
        display: filterDisplay.value,
        height: withTiming(filterHeight.value, {
            duration: 500, easing: Constants.BEZIER
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
            }, 350);
        }
    }, [filterShowed]);

    const [filters, setFilters] = useState<ExpenseFilter>({} as ExpenseFilter);

    useEffect(() => {
        async function listWithQuery() {
            if (!filters || isEmpty(filters)) {
                onRefetchItems();
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

            {!(fromItems) && (
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
            )}

            {!(fromItems) && (
                <Animated.View style={filterStyles}>
                    <FilterList
                        handleFilter={setFilters}
                    />
                </Animated.View>
            )}

            {(loadingItems && !(fromItems)) && <Loading />}
            <EachItemList
                data={sortByDate<ExpenseItem>(items, !!(fromItems) ? "id" : "updatedAt")}
                keyExtractor={item => item.id ? item.id.toString() : item.title}
                renderItem={({ item, index }) => (
                    <>
                        <EachItem
                            data={item}
                            actions={{
                                onSelect: onSelectItemFromList,
                                onRemove: onRemoveItemFromList,
                                onAddError: onAddErrorItem,
                                onFinish: onFinishItem
                            }}
                        />
                        <Line shadow={2} />
                    </>
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