import { useContext } from "react";
import ExpenseContext from "./";

export const useExpenseContext = () => {
  const context = useContext(ExpenseContext);
  return context;
};
