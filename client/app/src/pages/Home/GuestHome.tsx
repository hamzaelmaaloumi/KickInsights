import photo2 from "../../assets/hero4.jpg"
import photo3 from "../../assets/hero3.jpg"
import photo5 from "../../assets/hero1.jpg"
import walid from "../../assets/walid2-nobg.png";
import RankingTable from "../../components/RankingTable";
import * as AOS from 'aos';
import "aos/dist/aos.css";
import { useEffect } from "react";
import Grid from "../../components/Grid";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { NavLink } from "react-router-dom";

export default function GuestHome() {
  useEffect(() => {
    //for animation on scroll
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <>
      <div className="bg-black h-fit">
        {/* Enhanced Hero Section */}
        <div className="relative z-0 md:py-32 flex flex-col lg:flex-row px-10 justify-center gap-32 md:gap-52 lg:gap-0 items-center bg-inherit overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-black"></div>
          <div data-aos="fade-right" className="flex flex-col justify-between gap-7 pt-20 lg:p-0 lg:w-2/3 relative z-10">
            <div className="relative">
              <span className="text-left text-6xl md:text-7xl font-manrope font-extrabold text-white leading-tight">
                Your Ultimate Football{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Stats Tracker!</span>
              </span>
            </div>
            <span className="text-left text-2xl font-manrope font-semibold text-gray-400 max-w-xl">
              Track the performance of Morocco's top football stars, from
              international rankings to key stats!
            </span>
            <NavLink to={"/login"}
              className="group hover:bg-purple-800 hover:animate-none flex gap-3 items-center bg-gradient-to-r from-purple-600 to-purple-950 w-fit rounded-full p-4 text-left font-manrope font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25"
            >
              Sign Up for Free 
              <ArrowForwardRoundedIcon className="transition-transform duration-300 group-hover:translate-x-1"/>
            </NavLink>
          </div>
          <div
            data-aos="fade-up"
            className="relative w-full mt-16 mb-32 sm:mb-52 sm:w-1/2 md:m-0 md:w-2/3 md:mr-12 flex justify-center items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4 rounded-lg shadow-2xl"
          >
            <img
              className="absolute transform border-white shadow-xl transition-all"
              src={photo5}
              alt="Top view of a soccer field"
            />
          </div>
        </div>

        {/* Enhanced About Section */}
        <div className="relative px-4 sm:px-20 md:px-40 lg:px-72 py-20 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
          <h1 className="text-center text-5xl md:text-6xl font-manrope font-bold text-white mb-6"
               data-aos="fade-up">
            About the Morocco National Football Team
          </h1>
          <p className="text-center text-xl md:text-2xl font-manrope text-gray-400 mb-16 max-w-3xl mx-auto"
             data-aos="fade-up" data-aos-delay="100">
            Founded in 1955, Morocco's national team has participated in 5 World
            Cups and 5 Africa Cup of Nations. Their strong performances on the
            global stage make them one of the most exciting teams in African
            football.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto" data-aos="fade-up" data-aos-delay="200">
            <div className="bg-gradient-to-br from-purple-900/40 to-transparent p-6 rounded-xl backdrop-blur-sm border border-purple-500/10 hover:border-purple-500/30 transition-all duration-300">
              <h3 className="text-2xl font-bold text-purple-400 mb-2">World Cup History</h3>
              <p className="text-gray-400">First African team to reach World Cup semi-finals in 2022</p>
            </div>
            <div className="bg-gradient-to-br from-cyan-900/40 to-transparent p-6 rounded-xl backdrop-blur-sm border border-cyan-500/10 hover:border-cyan-500/30 transition-all duration-300">
              <h3 className="text-2xl font-bold text-cyan-400 mb-2">FIFA Ranking</h3>
              <p className="text-gray-400">Consistently ranked among Africa's top teams</p>
            </div>
            <div className="bg-gradient-to-br from-blue-900/40 to-transparent p-6 rounded-xl backdrop-blur-sm border border-blue-500/10 hover:border-blue-500/30 transition-all duration-300">
              <h3 className="text-2xl font-bold text-blue-400 mb-2">Recent Success</h3>
              <p className="text-gray-400">Unbeaten streak in international competitions</p>
            </div>
          </div>
        </div>

        {/* Enhanced RankingTable Container */}
        <div className="relative px-4 sm:px-20 md:px-40 lg:px-40 py-20 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent" data-aos="fade-up">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/5 to-transparent"></div>
          <div className="relative bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-purple-500/10">
            <RankingTable />
          </div>
        </div>

        <div className="px-4 sm:px-10 lg:mt-32 flex flex-col lg:flex-row justify-between items-center ">
          <div className="flex flex-col jutify-between gap-7 pt-20 lg:p-0 lg:w-1/2">
            <span className="text-left text-6xl font-manrope font-extrabold text-cyan-400">
              Meet the Coach
            </span>
            <span className="text-left text-lg font-manrope font-semibold text-gray-400">
              Walid Regragui, 49 years old, is the current coach of Morocco.
              With 266 games as a manager, he has achieved 132 wins and 63
              losses, demonstrating a strong career performance. His preferred
              formation is 4-2-3-1, and his career highlights include an
              impressive average points per match
            </span>
          </div>

          <div className="relative mt-11 lg:mt-0 flex justify-center z-0 md:w-1/2">
            <Grid className="absolute lg:w-4/6 inset-0 m-auto z-[-1]" />
            <img
              className="z-10 w-full h-full"
              src={walid}
              alt=""
              data-aos="fade-up"
            />
          </div>
        </div>

        <div className="relative px-4 sm:px-10 py-32 bg-gradient-to-b from-transparent to-purple-950/20">
          <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="lg:w-1/2 relative group" data-aos="fade-right">
                <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
                <div className="relative flex items-center">
                  <img src={photo2} alt="Tactical Analysis" className="rounded-lg shadow-2xl" />
                  <img 
                    src={photo3} 
                    alt="Coach Strategy" 
                    className="absolute -right-10 -bottom-10 w-2/3 rounded-lg shadow-2xl border-4 border-black"
                    data-aos="fade-up"
                    data-aos-delay="200"
                  />
                </div>
              </div>
              
              <div className="lg:w-1/2" data-aos="fade-left">
                <h2 className="text-5xl font-manrope font-bold text-cyan-400 mb-6">
                  Tactical Mastery
                </h2>
                <div className="space-y-6">
                  <p className="text-gray-400 text-lg">
                    Discover the strategic depth behind Morocco's success. Our platform provides exclusive insights into the team's tactical evolution and match-winning formations.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                      <h3 className="text-purple-400 font-bold mb-2">Formation Analysis</h3>
                      <p className="text-gray-400 text-sm">Detailed breakdown of strategic setups and player positioning</p>
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                      <h3 className="text-purple-400 font-bold mb-2">Game Plans</h3>
                      <p className="text-gray-400 text-sm">Expert analysis of offensive and defensive strategies</p>
                    </div>
                  </div>
                  <NavLink to="/tactics" className="inline-block mt-4 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full text-white font-semibold hover:opacity-90 transition duration-300">
                    Explore Tactics
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative pt-40 pb-11 px-4">
          <div className="absolute inset-0"></div>
          <div className="container mx-auto">
            <h2
              className="text-5xl font-manrope font-bold text-center text-white mb-16"
              data-aos="fade-up" // For fade and slide-up effect
              data-aos-duration="800" // Duration for the animation
            >
              Morocco's Football Legacy
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div
                data-aos="fade-up" // Outer element for AOS animation
                data-aos-duration="800" // Duration for the animation
                data-aos-delay="200" // Delay for the animation
              >
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 cursor-pointer transition-transform duration-300 transform hover:scale-105">
                  <h3 className="text-cyan-400 text-2xl sm:text-3xl md:text-4xl font-bold mb-2">Semi-Finals 2022</h3>
                  <p className="text-gray-400 text-lg">World Cup</p>
                </div>
              </div>
              <div
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-delay="200"
              >
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 cursor-pointer transition-transform duration-300 transform hover:scale-105">
                  <h3 className="text-cyan-400 text-2xl sm:text-3xl md:text-4xl font-bold mb-2">Top 15</h3>
                  <p className="text-gray-400 text-lg">FIFA Ranking</p>
                </div>
              </div>
              <div
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-delay="200"
              >
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl py-8 border border-white/10 cursor-pointer transition-transform duration-300 transform hover:scale-105">
                  <h3 className="text-cyan-400 text-2xl sm:text-3xl md:text-4xl font-bold mb-2">5 Appearances</h3>
                  <p className="text-gray-400 text-lg">AFCON</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 sm:px-20 md:px-40 lg:px-64 py-36 flex flex-col justify-between items-center gap-8">
          <span className="font-manrope text-2xl font-extrabold text-center text-violet-600">
            Why Join KickInsights?
          </span>
          <span className="font-manrope text-md font-semibold text-center text-gray-400">
            At KickInsights, we offer real-time stats, player performance
            tracking, and insider insights that give you an edge over other
            football fans. Sign up today and become part of our football
            community!
          </span>
          <div className="w-full flex justify-center items center">
            <input
              className="pl-4 bg-transparent focus:border-gray-500 outline-none border-2 border-gray-700 rounded-lg w-1/2 h-14 font-manrope text-md text-white"
              type="text"
              placeholder="enter your username"
            />
            <button className="relative ml-2 px-4 bg-amber-500 font-manrope font-bold text-md text-center text-black rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-amber-500/50">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </>
  );
}