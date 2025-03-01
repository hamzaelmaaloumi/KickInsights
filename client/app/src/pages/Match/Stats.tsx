import { useEffect, useState } from "react";
import { matchRoutes, useParams } from "react-router-dom";
import httpService from "../../HttpService/http-service";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';


interface match {
  id: number,
  date: Date,
  league: number,
  scoreA: number,
  scoreB: number,
  state: string,
  teamA: number,
  teamB: number,
  teamAName: string,
  teamALogo: string,
  teamBName: string,
  teamBLogo: string,
  leagueName: string,
  leagueImg: string,
}
interface teamStatsProps{
  summary: number
  shoots: number
  passes: number
  duals: number
  defense: number
  attack: number
  goalkeeper: number
}
interface mySummary {
  arrets_gardien: number;
  cartons_jaunes: number;
  corner: number;
  coups_francs: number;
  fautes: number;
  grandes_chances: number;
  id: number;
  passes: number;
  possession: string; // Percentage is a string
  tacles: number;
  total_tirs: number;
}
interface myAttack {
  grosses_occasions_manquees: number;
  grosses_occasions_realisees: number;
  hors_jeux: number;
  id: number;
  tacles_recus_dernier_tiers: number;
  touchers_surface_reparation: number;
}
interface myShoot {
  frappe_sur_poteau: number;
  id: number;
  tirs_bloques: number;
  tirs_cadres: number;
  tirs_dans_surface: number;
  tirs_hors_surface: number;
  tirs_non_cadres: number;
  total_tirs: number;
}
interface myPasses {
  dans_le_dernier_tiers: string; // "138/184" format
  id: number;
  longs_ballons: string; // "43/59" format
  passes_precises: number;
  passes_vers_dernier_tiers: number;
  touches: number;
  transversales: string; // "8/17" format
}
interface myDual {
  dribbles: string; // "10/21" format
  duels: string; // "53%" format
  duels_aeriens: string; // "9/18" format
  duels_sol: string; // "33/62" format
  id: number;
  pertes_balle: number;
}
interface myDefense {
  degagements: number;
  erreurs_menant_a_un_but: number;
  id: number;
  interceptions: number;
  recuperations: number;
  tacles_gagnes: string; // "45%" format
  tacles_totaux: number;
}
interface myGoalKeeper {
  arrets_du_gardien: number;
  coup_de_pied_de_but: number;
  id: number;
  sorties_aeriennes: number;
}








