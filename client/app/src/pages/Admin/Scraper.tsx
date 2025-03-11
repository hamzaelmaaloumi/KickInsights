import axios from "axios";
import { useState } from "react";


const API_URL = "http://127.0.0.1:8000/myapp/";


export default function Scraper() {

    const [leagueScrapingState, setLeagueScrapingState] = useState({
        loading: false,
        alert: false,
        alertMsg: "",
        success: false,
        successMsg: "",
        insurance: false,
      });

      const [teamScrapingState, setTeamScrapingState] = useState({
        loading: false,
        alert: false,
        alertMsg: "",
        success: false,
        successMsg: "",
        insurance: false,
      });

      const [playerScrapingState, setPlayerScrapingState] = useState({
        loading: false,
        alert: false,
        alertMsg: "",
        success: false,
        successMsg: "",
        insurance: false,
      });

    const [matchScrapingState, setMatchScrapingState] = useState({
        loading: false,
        alert: false,
        alertMsg: "",
        success: false,
        successMsg: "",
        insurance: false,
      });
      
      const scrapeData = async (endpoint: String, setState: Function) => {
        setState((prev: Object) => ({ ...prev, loading: true }));
      
        try {
          await axios.get(API_URL + endpoint);
          setState({
            loading: false,
            alert: false,
            alertMsg: "",
            success: true,
            successMsg: "Scraping completed successfully! Data has been retrieved and saved",
            insurance: false
          });
        } catch (err) {
          setState({
            loading: false,
            alert: true,
            alertMsg: `An error happened: ${err}`,
            success: false,
            successMsg: "",
            insurance: false
          });
        }
      };
      
      const scrape_leagues = () => scrapeData("scrapLeagues/", setLeagueScrapingState);
      const scrape_teams = () => scrapeData("scrapTeams/", setTeamScrapingState);
      const scrape_players = () => scrapeData("scrapPlayers/", setPlayerScrapingState);
      const scrape_matches = () => scrapeData("scrapMatches/", setMatchScrapingState);
      



    return (
        <div className="h-full w-full flex flex-col bg-black">
{/* ------------------------------------------- for matches ------------------------------------------- */}
                            <div className="bg-black px-7 py-11 my-4 rounded-2xl border-4 border-stone-900 w-[40%] mx-auto flex flex-col items-center gap-11">
                                <p className="font-manrope text-4xl text-gray-200 font-bold">scraping the leagues</p>

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
                                </ul>

                                <div className="flex items-start justify-center">
                                    <input onClick={() => setLeagueScrapingState({...leagueScrapingState, insurance: !leagueScrapingState.insurance})} id="requirements" className="mt-1 mr-2  dark:scale-100 transition-all duration-300 ease-in-out text-red-500 dark:hover:scale-110 rounded-full dark:checked:scale-100 w-4 h-4" type="checkbox" />
                                    <label htmlFor="requirements" className="text-gray-600 font-manrope font-bold">
                                        I have reviewed and ensured all the requirements are met before proceeding.
                                    </label>
                                </div>

                                <div className="relative mx-auto w-[80%]">
                                    <button onClick={leagueScrapingState.insurance ? () => { scrape_leagues() } : undefined} className={`w-full ${leagueScrapingState.insurance ? 'hover:scale-105' : 'cursor-not-allowed'} transition-all duration-300 font-manrope text-white font-bold bg-red-950 px-4 py-3 rounded-lg border-2 border-gray-600`}>{leagueScrapingState.loading ? <div className="mx-auto w-5 h-5 border-4 border-t-red-600 border-gray-300 rounded-full animate-spin"></div> : 'Scrape the leagues'}</button>
                                </div>
                            </div>
                            {leagueScrapingState.alert && (
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
                                                    {leagueScrapingState.alertMsg}
                                                </p>
                                            </div>

                                            {/* Close Button */}
                                            <button
                                                onClick={() => setLeagueScrapingState({...leagueScrapingState, alert: false})}
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



                            {leagueScrapingState.success && (
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
                                                    {leagueScrapingState.successMsg}
                                                </p>
                                            </div>

                                            {/* Close Button */}
                                            <button
                                                onClick={() => setLeagueScrapingState({...leagueScrapingState, success: false})}
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













{/* ------------------------------------------- for teams ------------------------------------------- */}
                            <div className="bg-black px-7 py-11 my-4 rounded-2xl border-4 border-stone-900 w-[40%] mx-auto flex flex-col items-center gap-11">
                                <p className="font-manrope text-4xl text-gray-200 font-bold">scraping the teams</p>

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
                                </ul>

                                <div className="flex items-start justify-center">
                                    <input onClick={() => setTeamScrapingState({...teamScrapingState, insurance: !teamScrapingState.insurance})} id="requirements" className="mt-1 mr-2  dark:scale-100 transition-all duration-300 ease-in-out text-red-500 dark:hover:scale-110 rounded-full dark:checked:scale-100 w-4 h-4" type="checkbox" />
                                    <label htmlFor="requirements" className="text-gray-600 font-manrope font-bold">
                                        I have reviewed and ensured all the requirements are met before proceeding.
                                    </label>
                                </div>

                                <div className="relative mx-auto w-[80%]">
                                    <button onClick={teamScrapingState.insurance ? () => { scrape_teams() } : undefined} className={`w-full ${teamScrapingState.insurance ? 'hover:scale-105' : 'cursor-not-allowed'} transition-all duration-300 font-manrope text-white font-bold bg-red-950 px-4 py-3 rounded-lg border-2 border-gray-600`}>{teamScrapingState.loading ? <div className="mx-auto w-5 h-5 border-4 border-t-red-600 border-gray-300 rounded-full animate-spin"></div> : 'Scrape the teams'}</button>
                                </div>
                            </div>
                            {teamScrapingState.alert && (
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
                                                    {teamScrapingState.alertMsg}
                                                </p>
                                            </div>

                                            {/* Close Button */}
                                            <button
                                                onClick={() => setTeamScrapingState({...teamScrapingState, alert: false})}
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



                            {teamScrapingState.success && (
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
                                                    {teamScrapingState.successMsg}
                                                </p>
                                            </div>

                                            {/* Close Button */}
                                            <button
                                                onClick={() => setTeamScrapingState({...teamScrapingState, success: false})}
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








{/* ------------------------------------------- for players ------------------------------------------- */}
                            <div className="bg-black px-7 py-11 my-4 rounded-2xl border-4 border-stone-900 w-[40%] mx-auto flex flex-col items-center gap-11">
                                <p className="font-manrope text-4xl text-gray-200 font-bold">scraping the players</p>

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
                                </ul>

                                <div className="flex items-start justify-center">
                                    <input onClick={() => setPlayerScrapingState({...playerScrapingState, insurance: !playerScrapingState.insurance})} id="requirements" className="mt-1 mr-2  dark:scale-100 transition-all duration-300 ease-in-out text-red-500 dark:hover:scale-110 rounded-full dark:checked:scale-100 w-4 h-4" type="checkbox" />
                                    <label htmlFor="requirements" className="text-gray-600 font-manrope font-bold">
                                        I have reviewed and ensured all the requirements are met before proceeding.
                                    </label>
                                </div>

                                <div className="relative mx-auto w-[80%]">
                                    <button onClick={playerScrapingState.insurance ? () => { scrape_players() } : undefined} className={`w-full ${playerScrapingState.insurance ? 'hover:scale-105' : 'cursor-not-allowed'} transition-all duration-300 font-manrope text-white font-bold bg-red-950 px-4 py-3 rounded-lg border-2 border-gray-600`}>{playerScrapingState.loading ? <div className="mx-auto w-5 h-5 border-4 border-t-red-600 border-gray-300 rounded-full animate-spin"></div> : 'Scrape the players'}</button>
                                </div>
                            </div>
                            {playerScrapingState.alert && (
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
                                                    {playerScrapingState.alertMsg}
                                                </p>
                                            </div>

                                            {/* Close Button */}
                                            <button
                                                onClick={() => setPlayerScrapingState({...playerScrapingState, alert: false})}
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



                            {playerScrapingState.success && (
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
                                                    {playerScrapingState.successMsg}
                                                </p>
                                            </div>

                                            {/* Close Button */}
                                            <button
                                                onClick={() => setPlayerScrapingState({...playerScrapingState, success: false})}
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

















        {/* ------------------------------------------- for matches ------------------------------------------- */}
                            <div className="bg-black px-7 py-11 my-4 rounded-2xl border-4 border-stone-900 w-[40%] mx-auto flex flex-col items-center gap-11">
                                <p className="font-manrope text-4xl text-gray-200 font-bold">scraping the matches</p>

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
                                </ul>

                                <div className="flex items-start justify-center">
                                    <input onClick={() => setMatchScrapingState({...matchScrapingState, insurance: !matchScrapingState.insurance})} id="requirements" className="mt-1 mr-2  dark:scale-100 transition-all duration-300 ease-in-out text-red-500 dark:hover:scale-110 rounded-full dark:checked:scale-100 w-4 h-4" type="checkbox" />
                                    <label htmlFor="requirements" className="text-gray-600 font-manrope font-bold">
                                        I have reviewed and ensured all the requirements are met before proceeding.
                                    </label>
                                </div>

                                <div className="relative mx-auto w-[80%]">
                                    <button onClick={matchScrapingState.insurance ? () => { scrape_matches() } : undefined} className={`w-full ${matchScrapingState.insurance ? 'hover:scale-105' : 'cursor-not-allowed'} transition-all duration-300 font-manrope text-white font-bold bg-red-950 px-4 py-3 rounded-lg border-2 border-gray-600`}>{matchScrapingState.loading ? <div className="mx-auto w-5 h-5 border-4 border-t-red-600 border-gray-300 rounded-full animate-spin"></div> : 'Scrape the matches'}</button>
                                </div>
                            </div>
                            {matchScrapingState.alert && (
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
                                                    {matchScrapingState.alertMsg}
                                                </p>
                                            </div>

                                            {/* Close Button */}
                                            <button
                                                onClick={() => setMatchScrapingState({...matchScrapingState, alert: false})}
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



                            {matchScrapingState.success && (
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
                                                    {matchScrapingState.successMsg}
                                                </p>
                                            </div>

                                            {/* Close Button */}
                                            <button
                                                onClick={() => setMatchScrapingState({...matchScrapingState, success: false})}
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
    )
}