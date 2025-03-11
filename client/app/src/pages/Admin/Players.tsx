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


  const [loading, setLoading] = useState(false)
  const [scrapingAlert, setScrapingAlert] = useState(false)
  const [scrapingAlertMsg, setScrapingAlertMsg] = useState("")
  const [scrapingSuccess, setScrapingSuccess] = useState(false)
  const [scrapingSuccessMsg, setScrapingSuccessMsg] = useState("")
  const [scrapingInsurance, setScrapingInsurance] = useState(false)


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












  const scrape_players = async () => {

    setLoading(true)
    try {
      const res = await axios.get(API_URL + "scrapPlayers/")
      setScrapingSuccess(true)
      setScrapingSuccessMsg("Scraping completed successfully! Data has been retrieved and saved")
    } catch (err) {
      setScrapingAlert(true)
      setScrapingAlertMsg(`an error happened ${err.response.data}`)
    } finally {
      setLoading(false)
    }



  }




  return (
    <div className="h-full w-full flex flex-col bg-gray-900">
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
                                      className={`appearance-none w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500 ${chosenFilters.includes(
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












      <div className="bg-black px-7 py-11 my-4 rounded-3xl border-2 border-gray-700 w-[45%] mx-auto flex flex-col items-center gap-11">
        <p className="font-manrope text-4xl text-gray-200 font-bold">scraping the players</p>

        <ul className="font-manrope text-md text-gray-400 font-semibold">
          <li className="flex justify-start items-start mt-2 gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" height="20" className="flex-shrink-0 mt-1 text-orange-700 text-splash"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
            make sure your connection is stable before proceeding.
          </li>
          <li className="flex justify-start items-start mt-2 gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" height="20" className="flex-shrink-0 text-orange-700 text-splash"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
            The scraping process may take a few minutes.
          </li>
          <li className="flex justify-start items-start mt-2 gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" height="20" className="flex-shrink-0 text-orange-700 text-splash"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
            Ensure there is no ongoing heavy network usage.
          </li>
          <li className="flex justify-start items-start mt-2 gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" height="20" className="flex-shrink-0 mt-1 text-orange-700 text-splash"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
            Close other unnecessary applications or browser tabs to speed up the process.
          </li>
          <li className="flex justify-start items-start mt-2 gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" height="20" className="flex-shrink-0 mt-1 text-orange-700 text-splash"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
            The server may be temporarily unavailable at times, so please try again later if needed.
          </li>
        </ul>

        <div className="flex items-start justify-center">
        <input onClick={() => setScrapingInsurance(!scrapingInsurance)} id="requirements" className="mt-1 mr-2  dark:scale-100 transition-all duration-300 ease-in-out text-red-500 dark:hover:scale-110 rounded-full dark:checked:scale-100 w-4 h-4" type="checkbox" />
          <label htmlFor="requirements" className="text-gray-600 font-manrope font-bold">
            I have reviewed and ensured all the requirements are met before proceeding.
          </label>
        </div>

        <div className="relative mx-auto w-[80%]">
          <button onClick={scrapingInsurance ? ()=>{scrape_players()} : undefined} className={`w-full ${scrapingInsurance ? 'hover:scale-105' : 'cursor-not-allowed'} transition-all duration-300 font-manrope text-white font-bold bg-red-950 px-4 py-3 rounded-lg border-2 border-gray-600`}>{loading ? <div className="mx-auto w-5 h-5 border-4 border-t-red-600 border-gray-300 rounded-full animate-spin"></div> : 'Scrape the players'}</button>
        </div>
      </div>
      



      {scrapingAlert && (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/60 backdrop-blur-md">
    <div className="transform transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
      <div className="relative px-8 py-12 bg-gradient-to-br from-red-950 to-red-1000 border border-red-900/80 shadow-2xl shadow-red-950/70 rounded-2xl text-center max-w-md mx-auto overflow-hidden">
        
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-2xl shadow-[inset_0_0_20px_rgba(153,27,27,0.4)] pointer-events-none"></div>
        
        {/* Animated Error Icon */}
        <div className="animate-float">
          <svg
            className="w-24 h-24 mx-auto text-red-400 mb-6 drop-shadow-[0_0_8px_rgba(248,113,113,0.3)]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 20a8 8 0 100-16 8 8 0 000 16z"
            />
            <circle
              cx="12"
              cy="12"
              r="11"
              className="stroke-red-900/40"
              strokeWidth={1}
            />
          </svg>
        </div>

        {/* Error Message */}
        <div className="relative space-y-4 z-10">
          <h3 className="text-2xl font-semibold bg-gradient-to-r from-red-200 to-red-400 bg-clip-text text-transparent mb-2">
            Oops! Something went wrong
          </h3>
          <p className="text-red-100/90 text-lg font-medium leading-relaxed tracking-tight">
            {scrapingAlertMsg}
          </p>
        </div>

        {/* Close Button */}
        <button
          onClick={() => setScrapingAlert(false)}
          className="mt-8 px-6 py-2.5 bg-red-900/60 hover:bg-red-900 border border-red-800/50 text-red-100 rounded-lg transition-all duration-300 font-medium hover:shadow-[0_0_12px_2px_rgba(153,27,27,0.5)] hover:-translate-y-0.5"
        >
          Close
        </button>

        {/* Subtle grid overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMjAwIDBIMHYyMDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzk5MWIxYiIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIvPjwvc3ZnPg==')] opacity-20 pointer-events-none"></div>
      </div>
    </div>
  </div>
)}



{scrapingSuccess && ( 
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/60 backdrop-blur-md">
    <div className="transform transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
      <div className="relative px-8 py-12 bg-gradient-to-br from-emerald-950 to-emerald-1000 border border-emerald-900/80 shadow-2xl shadow-emerald-950/70 rounded-2xl text-center max-w-md mx-auto overflow-hidden">
        
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-2xl shadow-[inset_0_0_20px_rgba(6,78,59,0.4)] pointer-events-none"></div>
        
        {/* Animated Success Icon */}
        <div className="animate-float">
          <svg
            className="w-24 h-24 mx-auto text-emerald-400 mb-6 drop-shadow-[0_0_8px_rgba(52,211,153,0.3)]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
            <circle
              cx="12"
              cy="12"
              r="11"
              className="stroke-emerald-900/40"
              strokeWidth={1}
            />
          </svg>
        </div>

        {/* Success Content */}
        <div className="relative space-y-4 z-10">
          <h3 className="text-2xl font-semibold bg-gradient-to-r from-emerald-200 to-emerald-400 bg-clip-text text-transparent mb-2">
            Success!
          </h3>
          <p className="text-emerald-100/90 text-lg font-medium leading-relaxed tracking-tight">
            {scrapingSuccessMsg}
          </p>
        </div>

        {/* Close Button */}
        <button
          onClick={() => setScrapingSuccess(false)}
          className="mt-8 px-6 py-2.5 bg-emerald-900/60 hover:bg-emerald-900 border border-emerald-800/50 text-emerald-100 rounded-lg transition-all duration-300 font-medium hover:shadow-[0_0_12px_2px_rgba(6,78,59,0.5)] hover:-translate-y-0.5"
        >
          Continue
        </button>

        {/* Subtle grid overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMjAwIDBIMHYyMDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzA2NGEzMSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIvPjwvc3ZnPg==')] opacity-20 pointer-events-none"></div>
      </div>
    </div>
  </div>
)}


    </div>
  );
};

export default Players;
