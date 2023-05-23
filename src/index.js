import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { PaymentProvider } from "./contextAPI/PaymentContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <PaymentProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
      </Routes>
    </BrowserRouter>
  </PaymentProvider>
);

reportWebVitals();
