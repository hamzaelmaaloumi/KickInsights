import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const ModernStatsDashboard = () => {
  // Sample match stats data
  const matchStats = {
    id: 1,
    possessionData: [
      { name: 'Your Team', value: 58 },
      { name: 'Opponent', value: 42 }
    ],
    shootingStats: {
      total_tirs: 15,
      tirs_cadres: 8,
      frappe_sur_poteau: 1,
      tirs_non_cadres: 4,
      tirs_bloques: 2,
      tirs_dans_surface: 9,
      tirs_hors_surface: 6
    },
    passingStats: {
      passes_precises: 352,
      passes: 410,
      touches: 580,
      passes_vers_dernier_tiers: 45,
      dans_le_dernier_tiers: 120,
      longs_ballons: 32,
      transversales: 15
    },
    defenseStats: {
      tacles_gagnes: 12,
      tacles_totaux: 18,
      tacles: 18,
      interceptions: 24,
      recuperations: 58,
      degagements: 16,
      erreurs_menant_a_un_but: 0
    },
    attackStats: {
      grandes_chances: 4,
      grosses_occasions_realisees: 2,
      grosses_occasions_manquees: 2,
      touchers_surface_reparation: 18,
      corner: 6,
      coups_francs: 8
    },
    duelStats: {
      duels: 65,
      duels_sol: 42,
      duels_aeriens: 23,
      dribbles: 15,
      pertes_balle: 25
    },
    disciplineStats: {
      fautes: 10,
      cartons_jaunes: 2
    },
    goalkeeperStats: {
      arrets_du_gardien: 5,
      sorties_aeriennes: 3,
      coup_de_pied_de_but: 8
    }
  };

  // Create data for bar charts
  const shootingData = [
    { name: 'Total', value: matchStats.shootingStats.total_tirs },
    { name: 'On Target', value: matchStats.shootingStats.tirs_cadres },
    { name: 'Off Target', value: matchStats.shootingStats.tirs_non_cadres },
    { name: 'Blocked', value: matchStats.shootingStats.tirs_bloques }
  ];

  const passingData = [
    { name: 'Accurate', value: matchStats.passingStats.passes_precises },
    { name: 'Total', value: matchStats.passingStats.passes },
  ];

  const defenseData = [
    { name: 'Tackles Won', value: matchStats.defenseStats.tacles_gagnes },
    { name: 'Total Tackles', value: matchStats.defenseStats.tacles_totaux },
    { name: 'Interceptions', value: matchStats.defenseStats.interceptions },
    { name: 'Recoveries', value: matchStats.defenseStats.recuperations }
  ];

  return (
    <div className="bg-gray-900 text-gray-100 p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-blue-400">Match Statistics Dashboard</h1>
      
      {/* Possession Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3 text-blue-300">Possession</h2>
        <div className="flex items-center">
          <div className="w-full bg-gray-700 rounded-full h-4">
            <div
              className="bg-blue-500 h-4 rounded-full"
              style={{ width: `${matchStats.possessionData[0].value}%` }}
            ></div>
          </div>
          <span className="ml-3 font-bold">{matchStats.possessionData[0].value}%</span>
        </div>
      </div>
      
      {/* Two-column layout for stats sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Shooting Section */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-3 text-blue-300">Shooting</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={shootingData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px', color: '#F3F4F6' }} 
                />
                <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            <div className="bg-gray-700 p-2 rounded">
              <p className="text-xs text-gray-400">Inside Box</p>
              <p className="text-xl font-bold">{matchStats.shootingStats.tirs_dans_surface}</p>
            </div>
            <div className="bg-gray-700 p-2 rounded">
              <p className="text-xs text-gray-400">Outside Box</p>
              <p className="text-xl font-bold">{matchStats.shootingStats.tirs_hors_surface}</p>
            </div>
          </div>
        </div>
        
        {/* Passing Section */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-3 text-blue-300">Passing</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={passingData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px', color: '#F3F4F6' }} 
                />
                <Bar dataKey="value" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-4">
            <div className="bg-gray-700 p-2 rounded">
              <p className="text-xs text-gray-400">Final Third</p>
              <p className="text-xl font-bold">{matchStats.passingStats.dans_le_dernier_tiers}</p>
            </div>
            <div className="bg-gray-700 p-2 rounded">
              <p className="text-xs text-gray-400">Long Balls</p>
              <p className="text-xl font-bold">{matchStats.passingStats.longs_ballons}</p>
            </div>
            <div className="bg-gray-700 p-2 rounded">
              <p className="text-xs text-gray-400">Crosses</p>
              <p className="text-xl font-bold">{matchStats.passingStats.transversales}</p>
            </div>
          </div>
        </div>
        
        {/* Defense Section */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-3 text-blue-300">Defense</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={defenseData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px', color: '#F3F4F6' }} 
                />
                <Bar dataKey="value" fill="#F59E0B" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            <div className="bg-gray-700 p-2 rounded">
              <p className="text-xs text-gray-400">Clearances</p>
              <p className="text-xl font-bold">{matchStats.defenseStats.degagements}</p>
            </div>
            <div className="bg-gray-700 p-2 rounded">
              <p className="text-xs text-gray-400">Errors to Goal</p>
              <p className="text-xl font-bold">{matchStats.defenseStats.erreurs_menant_a_un_but}</p>
            </div>
          </div>
        </div>
        
        {/* Duels Section */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-3 text-blue-300">Duels</h2>
          <div className="flex justify-between mb-4">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-700 text-2xl font-bold">
                {matchStats.duelStats.duels}
              </div>
              <p className="mt-2 text-sm text-gray-400">Total Duels</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-900 text-2xl font-bold">
                {matchStats.duelStats.duels_sol}
              </div>
              <p className="mt-2 text-sm text-gray-400">Ground Duels</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-900 text-2xl font-bold">
                {matchStats.duelStats.duels_aeriens}
              </div>
              <p className="mt-2 text-sm text-gray-400">Aerial Duels</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            <div className="bg-gray-700 p-2 rounded">
              <p className="text-xs text-gray-400">Dribbles</p>
              <p className="text-xl font-bold">{matchStats.duelStats.dribbles}</p>
            </div>
            <div className="bg-gray-700 p-2 rounded">
              <p className="text-xs text-gray-400">Ball Losses</p>
              <p className="text-xl font-bold">{matchStats.duelStats.pertes_balle}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom row for additional stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {/* Attacking Stats */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-3 text-blue-300">Attacking</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-700 p-3 rounded flex flex-col items-center">
              <p className="text-sm text-gray-400">Big Chances</p>
              <p className="text-2xl font-bold">{matchStats.attackStats.grandes_chances}</p>
            </div>
            <div className="bg-gray-700 p-3 rounded flex flex-col items-center">
              <p className="text-sm text-gray-400">Corners</p>
              <p className="text-2xl font-bold">{matchStats.attackStats.corner}</p>
            </div>
            <div className="bg-gray-700 p-3 rounded flex flex-col items-center">
              <p className="text-sm text-gray-400">Box Touches</p>
              <p className="text-2xl font-bold">{matchStats.attackStats.touchers_surface_reparation}</p>
            </div>
            <div className="bg-gray-700 p-3 rounded flex flex-col items-center">
              <p className="text-sm text-gray-400">Free Kicks</p>
              <p className="text-2xl font-bold">{matchStats.attackStats.coups_francs}</p>
            </div>
          </div>
        </div>
        
        {/* Discipline Stats */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-3 text-blue-300">Discipline</h2>
          <div className="flex justify-around">
            <div className="text-center">
              <div className="w-16 h-24 bg-gray-700 flex items-center justify-center rounded mb-2">
                <span className="text-2xl font-bold">{matchStats.disciplineStats.fautes}</span>
              </div>
              <p className="text-sm text-gray-400">Fouls</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-24 bg-yellow-500 flex items-center justify-center rounded mb-2">
                <span className="text-2xl font-bold text-gray-900">{matchStats.disciplineStats.cartons_jaunes}</span>
              </div>
              <p className="text-sm text-gray-400">Yellow Cards</p>
            </div>
          </div>
        </div>
        
        {/* Goalkeeper Stats */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-3 text-blue-300">Goalkeeper</h2>
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-gray-700 p-3 rounded flex justify-between items-center">
              <p className="text-sm text-gray-400">Saves</p>
              <p className="text-2xl font-bold">{matchStats.goalkeeperStats.arrets_du_gardien}</p>
            </div>
            <div className="bg-gray-700 p-3 rounded flex justify-between items-center">
              <p className="text-sm text-gray-400">Aerial Claims</p>
              <p className="text-2xl font-bold">{matchStats.goalkeeperStats.sorties_aeriennes}</p>
            </div>
            <div className="bg-gray-700 p-3 rounded flex justify-between items-center">
              <p className="text-sm text-gray-400">Goal Kicks</p>
              <p className="text-2xl font-bold">{matchStats.goalkeeperStats.coup_de_pied_de_but}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernStatsDashboard;