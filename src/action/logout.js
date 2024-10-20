import { redirect } from "react-router-dom";
import { deleteItem } from "../util/helper";
import { toast } from "react-toastify";

export async function logoutAction() {
  deleteItem({
    key: "userName",
  });
  deleteItem({
    key: "budgets",
  });
  deleteItem({
    key: "expenses",
  });
  toast.success("you've deleted your account");
  return redirect("/");
}
