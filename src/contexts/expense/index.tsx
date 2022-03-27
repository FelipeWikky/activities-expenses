import React, { createContext, useState } from "react";
import { ExpenseItem } from "../../types/models/expenseItem";
import { ExpenseContext as ExpenseContextType } from "./types";

const ExpenseContext = createContext<ExpenseContextType>({} as ExpenseContextType);

export const ExpenseProvider: React.FC = ({ children }) => {
    const [expenseItems, setExpenseItems] = useState<ExpenseItem[]>();

    return (
        <ExpenseContext.Provider
            value={{
                items: expenseItems
            }}
        >
            {children}
        </ExpenseContext.Provider>
    );
};

export default ExpenseContext;