import React, { useEffect, useState } from "react";
import axios from "axios";
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

interface Player {
  image: string;
  name: string;
  age: number;
  position: string;
  team_name: string;
  team: string;
}

const Squad = () => {
  const [keepers, setKeepers] = useState<Player[]>([]);
  const [defenders, setDefenders] = useState<Player[]>([]);
  const [midfielders, setMidfielders] = useState<Player[]>([]);
  const [forwards, setForwards] = useState<Player[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getPlayers = async () => {
      setIsLoading(true);
      try {
        const players = await fetchPlayers();
        const keepersArray = players.filter(
          (p: Player) => p.position === "Gardien de but"
        );

        const defendersArray = players.filter(
          (p: Player) => p.position === "Défenseur"
        );

        const midfieldersArray = players.filter(
          (p: Player) => p.position === "Milieu de terrain"
        );

        const forwardsArray = players.filter(
          (p: Player) => p.position === "Ailier"
        );

        setKeepers(keepersArray);
        setDefenders(defendersArray);
        setMidfielders(midfieldersArray);
        setForwards(forwardsArray);
      } catch (error) {
        console.log("error : " + error);
      } finally {
        setIsLoading(false);
      }
    };

    getPlayers();
  }, []);

  return (
    <div className="p-10 bg-gray-900 h-full w-full flex flex-col gap-4">
      <div className="bg-gray-800 rounded-lg p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <h2 className="font-medium text-base text-white lg:col-span-3 md:col-span-2 col-span-1">
          Keepers
        </h2>
        {keepers.map((element: Player) => {
          return (
            <div className="bg-gray-700 p-5 rounded-md flex items-center gap-4">
              <img src={element.image} alt="" className="rounded-full h-10" />
              <div className="flex flex-col items-start gap-1">
                <h3 className="text-sm font-medium text-white">
                  {element.name}
                </h3>
                <div className="flex gap-2 items-center justify-center">
                  <img
                    src={element.team}
                    alt={element.team_name}
                    className="h-3.5"
                  />
                  <h3 className="text-xs font-medium text-gray-400">
                    {element.team_name}
                  </h3>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="bg-gray-800 rounded-lg p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <h2 className="font-medium text-base text-white lg:col-span-3 md:col-span-2 col-span-1">
          Defenders
        </h2>
        {defenders.map((element: Player) => {
          return (
            <div className="bg-gray-700 p-5 rounded-md flex items-center gap-4">
              <img src={element.image} alt="" className="rounded-full h-10" />
              <div className="flex flex-col items-start gap-1">
                <h3 className="text-sm font-medium text-white">
                  {element.name}
                </h3>
                <div className="flex gap-2 items-center justify-center">
                  <img
                    src={element.team}
                    alt={element.team_name}
                    className="h-3.5"
                  />
                  <h3 className="text-xs font-medium text-gray-400">
                    {element.team_name}
                  </h3>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="bg-gray-800 rounded-lg p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <h2 className="font-medium text-base text-white lg:col-span-3 md:col-span-2 col-span-1">
          Midfielders
        </h2>
        {midfielders.map((element: Player) => {
          return (
            <div className="bg-gray-700 p-5 rounded-md flex items-center gap-4">
              <img src={element.image} alt="" className="rounded-full h-10" />
              <div className="flex flex-col items-start gap-1">
                <h3 className="text-sm font-medium text-white">
                  {element.name}
                </h3>
                <div className="flex gap-2 items-center justify-center">
                  <img
                    src={element.team}
                    alt={element.team_name}
                    className="h-3.5"
                  />
                  <h3 className="text-xs font-medium text-gray-400">
                    {element.team_name}
                  </h3>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="bg-gray-800 rounded-lg p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <h2 className="font-medium text-base text-white lg:col-span-3 md:col-span-2 col-span-1">
          Forwards
        </h2>
        {forwards.map((element: Player) => {
          return (
            <div className="bg-gray-700 p-5 rounded-md flex items-center gap-4">
              <img src={element.image} alt="" className="rounded-full h-10" />
              <div className="flex flex-col items-start gap-1">
                <h3 className="text-sm font-medium text-white">
                  {element.name}
                </h3>
                <div className="flex gap-2 items-center justify-center">
                  <img
                    src={element.team}
                    alt={element.team_name}
                    className="h-3.5"
                  />
                  <h3 className="text-xs font-medium text-gray-400">
                    {element.team_name}
                  </h3>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Squad;
