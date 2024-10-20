import React from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import Navbar from "../components/Navbar";

import wave from "../assets/wave.svg";
import { fetchData } from "../util/helper";

export function mainLoader() {
  const userName = fetchData("userName");
  return { userName };
}

const Main = () => {
  const { userName } = useLoaderData();
  return (
    <div className="layout">
      <Navbar userName={userName} />
      <main>
        <Outlet />
      </main>
      <img src={wave} alt="" />
    </div>
  );
};

export default Main;
