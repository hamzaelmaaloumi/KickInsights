import { useEffect, useState } from "react";
import httpService from "../../HttpService/http-service";
import { NavLink } from "react-router-dom";

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

        console.log(res.data);

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

  return (
    <div className=" bg-black py-11 flex flex-col items-center">
      <h2 className="font-manrope text-5xl text-white font-extrabold text-center">
        Recent Matches
      </h2>
      {loading && (
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

      <div className="flex flex-wrap justify-center">
        {matches.slice(0, matchCount).map((m) => {
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

      {matchCount !== matches.length && loading === false && (
        <div
          onClick={() => setMatchCount(matchCount + 3)}
          className="cursor-pointer w-fit px-8 py-3 bg-gray-800 text-gray-300 font-semibold rounded-xl hover:bg-gray-700 transition-all duration-300 hover:text-white hover:shadow-lg border border-gray-700 hover:border-transparent"
        >
          Load more
        </div>
      )}
    </div>
  );
}
