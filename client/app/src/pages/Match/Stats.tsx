import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
        console.log(error.message);
        
      }
    }
    fetchMatchStats()
  },[teamStats])

  console.log(goalkeeper);
  

  

  return (
    <div className="flex flex-col p-6 bg-black text-white items-center justify-center">
      <div className="w-full max-w-full bg-[#0c1323] border border-gray-800 shadow-xl rounded-xl p-6 transition-all duration-300 hover:shadow-2xl">
                <div className="flex flex-col items-center gap-6">
                  
                  {/* Status Badge */}
                  <div className="bg-emerald-500/10 px-4 py-1 rounded-full text-sm text-emerald-400 font-semibold uppercase tracking-wider shadow-md backdrop-blur-md">
                    Finished
                  </div>
          
                  {/* Teams & Score */}
                  <div className="w-full flex justify-between items-center gap-6">
                    
                    {/* Team A */}
                    <div className="w-1/3 flex flex-col items-center gap-2">
                      <img className="w-20 drop-shadow-lg transition-transform duration-300 hover:scale-110" src={match?.teamALogo} alt="" />
                      <span className="text-gray-200 font-bold text-2xl">{match?.teamAName}</span>
                    </div>
          
                    {/* Score */}
                    <div className="text-5xl font-extrabold text-gray-300 tracking-wide bg-gray-900 px-5 py-3 rounded-lg shadow-lg transition-all duration-300 hover:bg-gray-800 hover:text-white">
                      {match?.scoreA} - {match?.scoreB}
                    </div>
          
                    {/* Team B */}
                    <div className="w-1/3 flex flex-col items-center gap-2">
                      <img className="w-20 drop-shadow-lg transition-transform duration-300 hover:scale-110" src={match?.teamBLogo} alt="" />
                      <span className="text-gray-200 font-bold text-2xl">{match?.teamBName}</span>
                    </div>
                  </div>
          
                  {/* Match Date */}
                  <div className="text-gray-500 text-sm tracking-wide transition-all duration-300 hover:text-gray-300">
                    {typeof match?.date === 'object' ? match?.date.toLocaleDateString() : match?.date}
                  </div>
          
                  {/* League Info */}
                  <div className="flex items-center gap-3 bg-[#111] border border-gray-700 backdrop-blur-md rounded-full px-5 py-2 shadow-md transition-all duration-300 hover:bg-gray-800">
                    <img className="w-8 drop-shadow-lg" src={match?.leagueImg} alt="" />
                    <div className="text-gray-300 text-sm font-medium tracking-wide">
                      {match?.leagueName}
                    </div>
                  </div>
                </div>
      </div>





    






      
      <div className="w-full mt-4 bg-[#0c1323] text-white rounded-2xl p-8 shadow-[0_0_40px_rgba(0,86,255,0.15)] border border-[#2a3658] overflow-hidden backdrop-filter backdrop-blur-lg">
            {/* Header with team and match info */}
            <div className="mb-8 flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <img src={match?.teamALogo} alt="Team Logo" className="h-16 w-16 object-contain" />
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">{match?.teamAName}</h1>
                  <div className="flex items-center mt-1 text-sm text-gray-400">
                    <span className="inline-block h-3 w-3 rounded-full bg-green-500 mr-2"></span>
                    <span>{match?.leagueName}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center px-6 py-3 bg-[#1a2138] rounded-lg">
                <span className="text-3xl font-bold text-blue-400">{match?.scoreA}</span>
                <span className="mx-3 text-gray-500">-</span>
                <span className="text-3xl font-bold text-red-400">{match?.scoreB}</span>
              </div>
            </div>

            {/* Summary Section with key stats */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-[#151f38] rounded-xl p-6 shadow-lg border border-[#2a3658]">
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                  </svg>
                  <span>Match Summary</span>
                </h2>
                
                {/* Possession bar */}
                <div className="mb-5">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-blue-400">Possession</span>
                    <span className="font-bold">{summary?.possession || "0%"}</span>
                  </div>
                  <div className="h-2 bg-[#0c1323] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500" style={{ width: summary?.possession }}></div>
                  </div>
                </div>
                
                {/* Summary stats grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col bg-[#1a2138] p-3 rounded-lg border border-[#2a3658]">
                    <span className="text-xs text-gray-400">Total Shots</span>
                    <span className="text-2xl font-bold text-white">{summary?.total_tirs || 0}</span>
                  </div>
                  <div className="flex flex-col bg-[#1a2138] p-3 rounded-lg border border-[#2a3658]">
                    <span className="text-xs text-gray-400">Corners</span>
                    <span className="text-2xl font-bold text-white">{summary?.corner || 0}</span>
                  </div>
                  <div className="flex flex-col bg-[#1a2138] p-3 rounded-lg border border-[#2a3658]">
                    <span className="text-xs text-gray-400">Fouls</span>
                    <span className="text-2xl font-bold text-white">{summary?.fautes || 0}</span>
                  </div>
                  <div className="flex flex-col bg-[#1a2138] p-3 rounded-lg border border-[#2a3658]">
                    <span className="text-xs text-gray-400">Yellow Cards</span>
                    <span className="text-2xl font-bold text-yellow-400">{summary?.cartons_jaunes || 0}</span>
                  </div>
                  <div className="flex flex-col bg-[#1a2138] p-3 rounded-lg border border-[#2a3658]">
                    <span className="text-xs text-gray-400">Free Kicks</span>
                    <span className="text-2xl font-bold text-white">{summary?.coups_francs || 0}</span>
                  </div>
                  <div className="flex flex-col bg-[#1a2138] p-3 rounded-lg border border-[#2a3658]">
                    <span className="text-xs text-gray-400">Big Chances</span>
                    <span className="text-2xl font-bold text-white">{summary?.grandes_chances || 0}</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#151f38] rounded-xl p-6 shadow-lg border border-[#2a3658]">
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  <span>Shooting Analysis</span>
                </h2>
                
                {/* Recharts Bar Chart for shooting stats */}
                <div className="h-[200px] mb-4">
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
                      <XAxis dataKey="name" tick={{ fill: '#8b9cb6', fontSize: 10 }} axisLine={{ stroke: '#2a3658' }} />
                      <YAxis tick={{ fill: '#8b9cb6', fontSize: 10 }} axisLine={{ stroke: '#2a3658' }} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1a2138', borderColor: '#2a3658', borderRadius: '8px' }}
                        itemStyle={{ color: '#fff' }}
                      />
                      <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                        <rect fill="url(#shootingGradient0)" />
                        <rect fill="url(#shootingGradient1)" />
                        <rect fill="url(#shootingGradient2)" />
                        <rect fill="url(#shootingGradient3)" />
                        <rect fill="url(#shootingGradient4)" />
                      </Bar>
                      <defs>
                        <linearGradient id="shootingGradient0" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#4f46e5" stopOpacity={1} />
                          <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.8} />
                        </linearGradient>
                        <linearGradient id="shootingGradient1" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#10b981" stopOpacity={1} />
                          <stop offset="100%" stopColor="#059669" stopOpacity={0.8} />
                        </linearGradient>
                        <linearGradient id="shootingGradient2" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#f59e0b" stopOpacity={1} />
                          <stop offset="100%" stopColor="#d97706" stopOpacity={0.8} />
                        </linearGradient>
                        <linearGradient id="shootingGradient3" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#6366f1" stopOpacity={1} />
                          <stop offset="100%" stopColor="#4f46e5" stopOpacity={0.8} />
                        </linearGradient>
                        <linearGradient id="shootingGradient4" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#ec4899" stopOpacity={1} />
                          <stop offset="100%" stopColor="#d946ef" stopOpacity={0.8} />
                        </linearGradient>
                      </defs>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                {/* Shot zones */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col bg-[#1a2138] p-3 rounded-lg border border-[#2a3658]">
                    <span className="text-xs text-gray-400">Inside Box</span>
                    <span className="text-2xl font-bold text-white">{shoot?.tirs_dans_surface || 0}</span>
                  </div>
                  <div className="flex flex-col bg-[#1a2138] p-3 rounded-lg border border-[#2a3658]">
                    <span className="text-xs text-gray-400">Outside Box</span>
                    <span className="text-2xl font-bold text-white">{shoot?.tirs_hors_surface || 0}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Advanced Stats Sections - 3 columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Passing Section */}
              <div className="bg-[#151f38] rounded-xl p-6 shadow-lg border border-[#2a3658]">
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11l5-5m0 0l5 5m-5-5v12"></path>
                  </svg>
                  <span>Passing</span>
                </h2>
                
                <div className="bg-[#1a2138] p-4 rounded-lg mb-4 border border-[#2a3658]">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Accurate Passes</span>
                    <span className="text-xl font-bold">{passes?.passes_precises || 0}</span>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-gray-400">Final Third</span>
                    <span className="text-xl font-bold">{passes?.dans_le_dernier_tiers || "0/0"}</span>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-gray-400">Into Final Third</span>
                    <span className="text-xl font-bold">{passes?.passes_vers_dernier_tiers || 0}</span>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-gray-400">Long Balls</span>
                    <span className="text-xl font-bold">{passes?.longs_ballons || "0/0"}</span>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-gray-400">Crosses</span>
                    <span className="text-xl font-bold">{passes?.transversales || "0/0"}</span>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-gray-400">Ball Touches</span>
                    <span className="text-xl font-bold">{passes?.touches || 0}</span>
                  </div>
                </div>
              </div>
              
              {/* Duels Section */}
              <div className="bg-[#151f38] rounded-xl p-6 shadow-lg border border-[#2a3658]">
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                  <span>Duels</span>
                </h2>
                
                <div className="flex justify-around mb-5">
                  <div className="text-center">
                    <div className="relative w-20 h-20">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse opacity-30"></div>
                      <div className="absolute inset-1 rounded-full bg-[#1a2138] flex items-center justify-center">
                        <span className="text-xl font-bold">{dual?.duels || "0%"}</span>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-400">Duels Won</p>
                  </div>
                  <div className="text-center">
                    <div className="relative w-20 h-20">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-500 to-teal-500 animate-pulse opacity-30"></div>
                      <div className="absolute inset-1 rounded-full bg-[#1a2138] flex items-center justify-center">
                        <span className="text-xl font-bold">{dual?.duels_aeriens || "0/0"}</span>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-400">Aerial Duels</p>
                  </div>
                </div>
                
                <div className="bg-[#1a2138] p-4 rounded-lg border border-[#2a3658]">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Ground Duels</span>
                    <span className="text-xl font-bold">{dual?.duels_sol || "0/0"}</span>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-gray-400">Dribbles</span>
                    <span className="text-xl font-bold">{dual?.dribbles || "0/0"}</span>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-gray-400">Ball Losses</span>
                    <span className="text-xl font-bold">{dual?.pertes_balle || 0}</span>
                  </div>
                </div>
              </div>
              
              {/* Defense Section */}
              <div className="bg-[#151f38] rounded-xl p-6 shadow-lg border border-[#2a3658]">
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                  </svg>
                  <span>Defense</span>
                </h2>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Tackles Won</span>
                    <span className="font-bold">{defense?.tacles_gagnes || "0%"}</span>
                  </div>
                  <div className="h-2 bg-[#0c1323] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-green-500 to-emerald-500" 
                      style={{ width: defense?.tacles_gagnes?.replace('%', '') + '%' || "0%" }}
                    ></div>
                  </div>
                </div>
                
                <div className="bg-[#1a2138] p-4 rounded-lg border border-[#2a3658]">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-400">Total Tackles</p>
                      <p className="text-xl font-bold">{defense?.tacles_totaux || 0}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Interceptions</p>
                      <p className="text-xl font-bold">{defense?.interceptions || 0}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Clearances</p>
                      <p className="text-xl font-bold">{defense?.degagements || 0}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Ball Recoveries</p>
                      <p className="text-xl font-bold">{defense?.recuperations || 0}</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#2a3658]">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400">Errors Leading to Goal</span>
                      <span className="text-xl font-bold text-red-500">{defense?.erreurs_menant_a_un_but || 0}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Row - 2 columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Attack Section */}
              <div className="bg-[#151f38] rounded-xl p-6 shadow-lg border border-[#2a3658]">
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                  <span>Attack</span>
                </h2>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="relative bg-[#1a2138] p-4 rounded-lg border border-[#2a3658] overflow-hidden">
                    <div className="relative z-10">
                      <p className="text-xs text-gray-400">Big Chances Created</p>
                      <p className="text-3xl font-bold">{attack?.grosses_occasions_realisees || 0}</p>
                    </div>
                    <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl"></div>
                  </div>
                  <div className="relative bg-[#1a2138] p-4 rounded-lg border border-[#2a3658] overflow-hidden">
                    <div className="relative z-10">
                      <p className="text-xs text-gray-400">Big Chances Missed</p>
                      <p className="text-3xl font-bold">{attack?.grosses_occasions_manquees || 0}</p>
                    </div>
                    <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-r from-red-500/20 to-orange-500/20 blur-xl"></div>
                  </div>
                </div>
                
                <div className="bg-[#1a2138] p-4 rounded-lg border border-[#2a3658]">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Offsides</span>
                    <span className="text-xl font-bold">{attack?.hors_jeux || 0}</span>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-gray-400">Tackles Received in Final Third</span>
                    <span className="text-xl font-bold">{attack?.tacles_recus_dernier_tiers || 0}</span>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-gray-400">Touches in Opponent Box</span>
                    <span className="text-xl font-bold">{attack?.touchers_surface_reparation || 0}</span>
                  </div>
                </div>
              </div>
              
              {/* Goalkeeper Section */}
              <div className="bg-[#151f38] rounded-xl p-6 shadow-lg border border-[#2a3658]">
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                  </svg>
                  <span>Goalkeeper</span>
                </h2>
                
                <div className="flex justify-center mb-6">
                  <div className="relative w-32 h-32">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse opacity-20"></div>
                    <div className="absolute inset-2 rounded-full bg-[#1a2138] flex flex-col items-center justify-center border-4 border-[#2a3658]">
                      <span className="text-4xl font-bold text-blue-400">{goalkeeper?.arrets_du_gardien || 0}</span>
                      <span className="text-sm text-gray-400 mt-1">Saves</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#1a2138] p-4 rounded-lg border border-[#2a3658]">
                    <p className="text-xs text-gray-400">Aerial Claims</p>
                    <p className="text-2xl font-bold">{goalkeeper?.sorties_aeriennes || 0}</p>
                  </div>
                  <div className="bg-[#1a2138] p-4 rounded-lg border border-[#2a3658]">
                    <p className="text-xs text-gray-400">Goal Kicks</p>
                    <p className="text-2xl font-bold">{goalkeeper?.coup_de_pied_de_but || 0}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Hidden gradients for SVG elements */}
            <svg width="0" height="0" className="absolute">
              <defs>
                <linearGradient id="blue-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </svg>
      </div>





      
    </div>
  );
  
};
export default Stats;