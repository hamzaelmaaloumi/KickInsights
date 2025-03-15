import React, { useEffect, useState } from "react";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import { blue, teal, yellow, orange, red } from "@mui/material/colors";
import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";
import SportsSoccerRoundedIcon from "@mui/icons-material/SportsSoccerRounded";
import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";
import DirectionsRunRoundedIcon from "@mui/icons-material/DirectionsRunRounded";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import axios from "axios";
const API_URL = "http://127.0.0.1:8000/myapp/";

const fetchActivities = async () => {
  try {
    const response = await axios.get(API_URL + "getActivities/");
    return response.data;
  } catch (error) {
    console.log(error);
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

const fetchPlayersNumber = async () => {
  try {
    const response = await axios.get(API_URL + "getPlayersNumber/");
    return response.data;
  } catch (error) {
    console.log("error fetching position : ", error);
    return [];
  }
};

const fetchTeamsNumber = async () => {
  try {
    const response = await axios.get(API_URL + "getTeamsNumber/");
    return response.data;
  } catch (error) {
    console.log("error fetching position : ", error);
    return [];
  }
};

const fetchLeaguesNumber = async () => {
  try {
    const response = await axios.get(API_URL + "getLeaguesNumber/");
    return response.data;
  } catch (error) {
    console.log("error fetching position : ", error);
    return [];
  }
};

const fetchManagersNumber = async () => {
  try {
    const response = await axios.get(API_URL + "getManagersNumber/");
    return response.data;
  } catch (error) {
    console.log("error fetching position : ", error);
    return [];
  }
};

const fetchUsersNumber = async () => {
  try {
    const response = await axios.get(API_URL + "getUsersNumber/");
    return response.data;
  } catch (error) {
    console.log("error fetching position : ", error);
    return [];
  }
};

const formatDateTime = (string) => {
  const date = new Date(string);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  });
  return { formattedDate, formattedTime };
};

