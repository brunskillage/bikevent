import React from "react";
import { Footer } from "../components/footer";
import { TopNavbar } from "../components/topNavbar";

import "../pages/layoutMain.scss";


// this is done so the typescript compiler 
// can recognise the props children
interface LayoutProps {
  children: React.ReactNode;
}

const LayoutMain = (props: LayoutProps) => {
  return (
    <>
          <div className="right">
          <TopNavbar></TopNavbar>
          <div className="mainContent">{props.children}</div>
        </div>

      <Footer></Footer>
    </>
  );
};

export default LayoutMain;
