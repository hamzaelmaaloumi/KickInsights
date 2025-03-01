import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import IsLoading from "../../components/IsLoading";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import Pagination from "../../components/Pagination";
const API_URL = "http://127.0.0.1:8000/myapp/";

const fetchTeams = async () => {
  try {
    const response = await axios.get(API_URL + "getTeams/");
    return response.data;
  } catch (error) {
    console.log("error while fetching teams : " + error);
    return [];
  }
};

interface Team {
  id: Number | null;
  image: string | null;
  name: string | null;
  entraineur: string | null;
  classement: string | null;
  joueurs_total: Number | null;
  moyenne_age: string | null;
  type: string | null;
}

const Teams = () => {
  const [nationalTeams, setNationalTeams] = useState<Team[]>([]);
  const [clubTeams, setClubTeams] = useState<Team[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredTeams, setFilteredTeams] = useState<Team[]>([]);

  const [divShowed, setDivShowed] = useState("National");

  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(10);

  useEffect(() => {
    const getTeams = async () => {
      setIsLoading(true);
      try {
        const teamsData = await fetchTeams();
        const national = teamsData.filter((team) => team.type === "national");
        const club = teamsData.filter((team) => team.type === "club");

        setNationalTeams(national);
        setClubTeams(club);
      } catch (error) {
        console.log("error while getting teams : " + error);
      } finally {
        setIsLoading(false);
      }
    };
    getTeams();
  }, []);

  useEffect(() => {
    console.log("Search:", search);
    console.log("Div Showed:", divShowed);
    console.log("National Teams:", nationalTeams);
    console.log("Club Teams:", clubTeams);
    let teams = [];
    if (divShowed === "National") {
      teams = nationalTeams;
      setPostPerPage(10);
    }

    if (divShowed === "Club") {
      teams = clubTeams;
      console.log("the updated teams :");
      console.log(teams);
      setPostPerPage(20);
    }

    let updatedTeams = teams.filter((team) =>
      team.name.toLowerCase().includes(search.toLowerCase())
    );

    console.log(updatedTeams);

    setFilteredTeams(updatedTeams);
  }, [search, divShowed, nationalTeams, clubTeams]);

  const lastPostIndex = currentPage * postPerPage;
  const firstPostindex = lastPostIndex - postPerPage;

  const currentPost = filteredTeams.slice(firstPostindex, lastPostIndex);

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
              <div className="flex flex-row">
                <div className="w-1/2 px-4 py-3">
                  <button
                    onClick={() => setDivShowed("National")}
                    type="button"
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    National teams
                  </button>
                </div>
                <div className="w-1/2 px-4 py-3">
                  <button
                    onClick={() => setDivShowed("Club")}
                    type="button"
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    Club teams
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 flex-col">
                    <tr>
                      <th colSpan={7} scope="col" className="px-4 py-3">
                        Teams
                      </th>
                    </tr>
                    {divShowed === "National" && (
                      <tr>
                        <th scope="col" className="px-4 py-3">
                          Image
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Team Name
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Coach
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Ranking
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Total players
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Middle age
                        </th>
                        <th scope="col" className="px-4 py-3">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    )}
                  </thead>
                  <tbody>
                    {divShowed === "Club" &&
                      currentPost.map((team, index: number) => {
                        if (index % 2 === 0) {
                          const nextTeam = currentPost[index + 1];
                          return (
                            <tr
                              className="border-b dark:border-gray-700"
                              key={team.id?.toString()}
                            >
                              <td className="px-4 py-3 w-1/12 h-fit">
                                <img
                                  className="rounded-full w-7"
                                  src={team.image}
                                  alt="team image"
                                />
                              </td>
                              <th
                                scope="row"
                                className="px-4 py-3 w-2/6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                              >
                                {team.name}
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
                              {nextTeam && (
                                <>
                                  <td className="px-4 py-3 w-1/12 h-fit">
                                    <img
                                      className="rounded-full w-7"
                                      src={nextTeam.image}
                                      alt="league image"
                                    />
                                  </td>
                                  <th
                                    scope="row"
                                    className="px-4 py-3 w-2/6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                  >
                                    {nextTeam.name}
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
                    {divShowed === "National" &&
                      currentPost.map((nationalTeam) => {
                        return (
                          <tr className="border-b dark:border-gray-700">
                            <td className="px-4 py-3 h-3 w-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              <img
                                className="rounded-full"
                                src={nationalTeam.image}
                                alt="player image"
                              />
                            </td>
                            <th
                              scope="row"
                              className="px-4 py-3 h-3 w-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              {nationalTeam.name}
                            </th>

                            <td className="px-4 py-3">
                              {nationalTeam.entraineur}
                            </td>
                            <td className="px-4 py-3">
                              {nationalTeam.classement}
                            </td>
                            <td className="px-4 py-3 h-4 w-4">
                              {nationalTeam.joueurs_total?.toString()}
                            </td>
                            <td className="px-4 py-3 h-4 w-4">
                              {nationalTeam.moyenne_age}
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
                totalPosts={filteredTeams.length}
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

export default Teams;
