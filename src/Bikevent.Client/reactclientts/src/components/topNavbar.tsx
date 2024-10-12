import React from "react";
import { NavLink } from "react-router-dom";
import "../pages/layoutMain.scss";
import User1 from "./../img/userImg.svg";
import Settings1 from "./../img/settings1.svg";

export const TopNavbar = () => {
  return (
    <>
      <div className="navbar">
        <div className="left">
          <span className="logo">Bikevent</span>
          <NavLink to="/rides">RIDES</NavLink>
        </div>
        <div className="right">
          <NavLink to="/account">
            <div className="iconSmall">
              <User1 />
            </div>
          </NavLink>
          <NavLink to="/settings">
            <div className="iconSmall">
              <Settings1 />
            </div>
          </NavLink>
        </div>
      </div>
    </>
  );
};
