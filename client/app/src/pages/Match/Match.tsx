import { useEffect, useState } from "react";
import httpService from "../../HttpService/http-service";
import { NavLink } from "react-router-dom";
import { TbAnalyzeFilled } from "react-icons/tb";
import Ochat from "./Ochat";

interface match {
  id: number;
  date: Date;
  league: number;
  scoreA: number;
  scoreB: number;
  state: string;
  teamA: number;
  teamB: number;
  teamAName: string;
  teamALogo: string;
  teamBName: string;
  teamBLogo: string;
  leagueName: string;
  leagueImg: string;
}
interface opponent {
  id: number,
  name: string,
  image: string,
  fixture_date: string,
  fixture_time: string,
  summary: number,
  attacking: number,
  passes: number,
  defending: number,
  other: number
}

export default function Match() {
  const matchService = new httpService("Match");
  const teamService = new httpService("Team");
  const leagueService = new httpService("League");
  const [matches, setMatches] = useState<match[]>([]);
  const [matchCount, setMatchCount] = useState(3);
  const [loading, setLoading] = useState<Boolean>(false);

  useEffect(() => {
    let outController: AbortController;
    const fetchMatches = async () => {
      try {
        const { request, controller } = matchService.getAll();
        outController = controller;
        const res = await request;
        const matchData = await Promise.all(
          res.data.map(async (m: match) => {
            const leagueRes = await leagueService.getById(m.league);
            const teamARes = await teamService.getById(m.teamA);
            const teamBRes = await teamService.getById(m.teamB);

            return {
              ...m,
              teamAName: teamARes.data.name,
              teamALogo: teamARes.data.image,
              teamBName: teamBRes.data.name,
              teamBLogo: teamBRes.data.image,
              leagueName: leagueRes.data.league_name,
              leagueImg: leagueRes.data.image,
            };
          })
        );


        setMatches(matchData);
        setLoading(false);
      } catch (error) {
        console.log("an error happend", error);
      }
    };

    setLoading(true);
    fetchMatches();

    return () => outController.abort();
  }, []);





  const [opponent, setOpponent] = useState<opponent[]>([])
  const [tab, setTab] = useState<string>("recent matches")









  useEffect(() => {
    const opponentService = new httpService("Opponent");
    let AbortController: AbortController;

    const fetchOpponents = async () => {
      try {
        const { request, controller } = opponentService.getAll()
        AbortController = controller
        const res = await request
        setOpponent(res.data)
      }
      catch (e) {
        console.log(`error ${e}`)
      }
    }

    fetchOpponents()
    
    console.log(matches)

  }, [])






  return (
    <>
          <div className="bg-black py-11 flex flex-col items-center">
            <div className="flex justify-between items-center gap-2">
              <h2 onClick={() => setTab("recent matches")} className={`cursor-pointer font-manrope text-md ${tab === "recent matches" ? "bg-green-400/40" : ""} border-2 border-green-400 py-2 px-4 rounded-full text-green-300 font-extrabold text-center`}>
                Recent Matches
              </h2>
              <h2 onClick={() => setTab("next matches")} className={`cursor-pointer font-manrope text-md ${tab === "next matches" ? "bg-green-400/40" : ""} border-2 border-green-400 py-2 px-4 rounded-full text-green-300 font-extrabold text-center`}>
                next Matches
              </h2>
            </div>


            {(tab === "next matches") && opponent.map((o) => {
              return (
                <div data-aos="fade-up" className="group font-manrope flex flex-col bg-[#141414] border-2 border-gray-700 mt-32 px-2 rounded-lg w-[500px] h-fit cursor-pointer">
                  <div className="flex justify-between items-center pt-1">
                    <div className="flex items-center gap-2">
                      <div className="w-9 border border-gray-500 rounded-full">
                        <img src={o.image} alt="" />
                      </div>
                      <div className="text-white text-md font-semibold">{o.name}</div>
                    </div>
                    <div className="p-1 rounded-lg flex flex-col items-center text-gray-400 font-bold text-sm">
                      <div className="">{o.fixture_date}</div>
                      <div className="">{o.fixture_time}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-white text-md font-semibold">Morocco</div>
                      <div className="w-9 border border-gray-500 rounded-full">
                        <img src={"https://img.sofascore.com/api/v1/team/4778/image"} alt="" />
                      </div>
                    </div>
                  </div>
                  <div className="opacity-0 max-h-0 overflow-hidden transition-all duration-700 ease-in-out group-hover:opacity-100 group-hover:max-h-20 w-full pb-1">
                    <NavLink to={`/OStats/${o.id}`} className="group/button flex items-center justify-center gap-1 text-white font-semibold p-2 rounded-md border border-gray-700 bg-[#300707]">
                      <span>Analyze Opponent</span>
                      <TbAnalyzeFilled className="transform group-hover/button:rotate-180 transition-all duration-300 text-red-500 text-2xl" />
                    </NavLink>
                  </div>

                </div>
              )
            }
            )}






            {loading && (tab === "recent matches") && (
              <div
                data-aos="fade-down"
                className="overflow-hidden flex justify-center items-center w-full h-[445px]"
              >
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            )}

            {!loading && matches.length === 0 && (
              <div
                data-aos="fade-up"
                className="m-16 p-11 bg-red-950 opacity-5 border-2 shadow-md shadow-red-600 border-red-800 rounded-3xl text-center"
              >
                <svg
                  className="w-16 h-16 mx-auto text-red-600  mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 20a8 8 0 100-16 8 8 0 000 16z"
                  />
                </svg>
                <p className="text-red-600 text-xl font-bold font-manrope mb-2">No matches found</p>
                <p className="text-white font-manrope">Check back later for new matches</p>
              </div>
            )}

            <div className="flex flex-wrap justify-center">
              {(tab === "recent matches") && matches.slice(0, matchCount).map((m) => {
                return (
                  <div
                    data-aos="fade-up"
                    className="py-4 flex gap-4 flex-col justify-center items-center m-8 bg-gray-900 border-2 border-gray-700 w-[370px] rounded-3xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:bg-gray-800"
                  >
                    <div className="transition-all duration-300 transform group-hover:scale-105">
                      <div className="bg-emerald-500/20 px-3 py-1 rounded-full text-sm text-emerald-300">
                        finished
                      </div>
                    </div>

                    <div className="flex justify-between gap-4 mt-3 transition-all duration-300 transform group-hover:scale-105">
                      <div className="w-1/3 flex flex-col items-center justify-between gap-2">
                        <img className="w-8" src={m.teamALogo} alt="" />
                        <span className="text-white font-bold text-2xl">
                          {m.teamAName.length > 9
                            ? m.teamAName.slice(0, 4) + "..."
                            : m.teamAName}
                        </span>
                      </div>
                      <div className="w-10 font-manrope text-center text-md text-white font-bold text-xl flex items-center justify-center">
                        {m.scoreA}-{m.scoreB}
                      </div>
                      <div className="w-1/3 flex flex-col items-center justify-between gap-2">
                        <img className="w-8" src={m.teamBLogo} alt="" />
                        <span className="text-white font-bold text-2xl">
                          {m.teamBName.length > 9
                            ? m.teamBName.slice(0, 4) + "..."
                            : m.teamBName}
                        </span>
                      </div>
                    </div>

                    <div className="font-manrope font-medium text-gray-300 text-sm mb-1 transition-all duration-300 group-hover:text-gray-100">
                      {typeof m.date === "object"
                        ? m.date.toLocaleDateString()
                        : m.date}
                    </div>

                    <div className="bg-gray-800 w-2/3 flex justify-between items-center rounded-full py-2 px-4 transition-all duration-300 transform group-hover:bg-gray-700">
                      <img className="w-1/12" src={m.leagueImg} alt="" />
                      <div className="font-manrope text-gray-200 text-sm text-center">
                        {m.leagueName}
                      </div>
                    </div>

                    <NavLink
                      to={`/stats/${m.id}`}
                      className="w-5/6 px-8 mt-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 rounded-xl hover:from-blue-400 hover:to-purple-500 transition-all duration-300 flex items-center justify-center group-hover:shadow-[0_0_25px_-5px_rgba(99,102,241,0.3)] transform hover:scale-105"
                    >
                      <span>View Full Stats</span>
                      <svg
                        className="w-4 h-4 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </NavLink>
                  </div>
                );
              })}
            </div>

            {matchCount !== matches.length && matches.length > 0 && loading === false && (tab === "recent matches") && (
              <div
                onClick={() => setMatchCount(matchCount + 3)}
                className="cursor-pointer w-fit px-8 py-3 bg-gray-800 text-gray-300 font-semibold rounded-xl hover:bg-gray-700 transition-all duration-300 hover:text-white hover:shadow-lg border border-gray-700 hover:border-transparent"
              >
                Load more
              </div>
            )}<Ochat data={matches} generalContext={"matches"} extraContext="IMPORTANT: When interpreting match results, please note that scoreA belongs to teamA and scoreB belongs to teamB. The winning team is the one with the higher score. For example, if scoreA is 1 and scoreB is 5, then teamB won the match with a score of 5-1 against teamA. Do not swap the scores or teams when reporting match results." />
          </div>
    
    </>
  );
}