export const Stats = () => {
  const matchey = useParams()
  const matchService = new httpService("Match")
  const leagueService = new httpService("League")
  const teamService = new httpService("Team")
  const [match, setMatch] = useState<match>()
  const teamStatsService = new httpService("TeamStats")
  const [teamStats, setTeamStats] = useState<teamStatsProps>()
  const summaryService = new httpService("Summary")
  const [summary, setSummary] = useState<mySummary>()
  const attackService = new httpService("Attack")
  const [attack, setAttack] = useState<myAttack>()
  const shootService = new httpService("Shoot")
  const [shoot, setShoot] = useState<myShoot>()
  const passesService = new httpService("Passes")
  const [passes, setPasses] = useState<myPasses>()
  const dualService = new httpService("Dual")
  const [dual, setDual] = useState<myDual>()
  const defenseService = new httpService("Defense")
  const [defense, setDefense] = useState<myDefense>()
  const goalkeeperService = new httpService("Goalkeeper")
  const [goalkeeper, setGoalkeeper] = useState<myGoalKeeper>()

  const [matchStatsError, setMatchStatsError] = useState(false)


  useEffect(() => {
    const fetchMatchData = async () => {
      try{
        const matchRes = await matchService.getById(Number(matchey.matchId))
        const leagueRes = await leagueService.getById(matchRes.data.league)
        const teamARes = await teamService.getById(matchRes.data.teamA)
        const teamBRes = await teamService.getById(matchRes.data.teamB)
        const teamStats = await teamStatsService.getById(Number(matchey.matchId))
        setTeamStats({
          summary: teamStats.data.sommaire,
          shoots: teamStats.data.tirs,
          passes: teamStats.data.passes,
          duals: teamStats.data.duels,
          defense: teamStats.data.defense,
          attack: teamStats.data.attaque,
          goalkeeper: teamStats.data.GardienDeBut
        })

        setMatch({
          ...matchRes.data, teamAName: teamARes.data.name, teamALogo: teamARes.data.image,
          teamBName: teamBRes.data.name, teamBLogo: teamBRes.data.image,
          leagueName: leagueRes.data.league_name, leagueImg: leagueRes.data.image
        })
      }catch(error: any){
        console.log(error.message)
      }
    }
    fetchMatchData()
  }, [])


  useEffect(()=> {
    const fetchMatchStats = async () => {
      if (!teamStats) return;
      try{
        const summaryRes = await summaryService.getById(teamStats?.summary)
        const shootsRes = await shootService.getById(teamStats?.shoots)
        const passesRes = await passesService.getById(teamStats?.passes)
        const dualsRes = await dualService.getById(teamStats?.duals)
        const defenseRes = await defenseService.getById(teamStats?.defense)
        const attackRes = await attackService.getById(teamStats?.attack)
        const goalkeeperRes = await goalkeeperService.getById(teamStats?.goalkeeper)
        
        setSummary(summaryRes.data); setShoot(shootsRes.data); setPasses(passesRes.data)
        setDual(dualsRes.data); setDefense(defenseRes.data); setAttack(attackRes.data)
        setGoalkeeper(goalkeeperRes.data)
      }catch(error){
        setMatchStatsError(true)
        
      }
    }
    fetchMatchStats()
  },[teamStats])

  console.log(match?.teamBLogo);
  

  

  return (
    <div className="font-manrope flex flex-col p-6 bg-black text-white items-center justify-center min-h-screen">
      <div className="w-full max-w-full bg-gradient-to-br from-gray-900 to-gray-850 shadow-2xl rounded-2xl p-8 transition-all duration-500 hover:shadow-[0_0_50px_rgba(108,0,255,0.1)]">
        <div className="flex flex-col items-center gap-8">
          {/* Status Badge */}
          <div className="bg-gradient-to-r from-emerald-900/20 to-emerald-700/20 px-5 py-2 rounded-full text-sm text-emerald-300 font-semibold uppercase tracking-widest shadow-lg backdrop-blur-xl border border-emerald-900/50">
            Finished
          </div>

          {/* Teams & Score */}
          <div className="w-full flex justify-between items-center gap-8">
            {/* Team A */}
            <div className="w-1/3 flex flex-col items-center gap-3">
              <img className="w-24 drop-shadow-xl transition-transform duration-500 hover:scale-115 hover:rotate-3" src={match?.teamALogo} alt="" />
              <span className="text-gray-100 font-extrabold text-3xl tracking-tight">{match?.teamAName}</span>
            </div>

            {/* Score */}
            <div className="text-6xl font-black text-gray-200 tracking-wider bg-gradient-to-r from-gray-800 to-gray-900 px-8 py-4 rounded-xl shadow-inner transition-all duration-300 hover:bg-gray-700 hover:text-white hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] ">
              {match?.scoreA} - {match?.scoreB}
            </div>

            {/* Team B */}
            <div className="w-1/3 flex flex-col items-center gap-3">
              <img className="w-24 drop-shadow-xl transition-transform duration-500 hover:scale-115 hover:-rotate-3" src={match?.teamBLogo} alt="" />
              <span className="text-gray-100 font-extrabold text-3xl tracking-tight">{match?.teamBName}</span>
            </div>
          </div>

          {/* Match Date */}
          <div className="text-gray-400 text-sm tracking-widest transition-all duration-300 hover:text-gray-200 italic">
            {typeof match?.date === 'object' ? match?.date.toLocaleDateString() : match?.date}
          </div>

          {/* League Info */}
          <div className="flex items-center gap-4 bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 backdrop-blur-xl rounded-full px-6 py-3 shadow-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(108,0,255,0.2)]">
            <img className="w-10 drop-shadow-md" src={match?.leagueImg} alt="" />
            <div className="text-gray-200 text-base font-semibold tracking-wider">
              {match?.leagueName}
            </div>
          </div>
        </div>
      </div>












      

      {matchStatsError ? <h1 className="font-manrope text-4xl my-16">We’re having trouble retrieving stats right now. Please try again later.</h1> 
      :
       <div className="w-full mt-6 bg-gradient-to-br from-gray-900 to-gray-850 text-white rounded-3xl p-10 shadow-[0_0_60px_rgba(108,0,255,0.15)] border border-gray-700 overflow-hidden backdrop-filter backdrop-blur-2xl">
        {/* Header with team and match info */}
        <div className="mb-10 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <img src={"https://img.sofascore.com/api/v1/team/4778/image"} alt="Team Logo" className="h-20 w-20 object-contain drop-shadow-lg" />
            <div>
              <h1 className="text-4xl font-extrabold bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent tracking-tight">Maroc</h1>
              <div className="flex items-center mt-2 text-sm text-gray-300">
                <span className="inline-block h-4 w-4 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 mr-3 shadow-md"></span>
                <span>{match?.leagueName}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center px-8 py-4 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl shadow-inner border border-gray-700">
            <span className="text-4xl font-extrabold text-purple-400">{match?.scoreA}</span>
            <span className="mx-4 text-gray-400 text-2xl">-</span>
            <span className="text-4xl font-extrabold text-red-500">{match?.scoreB}</span>
          </div>
        </div>

        {/* Summary Section with key stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          <div className="bg-gradient-to-br from-gray-850 to-gray-900 rounded-2xl p-8 shadow-xl border border-gray-700">
            <h2 className="text-2xl font-bold mb-6 flex items-center text-gray-100">
              <svg className="w-6 h-6 mr-3 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
              <span>Match Summary</span>
            </h2>
            {/* Possession bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-purple-400">Possession</span>
                <span className="font-bold text-gray-200">{summary?.possession || "0%"}</span>
              </div>
              <div className="h-3 bg-gray-800 rounded-full overflow-hidden shadow-inner">
                <div className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 transition-all duration-500" style={{ width: summary?.possession }}></div>
              </div>
            </div>
            {/* Summary stats grid */}
            <div className="grid grid-cols-2 gap-6">
              {[
                { label: "Total Shots", value: summary?.total_tirs || 0 },
                { label: "Corners", value: summary?.corner || 0 },
                { label: "Fouls", value: summary?.fautes || 0 },
                { label: "Yellow Cards", value: summary?.cartons_jaunes || 0, color: "text-yellow-400" },
                { label: "Free Kicks", value: summary?.coups_francs || 0 },
                { label: "Big Chances", value: summary?.grandes_chances || 0 },
              ].map((stat, index) => (
                <div key={index} className="flex flex-col bg-gradient-to-br from-gray-800 to-gray-850 p-4 rounded-xl border border-gray-700 shadow-md">
                  <span className="text-xs text-gray-400">{stat.label}</span>
                  <span className={`text-2xl font-extrabold ${stat.color || "text-white"}`}>{stat.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Shooting Analysis */}
          <div className="bg-gradient-to-br from-gray-850 to-gray-900 rounded-2xl p-8 shadow-xl border border-gray-700">
            <h2 className="text-2xl font-bold mb-6 flex items-center text-gray-100">
              <svg className="w-6 h-6 mr-3 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <span>Shooting Analysis</span>
            </h2>
            {/* Placeholder for BarChart - assuming you have Recharts imported */}
            <div className="h-[220px] mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={[
                    { name: 'Total', value: shoot?.total_tirs || 0 },
                    { name: 'On Target', value: shoot?.tirs_cadres || 0 },
                    { name: 'Off Target', value: shoot?.tirs_non_cadres || 0 },
                    { name: 'Blocked', value: shoot?.tirs_bloques || 0 },
                    { name: 'Woodwork', value: shoot?.frappe_sur_poteau || 0 }
                  ]}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <XAxis dataKey="name" tick={{ fill: '#9ca3af', fontSize: 12 }} axisLine={{ stroke: '#374151' }} />
                  <YAxis tick={{ fill: '#9ca3af', fontSize: 12 }} axisLine={{ stroke: '#374151' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]} fill="url(#shootingGradient)" />
                  <defs>
                    <linearGradient id="shootingGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#9333ea" stopOpacity={1} />
                      <stop offset="100%" stopColor="#4c1d95" stopOpacity={0.8} />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col bg-gradient-to-br from-gray-800 to-gray-850 p-4 rounded-xl border border-gray-700 shadow-md">
                <span className="text-xs text-gray-400">Inside Box</span>
                <span className="text-2xl font-extrabold text-white">{shoot?.tirs_dans_surface || 0}</span>
              </div>
              <div className="flex flex-col bg-gradient-to-br from-gray-800 to-gray-850 p-4 rounded-xl border border-gray-700 shadow-md">
                <span className="text-xs text-gray-400">Outside Box</span>
                <span className="text-2xl font-extrabold text-white">{shoot?.tirs_hors_surface || 0}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Stats Sections - 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Passing Section */}
          <div className="bg-gradient-to-br from-gray-850 to-gray-900 rounded-2xl p-8 shadow-xl border border-gray-700">
            <h2 className="text-2xl font-bold mb-6 flex items-center text-gray-100">
              <svg className="w-6 h-6 mr-3 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11l5-5m0 0l5 5m-5-5v12"></path>
              </svg>
              <span>Passing</span>
            </h2>
            <div className="bg-gradient-to-br from-gray-800 to-gray-850 p-5 rounded-xl border border-gray-700 shadow-md">
              {[
                { label: "Accurate Passes", value: passes?.passes_precises || 0 },
                { label: "Final Third", value: passes?.dans_le_dernier_tiers || "0/0" },
                { label: "Into Final Third", value: passes?.passes_vers_dernier_tiers || 0 },
                { label: "Long Balls", value: passes?.longs_ballons || "0/0" },
                { label: "Crosses", value: passes?.transversales || "0/0" },
                { label: "Ball Touches", value: passes?.touches || 0 }
              ].map((stat, index) => (
                <div key={index} className="flex justify-between items-center py-2">
                  <span className="text-gray-400 text-sm">{stat.label}</span>
                  <span className="text-xl font-bold text-white">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Duels Section */}
          <div className="bg-gradient-to-br from-gray-850 to-gray-900 rounded-2xl p-8 shadow-xl border border-gray-700">
            <h2 className="text-2xl font-bold mb-6 flex items-center text-gray-100">
              <svg className="w-6 h-6 mr-3 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
              <span>Duels</span>
            </h2>
            <div className="flex justify-around mb-6">
              <div className="text-center">
                <div className="relative w-24 h-24">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 animate-pulse opacity-20"></div>
                  <div className="absolute inset-1 rounded-full bg-gray-800 flex items-center justify-center border border-gray-700">
                    <span className="text-2xl font-bold text-white">{dual?.duels || "0%"}</span>
                  </div>
                </div>
                <p className="mt-3 text-sm text-gray-400">Duels Won</p>
              </div>
              <div className="text-center">
                <div className="relative w-24 h-24">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 animate-pulse opacity-20"></div>
                  <div className="absolute inset-1 rounded-full bg-gray-800 flex items-center justify-center border border-gray-700">
                    <span className="text-2xl font-bold text-white">{dual?.duels_aeriens || "0/0"}</span>
                  </div>
                </div>
                <p className="mt-3 text-sm text-gray-400">Aerial Duels</p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-gray-800 to-gray-850 p-5 rounded-xl border border-gray-700 shadow-md">
              {[
                { label: "Ground Duels", value: dual?.duels_sol || "0/0" },
                { label: "Dribbles", value: dual?.dribbles || "0/0" },
                { label: "Ball Losses", value: dual?.pertes_balle || 0 }
              ].map((stat, index) => (
                <div key={index} className="flex justify-between items-center py-2">
                  <span className="text-gray-400 text-sm">{stat.label}</span>
                  <span className="text-xl font-bold text-white">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Defense Section */}
          <div className="bg-gradient-to-br from-gray-850 to-gray-900 rounded-2xl p-8 shadow-xl border border-gray-700">
            <h2 className="text-2xl font-bold mb-6 flex items-center text-gray-100">
              <svg className="w-6 h-6 mr-3 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
              <span>Defense</span>
            </h2>
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-purple-400">Tackles Won</span>
                <span className="font-bold text-gray-200">{defense?.tacles_gagnes || "0%"}</span>
              </div>
              <div className="h-3 bg-gray-800 rounded-full overflow-hidden shadow-inner">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-600 to-teal-600 transition-all duration-500" 
                  style={{ width: defense?.tacles_gagnes?.replace('%', '') + '%' || "0%" }}
                ></div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-gray-800 to-gray-850 p-5 rounded-xl border border-gray-700 shadow-md">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Total Tackles", value: defense?.tacles_totaux || 0 },
                  { label: "Interceptions", value: defense?.interceptions || 0 },
                  { label: "Clearances", value: defense?.degagements || 0 },
                  { label: "Ball Recoveries", value: defense?.recuperations || 0 }
                ].map((stat, index) => (
                  <div key={index}>
                    <p className="text-xs text-gray-400">{stat.label}</p>
                    <p className="text-xl font-bold text-white">{stat.value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 pt-4 border-t border-gray-700">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400">Errors Leading to Goal</span>
                  <span className="text-xl font-bold text-red-500">{defense?.erreurs_menant_a_un_but || 0}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row - 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Attack Section */}
          <div className="bg-gradient-to-br from-gray-850 to-gray-900 rounded-2xl p-8 shadow-xl border border-gray-700">
            <h2 className="text-2xl font-bold mb-6 flex items-center text-gray-100">
              <svg className="w-6 h-6 mr-3 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
              <span>Attack</span>
            </h2>
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="relative bg-gradient-to-br from-gray-800 to-gray-850 p-5 rounded-xl border border-gray-700 shadow-md overflow-hidden">
                <div className="relative z-10">
                  <p className="text-xs text-gray-400">Big Chances Created</p>
                  <p className="text-4xl font-extrabold text-white">{attack?.grosses_occasions_realisees || 0}</p>
                </div>
                <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-gradient-to-r from-purple-600/20 to-indigo-600/20 blur-2xl"></div>
              </div>
              <div className="relative bg-gradient-to-br from-gray-800 to-gray-850 p-5 rounded-xl border border-gray-700 shadow-md overflow-hidden">
                <div className="relative z-10">
                  <p className="text-xs text-gray-400">Big Chances Missed</p>
                  <p className="text-4xl font-extrabold text-white">{attack?.grosses_occasions_manquees || 0}</p>
                </div>
                <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-gradient-to-r from-red-600/20 to-orange-600/20 blur-2xl"></div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-gray-800 to-gray-850 p-5 rounded-xl border border-gray-700 shadow-md">
              {[
                { label: "Offsides", value: attack?.hors_jeux || 0 },
                { label: "Tackles Received in Final Third", value: attack?.tacles_recus_dernier_tiers || 0 },
                { label: "Touches in Opponent Box", value: attack?.touchers_surface_reparation || 0 }
              ].map((stat, index) => (
                <div key={index} className="flex justify-between items-center py-2">
                  <span className="text-gray-400 text-sm">{stat.label}</span>
                  <span className="text-xl font-bold text-white">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Goalkeeper Section */}
          <div className="bg-gradient-to-br from-gray-850 to-gray-900 rounded-2xl p-8 shadow-xl border border-gray-700">
            <h2 className="text-2xl font-bold mb-6 flex items-center text-gray-100">
              <svg className="w-6 h-6 mr-3 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
              </svg>
              <span>Goalkeeper</span>
            </h2>
            <div className="flex justify-center mb-8">
              <div className="relative w-36 h-36">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 animate-pulse opacity-15"></div>
                <div className="absolute inset-2 rounded-full bg-gray-800 flex flex-col items-center justify-center border-4 border-gray-700 shadow-inner">
                  <span className="text-5xl font-extrabold text-purple-400">{goalkeeper?.arrets_du_gardien || 0}</span>
                  <span className="text-sm text-gray-400 mt-2">Saves</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { label: "Aerial Claims", value: goalkeeper?.sorties_aeriennes || 0 },
                { label: "Goal Kicks", value: goalkeeper?.coup_de_pied_de_but || 0 }
              ].map((stat, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-800 to-gray-850 p-5 rounded-xl border border-gray-700 shadow-md">
                  <p className="text-xs text-gray-400">{stat.label}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>}
    </div>
  );
  
};
export default Stats;