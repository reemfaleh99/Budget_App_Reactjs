import React from "react";
import {
  createBudget,
  createExpense,
  deleteItem,
  fetchData,
} from "../util/helper";
import { Link, useLoaderData } from "react-router-dom";
import Intro from "./Intro";
import { toast } from "react-toastify";
import AddBudgetForm from "../components/AddBudgetForm";
import AddExpensesForm from "../components/AddExpensesForm";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";

export const dashboardLoader = () => {
  const userName = fetchData("userName");
  const budgets = fetchData("budgets");
  const expenses = fetchData("expenses");

  return { userName, budgets, expenses };
};

export async function dashboardAction({ request }) {
  const data = await request.formData();
  const { _action, ...value } = Object.fromEntries(data);

  if (_action === "newUser") {
    try {
      localStorage.setItem("userName", JSON.stringify(value.userName));

      return toast.success(`welcome ${value.userName}`);
    } catch (e) {
      throw new Error("there is a problem creating your account");
    }
  }

  if (_action === "createBudget") {
    try {
      createBudget({
        name: value.newBudget,
        amount: value.newBudgetAmount,
      });
      return toast.success("budget created!");
    } catch (e) {
      throw new Error("there is a problem creating your budget");
    }
  }

  if (_action === "createExpense") {
    try {
      createExpense({
        name: value.newExpense,
        amount: value.newExpenseAmount,
        budgetId: value.newExpenseBudget,
      });
      return toast.success("expense created!");
    } catch (e) {
      throw new Error("there is a problem creating your expense");
    }
  }

  if (_action === "deleteExpense") {
    try {
      deleteItem({
        key: "expenses",
        id: value.expenseId,
      });
      return toast.success("expense deleted!");
    } catch {
      throw new Error("there is a problem deleting your expense");
    }
  }
}

const Dashboard = () => {
  const { userName, budgets, expenses } = useLoaderData();

  return (
    <>
      {userName ? (
        <div className="dashboard">
          <h1>
            Welcome back <span className="accent">{userName}</span>
          </h1>
          <div className="grid-sm">
            {budgets && budgets.length > 0 ? (
              <div className="grid-lg">
                <div className="flex-lg">
                  <AddBudgetForm />
                  <AddExpensesForm budgets={budgets} />
                </div>
                <h2>Existing Budgets</h2>
                <div className="budgets">
                  {budgets.map((budg) => (
                    <BudgetItem key={budg.id} budget={budg} />
                  ))}
                </div>
                {expenses && expenses.length > 0 && (
                  <div className="grid-md">
                    <h2>Recents Expenses</h2>
                    <Table
                      expenses={expenses
                        .sort((a, b) => b.createdAt - a.createAt)
                        .slice(0, 8)}
                    />
                    {expenses.length > 8 && (
                      <Link to="expenses" className="btn btn--dark">
                        View All Expenses
                      </Link>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="grid-sm">
                <p>Personal budgeting is the secret to financial freedom</p>
                <p>Create a budget to get started</p>
                <AddBudgetForm />
              </div>
            )}
          </div>
        </div>
      ) : (
        <Intro />
      )}
    </>
  );
};

export default Dashboard;
