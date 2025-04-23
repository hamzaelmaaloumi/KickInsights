import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import httpService from "../../HttpService/http-service";
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, 
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  RadialBarChart, RadialBar
} from 'recharts';

// Basic player statistics
export interface mySummary {
    id: number;
    matches: number;
    goals_scored: number;
    goals_conceded: number;
    assists: number;
  }
  
  // Offensive statistics
  export interface myAttacking {
    id: number;
    goals_per_game: string;
    penalty_goals_scored: number;
    penalty_goals_attempted: number;
    free_kick_goals_attempted: number;
    free_kick_goals_scored: number;
    goals_inside_box_attempted: number;
    goals_inside_box_scored: number;
    goals_outside_box_attempted: number;
    goals_outside_box_scored: number;
    headed_goals: number;
    hit_woodwork: number;
    left_foot_goals: number;
    right_foot_goals: number;
    big_chances_missed_per_game: string;
    big_chances_per_game: string;
    blocked_shots_per_game: string;
    corners_per_game: string;
    counter_attacks: number;
    shots_off_target_per_game: string;
    shots_on_target_per_game: string;
    successful_dribbles_per_game: string;
    total_shots_per_game: string;
  }
  
  // Passing statistics
  export interface myPassing {
    id: number;
    ball_possession_percentage: string;
    accurate_passes: number;
    accurate_passes_percentage: string;
    acc_own_half: number;
    acc_own_half_percentage: string;
    acc_opposition_half: number;
    acc_opposition_half_percentage: string;
    acc_crosses: string;
    acc_crosses_percentage: string;
    acc_long_balls: string;
    acc_long_balls_percentage: string;
  }
  
  // Defensive statistics
  export interface myDefending {
    id: number;
    clean_sheets: number;
    goals_conceded_per_game: string;
    tackles_per_game: string;
    interceptions_per_game: string;
    balls_recovered_per_game: string;
    clearance_off_line: number;
    clearances_per_game: string;
    errors_leading_to_goal: number;
    errors_leading_to_shot: number;
    last_man_tackle: number;
    penalties_committed: number;
    penalty_goals_conceded: number;
    saves_per_game: string;
  }
  
  // Duel statistics
  export interface myOther {
    id: number;
    duels_won_per_game: string;
    duels_won_percentage: string;
    ground_duels_won: string;
    ground_duels_won_percentage: string;
    aerial_duels_won: string;
    aerial_duels_won_percentage: string;
    fouls_per_game: string;
    goal_kicks_per_game: string;
    offsides_per_game: string;
    possession_lost_per_game: string;
    red_cards: number;
    throw_ins_per_game: string;
    yellow_cards_per_game: string;
  }
  

