import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import IsLoading from "../../components/IsLoading";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import Pagination from "../../components/Pagination";
const API_URL = "http://127.0.0.1:8000/myapp/";

const fetchLeagues = async () => {
  try {
    const response = await axios.get(API_URL + "getLeagues/");
    return response.data;
  } catch (error) {
    console.log("error while fetching leagues : ", error);
    return [];
  }
};

interface League {
  id: Number;
  league_name: string;
  image: string;
}

const Leagues = () => {
  const [leagues, setLeagues] = useState<League[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredLeagues, setFilteredLeagues] = useState<League[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(20);

  const lastPostIndex = currentPage * postPerPage;
  const firstPostindex = lastPostIndex - postPerPage;

  useEffect(() => {
    const getLeagues = async () => {
      setIsLoading(true);
      try {
        const leaguesData = await fetchLeagues();
        setLeagues(leaguesData);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    getLeagues();
  }, []);

  useEffect(() => {
    console.log("Search changed:", search);

    let updatedLeagues = leagues.filter((league) =>
      league.league_name.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredLeagues(updatedLeagues);
  }, [search, leagues]);

  const currentPost = filteredLeagues.slice(firstPostindex, lastPostIndex);

  return (
    <div className="h-screen bg-gray-900">
      {isLoading ? (
        <div className="flex justify-center align-middle h-max">
          <IsLoading />
        </div>
      ) : (
        <section className="bg-gray-50 dark:bg-gray-900">
          <div className="mx-auto max-w-screen-xl px-4 lg:px-6">
            <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
              <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
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
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th colSpan={6} scope="col" className="px-4 py-3">
                        Leagues
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentPost.map((league, index) => {
                      if (index % 2 == 0) {
                        const nextLeague = currentPost[index + 1];
                        return (
                          <tr className="border-b dark:border-gray-700">
                            <td className="px-4 py-3 w-1/12 h-fit">
                              <img
                                className="rounded-full w-7"
                                src={league.image}
                                alt="league image"
                              />
                            </td>
                            <th
                              scope="row"
                              className="px-4 py-3 w-2/6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              {league.league_name}
                            </th>
                            <td className="px-4 py-3 w-1/12 flex items-center justify-end">
                              <button
                                id="apple-imac-27-dropdown-button"
                                data-dropdown-toggle="apple-imac-27-dropdown"
                                className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
                                type="button"
                              >
                                <svg
                                  className="w-5 h-5"
                                  aria-hidden="true"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                </svg>
                              </button>
                              <div
                                id="apple-imac-27-dropdown"
                                className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                              >
                                <ul
                                  className="py-1 text-sm text-gray-700 dark:text-gray-200"
                                  aria-labelledby="apple-imac-27-dropdown-button"
                                >
                                  <li>
                                    <a
                                      href="#"
                                      className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                      Show
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      href="#"
                                      className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                      Edit
                                    </a>
                                  </li>
                                </ul>
                                <div className="py-1">
                                  <a
                                    href="#"
                                    className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                  >
                                    Delete
                                  </a>
                                </div>
                              </div>
                            </td>
                            {nextLeague && (
                              <>
                                <td className="px-4 py-3 w-1/12 h-fit">
                                  <img
                                    className="rounded-full w-7"
                                    src={nextLeague.image}
                                    alt="league image"
                                  />
                                </td>
                                <th
                                  scope="row"
                                  className="px-4 py-3 w-2/6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                  {nextLeague.league_name}
                                </th>
                                <td className="px-4 py-3 w-1/12 flex items-center justify-end">
                                  <button
                                    id="apple-imac-27-dropdown-button"
                                    data-dropdown-toggle="apple-imac-27-dropdown"
                                    className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
                                    type="button"
                                  >
                                    <svg
                                      className="w-5 h-5"
                                      aria-hidden="true"
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                    </svg>
                                  </button>
                                  <div
                                    id="apple-imac-27-dropdown"
                                    className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                                  >
                                    <ul
                                      className="py-1 text-sm text-gray-700 dark:text-gray-200"
                                      aria-labelledby="apple-imac-27-dropdown-button"
                                    >
                                      <li>
                                        <a
                                          href="#"
                                          className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                        >
                                          Show
                                        </a>
                                      </li>
                                      <li>
                                        <a
                                          href="#"
                                          className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                        >
                                          Edit
                                        </a>
                                      </li>
                                    </ul>
                                    <div className="py-1">
                                      <a
                                        href="#"
                                        className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                      >
                                        Delete
                                      </a>
                                    </div>
                                  </div>
                                </td>
                              </>
                            )}
                          </tr>
                        );
                      } else {
                        return null;
                      }
                    })}
                  </tbody>
                </table>
              </div>
              <Pagination
                totalPosts={filteredLeagues.length}
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

export default Leagues;
