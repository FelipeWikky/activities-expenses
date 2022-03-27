export interface ExpenseItem {
    id?: string | number;
    title: string;
    description?: string;
    finished?: boolean;
    hasError?: boolean;
    comment?: string;
    createdAt?: string | Date;
}