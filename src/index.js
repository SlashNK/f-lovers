import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Receive from "./pages/Receive/Receive";
import Send from "./pages/Send/Send";
import { GENERAL_PREFIX } from "./shared/constants";

ReactDOM.render(
  <BrowserRouter basename={GENERAL_PREFIX}>
    <Routes>
      <Route path="/receive" element={<Receive />} />
      <Route path="/send" element={<Send />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
