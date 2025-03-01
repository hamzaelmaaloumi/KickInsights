import React, { useEffect, useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
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
    { id: "rb", top: "70%", left: "80%", position: "RB" },
    { id: "cb1", top: "70%", left: "65%", position: "CB" },
    { id: "cb2", top: "70%", left: "35%", position: "CB" },
    { id: "lb", top: "70%", left: "20%", position: "LB" },
    { id: "cm1", top: "50%", left: "65%", position: "CM" },
    { id: "cdm", top: "50%", left: "50%", position: "CDM" },
    { id: "cm2", top: "50%", left: "35%", position: "CM" },
    { id: "rw", top: "30%", left: "80%", position: "RW" },
    { id: "st", top: "30%", left: "50%", position: "ST" },
    { id: "lw", top: "30%", left: "20%", position: "LW" },
  ]
};

const PlayerCard: React.FC<{ 
  player: Player, 
  inPitch?: boolean, 
  onReturnToList?: () => void 
}> = ({ player, inPitch = false, onReturnToList }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'player',
    item: { player },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const positionMap: Record<string, string> = {
    "Gardien de but": "GK",
    "Défenseur": "CB",
    "Ailier": "RW",
    "Milieu de terrain": "CM",
  };

  const positionAbbr = positionMap[player.position] || 'Unknown';

  return (
    <div ref={drag} className={`${inPitch ? 'absolute transform -translate-x-1/2 -translate-y-1/2' : 'mb-4'} ${isDragging ? 'opacity-50' : 'opacity-100'} font-manrope w-28 cursor-move transition-all duration-300 ease-in-out`}>
      <div className="relative rounded-lg overflow-hidden shadow-xl transition-all duration-300 transform hover:scale-105"
        style={{ background: 'linear-gradient(135deg, #101010 0%, #181818 100%)', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.7)' }}>
        
        <div className="bg-black px-1 text-white flex justify-between items-center">
          <span className="text-sm font-bold">{player.player_name.split(" ")[0]}</span>
        </div>

        <div className="bg-black relative flex justify-center pt-3 pb-4">
          <div className="h-16 w-16 rounded-full overflow-hidden border-4 border-indigo-700 shadow-xl">
            <img src={player.image} alt={player.player_name} className="h-full w-full object-cover" />
          </div>
          <span className="absolute bottom-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full p-1 text-[10px] font-manrope">{positionAbbr}</span>
          <span className="absolute top-0 right-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-sm p-1 text-[12px] font-manrope">9.8</span>
          
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

const PositionDropArea: React.FC<{ 
  id: string, 
  top: string, 
  left: string, 
  position: string, 
  onDrop: (player: Player, positionId: string) => void, 
  onRemovePlayer: (positionId: string) => void,
  player?: Player 
}> = ({ id, top, left, position, onDrop, onRemovePlayer, player }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'player',
    drop: (item: { player: Player }) => {
      onDrop(item.player, id);
      return undefined;
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const handleReturnToList = () => {
    if (player) {
      onRemovePlayer(id);
    }
  };

  return (
    <div ref={drop} className={`absolute ${isOver ? 'scale-110' : ''} transition-transform duration-200`} style={{ top, left }}>
      {player ? (
        <PlayerCard 
          player={player} 
          inPitch={true} 
          onReturnToList={handleReturnToList}
        />
      ) : (
        <div className="h-28 w-28 rounded-full border-2 border-dashed border-gray-500 flex items-center justify-center bg-gray-900 bg-opacity-40 transform -translate-x-1/2 -translate-y-1/2">
          <span className="text-gray-400 text-xs">{position}</span>
        </div>
      )}
    </div>
  );
};

const DropToReturnArea: React.FC<{ onReturnPlayer: (player: Player) => void }> = ({ onReturnPlayer }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'player',
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
      className={`mt-4 p-4 border-2 border-dashed ${isOver ? 'border-green-500 bg-green-900 bg-opacity-20' : 'border-gray-600'} rounded-lg text-center transition-all duration-200`}
    >
      <p className="text-gray-400">Drag a player here to return them to the available list</p>
    </div>
  );
};

export default function Squad() {
  const playerService = new httpService("Player");
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
        console.error('Error fetching players:', error);
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
    setLineup(prev => {
      // Create a completely new lineup object to avoid reference issues
      const newLineup = { ...prev };
      
      // Find the current position of the player being dropped (if they're on the field)
      let currentPositionOfDroppedPlayer: string | null = null;
      
      Object.entries(newLineup).forEach(([pos, existingPlayer]) => {
        if (existingPlayer && existingPlayer.player_name === player.player_name) {
          currentPositionOfDroppedPlayer = pos;
        }
      });
      
      // Get the player in the target position (if any)
      const playerInTargetPosition = newLineup[positionId];
      
      // Case 1: The player is already on the field, and we're moving to an occupied position
      if (currentPositionOfDroppedPlayer && playerInTargetPosition) {
        // Simple swap - A goes to B's position, B goes to A's position
        newLineup[positionId] = player;
        newLineup[currentPositionOfDroppedPlayer] = playerInTargetPosition;
      }
      // Case 2: The player is already on the field, but we're moving to an empty position
      else if (currentPositionOfDroppedPlayer) {
        // Remove from current position
        delete newLineup[currentPositionOfDroppedPlayer];
        // Add to new position
        newLineup[positionId] = player;
      }
      // Case 3: The player is from the bench, and we're adding to an occupied position
      else if (playerInTargetPosition) {
        // Simply replace the player in the position
        newLineup[positionId] = player;
      }
      // Case 4: The player is from the bench, and we're adding to an empty position
      else {
        // Simply add to the position
        newLineup[positionId] = player;
      }
      
      return newLineup;
    });
  };

  const handleRemovePlayer = (positionId: string) => {
    setLineup(prev => {
      const newLineup = { ...prev };
      delete newLineup[positionId];
      return newLineup;
    });
  };

  const handleReturnPlayer = (player: Player) => {
    // Find the position where this player is and remove them
    setLineup(prev => {
      const newLineup = { ...prev };
      Object.keys(newLineup).forEach(posId => {
        if (newLineup[posId]?.player_name === player.player_name) {
          delete newLineup[posId];
        }
      });
      return newLineup;
    });
  };

  const getAvailablePlayers = () => {
    const usedPlayers = Object.values(lineup);
    return players.filter(player => 
      !usedPlayers.some(used => used.player_name === player.player_name)
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-black text-white p-8">
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
                
                {positions.map(pos => (
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
              <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-4 py-3 border-b border-gray-700">
                <h2 className="text-xl font-bold flex items-center">
                  <span className="w-1 h-6 bg-indigo-500 mr-2"></span>
                  Available Players
                </h2>
              </div>
              
              <div className="p-4">
                <DropToReturnArea onReturnPlayer={handleReturnPlayer} />
                
                <div className="grid grid-cols-2 gap-4 max-h-[450px] overflow-y-auto pr-2 mt-4">
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