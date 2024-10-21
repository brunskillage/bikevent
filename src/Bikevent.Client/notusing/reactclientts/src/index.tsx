import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
// https://reactstrap.github.io/
import "bootstrap/dist/css/bootstrap.min.css";

//https://fkhadra.github.io/react-toastify/introduction
import "react-toastify/dist/ReactToastify.css";

import "./font/Yummyline.woff";
import { ToastContainer } from "react-toastify";


const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <App />
  </React.StrictMode>
);
