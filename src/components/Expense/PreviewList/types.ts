import { ExpenseItem, ExpenseItemStatus } from "../../../types/models/expenseItem";

export type PreviewListHandles = {
    open: (itemsToShow?: ExpenseItem[], typeSelected?: ExpenseItemStatus) => void;
    close: () => void;
}

export type PreviewListProps = { }