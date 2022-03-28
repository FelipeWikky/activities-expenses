import { ExpenseItem } from "../../../types/models/expenseItem";

export type TextProps = {
    finished?: boolean;
}

export type CheckerProps = {
    checked?: boolean;
    error?: boolean;
}

export type ItemProps = {
    data: ExpenseItem;
    actions?: ItemActions;
}

export type ItemActions = {
    onSelect?: (item: ExpenseItem) => void;
    onRemove?: (item: ExpenseItem) => void;
    onAddError?: (item: ExpenseItem) => void;
    onFinish?: (item: ExpenseItem) => void;
}