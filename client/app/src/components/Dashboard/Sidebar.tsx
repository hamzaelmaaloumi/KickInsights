import flag from "../../assets/icon.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import SportsSoccerRoundedIcon from "@mui/icons-material/SportsSoccerRounded";
import DataUsageRoundedIcon from "@mui/icons-material/DataUsageRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import SubjectRoundedIcon from "@mui/icons-material/SubjectRounded";
import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                data-drawer-target="#logo-sidebar"
                onClick={toggleSidebar}
                data-drawer-toggle="#logo-sidebar"
                aria-controls="#logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <SubjectRoundedIcon />
              </button>
              <a href="https://flowbite.com" className="flex ms-2 md:me-24">
                <img src={flag} className="h-8 me-3" alt="KickInsights Logo" />
                <span className="self-center text-xl font-manrope text-white font-[900] sm:text-2xl whitespace-nowrap dark:text-white">
                  KICK-INSIGHTS
                </span>
              </a>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ms-3">
                <div>
                  <button
                    type="button"
                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    data-dropdown-toggle="dropdown-user"
                    aria-expanded={isProfileOpen ? "true" : "false"}
                    onClick={toggleProfile}
                  >
                    <span className="sr-only">Open user menu</span>
                    <AccountCircleRoundedIcon className="text-white" />
                  </button>
                </div>
                <div
                  className={`z-50 hidden my-4 text-base list-none transition-all duration-200 ${
                    isProfileOpen ? "" : "-translate-y-full"
                  } bg-white divide-y divide-gray-100 rounded-sm shadow-sm dark:bg-gray-700 dark:divide-gray-600`}
                  id="dropdown-user"
                >
                  <div className="px-4 py-3" role="none">
                    <p
                      className="text-sm text-gray-900 dark:text-white"
                      role="none"
                    >
                      Neil Sims
                    </p>
                    <p
                      className="text-sm font-manrope font-medium text-gray-900 truncate dark:text-gray-300"
                      role="none"
                    >
                      neil.sims@flowbite.com
                    </p>
                  </div>
                  <ul className="py-1" role="none">
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Dashboard
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Settings
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Earnings
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Sign out
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${
          isSidebarOpen ? "" : "-translate-x-full"
        } bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-manrope font-medium">
            <li>
              <Link
                to="admin/dashboard"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <DashboardRoundedIcon />
                <span className="ms-3">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="admin/managers"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <ManageAccountsRoundedIcon />
                <span className="flex-1 ms-3 whitespace-nowrap">Managers</span>
                <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-manrope font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
                  Pro
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="admin/leagues"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <EmojiEventsRoundedIcon />
                <span className="flex-1 ms-3 whitespace-nowrap">Leagues</span>
              </Link>
            </li>
            <li>
              <Link
                to="admin/teams"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <SportsSoccerRoundedIcon />
                <span className="flex-1 ms-3 whitespace-nowrap">Teams</span>
              </Link>
            </li>
            <li>
              <Link
                to="admin/players"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <PeopleAltRoundedIcon />
                <span className="flex-1 ms-3 whitespace-nowrap">Players</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
