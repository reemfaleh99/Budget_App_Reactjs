import React from "react";
import { Form, NavLink } from "react-router-dom";

import logomark from "../assets/logomark.svg";
import { TrashIcon } from "@heroicons/react/16/solid";

const Navbar = ({ userName }) => {
  return (
    <nav>
      <NavLink to="/">
        <img src={logomark} alt="" />
        <h3>HomeBudget</h3>
      </NavLink>

      {userName && (
        <Form
          method="post"
          action="logout"
          onSubmit={(e) => {
            if (!window.confirm("Delete user and all data?")) {
              e.preventDefault();
            }
          }}
        >
          <button className="btn btn--warning" type="submit">
            <span>Delete User</span>
            <TrashIcon width={20} />
          </button>
        </Form>
      )}
    </nav>
  );
};

export default Navbar;