interface Activitiy {
  id: number;
  action: string;
  description: string;
  timestamp: string;
  user: number;
}

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [activities, setActivities] = useState<Activitiy[]>([]);

  const [managersNumber, setManagersNumber] = useState(0);
  const [usersNumber, setUsersNumber] = useState(0);
  const [playersNumber, setPlayersNumber] = useState(0);
  const [teamsNumber, setTeamsNumber] = useState(0);
  const [leaguesNumber, setLeaguesNumber] = useState(0);

  useEffect(() => {
    const getPositions = async () => {
      try {
        const positionData = await fetchPositions();
        console.log(positionData);
        setData(positionData);
      } catch (error) {
        console.log(error);
      }
    };

    const getActivities = async () => {
      try {
        const activities = await fetchActivities();
        setActivities(activities);
      } catch (error) {
        console.log(error);
      }
    };

    const getManagersNumber = async () => {
      try {
        const number = await fetchManagersNumber();
        setManagersNumber(number);
      } catch (error) {
        console.log(error);
      }
    };

    const getUsersNumber = async () => {
      try {
        const number = await fetchUsersNumber();
        setUsersNumber(number);
      } catch (error) {
        console.log(error);
      }
    };

    const getPlayersNumber = async () => {
      try {
        const number = await fetchPlayersNumber();
        setPlayersNumber(number);
      } catch (error) {
        console.log(error);
      }
    };

    const getTeamsNumber = async () => {
      try {
        const number = await fetchTeamsNumber();
        setTeamsNumber(number);
      } catch (error) {
        console.log(error);
      }
    };

    const getLeaguesNumber = async () => {
      try {
        const number = await fetchLeaguesNumber();
        setLeaguesNumber(number);
      } catch (error) {
        console.log(error);
      }
    };

    getPositions();
    getActivities();
    getLeaguesNumber();
    getTeamsNumber();
    getPlayersNumber();
    getManagersNumber();
    getUsersNumber();
  }, []);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <>
      <div className="p-5 bg-gray-900 h-full w-full">
        <div className="grid md:grid-cols-5 grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="bg-gray-800 text-white h-44 p-4 flex justify-between align-middle gap-4 rounded-lg">
            <div className="flex flex-col justify-around align-middle w-full">
              <div className="flex justify-center w-full">
                <div className="bg-blue-500 bg-opacity-10 h-12 w-12 rounded-lg flex justify-center items-center">
                  <ManageAccountsRoundedIcon sx={{ color: blue[600] }} />
                </div>
              </div>
              <div className="flex flex-col justify-center w-full">
                <span className="text-center font-thin">Managers</span>
                <h2 className="text-3xl font-medium text-center">
                  {managersNumber}
                </h2>
              </div>
            </div>
          </div>
          <div className="bg-gray-800 text-white h-44 p-4 flex justify-between align-middle gap-4 rounded-lg">
            <div className="flex flex-col justify-around align-middle w-full">
              <div className="flex justify-center w-full">
                <div className="bg-teal-500 bg-opacity-10 h-12 w-12 rounded-lg flex justify-center items-center">
                  <DirectionsRunRoundedIcon sx={{ color: teal[600] }} />
                </div>
              </div>
              <div className="flex flex-col justify-center w-full">
                <span className="text-center font-thin">Players</span>
                <h2 className="text-3xl font-medium text-center">
                  {playersNumber}
                </h2>
              </div>
            </div>
          </div>
          <div className="bg-gray-800 text-white h-44 p-4 flex justify-between align-middle gap-4 rounded-lg">
            <div className="flex flex-col justify-around align-middle w-full">
              <div className="flex justify-center w-full">
                <div className="bg-yellow-500 bg-opacity-10 h-12 w-12 rounded-lg flex justify-center items-center">
                  <SportsSoccerRoundedIcon sx={{ color: yellow[600] }} />
                </div>
              </div>
              <div className="flex flex-col justify-center w-full">
                <span className="text-center font-thin">Teams</span>
                <h2 className="text-3xl font-medium text-center">
                  {teamsNumber}
                </h2>
              </div>
            </div>
          </div>
          <div className="bg-gray-800 text-white h-44 p-4 flex justify-between align-middle gap-4 rounded-lg">
            <div className="flex flex-col justify-around align-middle w-full">
              <div className="flex justify-center w-full">
                <div className="bg-orange-500 bg-opacity-10 h-12 w-12 rounded-lg flex justify-center items-center">
                  <EmojiEventsRoundedIcon sx={{ color: orange[600] }} />
                </div>
              </div>
              <div className="flex flex-col justify-center w-full">
                <span className="text-center font-thin">Leagues</span>
                <h2 className="text-3xl font-medium text-center">
                  {leaguesNumber}
                </h2>
              </div>
            </div>
          </div>
          <div className="bg-gray-800 text-white col-span-2 md:col-span-1 h-44 p-4 flex justify-between align-middle gap-4 rounded-lg">
            <div className="flex flex-col justify-around align-middle w-full">
              <div className="flex justify-center w-full">
                <div className="bg-red-500 bg-opacity-10 h-12 w-12 rounded-lg flex justify-center items-center">
                  <PeopleAltRoundedIcon sx={{ color: red[600] }} />
                </div>
              </div>
              <div className="flex flex-col justify-center w-full">
                <span className="text-center font-thin">Users</span>
                <h2 className="text-3xl font-medium text-center">
                  {usersNumber}
                </h2>
              </div>
            </div>
          </div>
          <div className="col-span-2 md:col-span-3 bg-gray-800 text-white rounded-lg h-400 py-3">
            <div className="relative flex flex-col w-full h-full overflow-x-auto scrollbar scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-slate-700 scrollbar-track-transparent">
              <table className="w-full text-left table-auto min-w-max">
                <thead>
                  <tr>
                    <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                      <p className="block font-sans text-sm antialiased font-medium leading-none text-blue-gray-900 opacity-70">
                        Action
                      </p>
                    </th>
                    <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                      <p className="block font-sans text-sm antialiased font-medium leading-none text-blue-gray-900 opacity-70">
                        Date
                      </p>
                    </th>
                    <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                      <p className="block font-sans text-sm antialiased font-medium leading-none text-blue-gray-900 opacity-70">
                        Time
                      </p>
                    </th>
                    <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                      <p className="block font-sans text-sm antialiased font-medium leading-none text-blue-gray-900 opacity-70">
                        Description
                      </p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {activities.map((activity, index) => (
                    <tr>
                      <td className="p-4 border-b border-blue-gray-50">
                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900 bg-blue-500 rounded bg-opacity-20 py-1 px-2">
                          {activity.action}
                        </p>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                          {formatDateTime(activity.timestamp).formattedDate}
                        </p>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                          {formatDateTime(activity.timestamp).formattedTime}
                        </p>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                          {activity.description}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-span-2 md:col-span-2 md:col-start-4 bg-gray-800 text-white rounded-lg py-3">
            <div className="h-20 flex items-center justify-center">
              <span className="text-2xl font-medium mb-4">
                Players Distribution
              </span>
            </div>

            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                  label
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 text-sm content-around items-center">
              {data.map((entry, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center gap-2"
                >
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
                  <span className="font-thin">{entry.position}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
