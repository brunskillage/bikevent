import React from "react";
import "../pages/layoutMain.scss";
import Home1 from "./../img/Home1.svg";
import List1 from "./../img/List1.svg";
import Dashboard1 from "./../img/Dashboard1.svg";
import { NavLink } from "react-router-dom";

export const SideNavBar = () => {
  return (
    <>
      <div className="sideNavBar">
        <NavLink to="/">
          <div className="iconSmall">
            <Home1 />
            <div className="txt">HOME</div>
          </div>
        </NavLink>

        <div className="spacer"></div>
        <hr />

        <NavLink to="/adduser">
          <div className="iconSmall">
            <div className="txt">RIDES</div>
          </div>
        </NavLink>
      </div>
    </>
  );
};
