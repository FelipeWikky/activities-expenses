import { ExpenseItem } from "../../types/models/expenseItem"

export type ExpenseContext = {
    items: ExpenseItem[];
    onChangeItems: (items: ExpenseItem[]) => void;
    onGetAllItems: () => Promise<void>;
    onRefetchItems: () => void;
    loadingItems: boolean;
}