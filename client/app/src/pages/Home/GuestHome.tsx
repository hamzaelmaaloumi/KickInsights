import photo from "../../assets/player2.png";
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
      <div className="bg-black">
        <div className="flex flex-col lg:flex-row px-10 py-0 justify-between items-center bg-inherit">
          <div data-aos="fade-right" className="flex flex-col jutify-between gap-7 pt-20 lg:p-0 lg:w-1/2">
            <span
              className="text-left text-6xl font-manrope font-extrabold text-white"
            >
              Your Ultimate Football{" "}
              <span className="text-cyan-400">Stats Tracker!</span>
            </span>
            <span
              className="text-left text-2xl font-manrope font-semibold text-gray-400"
            >
              Track the performance of Morocco’s top football stars, from
              international rankings to key stats!
            </span>
            <NavLink to={"/login"}
              className="hover:bg-purple-800 hover:animate-none flex gap-3 items-center bg-purple-700 w-fit rounded-full p-4 text-left font-manrope font-semibold text-white group"
            >
              Sign Up for Free <ArrowForwardRoundedIcon />
            </NavLink>
          </div>
          <div data-aos="fade-up" className="flex w-2/2">
            <img
              className="m-0 lg:mr-20 w-full h-full mb-20"
              src={photo}
              alt=""
            />
          </div>
        </div>

        <div className="px-4 sm:px-20 md:px-40 lg:px-72 py-10 text-center text-5xl font-manrope font-bold text-white">
          About the Morocco National Football Team
        </div>

        <div className="px-4 sm:px-20 md:px-40 lg:px-72 py-10 text-center text-2xl font-manrope font-bold text-gray-400">
          Founded in 1955, Morocco's national team has participated in 5 World
          Cups and 5 Africa Cup of Nations. Their strong performances on the
          global stage make them one of the most exciting teams in African
          football.
        </div>

        <div className="px-4 sm:px-20 md:px-40 lg:px-40" data-aos="fade-up">
          <RankingTable />
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