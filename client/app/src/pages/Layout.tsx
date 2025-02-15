import React from "react";
import UserNavBar from "../components/Navbar/UserNavBar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <UserNavBar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