export default function OStats() {
  const opp = useParams()    
  const [summary, setSummary] = useState<mySummary>()
  const [attacking, setAttacking] = useState<myAttacking>()
  const [passing, setPassing] = useState<myPassing>()
  const [defending, setDefending] = useState<myDefending>()
  const [other, setOther] = useState<myOther>()
  const [loading, setLoading] = useState(true)

  // Color palette for charts
  const colors = {
    primary: "#4f46e5",
    secondary: "#10b981",
    accent: "#f97316",
    light: "#f3f4f6",
    dark: "#1f2937",
    danger: "#ef4444",
    warning: "#f59e0b",
  }

  useEffect(() => {
    const opponentService = new httpService("Opponent")
    const summaryService = new httpService("SSummary")
    const attackingService = new httpService("Attacking")
    const passingService = new httpService("Passing")
    const defendingService = new httpService("Defending")
    const otherService = new httpService("Other")

    const fetchData = async () => {
      setLoading(true)
      try {
        const opponentRes = await opponentService.getById(Number(opp.OId))
        const summaryRes = await summaryService.getById(opponentRes.data.summary)
        const attackingRes = await attackingService.getById(opponentRes.data.attacking)
        const passingRes = await passingService.getById(opponentRes.data.passes)
        const defendingRes = await defendingService.getById(opponentRes.data.defending)
        const otherRes = await otherService.getById(opponentRes.data.other)

        setSummary(summaryRes.data) 
        setAttacking(attackingRes.data) 
        setPassing(passingRes.data)
        setDefending(defendingRes.data)
        setOther(otherRes.data)
      } catch (err: any) {
        console.log(`an error occurred ${err.response?.data || err.message}`)
      } finally {
        setLoading(false)
      }
    }

    fetchData()  
  }, [opp.OId])

  // Format string percentages to numbers for charts
  const parsePercentage = (value: string | undefined) => {
    if (!value) return 0;
    return parseFloat(value.replace('%', ''));
  }

  // Convert string values to numbers for charts
  const parseNumericString = (value: string | undefined) => {
    if (!value) return 0;
    return parseFloat(value);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="p-8 rounded-lg shadow-md bg-white">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
            <p className="text-xl font-medium text-gray-700">Loading statistics...</p>
          </div>
        </div>
      </div>
    )
  }

  // Prepare data for charts
  const goalDistributionData = [
    { name: 'Left Foot', value: attacking?.left_foot_goals || 0 },
    { name: 'Right Foot', value: attacking?.right_foot_goals || 0 },
    { name: 'Headers', value: attacking?.headed_goals || 0 }
  ];

  const shotAccuracyData = [
    {
      name: 'Inside Box',
      scored: attacking?.goals_inside_box_scored || 0,
      attempted: attacking?.goals_inside_box_attempted || 0,
    },
    {
      name: 'Outside Box',
      scored: attacking?.goals_outside_box_scored || 0,
      attempted: attacking?.goals_outside_box_attempted || 0,
    },
    {
      name: 'Penalties',
      scored: attacking?.penalty_goals_scored || 0,
      attempted: attacking?.penalty_goals_attempted || 0,
    },
    {
      name: 'Free Kicks',
      scored: attacking?.free_kick_goals_scored || 0,
      attempted: attacking?.free_kick_goals_attempted || 0,
    }
  ];

  const duelsData = [
    { name: 'Ground Duels', value: parsePercentage(other?.ground_duels_won_percentage) },
    { name: 'Aerial Duels', value: parsePercentage(other?.aerial_duels_won_percentage) },
    { name: 'Overall Duels', value: parsePercentage(other?.duels_won_percentage) },
  ];

  const passingData = [
    { name: 'Overall', value: parsePercentage(passing?.accurate_passes_percentage) },
    { name: 'Own Half', value: parsePercentage(passing?.acc_own_half_percentage) },
    { name: 'Opp Half', value: parsePercentage(passing?.acc_opposition_half_percentage) },
    { name: 'Crosses', value: parsePercentage(passing?.acc_crosses_percentage) },
    { name: 'Long Balls', value: parsePercentage(passing?.acc_long_balls_percentage) },
  ];

  const defensiveActionsData = [
    { name: 'Tackles', value: parseNumericString(defending?.tackles_per_game) },
    { name: 'Interceptions', value: parseNumericString(defending?.interceptions_per_game) },
    { name: 'Clearances', value: parseNumericString(defending?.clearances_per_game) },
    { name: 'Balls Recovered', value: parseNumericString(defending?.balls_recovered_per_game) },
  ];

  const COLORS = [colors.primary, colors.secondary, colors.accent, colors.warning];

  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Opponent Analysis</h1>
          <p className="text-gray-500">Comprehensive statistical breakdown</p>

          {/* Summary Section */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white shadow-lg transform hover:scale-105 transition-transform">
              <h3 className="text-lg font-medium opacity-80">Matches</h3>
              <p className="text-3xl font-bold">{summary?.matches}</p>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 text-white shadow-lg transform hover:scale-105 transition-transform">
              <h3 className="text-lg font-medium opacity-80">Goals Scored</h3>
              <p className="text-3xl font-bold">{summary?.goals_scored}</p>
            </div>
            <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-lg p-6 text-white shadow-lg transform hover:scale-105 transition-transform">
              <h3 className="text-lg font-medium opacity-80">Goals Conceded</h3>
              <p className="text-3xl font-bold">{summary?.goals_conceded}</p>
            </div>
            <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg p-6 text-white shadow-lg transform hover:scale-105 transition-transform">
              <h3 className="text-lg font-medium opacity-80">Assists</h3>
              <p className="text-3xl font-bold">{summary?.assists}</p>
            </div>
          </div>

          {/* Attacking Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Attacking Performance</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Goal Distribution */}
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Goal Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={goalDistributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {goalDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}`, 'Goals']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Shot Accuracy */}
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Shot Conversion Rate</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={shotAccuracyData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="scored" name="Scored" stackId="a" fill={colors.secondary} />
                    <Bar dataKey="attempted" name="Attempted" stackId="a" fill={colors.light} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-700">Goals per Game</h3>
                  <span className="text-2xl font-bold text-blue-600">{attacking?.goals_per_game}</span>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-700">Big Chances per Game</h3>
                  <span className="text-2xl font-bold text-blue-600">{attacking?.big_chances_per_game}</span>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-700">Shots on Target per Game</h3>
                  <span className="text-2xl font-bold text-blue-600">{attacking?.shots_on_target_per_game}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Passing Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Passing & Possession</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Passing Accuracy</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart outerRadius={90} data={passingData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="name" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar
                      name="Accuracy %"
                      dataKey="value"
                      stroke={colors.primary}
                      fill={colors.primary}
                      fillOpacity={0.6}
                    />
                    <Tooltip formatter={(value) => [`${value}%`, 'Accuracy']} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Possession Distribution</h3>
                <div className="flex items-center justify-center h-64">
                  <div className="relative w-48 h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: 'Possession', value: parsePercentage(passing?.ball_possession_percentage) },
                            { name: 'Opposition', value: 100 - parsePercentage(passing?.ball_possession_percentage) },
                          ]}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          fill="#8884d8"
                          paddingAngle={5}
                          dataKey="value"
                        >
                          <Cell fill={colors.primary} />
                          <Cell fill={colors.light} />
                        </Pie>
                        <Tooltip formatter={(value) => [`${value}%`, 'Possession']} />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                      <span className="text-3xl font-bold text-gray-800">{passing?.ball_possession_percentage}</span>
                      <span className="text-sm text-gray-500">Possession</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Defending Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Defensive Performance</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Defensive Actions per Game</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={defensiveActionsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" name="Per Game" fill={colors.accent} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Duel Success Rates</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <RadialBarChart 
                    innerRadius="30%" 
                    outerRadius="100%" 
                    data={duelsData} 
                    startAngle={180} 
                    endAngle={0}
                  >
                    <RadialBar
                      minAngle={15}
                      label={{ position: 'insideStart', fill: '#fff' }}
                      background
                      clockWise={true}
                      dataKey="value"
                    >
                      {duelsData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={COLORS[index % COLORS.length]} 
                        />
                      ))}
                    </RadialBar>
                    <Legend 
                      iconSize={10} 
                      layout="vertical" 
                      verticalAlign="middle" 
                      align="right"
                      formatter={(value) => `${value} (%)` }
                    />
                    <Tooltip formatter={(value) => [`${value}%`, 'Success Rate']} />
                  </RadialBarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-700">Clean Sheets</h3>
                  <span className="text-2xl font-bold text-green-600">{defending?.clean_sheets}</span>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-700">Goals Conceded/Game</h3>
                  <span className="text-2xl font-bold text-red-600">{defending?.goals_conceded_per_game}</span>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-700">Errors to Goal</h3>
                  <span className="text-2xl font-bold text-amber-600">{defending?.errors_leading_to_goal}</span>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-700">Last Man Tackles</h3>
                  <span className="text-2xl font-bold text-blue-600">{defending?.last_man_tackle}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Discipline Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Discipline & Other Stats</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-lg shadow-md">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-yellow-400 rounded-lg flex items-center justify-center shadow-lg">
                    <span className="text-2xl font-bold text-white">{other?.yellow_cards_per_game}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700">Yellow Cards</h3>
                    <p className="text-sm text-gray-500">Per Game</p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-lg shadow-md">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-red-500 rounded-lg flex items-center justify-center shadow-lg">
                    <span className="text-2xl font-bold text-white">{other?.red_cards}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700">Red Cards</h3>
                    <p className="text-sm text-gray-500">Total</p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg shadow-md">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center shadow-lg">
                    <span className="text-2xl font-bold text-white">{other?.fouls_per_game}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700">Fouls</h3>
                    <p className="text-sm text-gray-500">Per Game</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}