import { toast } from "react-toastify";
import { deleteItem, getAllMatchingItems } from "../util/helper";
import { redirect } from "react-router-dom";

export const deleteBudget = ({ params }) => {
  try {
    deleteItem({
      key: "budgets",
      id: params.id,
    });

    const associatedExpenses = getAllMatchingItems({
      category: "expenses",
      key: "budgetId",
      value: params.id,
    });

    associatedExpenses.forEach((expense) => {
      deleteItem({
        key: "expenses",
        id: expense.id,
      });
    });
    toast.success("deleted successfully");
  } catch (e) {
    throw new Error("failed");
  }

  return redirect("/");
};
