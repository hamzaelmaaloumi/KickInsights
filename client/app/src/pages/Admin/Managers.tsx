import React, { useEffect, useRef, useState } from "react";
import IsLoading from "../../components/IsLoading";
import Pagination from "../../components/Pagination";
import axios from "axios";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
const API_URL = "http://127.0.0.1:8000/myapp/";
import DeleteConfirm from "../../components/deleteConfirm";
import UpdateManager from "./UpdateManager";

interface Manager {
  username: string;
  password: string;
  phone_number: string;
  birthday: string;
  nationality: string;
  profile_picture: string;
}

const fetchManagers = async () => {
  try {
    const response = await axios.get(API_URL + "getManagers/");
    return response.data;
  } catch (error) {
    console.error("Error fetching players:", error);
    return [];
  }
};

const deleteManager = async (username: String) => {
  try {
    const response = await axios.post(API_URL + "user/delete", {
      username: username,
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting manager:", error);
    return [];
  }
};

const Managers = () => {
  const [managers, setManagers] = useState<Manager[]>([]);
  const [filteredManagers, setFilteredManagers] = useState<Manager[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [dropdown, setDropdown] = useState<number | null>(null);
  const [selectedManager, setSelectedManager] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(10);

  const [alert, setAlert] = useState(false);
  const [update, setUpdate] = useState(false);

  const lastPostIndex = currentPage * postPerPage;
  const firstPostindex = lastPostIndex - postPerPage;

  useEffect(() => {
    const getManagers = async () => {
      setIsLoading(true);
      try {
        const managersData = await fetchManagers();
        console.log(managersData);
        setManagers(managersData);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    getManagers();
  }, []);

  useEffect(() => {
    console.log("Search changed:", search);

    let updatedManagers = managers.filter((manager) =>
      manager.name?.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredManagers(updatedManagers);
  }, [search, managers]);

  const dropdownRefs = useRef([]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdown !== null &&
        dropdownRefs.current[dropdown] &&
        !dropdownRefs.current[dropdown].contains(event.target)
      ) {
        setDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdown]);

  const deleteFunction = (name) => {
    deleteManager(name)
      .then(() => {
        console.log("Manager deleted");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const currentPost = managers.slice(firstPostindex, lastPostIndex);

  return (
    <div className="h-screen bg-gray-900">
      {isLoading ? (
        <div className="flex justify-center align-middle h-max">
          <IsLoading />
        </div>
      ) : (
        <section className="bg-gray-50 dark:bg-gray-900">
          <div className="mx-auto max-w-screen-xl px-4 lg:px-6">
            {alert && (
              <DeleteConfirm
                alert={alert}
                setAlert={setAlert}
                deleteFunction={deleteFunction}
                managerName={selectedManager}
              />
            )}

            {update && (
              <UpdateManager
                username={selectedManager?.username}
                password={selectedManager?.password}
                phone_number={selectedManager?.phone_number}
                birthday={selectedManager?.birthday}
                nationality={selectedManager?.nationality}
                profile_picture={selectedManager?.profile_picture}
              />
            )}

            {update}
            <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg ">
              <div className="z-10 flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                <div className="w-full md:w-1/2">
                  <form className="flex items-center">
                    <label htmlFor="simple-search" className="sr-only">
                      Search
                    </label>
                    <div className="relative w-full">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <SearchRoundedIcon className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="simple-search"
                        value={search}
                        onChange={(e) => {
                          setSearch(e.target.value);
                        }}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Search"
                        required
                      />
                    </div>
                  </form>
                </div>
                <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                  <div className="flex items-center space-x-3 w-full md:w-auto">
                    <Link
                      onClick={() => {
                        console.log("add manager button clicked");
                      }}
                      to="/admin/add-manager"
                      type="button"
                      className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                      Add Manager
                    </Link>
                  </div>
                </div>
              </div>
              <div className="z-10">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 overflow-visible">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
                    <tr>
                      <th scope="col" className="px-4 py-3 w-1/12">
                        Image
                      </th>
                      <th scope="col" className="px-4 py-3 w-3/12">
                        Manager Name
                      </th>
                      <th scope="col" className="px-4 py-3 w-2/12">
                        Phone number
                      </th>
                      <th scope="col" className="px-4 py-3 w-2/12">
                        Nationality
                      </th>
                      <th scope="col" className="px-4 py-3 w-2/12">
                        Birthday
                      </th>
                      <th scope="col" className="px-4 py-3 w-2/12 text-center">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {managers.map((manager, index) => {
                      return (
                        <tr
                          key={index}
                          className="border-b dark:border-gray-700"
                        >
                          <td className="px-4 py-3 h-4 w-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <img
                              className="rounded-full object-cover h-10 w-10"
                              src={`http://127.0.0.1:8000${manager.profile_picture}`}
                              alt="manager image"
                            />
                          </td>
                          <th className="px-4 py-3 h-4 w-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {manager.username}
                          </th>

                          <td className="px-4 py-3">{manager.phone_number}</td>
                          <td className="px-4 py-3">{manager.nationality}</td>
                          <td className="px-4 py-3">{manager.birthday}</td>
                          <td
                            ref={(el) => (dropdownRefs.current[index] = el)}
                            className="px-4 py-3 flex items-center justify-center relative"
                          >
                            <button
                              id={`${manager.username}-dropdown-button`}
                              onClick={(e) => {
                                e.stopPropagation();
                                setDropdown(dropdown === index ? null : index);
                              }}
                              className="relative inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
                              type="button"
                            >
                              <MoreHorizIcon />
                            </button>
                            {dropdown === index && (
                              <div className="z-50 absolute top-10 right-10 ">
                                <div
                                  id={`${manager.username}-dropdown`}
                                  className="z-50 w-44 bg-white rounded shadow dark:bg-gray-700"
                                >
                                  <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
                                    <li>
                                      <Link
                                        to="/admin/update-manager"
                                        state={{
                                          username: manager.username,
                                          phone_number: manager.phone_number,
                                          password: manager.password,
                                          birthday: manager.birthday,
                                          nationality: manager.nationality,
                                          profile_picture:
                                            manager.profile_picture,
                                        }}
                                        type="button"
                                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                      >
                                        Update
                                      </Link>
                                    </li>
                                    <li>
                                      <a
                                        onClick={() => {
                                          setDropdown(null);
                                          setAlert(true);
                                          setSelectedManager(manager.username);
                                        }}
                                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                      >
                                        Delete
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <Pagination
                totalPosts={managers.length}
                postPerPages={postPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
              />
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Managers;
