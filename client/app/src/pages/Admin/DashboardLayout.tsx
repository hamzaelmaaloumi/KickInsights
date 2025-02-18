import React from "react";
import Sidebar from "../../components/Dashboard/Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <>
      <Sidebar />
      <div className="sm:ml-64">
        <div className="mt-14">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
