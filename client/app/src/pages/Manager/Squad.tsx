import React, { useEffect, useState } from "react";
import axios from "axios";
import IsLoading from "../../components/IsLoading";
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

const Manager = () => {
  const [keepers, setKeepers] = useState<Player[]>([]);
  const [defenders, setDefenders] = useState<Player[]>([]);
  const [midfielders, setMidfilders] = useState<Player[]>([]);
  const [forwards, setForwards] = useState<Player[]>([]);

  const [players, setPlayers] = useState<Player[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getPlayers = async () => {
      setIsLoading(true);
      try {
        const playersData = await fetchPlayers();
        setPlayers(playersData);
        setForwards(
          playersData.filter((player) => player.position === "Ailier")
        );
        setMidfilders(
          playersData.filter(
            (player) => player.position === "Milieu de terrain"
          )
        );
        setDefenders(
          playersData.filter((player) => player.position === "Défenseur")
        );
        setKeepers(
          playersData.filter((player) => player.position === "Gardien de but")
        );
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    getPlayers();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center align-middle h-max">
          <IsLoading />
        </div>
      ) : (
        <>
          <div className="bg-gray-900  p-6">
            <h1 className="text-white text-2xl font-bold mb-4">Keepers</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
              {keepers.map((keeper, index) => (
                <div
                  key={index}
                  className="bg-gray-800 p-4 rounded-lg flex items-center space-x-4 h-[100px] gap-4"
                >
                  <img
                    src={keeper.image}
                    alt={keeper.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex flex-col gap-2">
                    <h2 className="text-white font-semibold">{keeper.name}</h2>
                    <p className="text-gray-400 text-sm flex gap-2">
                      <img
                        className="h-5"
                        src={keeper.team}
                        alt={keeper.team_name}
                      />{" "}
                      <span>{keeper.team_name}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gray-900  p-6">
            <h1 className="text-white text-2xl font-bold mb-4">Defenders</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
              {defenders.map((defender, index) => (
                <div
                  key={index}
                  className="bg-gray-800 p-4 rounded-lg flex items-center space-x-4 h-[100px] gap-4"
                >
                  <img
                    src={defender.image}
                    alt={defender.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex flex-col gap-2">
                    <h2 className="text-white font-semibold">
                      {defender.name}
                    </h2>
                    <p className="text-gray-400 text-sm flex gap-2">
                      <img
                        className="h-5"
                        src={defender.team}
                        alt={defender.team_name}
                      />{" "}
                      <span>{defender.team_name}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gray-900  p-6">
            <h1 className="text-white text-2xl font-bold mb-4">Midfielders</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
              {midfielders.map((midfielder, index) => (
                <div
                  key={index}
                  className="bg-gray-800 p-4 rounded-lg flex items-center space-x-4 h-[100px] gap-4"
                >
                  <img
                    src={midfielder.image}
                    alt={midfielder.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex flex-col gap-2">
                    <h2 className="text-white font-semibold">
                      {midfielder.name}
                    </h2>
                    <p className="text-gray-400 text-sm flex gap-2">
                      <img
                        className="h-5"
                        src={midfielder.team}
                        alt={midfielder.team_name}
                      />{" "}
                      <span>{midfielder.team_name}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gray-900  p-6">
            <h1 className="text-white text-2xl font-bold mb-4">Forwards</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
              {forwards.map((forward, index) => (
                <div
                  key={index}
                  className="bg-gray-800 p-4 rounded-lg flex items-center space-x-4 h-[100px] gap-4"
                >
                  <img
                    src={forward.image}
                    alt={forward.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex flex-col gap-2">
                    <h2 className="text-white font-semibold">{forward.name}</h2>
                    <p className="text-gray-400 text-sm flex gap-2">
                      <img
                        className="h-5"
                        src={forward.team}
                        alt={forward.team_name}
                      />{" "}
                      <span>{forward.team_name}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Manager;
