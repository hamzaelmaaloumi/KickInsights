import { createBrowserRouter } from "react-router-dom";
import GuestHome from "../pages/Home/GuestHome";
import Login from "../pages/Login-Sign/Login";
import UserSignUp from "../pages/Login-Sign/UserSignUp";
import ManagerSignUp from "../pages/Login-Sign/ManagerSignUp";
import NotFound from "../components/NotFound";
import Layout from "../pages/Layout";
import DashboardLayout from "../pages/Admin/DashboardLayout";
import Players from "../pages/Admin/Players";

export const routers = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <GuestHome />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/manager-sign-up",
        element: <ManagerSignUp />,
      },
      {
        path: "/user-sign-up",
        element: <UserSignUp />, ///
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    element: <DashboardLayout />,
    children: [
      {
        path: "/admin/players",
        element: <Players />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
