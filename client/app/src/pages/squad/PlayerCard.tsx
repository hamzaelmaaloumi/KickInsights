import React, { useEffect, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import httpService from "../../HttpService/http-service";

interface Player {
  player_name: string;
  position: string;
  age: number;
  nationality: string;
  image: string;
  link: string;
}

const positionsMap = {
  "4-3-3": [
    { id: "gk", top: "85%", left: "50%", position: "GK" },
    { id: "rb", top: "60%", left: "85%", position: "RB" },
    { id: "cb1", top: "70%", left: "65%", position: "CB" },
    { id: "cb2", top: "70%", left: "35%", position: "CB" },
    { id: "lb", top: "60%", left: "15%", position: "LB" },
    { id: "cm1", top: "42%", left: "70%", position: "CM" },
    { id: "cdm", top: "50%", left: "50%", position: "CDM" },
    { id: "cm2", top: "42%", left: "30%", position: "CM" },
    { id: "rw", top: "20%", left: "80%", position: "RW" },
    { id: "st", top: "15%", left: "50%", position: "ST" },
    { id: "lw", top: "20%", left: "20%", position: "LW" },
  ],
};

const PlayerCard: React.FC<{
  player: Player;
  inPitch?: boolean;
  onReturnToList?: () => void;
}> = ({ player, inPitch = false, onReturnToList }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "player",
    item: { player },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const positionMap: Record<string, string> = {
    "Gardien de but": "GK",
    Défenseur: "CB",
    Ailier: "RW",
    "Milieu de terrain": "CM",
  };

  const positionAbbr = positionMap[player.position] || "Unknown";

  return (
    <div
      ref={drag}
      className={`${
        inPitch
          ? "absolute transform -translate-x-1/2 -translate-y-1/2"
          : "mb-4"
      } ${
        isDragging ? "opacity-50" : "opacity-100"
      } font-manrope w-28 cursor-move transition-all duration-300 ease-in-out`}
    >
      <div className="relative rounded-lg overflow-hidden transition-all duration-300 transform hover:scale-105">
        <div className="relative flex justify-center pt-3 pb-4">
          <div className="h-14 w-14 rounded-full overflow-hidden mb-2">
            <img
              src={player.image}
              alt={player.player_name}
              className="h-full w-full object-cover"
            />
          </div>
          <span className="absolute top-2 right-2 bg-orange-500 text-white font-medium w-8 h-5 flex items-center justify-center rounded-full p-1 text-[12px] font-manrope">
            9.8
          </span>
          <span className="text-xs absolute bottom-0">
            {player.player_name.split(" ")[0]} ({positionAbbr})
          </span>

          {inPitch && onReturnToList && (
            <button
              onClick={onReturnToList}
              className="absolute top-0 left-0 bg-red-600 rounded-br-sm p-1 text-[10px] w-5 h-5 flex items-center justify-center"
              title="Return to available players"
            >
              X
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const getSimiliraties = () => {};

const PositionDropArea: React.FC<{
  id: string;
  top: string;
  left: string;
  position: string;
  onDrop: (player: Player, positionId: string) => void;
  onRemovePlayer: (positionId: string) => void;
  player?: Player;
}> = ({ id, top, left, position, onDrop, onRemovePlayer, player }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "player",
    drop: (item: { player: Player }) => {
      onDrop(item.player, id);
      return undefined;
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const handleReturnToList = () => {
    console.log("Removing player from position:", id); // Debugging
    if (player) {
      onRemovePlayer(id);
    }
  };

  return (
    <div
      ref={drop}
      className={`absolute ${
        isOver ? "scale-110" : ""
      } transition-transform duration-200`}
      style={{ top, left }}
    >
      {player ? (
        <PlayerCard
          player={player}
          inPitch={true}
          onReturnToList={handleReturnToList}
        />
      ) : (
        <button
          onClick={getSimiliraties()}
          className="h-20 w-20 rounded-full border-2 border-dashed border-gray-500 flex items-center justify-center bg-gray-900 bg-opacity-40 transform -translate-x-1/2 -translate-y-1/2"
        >
          <span className="text-gray-400 text-xs">{position}</span>
        </button>
      )}
    </div>
  );
};

const DropToReturnArea: React.FC<{
  onReturnPlayer: (player: Player) => void;
}> = ({ onReturnPlayer }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "player",
    drop: (item: { player: Player }) => {
      onReturnPlayer(item.player);
      return undefined;
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`mt-4 p-4 border-2 border-dashed ${
        isOver
          ? "border-green-500 bg-green-900 bg-opacity-20"
          : "border-gray-600"
      } rounded-lg text-center transition-all duration-200`}
    >
      <p className="text-gray-400">
        Drag a player here to return them to the available list
      </p>
    </div>
  );
};

const playerService = new httpService("Player");

export default function Squad() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [formation] = useState("4-3-3");
  const [lineup, setLineup] = useState<Record<string, Player>>({});
  const positions = positionsMap[formation as keyof typeof positionsMap];

  useEffect(() => {
    let outController: AbortController;

    const fetchPlayers = async () => {
      try {
        const response = playerService.getAll();
        outController = response.controller;
        const playersResponse = await response.request;
        setPlayers([...playersResponse.data]);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching players:", error);
        }
      }
    };

    fetchPlayers();

    return () => {
      if (outController) {
        outController.abort();
      }
    };
  }, []);

  const handleDrop = (player: Player, positionId: string) => {
    setLineup((prev) => {
      const newLineup = { ...prev };
      const currentPosition = Object.keys(newLineup).find(
        (pos) => newLineup[pos]?.player_name === player.player_name
      );
      const playerInTargetPosition = newLineup[positionId];

      if (currentPosition && playerInTargetPosition) {
        newLineup[positionId] = player;
        newLineup[currentPosition] = playerInTargetPosition;
      } else if (currentPosition) {
        delete newLineup[currentPosition];
        newLineup[positionId] = player;
      } else if (playerInTargetPosition) {
        newLineup[positionId] = player;
      } else {
        newLineup[positionId] = player;
      }

      return newLineup;
    });
  };

  const handleRemovePlayer = (positionId: string) => {
    setLineup((prev) => {
      const newLineup = { ...prev };
      delete newLineup[positionId];
      return newLineup;
    });
  };

  const handleReturnPlayer = (player: Player) => {
    setLineup((prev) => {
      const newLineup = { ...prev };
      Object.keys(newLineup).forEach((posId) => {
        if (newLineup[posId]?.player_name === player.player_name) {
          delete newLineup[posId];
        }
      });
      return newLineup;
    });
  };

  const getAvailablePlayers = () => {
    const usedPlayers = Object.values(lineup);
    return players.filter(
      (player) =>
        !usedPlayers.some((used) => used.player_name === player.player_name)
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Ultimate Team Builder
          </h1>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              <div className="relative w-full h-[600px] bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg overflow-hidden shadow-2xl border border-gray-700">
                <div className="absolute inset-0">
                  <div className="absolute inset-2 border-2 border-gray-700 rounded-md"></div>
                  <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-700 transform -translate-x-1/2"></div>
                  <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-700 transform -translate-y-1/2"></div>
                  <div className="absolute top-1/2 left-1/2 w-32 h-32 border-2 border-gray-700 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                  <div className="absolute top-0 left-1/2 w-64 h-24 border-b-2 border-l-2 border-r-2 border-gray-700 transform -translate-x-1/2"></div>
                  <div className="absolute bottom-0 left-1/2 w-64 h-24 border-t-2 border-l-2 border-r-2 border-gray-700 transform -translate-x-1/2"></div>
                  <div className="absolute top-0 left-1/2 w-32 h-10 border-b-2 border-l-2 border-r-2 border-gray-700 transform -translate-x-1/2"></div>
                  <div className="absolute bottom-0 left-1/2 w-32 h-10 border-t-2 border-l-2 border-r-2 border-gray-700 transform -translate-x-1/2"></div>
                </div>

                {positions.map((pos) => (
                  <PositionDropArea
                    key={pos.id}
                    id={pos.id}
                    top={pos.top}
                    left={pos.left}
                    position={pos.position}
                    onDrop={handleDrop}
                    onRemovePlayer={handleRemovePlayer}
                    player={lineup[pos.id]}
                  />
                ))}
              </div>
            </div>

            <div className="lg:w-1/3 bg-gray-800 rounded-lg shadow-2xl border border-gray-700 overflow-hidden">
              <div className="bg-gray-900 px-4 py-3 border-b border-gray-700">
                <h2 className="text-xl font-bold flex items-center">
                  <span className="w-1 h-6 bg-indigo-500 mr-2"></span>
                  Available Players
                </h2>
              </div>

              <div className="p-4">
                <DropToReturnArea onReturnPlayer={handleReturnPlayer} />

                <div className="grid grid-cols-3 gap-4 max-h-[450px] overflow-y-auto min-h-0 pr-4 overflow-x-hidden mt-4 scrollbar scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-slate-700 scrollbar-track-transparent">
                  {getAvailablePlayers().map((player) => (
                    <PlayerCard key={player.player_name} player={player} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  );
}
