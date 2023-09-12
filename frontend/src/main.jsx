import React from "react";
import ReactDOM from "react-dom/client";
import EditTagPage from "./EditTagPage.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { InsertData } from "./Admin/Insert.jsx";
import AddQuestionData from "./Admin/AddQuestionData.jsx";
import UserContent from "./components/User.jsx";

const router = createBrowserRouter([
  {
    path: "/admin/",
    element: <EditTagPage />,
  },
  {
    path: "/admin/add/",
    element: <AddQuestionData />,
  },
  {
    path: "/",
    element: <UserContent />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
