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
    onSelectItem?: (item: ExpenseItem) => void;
}