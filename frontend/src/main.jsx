import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import Home from "./pages/home/home";
import AllPets from "./pages/allPets/allPets";
import PetsDescription from "./pages/petsDescription/petsDescription";
import CreatePets from "./dashboard/dashboardPages/createPets/createPets";
import Favourites from "./pages/favourites/favourites";
import DashboardHome from "./dashboard/dashboardPages/dashboardHome/dashboardHome";
import EditPets from "./dashboard/dashboardPages/editPets/editPets";
import DashboardPets from "./dashboard/dashboardPages/dashboardPets/dashboardPets";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/favourites",
    element: <Favourites />,
  },
  {
    path: "/create",
    element: <CreatePets />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },

  {
    path: "/allPets",
    element: <AllPets />,
  },
  {
    path: "/petDescription/:id",
    element: <PetsDescription />,
  },
  {
    path: "/dashboard",
    element: <DashboardHome />,
  },
  {
    path: "/managepets",
    element: <DashboardPets />,
  },
  {
    path: "/editPets/:id",
    element: <EditPets />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
