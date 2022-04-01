import React, { createContext, useCallback, useEffect, useState } from "react";
import { ExpenseFilter, ExpenseService } from "../../services/expense.service";
import { ExpenseItem } from "../../types/models/expenseItem";
import { ExpenseContext as ExpenseContextType } from "./types";

const ExpenseContext = createContext<ExpenseContextType>({} as ExpenseContextType);

export const ExpenseProvider: React.FC = ({ children }) => {
    const [items, setItems] = useState<ExpenseItem[]>([]);
    const [loadingItems, setLoadingItems] = useState(false);

    const [refetchItems, setRefetchItems] = useState(false);
    const onRefetchItems = useCallback(() => {
        setRefetchItems(prev => !prev);
    }, []);

    const onChangeItems = useCallback((items: ExpenseItem[]) => {
        setItems(items);
    }, []);

    const onGetAllItems = useCallback(async (callback?: Function) => {
        try {
            setLoadingItems(true);
            const gettedItems = await ExpenseService.getAll();
            if (gettedItems && gettedItems.length > 0) {
                setItems(gettedItems);
            }
            if (callback) callback();
        }
        catch (error) {
        }
        finally {
            setLoadingItems(false);
        }
    }, []);

    useEffect(() => {
        onGetAllItems();
    }, [refetchItems]);

    return (
        <ExpenseContext.Provider
            value={{
                items, onChangeItems, loadingItems, onGetAllItems, onRefetchItems
            }}
        >
            {children}
        </ExpenseContext.Provider>
    );
};

export default ExpenseContext;