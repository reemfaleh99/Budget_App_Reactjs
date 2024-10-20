import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main, { mainLoader } from "./layout/Main";
import Dashboard, { dashboardAction, dashboardLoader } from "./page/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { logoutAction } from "./action/logout";
import ExpenesesPage, { expensesLoader } from "./page/ExpenesesPage";
import BudgetPage, { budgetAction, budgetLoader } from "./page/BudgetPage";
import { deleteBudget } from "./action/deleteBudget";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    loader: mainLoader,
    children: [
      {
        index: true,
        element: <Dashboard />,
        loader: dashboardLoader,
        action: dashboardAction,
      },
      {
        path: "expenses",
        element: <ExpenesesPage />,
        loader: expensesLoader,
      },
      {
        path: "logout",
        action: logoutAction,
      },
      {
        path: "budget/:id",
        element: <BudgetPage />,
        loader: budgetLoader,
        action: budgetAction,
        children: [
          {
            path: "delete",
            action: deleteBudget,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}

export default App;
