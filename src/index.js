import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import Receive from "./pages/Receive/Receive";

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     [<Route path="/" element={<div>Test</div>}/>,
//     <Route path="/receive" element={<Receive />} />
//     //<Route path="/send" element={<Assistant />} />
//   ]
//   )
// );
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // // <React.StrictMode>
  //   <RouterProvider router={router} />
  // // </React.StrictMode>
  <Receive/>
);
