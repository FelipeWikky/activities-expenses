import { useContext } from "react";
import ExpenseContext from "./";

export const useExpense = () => {
  const context = useContext(ExpenseContext);
  return context;
};
