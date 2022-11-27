import React from "react";
import ReactDOM from "react-dom/client";
import { Header } from "./header";
import "./css/output.css";
import { Body } from "./body";
import { Footer } from "./footer";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <div className="font-sans ">
      <Header />
      <Body />
      <Footer />
    </div>
  </React.StrictMode>
);
