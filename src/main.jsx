import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './index.css'

import Root from "./routes/root";
import List from "./routes/list";
import Create from "./routes/create";
import Show from "./routes/show";
import Edit from "./routes/edit";
import ErrorPage from "./error-page";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <List />
      },
      {
        path: "/create",
        element: <Create />
      },
      {
        path: "/:id",
        element: <Show />
      },
      {
        path: "/:id/edit",
        element: <Edit />
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
