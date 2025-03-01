import { createBrowserRouter } from "react-router-dom";
import GuestHome from "../pages/Home/GuestHome";
import Login from "../pages/Login-Sign/Login";
import UserSignUp from "../pages/Login-Sign/UserSignUp";
import ManagerSignUp from "../pages/Login-Sign/ManagerSignUp";
import NotFound from "../components/NotFound";
import Layout from "../pages/Layout";
import DashboardLayout from "../pages/Admin/DashboardLayout";
import Players from "../pages/Admin/Players";
import Leagues from "../pages/Admin/Leagues";
import Teams from "../pages/Admin/Teams";
import Dashboard from "../pages/Admin/Dashboard";
import Managers from "../pages/Admin/Managers";
import Squad from "../pages/Manager/Squad";
import Match from "../pages/Match/Match";
import Stats from "../pages/Match/Stats";

export const routers = createBrowserRouter([
  {
    element: <Layout />,
    path: "/",
    children: [
      {
        index: true,
        element: <GuestHome />,
      },
      {
        path: "match",
        element: <Match />,
      },
      {
        path: "stats/:matchId",
        element: <Stats />,
      },
      {
        path: "squad",
        element: <Squad />,
      },
      { path: "/squad", element: <Squad /> },
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
        path: "/admin/leagues",
        element: <Leagues />,
      },
      {
        path: "/admin/teams",
        element: <Teams />,
      },
      {
        path: "/admin/managers",
        element: <Managers />,
      },
      {
        path: "/admin/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/admin/*",
        element: <NotFound />,
      },
    ],
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
]);
