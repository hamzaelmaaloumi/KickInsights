import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { TbTextScan2 } from "react-icons/tb";
import { SiLeagueoflegends } from "react-icons/si";
import match from '../../assets/match.png'
import league from '../../assets/league.png'
import player from '../../assets/player.png'
import team from '../../assets/team.png'




const API_URL = "http://127.0.0.1:8000/myapp/";
const VerticalStepProgress = () => {


    const [insurance, setInsurance] = useState(false)
    const [leagueScrapingState, setLeagueScrapingState] = useState({
        loading: false,
        alert: false,
        alertMsg: "",
        success: false,
        successMsg: "",
      });

      const [teamScrapingState, setTeamScrapingState] = useState({
        loading: false,
        alert: false,
        alertMsg: "",
        success: false,
        successMsg: "",
      });

      const [playerScrapingState, setPlayerScrapingState] = useState({
        loading: false,
        alert: false,
        alertMsg: "",
        success: false,
        successMsg: "",
      });

    const [matchScrapingState, setMatchScrapingState] = useState({
        loading: false,
        alert: false,
        alertMsg: "",
        success: false,
        successMsg: "",
      });
      
      const scrapeData = async (endpoint: string, setState: Function) => {
        setState((prev: Object) => ({ ...prev, loading: true }));
      
        try {
          await axios.get(API_URL + endpoint);
          setState({
            loading: false,
            alert: false,
            alertMsg: "",
            success: true,
            successMsg: "Scraping completed successfully! Data has been retrieved and saved",
          });
        } catch (err) {
          setState({
            loading: false,
            alert: true,
            alertMsg: `An error happened: ${err}`,
            success: false,
            successMsg: "",
          });
        }
      };
      
      const scrape_leagues = () => scrapeData("scrapLeagues/", setLeagueScrapingState);
      const scrape_teams = () => scrapeData("scrapTeams/", setTeamScrapingState);
      const scrape_players = () => scrapeData("scrapPlayers/", setPlayerScrapingState);
      const scrape_matches = () => scrapeData("scrapMatches/", setMatchScrapingState);
      
















  const nodes = [
    { id: 1, title: "Scraping the Leagues", state: leagueScrapingState, setState: setLeagueScrapingState, scrape: scrape_leagues , icon: league },
    { id: 2, title: "Scraping the Teams", state: teamScrapingState, setState: setTeamScrapingState, scrape: scrape_teams, icon: team },
    { id: 3, title: "Scraping the Players", state: playerScrapingState, setState: setPlayerScrapingState, scrape: scrape_players, icon: player },
    { id: 4, title: "Scraping the Matches", state: matchScrapingState, setState: setMatchScrapingState, scrape: scrape_matches, icon: match}
  ]



  return (
    <div className="min-h-screen bg-[#080808] font-manrope text-white p-4 md:p-8 overflow-x-hidden">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-black mb-16 text-center">
          <span className="bg-gradient-to-r from-red-600 via-red-500 to-pink-600 bg-clip-text text-transparent">
          Step-by-Step Scraping Guide
          </span>
        </h1>
        



        {/* ------------------------------------------------- WARNING ------------------------------------------------------ */}
        <div className='mb-32 mt-32'>
                                  <p className="font-manrope text-4xl font-bold mb-8 text-gray-200 relative">
                                    <span className="bg-gradient-to-r from-green-900 via-green-700 to-green-950 px-2 py-1 rounded-md">Attention:</span> Read Before Scraping
                                  </p>


                                <ul className="font-manrope text-md text-gray-400 font-semibold">
                                    <li className="flex justify-start items-start mt-2 gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" height="20" className="flex-shrink-0 mt-1 text-orange-700 text-splash"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                                        make sure your connection is stable before proceeding.
                                    </li>
                                    <li className="flex justify-start items-start mt-2 gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" height="20" className="flex-shrink-0 text-orange-700 text-splash"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                                        The scraping process may take a few minutes.
                                    </li>
                                    <li className="flex justify-start items-start mt-2 gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" height="20" className="flex-shrink-0 text-orange-700 text-splash"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                                        Ensure there is no ongoing heavy network usage.
                                    </li>
                                    <li className="flex justify-start items-start mt-2 gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" height="20" className="flex-shrink-0 mt-1 text-orange-700 text-splash"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                                        Close other unnecessary applications or browser tabs to speed up the process.
                                    </li>
                                    <li className="flex justify-start items-start mt-2 gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" height="20" className="flex-shrink-0 mt-1 text-orange-700 text-splash"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                                        The server may be temporarily unavailable at times, so please try again later if needed.
                                    </li>
                                    <li className="flex justify-start items-start mt-2 gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" height="20" className="flex-shrink-0 mt-1 text-orange-700 text-splash"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                                        Follow the scraping order carefully, as each step depends on the previous one
                                    </li>
                                </ul>

                                <div className="flex items-start justify-start mt-7">
                                    <input onClick={() => setInsurance(!insurance)} id="requirements" className="mt-1 mr-2  dark:scale-100 transition-all duration-300 ease-in-out text-green-500 dark:hover:scale-110 rounded-full dark:checked:scale-100 w-4 h-4" type="checkbox" />
                                    <label htmlFor="requirements" className="text-gray-600 font-manrope font-bold">
                                        I have reviewed and ensured all the requirements are met before proceeding.
                                    </label>
                                </div>
        </div>
















        <div className="relative pt-8 pb-20">
          {/* Main connector line with glowing effect */}
          <div className="absolute left-8 md:left-1/2 md:-ml-1 top-0 w-2 bg-gradient-to-b from-red-900/30 via-red-600/20 to-pink-900/30 h-full rounded-full">
            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-red-600 via-red-500 to-pink-600 opacity-30 blur-sm"></div>
          </div>
          
          {/* Nodes */}
          {nodes.map((node, index) => {
            const isEven = index % 2 === 0;
            
            return (
              <div 
                key={node.id} 
                className={`flex mb-32 relative ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col md:items-center`}
              >
                {/* Center Node Circle */}
                <div className="absolute left-8 md:left-1/2 md:-ml-8 top-6 z-20">
                  <div className={`
                    h-16 w-16 rounded-full border-4 flex items-center justify-center
                    transition-all duration-700 transform'border-red-500 bg-[#171720] scale-100
                  `}>
                    <span className={`text-2xl opacity-100`}>
                      <img src={node.icon} alt="" />
                    </span>
                    
                    {/* Pulse animation */}
                    {
                      <>
                        <span className="absolute inset-0 rounded-full animate-ping bg-red-600 opacity-20 duration-1000"></span>
                        <span className="absolute inset-0 rounded-full animate-pulse bg-red-500 opacity-10 duration-1500"></span>
                        <span className="absolute -inset-1 rounded-full animate-pulse bg-red-500 opacity-5 blur-sm"></span>
                      </>
                    }
                  </div>
                </div>
                
                {/* Content Box */}
                <div className={`
                  md:w-[calc(50%-4rem)] ml-24 md:ml-0 md:mr-0
                  ${isEven ? 'md:mr-16 text-left' : 'md:ml-16 text-left md:text-right'}
                  transform transition-all duration-1000 delay-100translate-y-0 opacity-100
                `}>
                  <div className={`
                    p-6 rounded-2xl
                    bg-[#141414]
                    border border-stone-800
                    shadow-[0_0_25px_rgba(180,0,0,0.05)]
                    hover:shadow-[0_0_25px_rgba(220,0,0,0.15)] 
                    transition-all duration-500
                  `}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`
                        h-6 w-1 rounded-full bg-gradient-to-b from-red-500 to-red-700
                        ${isEven ? 'order-first' : 'md:order-last'}
                      `}></div>
                      <h3 className="text-2xl font-bold text-gray-300 font-manrope">
                        {node.title}
                      </h3>
                    </div>
                    
                    <div className="relative mt-8 mx-auto w-[80%]">
                        <button onClick={()=> {insurance ? node.scrape() : null} } className={`${insurance ? 'hover:scale-105' : 'cursor-not-allowed'} group w-full transition-all duration-300 font-manrope text-white font-bold bg-red-950 px-4 py-3 rounded-lg border-2 border-gray-600`}>{node.state.loading ? <div className="mx-auto w-5 h-5 border-4 border-t-red-600 border-gray-300 rounded-full animate-spin"></div> : <div className={`flex items-center justify-center gap-2 ${insurance? 'group-hover:gap-4': ''} transition-all duration-300`} title={insurance ? '' : 'check the box above first'}>Start Scraping<TbTextScan2 className='text-2xl' /></div>}</button>
                    </div>
                    
                  </div>
                  
                  {/* Connector Line */}
                  <div className={`
                    absolute top-14 h-0.5 bg-gradient-to-r
                    ${isEven 
                      ? 'left-16 right-[calc(50%+2rem)] from-red-900/50 to-transparent md:right-auto md:w-[calc(50%-4rem)]' 
                      : 'left-16 right-[calc(50%+2rem)] from-red-900/50 to-transparent md:left-[calc(50%+2rem)] md:right-auto md:w-[calc(50%-4rem)] md:from-transparent md:to-red-900/50'
                    }
                    hidden md:block
                  `}>
                    {
                      <div className={`
                        absolute top-0 h-full w-2 bg-red-500 rounded-full
                        ${isEven ? 'animate-moveRight' : 'animate-moveLeft right-0'}
                      `}></div>
                    }
                  </div>
                </div>
                
                {/* Date/Number indicator */}
                <div className={`
                  absolute left-24 top-6 md:top-0
                  ${isEven 
                    ? 'md:left-[calc(50%+2rem)]' 
                    : 'md:right-[calc(50%+2rem)] md:left-auto'
                  }
                  transform -translate-y-8
                  transition-all duration-700 opacity-100
                `}>
                  <div className="bg-[#191921] px-4 py-1 rounded-full border border-gray-800 shadow-lg">
                    <span className={`
                      font-mono text-sm font-bold text-red-500
                    `}>PHASE {node.id}</span>
                  </div>
                </div>



                {node.state.loading &&
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-15 backdrop-blur-sm">
                  <div className="relative">
                    <div className="w-8 h-8 bg-blue-500 rounded-full absolute top-0 left-0 animate-ping"></div>
                    <div className="w-8 h-8 bg-blue-500 rounded-full absolute top-0 left-0 animate-pulse"></div>
                  </div>
                </div>}



                {node.state.alert && (
                        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/60 backdrop-blur-md">
                            <div className="transform transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
                                <div className="relative px-8 py-12 bg-gradient-to-br from-red-950 to-red-1000 border border-red-900/80 shadow-2xl shadow-red-950/70 rounded-2xl text-center max-w-md mx-auto overflow-hidden">

                                    {/* Glow effect */}
                                    <div className="absolute inset-0 rounded-2xl shadow-[inset_0_0_20px_rgba(153,27,27,0.4)] pointer-events-none"></div>

                                    {/* Animated Error Icon */}
                                    <div className="animate-float">
                                        <svg
                                            className="w-24 h-24 mx-auto text-red-400 mb-6 drop-shadow-[0_0_8px_rgba(248,113,113,0.3)]"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1.5}
                                                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 20a8 8 0 100-16 8 8 0 000 16z"
                                            />
                                            <circle
                                                cx="12"
                                                cy="12"
                                                r="11"
                                                className="stroke-red-900/40"
                                                strokeWidth={1}
                                            />
                                        </svg>
                                    </div>

                                    {/* Error Message */}
                                    <div className="relative space-y-4 z-10">
                                        <h3 className="text-2xl font-semibold bg-gradient-to-r from-red-200 to-red-400 bg-clip-text text-transparent mb-2">
                                            Oops! Something went wrong
                                        </h3>
                                        <p className="text-red-100/90 text-lg font-medium leading-relaxed tracking-tight">
                                            {node.state.alertMsg}
                                        </p>
                                    </div>

                                    {/* Close Button */}
                                    <button
                                        onClick={() => node.setState({...node.state, alert: false})}
                                        className="mt-8 px-6 py-2.5 bg-red-900/60 hover:bg-red-900 border border-red-800/50 text-red-100 rounded-lg transition-all duration-300 font-medium hover:shadow-[0_0_12px_2px_rgba(153,27,27,0.5)] hover:-translate-y-0.5"
                                    >
                                        Close
                                    </button>

                                    {/* Subtle grid overlay */}
                                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMjAwIDBIMHYyMDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzk5MWIxYiIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIvPjwvc3ZnPg==')] opacity-20 pointer-events-none"></div>
                                </div>
                            </div>
                        </div>
                    )}



                    {node.state.success && (
                        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/60 backdrop-blur-md">
                            <div className="transform transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
                                <div className="relative px-8 py-12 bg-gradient-to-br from-emerald-950 to-emerald-1000 border border-emerald-900/80 shadow-2xl shadow-emerald-950/70 rounded-2xl text-center max-w-md mx-auto overflow-hidden">

                                    {/* Glow effect */}
                                    <div className="absolute inset-0 rounded-2xl shadow-[inset_0_0_20px_rgba(6,78,59,0.4)] pointer-events-none"></div>

                                    {/* Animated Success Icon */}
                                    <div className="animate-float">
                                        <svg
                                            className="w-24 h-24 mx-auto text-emerald-400 mb-6 drop-shadow-[0_0_8px_rgba(52,211,153,0.3)]"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1.5}
                                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                            <circle
                                                cx="12"
                                                cy="12"
                                                r="11"
                                                className="stroke-emerald-900/40"
                                                strokeWidth={1}
                                            />
                                        </svg>
                                    </div>

                                    {/* Success Content */}
                                    <div className="relative space-y-4 z-10">
                                        <h3 className="text-2xl font-semibold bg-gradient-to-r from-emerald-200 to-emerald-400 bg-clip-text text-transparent mb-2">
                                            Success!
                                        </h3>
                                        <p className="text-emerald-100/90 text-lg font-medium leading-relaxed tracking-tight">
                                            {node.state.successMsg}
                                        </p>
                                    </div>

                                    {/* Close Button */}
                                    <button
                                        onClick={() => node.setState({...node.state, success: false})}
                                        className="mt-8 px-6 py-2.5 bg-emerald-900/60 hover:bg-emerald-900 border border-emerald-800/50 text-emerald-100 rounded-lg transition-all duration-300 font-medium hover:shadow-[0_0_12px_2px_rgba(6,78,59,0.5)] hover:-translate-y-0.5"
                                    >
                                        Continue
                                    </button>

                                    {/* Subtle grid overlay */}
                                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMjAwIDBIMHYyMDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzA2NGEzMSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIvPjwvc3ZnPg==')] opacity-20 pointer-events-none"></div>
                                </div>
                            </div>
                        </div>
                    )}
              </div>
            );
          })}
        </div>
      </div>
      
      
    </div>
  );
};

export default VerticalStepProgress;
