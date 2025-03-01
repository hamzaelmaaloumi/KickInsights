import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import IsLoading from "../../components/IsLoading";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";
import Pagination from "../../components/Pagination";
const API_URL = "http://127.0.0.1:8000/myapp/";

const fetchPlayers = async () => {
  try {
    const response = await axios.get(API_URL + "getPlayersTeams/");
    return response.data;
  } catch (error) {
    console.error("Error fetching players:", error);
    return [];
  }
};

const fetchPositions = async () => {
  try {
    const response = await axios.get(API_URL + "getPositions/");
    return response.data;
  } catch (error) {
    console.log("error fetching position : ", error);
    return [];
  }
};

interface Player {
  image: string;
  name: string;
  age: number;
  position: string;
  team_name: string;
  team: string;
}

const Players = () => {
  const [filterDropdown, setFilterDropdown] = useState(false);

  const [players, setPlayers] = useState<Player[]>([]);
  const [filterItems, setFilterItems] = useState([]);
  const [chosenFilters, setChosenFilters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(10);

  const lastPostIndex = currentPage * postPerPage;
  const firstPostindex = lastPostIndex - postPerPage;

  let filterDropdownRef = useRef();

  useEffect(() => {
    const getPlayers = async () => {
      setIsLoading(true);
      try {
        const playersData = await fetchPlayers();
        setPlayers(playersData);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    const getPositions = async () => {
      try {
        const positionData = await fetchPositions();
        setFilterItems(positionData);
      } catch (error) {
        console.log(error);
      }
    };

    getPlayers();
    getPositions();
  }, []);

  useEffect(() => {
    let handler = (e) => {
      if (!filterDropdownRef.current.contains(e.target)) {
        setFilterDropdown(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const [filteredPlayers, setFilteredPlayers] = useState(players);

  useEffect(() => {
    console.log("Search changed:", search);

    let updatedPlayers =
      chosenFilters.length > 0
        ? players.filter((player) => chosenFilters.includes(player.position))
        : players;

    updatedPlayers = updatedPlayers.filter((player) =>
      player.name?.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredPlayers(updatedPlayers);
  }, [search, players, chosenFilters]);

  const currentPost = filteredPlayers.slice(firstPostindex, lastPostIndex);

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
                <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                  <div className="flex items-center space-x-3 w-full md:w-auto">
                    <div ref={filterDropdownRef}>
                      <button
                        id="filterDropdownButton"
                        data-dropdown-toggle="filterDropdown"
                        className="w-full md:w-auto flex items-center justify-center h-10 py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        type="button"
                        onClick={() => setFilterDropdown(!filterDropdown)}
                      >
                        <FilterAltRoundedIcon
                          className="mr-2  relative"
                          fontSize="small"
                        />
                        Filter
                        <KeyboardArrowDownRoundedIcon className="text-gray-400" />
                      </button>
                      {filterDropdown && (
                        <div className="absolute top-16 right-4">
                          <div
                            id="filterDropdown"
                            className="z-10 w-48 p-3 bg-white rounded-lg shadow dark:bg-gray-700"
                          >
                            <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
                              Choose position
                            </h6>
                            <ul
                              className="space-y-2 text-sm"
                              aria-labelledby="filterDropdownButton"
                            >
                              {filterItems.map((filterItem) => {
                                return (
                                  <li className="flex items-center">
                                    <input
                                      onClick={() => {
                                        if (
                                          chosenFilters.includes(
                                            filterItem.position
                                          )
                                        ) {
                                          setChosenFilters(
                                            chosenFilters.filter(
                                              (item) =>
                                                item !== filterItem.position
                                            )
                                          );
                                        } else {
                                          setChosenFilters([
                                            ...chosenFilters,
                                            filterItem.position,
                                          ]);
                                        }
                                      }}
                                      id="apple"
                                      type="checkbox"
                                      value=""
                                      checked={chosenFilters.includes(
                                        filterItem.position
                                      )}
                                      className={`appearance-none w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500 ${
                                        chosenFilters.includes(
                                          filterItem.position
                                        )
                                          ? "text-primary-600"
                                          : ""
                                      }`}
                                    />
                                    <label
                                      htmlFor="apple"
                                      className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                                    >
                                      {filterItem.position} ({filterItem.count})
                                    </label>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-4 py-3">
                        Image
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Player Name
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Age
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Position
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Club
                      </th>
                      <th scope="col" className="px-4 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentPost.map((player) => {
                      return (
                        <tr className="border-b dark:border-gray-700">
                          <td className="px-4 py-3 h-4 w-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <img
                              className="rounded-full"
                              src={player.image}
                              alt="player image"
                            />
                          </td>
                          <th
                            scope="row"
                            className="px-4 py-3 h-4 w-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            {player.name}
                          </th>

                          <td className="px-4 py-3">{player.age}</td>
                          <td className="px-4 py-3">{player.position}</td>
                          <td className="px-4 py-3 h-4 w-4">
                            <img
                              title={player.team_name}
                              src={player.team}
                              alt="player image"
                            />
                          </td>
                          <td className="px-4 py-3 flex items-center justify-end">
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
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <Pagination
                totalPosts={filteredPlayers.length}
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

export default Players;
