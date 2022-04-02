export interface ExpenseItem {
    /**
     * Unique property for identification of object
     */
    id?: string | number;
    /**
     * Title of item
     */
    title: string;
    /**
     * Description of item
     */
    description?: string;
    /**
     * Is used to indicate of item has finished
     */
    finished?: boolean;
    /**
     * Is used to indicate of item has a problem or error
     */
    hasError?: boolean;
    /**
     * Any comment for this expense item
     */
    comment?: string;
    /**
     * Created date on storage
     */
    createdAt?: string | Date;
    /**
     * Update date on storage
     */
    updatedAt?: string | Date;
    /**
     * Represente any date to indicate when this item has occurred
     */
    whenAt?: string | Date;
    /**
     * Indicate if this expense item is monthly
     */
    isMonthly?: boolean;
}

export enum ExpenseItemStatus {
    PENDING = "Pending", FINISHED = "Finished", PROBLEM = "Problem"
}