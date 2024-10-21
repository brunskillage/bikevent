import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { IndexPage } from "./pages";
import { AboutPage } from "./pages/about";
import { AccountPage } from "./pages/account";
import LayoutMain from "./pages/layoutmain";
import { NotFoundPage } from "./pages/notfound";
import { SettingsPage } from "./pages/settings";
import { StatsPage } from "./pages/stats";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <LayoutMain>
              <IndexPage />
            </LayoutMain>
          }
        ></Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};
